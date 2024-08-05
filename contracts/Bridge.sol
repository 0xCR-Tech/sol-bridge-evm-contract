// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract Bridge is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    // Custom errors to provide more descriptive revert messages.
    error NothingToWithdraw(); // Used when trying to withdraw but there's nothing to withdraw.
    error InsufficientToWithdraw(); // Used when trying to withdraw token but the balance is insufficient to withdraw.
    error FailedToWithdrawEth(address owner, address target, uint256 value); // Used when the withdrawal of Ether fails.
    error InsufficientFee(); // Used when trying to send ccip message but fee is insufficient.
    error InsufficientInTarget(); // Used when trying to send token but target balance is insufficient.
    error InvalidMessageType(); // Used when trying to send token but message type is invalid.

    // Event emitted when a message is sent to another chain.
    event AddLiquidity(
        uint256 indexed targetChainSelector, // The chain selector of the target chain.
        uint16 msgType, // The type of message.
        address toAddress, // The address to receive token.
        uint16 tokenId, // The token id.
        uint256 amount // The amount of token.
    );
    event SendToken(
        uint256 indexed targetChainSelector, // The chain selector of the target chain.
        uint16 msgType, // The type of message.
        address toAddress, // The address to receive token.
        uint16 tokenId, // The token id.
        uint256 amount // The amount of token.
    );
    event MessageReceived(
        uint16 msgType, // The type of message.
        address toAddress, // The address to receive token.
        uint16 tokenId, // The token id.
        uint256 amount // The amount of token.
    );
    event SetTargetChainSelector(uint256 _targetChainSelector);
    event SetTargetBridge(address _targetBridge);
    event SetProtocolFee(uint256 _protocolFee);
    event AddToken(uint16 _tokenId, address _token, uint256 targetChainSelector);
    event RemoveToken(uint16 _tokenId, address _token, uint256 targetChainSelector);
    event Withdraw(address _beneficiary);
    event WithdrawToken(
        uint256 indexed targetChainSelector, // The chain selector of the target chain.
        uint16 msgType, // The type of message.
        address toAddress, // The address to receive token.
        uint16 tokenId, // The token id.
        uint256 amount, // The amount of token.
        address beneficiary // The address of beneficiary.
    );

    uint16 internal constant TYPE_REQUEST_ADD_LIQUIDITY = 1;
    uint16 internal constant TYPE_REQUEST_SEND_TOKEN = 2;
    uint16 internal constant TYPE_REQUEST_WITHDRAW_TOKEN = 3;


    mapping(uint256 => mapping(uint16 => address)) public id2token; // tokenId => address
    mapping(uint256 => mapping(address => uint16)) public token2id; // address => tokenId
    mapping(uint256 => uint16[]) public tokenIds;
    mapping(uint256 => mapping(uint16 => uint256)) private tokenIdIndex;

    // uint16 public lastTokenId;
    mapping(uint256 => mapping(uint16 => uint256)) public targetBalance; // targetChain's tokenId => amount
    uint256 public targetChainSelector;
    address public targetBridge;
    uint256 public protocolFee;

    modifier isSupportedToken(address _token, uint256 _targetChainSelector) {
        require(token2id[_targetChainSelector][_token] != 0, "Not supported token");
        _;
    }

    constructor(address initialOwner) Ownable(initialOwner) {}

    receive() external payable {}

    function getSupportedTokens(uint256 _targetChainSelector) public view returns (address[] memory) {
        uint256 tokenCount = tokenIds[_targetChainSelector].length;
        address[] memory tokens = new address[](tokenCount);
        for (uint16 id = 0; id < tokenCount; ++id) {
            uint16 tokenId = tokenIds[_targetChainSelector][id];
            tokens[id] = id2token[_targetChainSelector][tokenId];
        }
        return tokens;
    }

    function addLiquidity(
        address token,
        uint256 amount,
        uint256 _targetChainSelector
    ) external nonReentrant isSupportedToken(token, _targetChainSelector) {
        // Check received amount
        uint256 balanceBefore = IERC20(token).balanceOf(address(this));
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        uint256 balanceAfter = IERC20(token).balanceOf(address(this));
        uint256 amountToBridge = balanceAfter - balanceBefore;
        uint16 tokenId = token2id[_targetChainSelector][token];

        // Emit an event with message details
        emit AddLiquidity(
            _targetChainSelector,
            TYPE_REQUEST_ADD_LIQUIDITY,
            msg.sender,
            tokenId,
            amountToBridge
        );
    }

    function send(
        address token,
        uint256 amount,
        uint256 _targetChainSelector
    ) external payable nonReentrant isSupportedToken(token, _targetChainSelector) {
        if (msg.value < protocolFee) revert InsufficientFee();
        // Check received amount
        uint256 balanceBefore = IERC20(token).balanceOf(address(this));
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        uint256 balanceAfter = IERC20(token).balanceOf(address(this));
        uint256 amountToBridge = balanceAfter - balanceBefore;
        uint16 tokenId = token2id[_targetChainSelector][token];
        
        if (amountToBridge > targetBalance[_targetChainSelector][tokenId]) revert InsufficientInTarget();
        targetBalance[_targetChainSelector][tokenId] -= amountToBridge;
        // Emit an event with message details
        emit SendToken(
            _targetChainSelector,
            TYPE_REQUEST_SEND_TOKEN,
            msg.sender,
            tokenId,
            amountToBridge
        );
    }

    function messageReceive(
        uint16 msgType,
        address toAddress,
        uint16 tokenId,
        uint256 amount,
        uint256 _sourceChainSelector
    ) external onlyOwner nonReentrant {
        if (msgType == TYPE_REQUEST_ADD_LIQUIDITY) {
            targetBalance[_sourceChainSelector][tokenId] += amount;
        } else if (msgType == TYPE_REQUEST_SEND_TOKEN) {
            address token = id2token[_sourceChainSelector][tokenId];
            IERC20(token).safeTransfer(toAddress, amount);
            targetBalance[_sourceChainSelector][tokenId] += amount;
        } else if (msgType == TYPE_REQUEST_WITHDRAW_TOKEN) {
            targetBalance[_sourceChainSelector][tokenId] -= amount;
        } else {
            revert InvalidMessageType();
        }

        emit MessageReceived(
            msgType,
            toAddress,
            tokenId,
            amount
        );
    }

    function setProtocolFee(uint256 _protocolFee) external onlyOwner {
        require(_protocolFee != 0, "Zero fee");
        protocolFee = _protocolFee;
        emit SetProtocolFee(_protocolFee);
    }

    function addToken(uint16 tokenId, address tokenAddress, uint256 _targetChainSelector) external onlyOwner {
        require(id2token[_targetChainSelector][tokenId] == address(0), "Token ID already exists");
        require(token2id[_targetChainSelector][tokenAddress] == 0, "Token address already mapped");

        id2token[_targetChainSelector][tokenId] = tokenAddress;
        token2id[_targetChainSelector][tokenAddress] = tokenId;

        tokenIds[_targetChainSelector].push(tokenId);
        tokenIdIndex[_targetChainSelector][tokenId] = tokenIds[_targetChainSelector].length - 1;

        emit AddToken(tokenId, tokenAddress, _targetChainSelector);
    }

    function removeToken(
        uint16 tokenId,
        uint256 _targetChainSelector
    ) external onlyOwner {
        require(id2token[_targetChainSelector][tokenId] != address(0), "Token ID does not exist");

        address tokenAddress = id2token[_targetChainSelector][tokenId];

        delete id2token[_targetChainSelector][tokenId];
        delete token2id[_targetChainSelector][tokenAddress];

        uint256 index = tokenIdIndex[_targetChainSelector][tokenId];
        uint16 lastTokenId = tokenIds[_targetChainSelector][tokenIds[_targetChainSelector].length - 1];
        tokenIds[_targetChainSelector][index] = lastTokenId;
        tokenIdIndex[_targetChainSelector][lastTokenId] = index;
        tokenIds[_targetChainSelector].pop();
        
        delete tokenIdIndex[_targetChainSelector][tokenId];

        emit RemoveToken(tokenId, tokenAddress, _targetChainSelector);
    }

    /// @notice Allows the contract owner to withdraw the entire balance of Ether from the contract.
    /// @dev This function reverts if there are no funds to withdraw or if the transfer fails.
    /// It should only be callable by the owner of the contract.
    /// @param beneficiary The address to which the Ether should be sent.
    function withdraw(address beneficiary) external onlyOwner {
        // Retrieve the balance of this contract
        uint256 amount = address(this).balance;

        // Revert if there is nothing to withdraw
        if (amount == 0) revert NothingToWithdraw();

        // Attempt to send the funds, capturing the success status and discarding any return data
        (bool sent, ) = beneficiary.call{value: amount}("");

        // Revert if the send failed, with information about the attempted transfer
        if (!sent) revert FailedToWithdrawEth(msg.sender, beneficiary, amount);

        emit Withdraw(beneficiary);
    }

    /// @notice Allows the owner of the contract to withdraw all tokens of a specific ERC20 token.
    /// @dev This function reverts with a 'NothingToWithdraw' error if there are no tokens to withdraw.
    /// @param token The address of token to withdraw.
    /// @param beneficiary The address to which the tokens will be sent.
    function withdrawToken(
        address token,
        uint256 amount,
        address beneficiary,
        uint256 _targetChainSelector
    ) external payable onlyOwner isSupportedToken(token, _targetChainSelector) {
        if (amount == 0) revert NothingToWithdraw();
        uint256 balance = IERC20(token).balanceOf(address(this));
        if (amount > balance) revert InsufficientToWithdraw();

        uint16 tokenId = token2id[_targetChainSelector][token];
        IERC20(token).safeTransfer(beneficiary, amount);

        emit WithdrawToken(
            _targetChainSelector,
            TYPE_REQUEST_WITHDRAW_TOKEN,
            msg.sender,
            tokenId,
            amount,
            beneficiary
        );
    }
}

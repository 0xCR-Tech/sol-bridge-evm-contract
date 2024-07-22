// import * as dotenvenc from '@chainlink/env-enc'
// dotenvenc.config();

import * as dotenv from 'dotenv';
dotenv.config();

import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
// import './tasks';
// import 'hardhat-change-network';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';

// Import MNEMONIC or single private key
const MNEMONIC = process.env.MNEMONIC || "test test test test test test test test test test test junk";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const INFURA = process.env.INFURA || "";
const ETHEREUM_API_KEY = process.env.ETHEREUM_API_KEY || "api-key";
const OPTIMISM_API_KEY = process.env.OPTIMISM_API_KEY || "api-key";
const BSC_API_KEY = process.env.BSC_API_KEY || "api-key";
const FANTOM_API_KEY = process.env.FANTOM_API_KEY || "api-key";
const POLYGON_API_KEY = process.env.POLYGON_API_KEY || "api-key";
const ARBITRUM_API_KEY = process.env.ARBITRUM_API_KEY || "api-key";
const BASE_API_KEY = process.env.BASE_API_KEY || "api-key";
const AVALANCHE_API_KEY = process.env.AVALANCHE_API_KEY || "api-key";

const config: HardhatUserConfig = {
  solidity: '0.8.20',
  networks: {
    hardhat: {
      gas: 30e6,
      blockGasLimit: 30e6,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      gas: 30e6,
      blockGasLimit: 30e6,
      url: 'http://localhost:8545',
      loggingEnabled: true,
    },
    mainnet: {
      gasPrice: 'auto',
      url: 'https://mainnet.infura.io/v3/' + INFURA,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    sepolia: {
      url: 'https://sepolia.infura.io/v3/' + process.env.INFURA,
      chainId: 11155111,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    optimisticEthereum: {
      // url: 'https://optimism-mainnet.infura.io/v3/' + INFURA,
      url: 'https://mainnet.optimism.io',
      chainId: 10,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    optimismSepolia: {
      url: 'https://optimism-sepolia.blockpi.network/v1/rpc/public',
      chainId: 11155420,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    base: {
      url: 'https://mainnet.base.org',
      chainId: 8453,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    baseSepolia: {
      url: 'https://sepolia.base.org',
      chainId: 84532,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    polygon: {
      url: 'https://polygon-mainnet.infura.io/v3/' + INFURA,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    polygonAmoy: {
      url: 'https://rpc-amoy.polygon.technology',
      chainId: 80002,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    polygonMumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/' + INFURA,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
      gasPrice: 80000000000,
    },
    avalancheCChain : {
      url: 'https://avalanche-mainnet.infura.io/v3/' + INFURA,
      chainId: 43114,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    avalancheFuji : {
      url: 'https://avalanche-fuji.infura.io/v3/' + INFURA,
      chainId: 43113,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    bsc: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      //gasPrice: 5000000000,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    bscTestnet: {
      url: `https://data-seed-prebsc-1-s1.bnbchain.org:8545`,
      chainId: 97,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    arbitrumOne: {
      // url: 'https://arbitrum-mainnet.infura.io/v3/' + INFURA,
      url: 'https://arb1.arbitrum.io/rpc',
      chainId: 42161,
      //gasPrice: 5000000000,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    arbitrumSepolia: {
      // gasPrice: 10000,
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      chainId: 421614,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
    ftmTestnet: {
      // url: `https://endpoints.omniatech.io/v1/fantom/testnet/public`,
      // url: `https://rpc.ankr.com/fantom_testnet`,
      url: `https://fantom-testnet.public.blastapi.io`,
      chainId: 4002,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : { mnemonic: MNEMONIC },
    },
  },
  typechain: {
    externalArtifacts: ['./abi/*.json']
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  etherscan: {
    // not supported by default by hardhat
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      },
      {
        network: 'baseSepolia',
        chainId: 84532,
        urls: {
          apiURL: 'https://api-sepolia.basescan.org/api',
          browserURL: 'https://sepolia.basescan.org/',
        },
      },
      {
        network: 'optimismSepolia',
        chainId: 11155420,
        urls: {
          apiURL: 'https://api-sepolia-optimistic.etherscan.io/api',
          browserURL: 'https://sepolia-optimism.etherscan.io/',
        },
      },
      {
        network: 'arbitrumSepolia',
        chainId: 421614,
        urls: {
          apiURL: 'https://api-sepolia.arbiscan.io/api',
          browserURL: 'https://sepolia.arbiscan.io/',
        },
      },
      {
        network: 'polygon',
        chainId: 137,
        urls: {
          apiURL: 'https://api.polygonscan.com/api',
          browserURL: 'https://polygonscan.com/',
        },
      },
      {
        network: 'polygonAmoy',
        chainId: 80002,
        urls: {
          apiURL: 'https://api-amoy.polygonscan.com/api',
          browserURL: 'https://amoy.polygonscan.com/',
        },
      },
      {
        network: 'avalancheCChain',
        chainId: 43114,
        urls: {
          apiURL: 'https://api.snowtrace.io/api',
          browserURL: 'https://snowtrace.io/',
        },
      },
      {
        network: 'avalancheFuji',
        chainId: 43113,
        urls: {
          apiURL: 'https://api-testnet.snowtrace.io/api',
          browserURL: 'https://testnet.snowtrace.io/',
        },
      }
    ],
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: {
      // Ethereum
      mainnet: ETHEREUM_API_KEY,
      sepolia: ETHEREUM_API_KEY,
      // Optimism
      optimisticEthereum: OPTIMISM_API_KEY,
      optimismSepolia: OPTIMISM_API_KEY,
      // polygon
      polygon: POLYGON_API_KEY,
      polygonMumbai: POLYGON_API_KEY,
      polygonAmoy: POLYGON_API_KEY,
      // Arbitrum
      arbitrumOne: ARBITRUM_API_KEY,
      arbitrumSepolia: ARBITRUM_API_KEY,
      // Bsc
      bsc: BSC_API_KEY,
      bscTestnet: BSC_API_KEY,
      // Fantom
      ftmTestnet: FANTOM_API_KEY,
      // Base
      base: BASE_API_KEY,
      baseSepolia: BASE_API_KEY,

      avalancheCChain: AVALANCHE_API_KEY,
      avalancheFuji: AVALANCHE_API_KEY,
    },
  },
  mocha: {
    timeout: 40000000000000
},
};

export default config;

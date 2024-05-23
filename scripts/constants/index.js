const routers = {
  mainnet: "0x80226fc0Ee2b096224EeAc085Bb9a8cba1146f7D",
  bsc: "0x34B03Cb9086d7D758AC55af71584F81A598759FE",
  arbitrumOne: "0x141fa059441E0ca23ce184B6A78bafD2A517DdE8",
  optimisticEthereum: "0x3206695CaE29952f4b0c22a169725a865bc8Ce0f",
  base: "0x881e3A65B4d4a04dD529061dd0071cf975F58bCD",
  avalancheCChain: "0xF4c7E640EdA248ef95972845a62bdC74237805dB",
  polygon: "0x849c5ED5a80F5B408Dd4969b78c2C8fdf0565Bfe",

  sepolia: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59",
  bscTestnet: "0xE1053aE1857476f36A3C62580FF9b016E8EE8F6f",
  arbitrumSepolia: "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165",
  optimismSepolia: "0x114A20A10b43D4115e5aeef7345a1A71d2a60C57",
  baseSepolia: "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93",
  avalancheFuji: "0xF694E193200268f9a4868e4Aa017A0118C9a8177",
  polygonAmoy: "0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2",
};

const chainSelectors = {
  mainnet: "5009297550715157269",
  bsc: "11344663589394136015",
  arbitrumOne: "4949039107694359620",
  optimisticEthereum: "3734403246176062136",
  base: "15971525489660198786",
  avalancheCChain: "6433500567565415381",
  polygon: "4051577828743386545",

  sepolia: "16015286601757825753",
  bscTestnet: "13264668187771770619",
  arbitrumSepolia: "3478487238524512106",
  optimismSepolia: "5224473277236331295",
  baseSepolia: "10344971235874465080",
  avalancheFuji: "14767482510784806043",
  polygonAmoy: "16281711391670634445",
};

const links = {
  mainnet: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  bsc: "0x404460C6A5EdE2D891e8297795264fDe62ADBB75",
  arbitrumOne: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
  optimisticEthereum: "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6",
  base: "0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196",
  avalancheCChain: "0x5947BB275c521040051D82396192181b413227A3",
  polygon: "0xb0897686c545045aFc77CF20eC7A532E3120E0F1",

  sepolia: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
  bscTestnet: "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06",
  arbitrumSepolia: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
  optimismSepolia: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
  baseSepolia: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
  avalancheFuji: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
  polygonAmoy: "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904",
};

const weths = {
  mainnet: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  bsc: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  arbitrumOne: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  optimisticEthereum: "0x4200000000000000000000000000000000000006",
  base: "0x4200000000000000000000000000000000000006",
  avalancheCChain: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
  polygon: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",

  sepolia: "0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534",
  bscTestnet: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  arbitrumSepolia: "0xE591bf0A0CF924A0674d7792db046B23CEbF5f34",
  optimismSepolia: "0x4200000000000000000000000000000000000006",
  baseSepolia: "0x4200000000000000000000000000000000000006",
  avalancheFuji: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
  polygonAmoy: "0x360ad4f9a9A8EFe9A8DCB5f461c4Cc1047E1Dcf9",
};

const tokens = {
  mainnet: {
    usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  bsc: {
    usdt: "0x55d398326f99059ff775485246999027b3197955",
  },
  arbitrumOne: {
    usdt: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
  },

  sepolia: {
    musdt: "0x9C0Ce9D2cEce3Eb55d3562A0FB8A25b6ea82082d",
    musdc: "0xea485A0BFcD17618296bF85dE46A2e3f13f80f5a",
  },
  bscTestnet: {
    musdt: "0x1317EE60b378062aF66eF8DE4398eA104dc54Db4",
    musdc: "0xbBB6D3FE3d94a12b8C2186Af4Ab279fC277d203c",
  },
  arbitrumSepolia: {
    musdt: "0x7e1A5b7E08305c45AA0d51D756B222749B73eAcA",
    musdc: "0x394F0c6446a5279b7D8fB185846C8484a49F058f",
  }
}

const targetChains = {
  mainnet: ["bsc", "arbitrumOne", "base", "optimisticEthereum", "avalancheCChain", "polygon"],
  bsc: ["mainnet", "arbitrumOne", "base", "optimisticEthereum", "avalancheCChain", "polygon"],
  arbitrumOne: ["mainnet", "bsc", "optimisticEthereum", "avalancheCChain", "polygon"],
  optimisticEthereum: ["mainnet", "bsc", "arbitrumOne", "avalancheCChain"],
  base: ["mainnet", "bsc", "avalancheCChain", "polygon"],
  avalancheCChain: ["mainnet", "base", "bsc", "arbitrumOne", "optimisticEthereum", "polygon"],
  polygon: ["mainnet", "bsc", "arbitrumOne", "avalancheCChain", "base"],

  sepolia: [ "baseSepolia"],
  bscTestnet: ["baseSepolia"],
  arbitrumSepolia: ["sepolia", "bscTestnet", "optimismSepolia", "avalancheFuji"],
  optimismSepolia: ["sepolia", "arbitrumSepolia", "polygonAmoy"],
  baseSepolia: ["bscTestnet"],
  avalancheFuji: ["sepolia", "bscTestnet", "arbitrumSepolia", "baseSepolia"],
  polygonAmoy: ["sepolia", "bscTestnet", "optimismSepolia"]
}

const tokenAbi = [
  'function name() view returns (string memory)',
  'function symbol() view returns (string memory)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
  'function mint(address _to, uint256 _amount)',
  'function burn(address _to, uint256 _amount)',
];

const protocolFee = "10000000000";

module.exports = {
  routers,
  chainSelectors,
  links,
  weths,
  tokens,
  targetChains,
  tokenAbi,
  protocolFee
};

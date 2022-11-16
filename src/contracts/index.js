import { ethers } from "ethers";

import Contracts from "./contract.json";
import { InjectedConnector } from "@web3-react/injected-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const supportChainId = 1666600000;

const RPCS = {
    1666600000: "https://api.harmony.one/"
}

const providers = {
    1666600000: new ethers.providers.JsonRpcProvider(RPCS[1666600000])
}

const injected = new InjectedConnector({
    supportedChainIds: [1, 56, 137, 43114, 250, 66, 10, 42161, 97, 65, 80001, 43113, 4002, 65, 4, 1666600000],
});


export {
    supportChainId,
    providers,
    Contracts,
    injected
}
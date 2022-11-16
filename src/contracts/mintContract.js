import { Contracts } from "./index";
import { ethers } from "ethers";

// require('dotenv').config()

let { ethereum } = window;

let provider,signer,mintContract = null;

if (ethereum !== undefined) {
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  signer = provider.getSigner();
  mintContract = new ethers.Contract(
    Contracts.mintContract.address,
    Contracts.mintContract.abi,
    signer
  );
}

export { provider, signer, mintContract };

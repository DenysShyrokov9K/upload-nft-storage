import "./App.css";
import { useState, useContext } from "react";
import metaDatas from "./mint_json/sonic.json";
import { NFTStorage, File } from 'nft.storage'
const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJmNDFkYUE2ODc4M2IyNGMwYjM2ZEVBYzEwYTZkMDQxRDE0QjFEM0UiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2ODM2ODI3OTc5NCwibmFtZSI6IkFyY2FkaWFuIn0.WoVhwJOdL5UUXzpqB1VJ4PzvglAGMIbt9M618aZWhgs' })

const resolveLink = (url) => {
  if (!url || !url.includes("ipfs://")) return url;
  return url.replace("ipfs://", "https://ipfs.io/ipfs/");
};

import {
  mintContract
} from './contracts/mintContract';


function App() {
  const [picFiles, setPicFiles] = useState([])

  const capturePictureFile = (event) => {
    // event.preventDefault();
    setPicFiles(event.target.files)
  };

  const UploadData = async () => {
    console.log(picFiles.length);
    console.log(mintContract);
    for (var i = 0; i < picFiles.length; i++) {
      const number = picFiles[i].name.substring(0,picFiles[i].name.length-4);
      console.log(Number(number));
      try {
        const nft = Object.assign({image: picFiles[i]},{...metaDatas[i]});
        console.log("nft:",nft);
        const metadata = await client.store(nft);
        console.log(metadata.url);
        const transaction = await mintContract.setTokenCID(Number(number),metadata.url);
        const tx = await transaction.wait();
        if(tx !== null)
          console.log(transaction);
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={capturePictureFile} multiple />
      <button onClick={UploadData}>Upload</button>
    </div>
  );
}

export default App;

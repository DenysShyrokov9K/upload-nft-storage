async function storeNFT() {
  const url = await fetch(song.imgURL);
  const imgData = await url.blob();
  const image = new File([imgData], "test.png", { type: "image/png" });

  const songUrl = await fetch(song.mp3URL);
  const songData = await songUrl.blob();
  const songMp3 = new File([songData], "test.mp3", { type: "audio/mpeg" });
  const rarity = await rarityMethod(song);
  const { encryptedFile, encryptedSymmetricKey } = await lit.encrypt(songMp3);

  const nft = {
    image, // use image Blob as `image` field
    musicFile: encryptedFile,
    name: song.id,
    artist: song.artist,
    duration: song.duration,
    genre: song.genre,
    release: song.releaseYear,
    tokenID: song.minted + 1,
    rarity: rarity,
    encryptedSymmetricKey,
    description: "NFT Metadata!",
  };
  console.log("asdfasdf", nft);

  const client = new NFTStorage({ token: API_KEY });
  const metadata = await client.store(nft);

  updateDoc(keyRef, {
    encryptedSymmetricKey,
    metadata: metadata.url,
    minted: song.minted + 1,
  });
  console.log("NFT data stored!");
  console.log("Metadata URI: ", metadata.url);
  mintNFT(metadata.url);
  const songsRef = collection(db, "artists", song.artist, "songs");
  const songDocData = await getDocs(songsRef);
  setSongs(songDocData.docs.map((doc = { ...doc.data(), id: doc.id })));
}

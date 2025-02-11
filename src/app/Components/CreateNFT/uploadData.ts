// utils/uploadMetadata.ts
import { NFTMetaData } from "@/app/Redux/CreateSlice";
import pinata from "./IPFSclient";

export const uploadMetadataToPinata = async (metadata: NFTMetaData) => {
  try {
    const response = await pinata.upload.json(metadata);
    console.log("Metadata uploaded to Pinata:", response);
    return `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading metadata to Pinata:", error);
    throw new Error("Error uploading metadata to Pinata");
  }
};
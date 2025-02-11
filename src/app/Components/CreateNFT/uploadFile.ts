// utils/uploadFile.ts
import pinata from "./IPFSclient";

export const uploadFileToPinata = async (file: File) => {
  try {
    const response = await pinata.upload.file(file);
    console.log("File uploaded to Pinata:", response);
    return `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading file to Pinata:", error);
    throw new Error("Error uploading file to Pinata");
  }
};
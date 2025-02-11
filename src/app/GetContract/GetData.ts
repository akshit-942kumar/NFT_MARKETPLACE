import { ethers } from "ethers";
import abi from "./abi.json"
let contract: ethers.Contract | null = null;

const address:string=process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
 const getContract = async (): Promise<ethers.Contract> => {
  // const dispatch =useDispatch()
  // const dispatch =useDispatch()
  if (!contract) {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected. Please install MetaMask.");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    contract = new ethers.Contract(address, abi.abi, signer);
    

    console.log("✅ Contract Initialized:", contract);
  }
  // dispatch(setContractAddress(address))

  return contract;
};

export default getContract;
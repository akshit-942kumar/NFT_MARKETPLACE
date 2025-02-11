// redux/smartContractSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { MarketItem } from '../Components/ExploreNFT/page';

interface SmartContractState {
  contractAddress:string|null
  accountAddress: string| null;
  contractData: ethers.BrowserProvider | null;  
  NftId:string|null;
  nftData:MarketItem[]|null;
  loading: boolean;
  error: string | null;
}

export interface NFTMetaData{
  name:string;
  description:string;
  image:string;
  time:string;
}

const initialState: SmartContractState = {
  contractAddress:null,
  accountAddress: null,
  contractData: null,
  NftId:null,
  nftData:null,
  loading: false,
  error: null,
};

const smartContractSlice = createSlice({
  name: 'smartContract',
  initialState,
  reducers: {
    setContractAddress: (state,action:PayloadAction<string>)=>{
      state.contractAddress=action.payload;
  },
    setAccountAddress: (state,action:PayloadAction<string>)=>{
        state.accountAddress=action.payload;
    },
    setContractData: (state, action: PayloadAction<ethers.BrowserProvider>) => { // Replace `any` with the correct data type
      state.contractData = action.payload;
    },
    setNftId:(state, action: PayloadAction<string>) => {
      state.NftId = action.payload;

    },
    setNftData:(state, action: PayloadAction<MarketItem[]>) => {
      state.nftData = action.payload;

    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;

    },
    
  },
});

export const { setContractAddress,setAccountAddress,setContractData, setNftId,setNftData, setLoading,setError, } = smartContractSlice.actions;
export default smartContractSlice.reducer;

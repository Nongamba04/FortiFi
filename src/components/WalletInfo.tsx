import { ethers, BrowserProvider } from 'ethers'
import {useState,useEffect} from 'react'

interface Props {
  walletAddr : string
}

export const WalletInfo = ({walletAddr} : Props) => {
  const [balance,setBalance] = useState<string>('0');
  const [isLoading,setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getBalance = async() =>{

      if(window.ethereum){
        setLoading(true);

        try{
        const provider = new BrowserProvider(window.ethereum)
        const balance = await provider.getBalance(walletAddr)
        setBalance(ethers.formatEther(balance))
        } catch(error){
          console.error('Error fetching balance:', error)
        }
        finally{
          setLoading(false);
        }
      }
    }

    if(walletAddr) getBalance();
  },[walletAddr])
  return (
    <>
   <div className="text-center mt-4">
      {/* <h3 className="text-lg">Address: {walletAddr}</h3> */}
      <p className="text-md">
        {isLoading ? 'Loading balance...' : `Balance: ${balance} ETH`}
      </p>
    </div>
    </>
  )
}

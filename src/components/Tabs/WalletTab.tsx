import { FC, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../connectors";
const image = require('../../images/metamask.png');

const WalletTab: FC = () => {
    const {
        library,
        chainId,
        account,
        activate,
        deactivate,
        active
    } = useWeb3React();

    const setProvider = (type:any) => {
        window.localStorage.setItem("provider", type);
    };

    const [signature, setSignature] = useState("");
    const [error, setError] = useState("");
    const [network, setNetwork] = useState<any>(null);
    const [message, setMessage] = useState("");
    const [signedMessage, setSignedMessage] = useState("");
    const [verified, setVerified] = useState();
    const [balance,setBalance]= useState({ inWei: 0, formatted: 0 })

    const refreshState = () => {
        window.localStorage.setItem("provider", '');
        setNetwork("");
        setMessage("");
        setSignature("");
        setVerified(undefined);
      };
    
      const disconnect = () => {
        refreshState();
        deactivate();
      };

      useEffect(() => {
        library?.getBalance(account).then((result:any) => {
            // setBalance(result/1e18)
            const divisor = parseFloat(Math.pow(10, 18).toString())
            const balance = parseFloat(result) /divisor;
            setBalance({
                inWei: result,
                formatted: parseFloat(balance.toFixed(4))
            })

            console.log(result)
        })

        // const provider = window.localStorage.getItem("provider");
        // if (provider) activate(connectors[provider]);
        
      }, [account, library]);
    

    return (
        <div className="flex flex-col items-center mt-20">
            <img className="w-1/5" src={image} alt="Metamask" />
            <h1 className='text-4xl dark:text-white uppercase'>METAMASK</h1>

            {!active ? (
                <button 
                    onClick={() => {
                        activate(connectors.injected);
                        setProvider("injected");
                    }}
                    className="mt-4 bg-primary text-white rounded-lg py-2 px-4"
                >
                    Connect wallet
                </button>
            ) : (
                <button onClick={disconnect} className="mt-4 bg-primary text-white rounded-lg py-2 px-4">
                    Disconnect
                </button>
            )}

            <h1>{account}</h1>
            <h1>{account && balance.formatted}</h1>
        </div>
    )
}

export default WalletTab;
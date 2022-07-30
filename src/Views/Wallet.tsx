import { FC, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../utils/connectors";
import { useGetTrendingCoins } from "../services/api";
import Alert from '@mui/material/Alert';
import { getEllipsisTxt, numberWithCommas, wait } from "../utils/functions";
import { getExplorer, getNativeByChain } from "../utils/networks";
import { WalletLoad } from "../components/WalletLoad";
import { Coin } from "../types";
const image = require('../assets/metamask.png');
const logo = require('../assets/logo.png');

const WalletTab: FC = () => {
    const {
        library,
        chainId,
        account,
        activate,
        deactivate,
    } = useWeb3React();

    const setProvider = (type:any) => {
        window.localStorage.setItem("provider", type);
    };

    const currency = 'USD';
    const [load, setLoad] = useState(true)
    const { trendingCoins } = useGetTrendingCoins(currency)
    const [message, setMessage] = useState<any>(null);
    const [balance,setBalance]= useState({ inWei: 0, formatted: 0 })

    const refreshState = () => {
        window.localStorage.setItem("provider", '');
        setMessage(null);
    };

    const disconnect = () => {
        refreshState();
        deactivate();
    };

    const checkNetwork = (val:number) => {
        return [1, 3, 4, 5, 42, 80001, 39797].includes(val);
    }

    useEffect(() => {
        library?.getBalance(account).then((result:any) => {
            const divisor = parseFloat(Math.pow(10, 18).toString())
            const balance = parseFloat(result) /divisor;
            setBalance({
                inWei: result,
                formatted: parseFloat(balance.toFixed(4))
            })
        })

        const provider = window.localStorage.getItem("provider");

        if (provider) activate(connectors[provider]);

        if (chainId && !checkNetwork(chainId)) {
            setMessage({type: 'error', text: `Network not supported, Network id: ${chainId}`})
        } else {
            setMessage(null)
        }

        wait(5000).then(() => {
            setLoad(false)
        })
    
    }, [account, library, chainId, activate]);

    const copyToClipboard = (address: string) => {
        navigator.clipboard.writeText(address)
        setMessage({type: 'success', text:'Address copied to clipboard'})
    }
    

    return (
        <>
        {message && (
            <div className="flex justify-center mt-6">
                <div className="w-full md:w-2/3">
                <Alert severity={message.type} onClose={() => setMessage(null)}>{message.text}</Alert>
                    {/* <Alert
                        message={message.text}
                        type={message.type}
                        showIcon
                        action={
                          <Button onClick={() => setMessage(null)} size="small" type="text">
                            <i className="fas fa-times"></i>
                          </Button>
                        }
                    /> */}
                </div> 
          </div>
        )}
        {load ? (
            <WalletLoad />
        ) : !account ? (
            <div className="flex flex-col items-center mt-20">
                <img className="w-1/5" src={image} alt="Metamask" />
                <h1 className='text-4xl dark:text-white uppercase'>METAMASK</h1>

                <button 
                    onClick={() => {
                        activate(connectors.injected);
                        setProvider("injected");
                    }}
                    className="mt-4 bg-primary text-white rounded-lg py-2 px-4"
                >
                    Connect wallet
                </button>
            </div>  
        ) : (
            <div className="flex justify-center">
                <div className="w-full md:w-2/3 flex my-10 px-4 md:px-10 py-6 flex-col justify-center bg-[#f8fbff] dark:bg-[#1A2024] rounded">
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700">
                        <div className="flex">
                            <img className="w-4 h-4 mt-1 mr-2" src={logo} alt="logo" />
                            <h3 className="dark:text-white font-bold">Energi Network</h3>
                        </div>
                        <p className="text-primary"><i className="text-xs fas fa-circle mr-2"></i>Connected</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex mt-2 md:mt-0">
                            <img className="w-4 h-4 mt-1 mr-2" src={image} alt="Metamask" />
                            <h3 className="dark:text-gray-300">{getEllipsisTxt(account, 5)}</h3>
                        </div>
    
                        <div className="flex text-lg">
                            <button onClick={() => copyToClipboard(account)} className="text-gray-600 dark:text-white mr-4"><i className="fas fa-clone"></i></button>
                            <a href={`${getExplorer(chainId)}/address/${account}`} target='_blanc' className="text-gray-600 dark:text-white mr-4 md:mr-6"><i className="fas fa-arrow-up-right-from-square"></i></a>
                            <button onClick={disconnect} className="text-xs bg-gray-600 dark:bg-gray-300 text-white dark:text-gray-600 rounded-lg px-2">
                                Disconnect
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-6">
                        <p className="text-gray-400">Total Balance</p>
                        <h1 className="text-lg font-bold dark:text-white">{account && balance.formatted} {getNativeByChain(chainId)} <i className="fas fa-eye"></i></h1>
                        <div className="flex">
                            <button className="mt-4 bg-primary text-white rounded-lg py-1 px-4 mr-2">
                                Buy
                            </button>
                            <button className="mt-4 bg-primary text-white rounded-lg py-1 px-4">
                                Sell
                            </button>
                        </div>
                    </div>
                    
                    <div className="mt-10">
                        {trendingCoins?.slice(0, 3).map((coin: Coin) => (
                            <div key={coin.id} className="flex justify-between mb-4">
                                <div className="flex items-center">
                                    <div>
                                        <img className="mr-4" src={coin.image} width={35} alt={coin.name} />
                                    </div>
                                    <div className="leading-6">
                                        <h3 className="dark:text-white font-bold uppercase">{coin.symbol}</h3>
                                        <p className="text-gray-400">{coin.name}</p>
                                    </div>
                                </div>
                                
                                <div className="leading-6 flex flex-col justify-end">
                                    <h3 className="dark:text-white text-right font-bold">{numberWithCommas(coin.atl)}</h3>
                                    <p className="text-gray-400 text-right">${numberWithCommas(coin.current_price)}</p>
                                </div>
                            </div> 
                        ))}
                        
                    </div>
                </div>
            </div>
            
        )}
            
        </>
    )
}

export default WalletTab;
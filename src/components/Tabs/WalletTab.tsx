import { FC } from "react";
const image = require('../../images/metamask.png');

const WalletTab: FC = () => {
    return (
        <div className="flex flex-col items-center mt-20">
            <img className="w-1/5" src={image} alt="Metamask" />
            <h1 className='text-4xl dark:text-white uppercase'>METAMASK</h1>
            
            <button className="mt-4 bg-primary text-white rounded-lg py-2 px-4">
                Connect wallet
            </button>
        </div>
    )
}

export default WalletTab;
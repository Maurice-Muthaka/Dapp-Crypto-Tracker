import { FC } from "react";
import HomeTab from "./HomeTab";
import WalletTab from "./WalletTab";

interface tabProps {
    tab: string;
}

const Tabs: FC<tabProps> = ({ tab }) => {
    return (
        <div className="container mx-auto px-4">
            {tab === '1' ? (
                <HomeTab />
            ) : (
                <WalletTab />
            )}
        </div>
    )
}

export default Tabs;
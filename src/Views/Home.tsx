import { FC, useContext } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext } from "../contexts/themeContext";
import { useGetTrendingCoins } from "../services/api";
import CoinsTable from "../components/CoinsTable";
import { MarketLoad } from "../components/MarketLoad";

const HomeTab: FC = () => {
    const { theme } = useContext(ThemeContext)
    const currency = 'USD'
    const { trendingCoins, isLoading } = useGetTrendingCoins(currency)

    const darkTheme = createTheme({
        palette: {
          mode: theme,
        },
    });

    return (
        <div className="py-16">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {isLoading ? (
                    <MarketLoad />
                ) : trendingCoins && (
                    <CoinsTable trendingCoins={trendingCoins} />
                )}
            </ThemeProvider>
            
        </div>
    )
}

export default HomeTab;
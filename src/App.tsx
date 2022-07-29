import { ThemeProvider } from './contexts/themeContext';
import './styles/global.css';
import 'antd/dist/antd.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { QueryClientProvider, QueryClient } from "react-query";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import Main from './components/Main';

const queryClient = new QueryClient();

const getLibrary = (provider:any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

function App() {
  return (
    <ThemeProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </Web3ReactProvider>
    </ThemeProvider>
  );
}

export default App;

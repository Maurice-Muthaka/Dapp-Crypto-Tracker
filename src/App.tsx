import { ThemeProvider } from './contexts/themeContext';
import './styles/global.css';
import 'antd/dist/antd.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { QueryClientProvider, QueryClient } from "react-query";
import Main from './components/Main';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

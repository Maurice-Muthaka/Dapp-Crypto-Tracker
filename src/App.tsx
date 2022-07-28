import { ThemeProvider } from './contexts/themeContext';
import './styles/global.css';
import 'antd/dist/antd.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Main from './components/Main';

function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

export default App;

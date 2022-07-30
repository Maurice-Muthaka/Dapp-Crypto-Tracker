import { FC, FormEvent, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeContext } from '../../contexts/themeContext';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Android12Switch = styled(Switch)(() => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

const Navbar: FC = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    const logo = require('../../assets/logo.png');

    const toggleTheme = (e: FormEvent) => {
        e.preventDefault();
        console.log(e)
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="border-b border-gray-200 dark:border-gray-900">
            <div className="container mx-auto px-4 flex justify-end">
               <div className="w-full flex justify-between items-center">
                    <Link to='/'>
                        <img className="w-8 h-8 mt-1 mr-2" src={logo} alt="logo" />
                    </Link>
                
                    <ul className='list-none flex mt-6'>
                        <li className='mr-6 md:mr-4'>
                            <NavLink
                              to="/"
                              className={({ isActive }) => isActive ? 'flex items-center dark:text-white px-4 pb-4 border-b-4 border-green-600 font-bold text-gray-800' : 'flex items-center pb-2 font-bold text-gray-500'}
                            >
                                <i className='fas fa-home md:mr-4'></i>
                                <span className="hidden md:block">Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/wallet" 
                                className={({ isActive }) => isActive ? 'flex items-center dark:text-white px-4 pb-4 border-b-4 border-green-600 font-bold text-gray-800' : 'flex items-center pb-2 font-bold text-gray-500'}
                            >
                                <i className='fas fa-suitcase md:mr-4'></i>
                                <span className="hidden md:block">Wallet</span>
                            </NavLink>
                        </li>
                    </ul>

                    <div>
                        <FormGroup>
                            <FormControlLabel
                                control={<Android12Switch checked={theme === 'dark'} />}
                                label={theme === 'dark' ? <i className="fa fa-moon"/> : <i className="fa fa-sun"/>}
                                value={theme}
                                onClick={(e) => toggleTheme(e)}
                            />
                        </FormGroup>
                    </div>
                </div> 
            </div>
            
        </div>
    )
}

export default Navbar;
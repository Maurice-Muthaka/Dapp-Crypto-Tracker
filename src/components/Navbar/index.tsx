import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Switch, Tabs } from 'antd';
import React, { FC, FormEvent, useContext } from 'react';
import { ThemeContext } from '../../contexts/themeContext';

const { TabPane } = Tabs;

interface tabProps {
    tab: string;
    setTab: (val: string) => void;
}

const Navbar: FC<tabProps> = ({ tab, setTab }) => {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = (e: boolean) => {
        setTheme(e ? 'dark' : 'light')
    }

    return (
        <div className="border-b border-gray-200 dark:border-gray-900">
            <div className="container mx-auto px-4 flex justify-end">
               <div className="w-full flex justify-between items-center">
                <div>Test</div>
                <Tabs onChange={(index:string) => setTab(index)} defaultActiveKey={tab}>
                    <TabPane
                    tab={
                        <span className='dark:text-white font-semibold'>
                        <i className='fas fa-home mr-4'></i>
                        Home
                        </span>
                    }
                    key="1"
                    >
                    </TabPane>
                        <TabPane
                        tab={
                            <span className='dark:text-white font-semibold'>
                            <i className='fas fa-suitcase mr-4'></i>
                            Wallet
                            </span>
                        }
                        key="2"
                        >
                        </TabPane>
                    </Tabs>

                    <div>
                        <Switch
                            defaultChecked={theme === 'dark'}
                            checkedChildren={<i className="fa fa-sun"/>}
                            unCheckedChildren={<i className="fa fa-moon"/>}
                            onChange={(e) => toggleTheme(e)}
                        />
                    </div>
                </div> 
            </div>
            
        </div>
    )
}

export default Navbar;
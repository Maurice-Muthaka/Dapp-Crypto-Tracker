import { Table } from "antd";
import Column from "antd/lib/table/Column";
import { FC, useState } from "react";
import { useGetTrendingCoins } from "../../services/api";
import HistoryChart from "../Chart";

const HomeTab: FC = () => {
    const [currency, setCurrency] = useState('USD')
    const { trendingCoins, isLoading } = useGetTrendingCoins(currency)

    // console.log(trendingCoins)
    return (
        <div className="mt-20">
            { isLoading ? (
                <div>
                    Loading...
                </div>
            ) : trendingCoins && (
                <Table dataSource={trendingCoins}>
                    <Column
                        title='Coin'
                        dataIndex='name'
                        key='name'
                        sorter={(a:any, b:any) => a.name - b.name}
                        render={(text, record) => (
                            <div className="flex items-center">
                                <img className="mr-4" src={record.image} width={35} alt={record.name} />
                                <p>{record.name}</p>
                            </div>
                        )}
                    />
                    <Column
                        title='' dataIndex='symbol'
                        key='symbol'
                        render={(text, record:any) => (
                            <p className="uppercase">{record.symbol}</p>
                        )}
                    />
                    <Column
                        title='Price'
                        dataIndex='current_price'
                        key='current_price'
                        sorter={(a:any, b:any) => a.current_price - b.current_price}
                        render={(text, record:any) => (
                            <p className="uppercase">${record.current_price}</p>
                        )}
                    />
                    <Column 
                        title='24h Volume'
                        dataIndex='low_24h'
                        key='low_24h'
                        sorter={(a:any, b:any) => a.low_24h - b.low_24h}
                        render={(text, record:any) => (
                            <p className="uppercase">${record.low_24h}</p>
                        )}
                    />
                    <Column
                        title='Market Cap'
                        dataIndex='market_cap'
                        key='market_cap'
                        sorter={(a:any, b:any) => a.market_cap - b.market_cap}
                        render={(text, record:any) => (
                            <p className="uppercase">${record.market_cap}</p>
                        )}
                    />
                    <Column 
                        title='Last 7 days'
                        dataIndex='max_supply'
                        key='max_supply'
                        render={(text, record: any) => (
                            <HistoryChart currency={currency} id={record.id} />
                            // <div></div>
                        )}
                    />
                </Table>
            )}
            
        </div>
    )
}

export default HomeTab;
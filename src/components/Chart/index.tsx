import { FC, useEffect, useRef, useState } from "react";
import { Line } from 'react-chartjs-2';
import { useGetHistoricalChart } from "../../services/api";

interface chartProps {
    id: string;
    currency: string;
}

const HistoryChart: FC<chartProps> = ({ id, currency }) => {
    const [days, setDays] = useState(1);
    
    const { chartHistory, isLoading } = useGetHistoricalChart(id, days, currency);

    console.log('chartHistory', chartHistory)

    return (
        <div className="flex justify-center items-center">
            {isLoading ? (
                <h6>Loading...</h6>
            ) : (
                <div>
                    {/* <Line
                        data={{
                            datasets: [
                            {
                                label: "First dataset",
                                data: [33, 53, 85, 41, 44, 65],
                                fill: true,
                                backgroundColor: "rgba(75,192,192,0.2)",
                                borderColor: "rgba(75,192,192,1)"
                            }
                            ]
                        }}
                        redraw={true}
                    /> */}
                    Chart
                </div>
            )}
        </div>
    )
}

export default HistoryChart;
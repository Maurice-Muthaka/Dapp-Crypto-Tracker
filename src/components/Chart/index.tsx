import { FC } from "react";
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useGetHistoricalChart } from "../../services/api";

interface chartProps {
    type: string;
    currency: string;
    days: number;
    id: string | undefined | number;
}

const Chart: FC<chartProps> = ({ type, currency, days, id }) => {
    const coinId: any = id?.toString();

    const { chartHistory } = useGetHistoricalChart(coinId, days, currency);

    const data = chartHistory?.map((price : string []) => ({ pv: price[1] }))
    
  return (
    <div>
        <ResponsiveContainer aspect={type === 'full' ? 60 / 30 : 60 / 12 }>
            <AreaChart data={data}>
 
            <Area
                strokeWidth={10}
                type="monotone"
                dataKey="pv" 
                yAxisId={1}
                fill='#131619'
                opacity={'0.4'}
                stroke="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
    </div>
  );
}

export default Chart;
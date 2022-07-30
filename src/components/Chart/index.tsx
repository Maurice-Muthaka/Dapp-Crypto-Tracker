import { FC } from "react";
import { ResponsiveContainer, AreaChart, CartesianGrid, Area } from 'recharts';
import { useGetHistoricalChart } from "../../services/api";

interface chartProps {
    type: string;
    currency: string;
    days: number;
    id: string | undefined | number;
    width: number | undefined;
    height: number | undefined;
}

const Chart: FC<chartProps> = ({ type, currency, days, id, width, height }) => {
    const coinId: any = id?.toString();

    const { chartHistory } = useGetHistoricalChart(coinId, days, currency);

    const data = chartHistory?.map((price : string []) => ({ pv: price[1] }))
    
  return (
    <div>
        <ResponsiveContainer width={type === 'full' ? '100%' : width} height={type === 'full' ? '100%' : height} aspect={type === 'full' ? 60 / 30 : 60 / 12 }>
            <AreaChart data={data}>
            {type === 'full' && (<CartesianGrid stroke="#eee" />)}
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
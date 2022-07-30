import { useParams } from "react-router-dom";
import Chart from "../components/Chart";

export default function ChartPage() {
    const currency = 'USD';
    const days = 325;

    const { id } = useParams();
    
  return (
    <div className="mt-20">
        <Chart type='full' currency={currency} days={days} id={id} width={800} height={800} />
    </div>
  );
}

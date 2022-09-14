import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width='70%' height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='Total' fill='#484c7f' barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;

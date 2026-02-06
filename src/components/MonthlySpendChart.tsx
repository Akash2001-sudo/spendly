import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Expense from '../types/Expense';

interface MonthlySpendChartProps {
  expenses: Expense[];
}

const MonthlySpendChart: React.FC<MonthlySpendChartProps> = ({ expenses }) => {
  // Aggregate data month-wise
  const aggregateMonthlyData = (exp: Expense[]) => {
    const monthlyData: { [key: string]: number } = {};

    exp.forEach(expense => {
      const date = new Date(expense.date);
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      monthlyData[monthYear] = (monthlyData[monthYear] || 0) + expense.amount;
    });

    // Convert to array of objects for Recharts
    // Sort chronologically
    const sortedData = Object.keys(monthlyData)
      .map(key => ({ month: key, total: monthlyData[key] }))
      .sort((a, b) => {
        const [monthA, yearA] = a.month.split(' ');
        const [monthB, yearB] = b.month.split(' ');

        const dateA = new Date(`1 ${monthA} ${yearA}`);
        const dateB = new Date(`1 ${monthB} ${yearB}`);
        return dateA.getTime() - dateB.getTime();
      });

    return sortedData;
  };

  const chartData = aggregateMonthlyData(expenses);

  if (chartData.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <p>No expense data available to display chart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5>Monthly Spends</h5>
      </div>
      <div className="card-body" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(48, 43, 99, 0.9)', border: 'none', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#23d5ab' }}
            />
            <Bar dataKey="total" fill="#23d5ab" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlySpendChart;

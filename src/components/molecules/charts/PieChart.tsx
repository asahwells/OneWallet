'use client';
import dynamic from 'next/dynamic';
// import Chart from 'react-apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const PieChart = (props: any) => {
  const { chartData, chartOptions } = props;

  return (
      // @ts-ignore
    <Chart
      options={chartOptions}
      type="donut"
      width="100%"
      height="100%"
      series={chartData}
      loading={true}
    />
  );
};

export default PieChart;

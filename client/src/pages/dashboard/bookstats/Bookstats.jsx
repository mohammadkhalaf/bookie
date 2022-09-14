import React from 'react';
import { useEffect } from 'react';
import { useAppContext } from '../../../context/context';
import clasess from './stats.module.css';
import Chart from '../../../components/ChartContainer/Chart';

const Bookstats = () => {
  const { totalBooks, showStats, isLoading, monthlyStats } = useAppContext();

  useEffect(() => {
    showStats();
    // // eslint-disable-next-line
  }, []);

  if (isLoading) {
    <h3>Is loading</h3>;
  }

  return (
    <>
      <div>
        <h1 className={clasess.info}>
          You have read {totalBooks} books so far
        </h1>

        {monthlyStats.length > 0 && <Chart data={monthlyStats} />}
      </div>
    </>
  );
};

export default Bookstats;

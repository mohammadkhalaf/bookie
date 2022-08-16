import React from 'react';
import { useEffect } from 'react';
import { useAppContext } from '../../../context/context';
import moment from 'moment';
import Chart from '../../../components/ChartContainer/Chart';
import StatsContainer from '../../../components/statscontainer/StatsContainer';

const Bookstats = () => {
  const { books, showStats, isLoading, monthlyStats } = useAppContext();
  console.log(monthlyStats);
  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);
  console.log(monthlyStats);

  if (isLoading) {
    <h3>Is loading</h3>;
  }

  return (
    <>
      <div>
        <StatsContainer />
        {monthlyStats.length > 0 && <Chart data={monthlyStats} />}
      </div>
    </>
  );
};

export default Bookstats;

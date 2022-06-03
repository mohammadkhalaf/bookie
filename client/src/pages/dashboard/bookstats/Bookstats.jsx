import React from 'react';
import { useEffect } from 'react';
import { useAppContext } from '../../../context/context';
import moment from 'moment';

const Bookstats = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const { books, getAllBooks } = useAppContext();
  useEffect(() => {
    getAllBooks();
    // eslint-disable-next-line
  }, []);
  const completedBooks = books.filter(
    (b) => b.isReading === true && b.hasRead === b.pages
  );

  const completedBook = books.filter((b) => b.isReading === true);
  let n = [];

  completedBook.forEach((i) => {
    if (
      moment(i.createdAt).format('MMMM') === monthNames[new Date().getMonth()]
    ) {
      n.push(i.hasRead);
    }
  });
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    sum += n[i];
  }

  let yArray = [];
  const completedAtYear = books.filter((b) => b.isReading === true);
  let y = completedAtYear.forEach((i) => {
    const y = moment(i.createdAt).format('YYYY');
    const year = new Date().getFullYear();
    if (y == year) {
      yArray.push(i.hasRead);
    }

    // if (moment(i.createdAt).format('YY') === new Date().getFullYear()) {
    //   console.log('year');
    // }
  });

  let summ = 0;

  for (let i = 0; i < yArray.length; i++) {
    summ += yArray[i];
  }
  const monthlyAverage = (sum / 30).toFixed();
  const yearlyAverage = (summ / 30).toFixed();

  return (
    <>
      <div>
        {completedBooks && (
          <h1>
            You have completed {completedBooks.length}
            {completedBooks.length > 1 ? 'books' : 'book'}
          </h1>
        )}
      </div>
      <div>
        <h1>
          you have completed {sum} this month on average {monthlyAverage} pages
          a day
        </h1>
        <h1>
          you have completed {summ} this month on average {yearlyAverage} pages
          a day
        </h1>
      </div>
    </>
  );
};

export default Bookstats;

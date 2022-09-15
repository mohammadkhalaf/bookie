import moment from 'moment';
import classes from './Book.module.css';

import { useAppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

const Book = ({ title, createdAt, _id, isReading, author, pages, hasRead }) => {
  // const [read, setRead] = useState(false);
  const { startReading, deleteBook } = useAppContext();
  const date = moment(createdAt).format('MMM Do YY');
  const navigate = useNavigate();
  const readBookHandler = () => {
    startReading(_id);
    navigate('/dashboard/iamreading');
  };

  return (
    <>
      <div className={classes.book}>
        <h2>Title: {title}</h2>
        <p>Author: {author}</p>
        <p>{date}</p>

        <p>{hasRead === pages && <span>You have finished this book</span>} </p>

        <div className={classes.btncontainer}>
          <button onClick={() => deleteBook(_id)}>Delete</button>
          {hasRead !== pages && (
            <button disabled={isReading} onClick={() => readBookHandler()}>
              {isReading ? 'You`re currently reading ' : 'Start reading'}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Book;

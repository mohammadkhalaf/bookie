import classes from './Loader.module.css';

const Loading = () => {
  return (
    <>
      <div className={classes.container}>
        <span className={classes.loader}></span>
      </div>
    </>
  );
};

export default Loading;

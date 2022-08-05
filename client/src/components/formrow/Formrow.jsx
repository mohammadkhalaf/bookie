import classes from './formrow.module.css';

const FormRow = ({ type, name, value, changeHandler, labelText }) => {
  return (
    <div className={classes.formrow}>
      <label htmlFor={name}>{labelText || name}:</label>
      <input type={type} value={value} name={name} onChange={changeHandler} />
    </div>
  );
};

export default FormRow;

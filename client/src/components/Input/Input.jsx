const Input = ({ type, name, changeHandler, labelText, value, style }) => {
  return (
    <>
      <label htmlFor={name}>{labelText}</label>
      <input
        type={type}
        value={value}
        onChange={changeHandler}
        name={name}
        className={style}
      />
    </>
  );
};

export default Input;

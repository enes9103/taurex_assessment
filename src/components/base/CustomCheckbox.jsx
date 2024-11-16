const CustomCheckbox = ({ id, checked, onChange, label }) => {
  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox checked:bg-green-500 h-4 w-4"
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

export default CustomCheckbox;

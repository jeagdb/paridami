import React, { useCallback } from 'react';

const Input = ({
  value = '',
  type = 'text',
  rounded = true,
  className = '',
  onChange = () => {},
  ...props
  }) => {
    const handleOnchange = useCallback((e) => onChange(e.target.value), [
      onChange,
  ]);

  return (
    <input
      value={value}
      {...props}
      className={`np-form-element np-text-accent`}
      type={type}
      onChange={handleOnchange}
    ></input>
  );
};

export default Input;
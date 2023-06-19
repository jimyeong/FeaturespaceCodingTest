import React, { useEffect, useState } from "react";

export default function useInputText(initialState) {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onReset = () => {
    setValues(initialState);
  };

  return { values, onChange, onReset };
}

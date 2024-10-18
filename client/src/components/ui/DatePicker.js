import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DatePicker = ({ date, setDate, placeholder }) => {
  const [value, setValue] = useState({
    startDate: date,
    endDate: date,
  });

  const onChangeDate = (newValue) => {
    setValue(newValue);
    setDate(newValue.startDate);
  };

  return (
    <Datepicker
      value={value}
      onChange={onChangeDate}
      asSingle={true}
      useRange={false}
      placeholder={placeholder}
      popoverDirection="up"
      displayFormat="DD/MM/YYYY"
    />
  );
};

export default DatePicker;

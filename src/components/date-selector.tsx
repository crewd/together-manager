import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { useState } from 'react';

function DateSelector() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="w-[180px]">
      <DatePicker
        className="w-[180px] cursor-pointer text-xl font-bold focus:bg-white focus:outline-none"
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        selected={startDate}
        startDate={startDate}
        onChange={(date) => setStartDate(date)}
        popperPlacement="bottom"
      />
    </div>
  );
}

export default DateSelector;

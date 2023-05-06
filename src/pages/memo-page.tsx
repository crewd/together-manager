import { useState } from 'react';
import DateSelector from '../components/date-selector';

function MemoPage() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [memo, setMemo] = useState<String | null>('');

  const today = new Date();

  const memoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  };

  const createMemo = () => {
    if (startDate?.toDateString() !== today.toDateString()) {
      return alert('인수인계는 오늘 당일에만 입력 가능 합니다');
    }
    if (!memo) {
      return alert('인수인계 내용을 입력해 주세요');
    }
    console.log(memo);
  };

  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-2xl font-bold">인수인계</h2>
      </div>
      <div className="w-full rounded-md border bg-white p-4 shadow">
        <DateSelector startDate={startDate} setStartDate={setStartDate} />
        <div className="flex max-w-[600px]  pt-6">
          <input
            type="text"
            placeholder="인수인계는 당일에만 입력 가능합니다"
            className="h-10 w-full rounded-md rounded-r-none border border-gray-300 px-3 outline-none"
            onChange={memoHandler}
            disabled={
              startDate?.toDateString() === today.toDateString() ? false : true
            }
          />
          <button
            className="h-10 w-[65px] rounded-md rounded-l-none bg-blue-500 text-white"
            onClick={createMemo}
            disabled={
              startDate?.toDateString() === today.toDateString() ? false : true
            }
          >
            작성
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemoPage;

import { useState } from 'react';
import DateSelector from '../components/date-selector';
import { Memo } from '../types/memo.type';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { addMemo } from '../store/modules/memo-reducer';
import MemoCard from '../components/memo-card';
import { useParams } from 'react-router-dom';

function MemoPage() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [content, setContent] = useState<string>('');

  const { storeId } = useParams();

  const today = new Date();

  const memos: Memo[] = useSelector(
    (state: RootState) => state.memoReducer.memos,
  ).filter((memo) => memo.storeId === storeId);

  const dispatch = useAppDispatch();

  const memoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const createMemo = () => {
    if (startDate?.toDateString() !== today.toDateString()) {
      return alert('인수인계는 오늘 당일에만 입력 가능 합니다');
    }
    if (!content) {
      return alert('인수인계 내용을 입력해 주세요');
    }
    dispatch(addMemo({ content, date: startDate, storeId: storeId! }));
    setContent('');
  };

  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-2xl font-bold">📝 인수인계</h2>
      </div>
      <div className="w-full p-4 bg-white border rounded-md shadow">
        <DateSelector startDate={startDate} setStartDate={setStartDate} />
        <div className="flex max-w-[768px] pt-6">
          <input
            type="text"
            placeholder="인수인계는 당일에만 입력 가능합니다"
            className="h-10 w-[calc(100%-60px)] rounded-md rounded-r-none border border-gray-300 px-3 outline-none"
            onChange={memoHandler}
            value={content}
            disabled={
              startDate?.toDateString() === today.toDateString() ? false : true
            }
          />
          <button
            className="h-10 w-[60px] rounded-md rounded-l-none bg-blue-500 text-white"
            onClick={createMemo}
            disabled={
              startDate?.toDateString() === today.toDateString() ? false : true
            }
          >
            작성
          </button>
        </div>
        <div className="w-full pt-6">
          {memos.length > 0 &&
            memos.map((memo) => (
              <MemoCard
                key={memo.memoId}
                memoId={memo.memoId}
                memoContent={memo.content}
                checked={memo.checked}
                author={memo.author}
                compliter={memo.completer}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default MemoPage;

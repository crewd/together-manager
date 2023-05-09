import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function MemoCard(memo: {
  memoId: string;
  memoContent: string;
  author: string;
  checked: boolean;
  compliter?: string;
}) {
  const [isChecked, setIsChecked] = useState<boolean>(memo.checked);
  return (
    <div
      className="max-w-[768px] cursor-pointer pt-6 first:pt-0"
      onClick={() => setIsChecked(!isChecked)}
    >
      <div className="w-full p-2 border border-gray-300">
        <div className="flex items-center gap-4">
          {isChecked ? (
            <FontAwesomeIcon
              icon={faCheck}
              className="w-6 h-6 text-green-500"
            />
          ) : (
            <FontAwesomeIcon
              icon={faSquare}
              className="w-6 h-6 text-gray-500"
            />
          )}
          <p className={`${isChecked && 'text-gray-400 line-through'} text-lg`}>
            {memo.memoContent}
          </p>
        </div>
        <div className="flex justify-between gap-4 pt-4 text-sm">
          <p className="text-gray-500">작성자: {memo.author}</p>
          {memo.compliter && (
            <p className="font-semibold text-blue-500">
              완료: {memo.compliter}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemoCard;

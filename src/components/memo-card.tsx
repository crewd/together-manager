import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { updateMemo } from '../store/modules/memo-reducer';

function MemoCard(memo: {
  memoId: string;
  memoContent: string;
  author: string;
  checked: boolean;
  compliter?: string;
}) {
  const dispatch = useAppDispatch();
  const onClickMemo = () => {
    dispatch(updateMemo({ id: memo.memoId, checked: memo.checked }));
  };

  console.log(memo.compliter);
  return (
    <div
      className="max-w-[768px] cursor-pointer pt-6 first:pt-0"
      onClick={onClickMemo}
    >
      <div className="w-full p-2 border border-gray-300">
        <div className="flex items-center gap-4">
          {memo.checked ? (
            <FontAwesomeIcon
              icon={faCheck}
              className="w-6 h-6 text-green-500"
            />
          ) : (
            <FontAwesomeIcon icon={faSquare} className="w-6 h-6 " />
          )}
          <p
            className={`${
              memo.checked && 'text-gray-400 line-through'
            } text-lg`}
          >
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

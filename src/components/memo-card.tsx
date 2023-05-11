import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from '../store/store';
import { deleteMemo, updateMemo } from '../store/modules/memo-reducer';

function MemoCard(memo: {
  memoId: string;
  memoContent: string;
  author: string;
  checked: boolean;
  compliter: string | undefined;
}) {
  const dispatch = useAppDispatch();
  const onClickMemo = () => {
    dispatch(updateMemo({ id: memo.memoId, checked: memo.checked }));
  };

  const onDeleteMemo = () => {
    if (window.confirm('인수인계를 삭제하시겠습니까?')) {
      dispatch(deleteMemo(memo.memoId));
    }
  };

  return (
    <div className="flex max-w-[768px] items-center border-b border-gray-300 pt-6 first:pt-0 last:border-0">
      <div className="w-full p-2 cursor-pointer " onClick={onClickMemo}>
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
      <FontAwesomeIcon
        icon={faTrash}
        className="w-5 h-5 ml-4 text-gray-500 cursor-pointer hover:text-red-500"
        onClick={onDeleteMemo}
      />
    </div>
  );
}

export default MemoCard;

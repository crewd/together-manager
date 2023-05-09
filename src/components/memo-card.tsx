function MemoCard(memo: {
  memoId: string;
  memoContent: string;
  author: string;
  compliter?: string;
}) {
  return (
    <label
      className="block max-w-[768px] cursor-pointer pt-6 first:pt-0"
      htmlFor={memo.memoId}
    >
      <div className="w-full p-2 border border-gray-300">
        <div className="flex items-center gap-4">
          <input type="checkbox" id={memo.memoId} className="w-4 h-4" />
          <p className="text-lg">{memo.memoContent}</p>
        </div>
        <div className="flex justify-between gap-4 pt-4 text-sm">
          <p>작성자: {memo.author}</p>
          {memo.compliter && (
            <p className="font-semibold text-blue-500">
              완료: {memo.compliter}
            </p>
          )}
        </div>
      </div>
    </label>
  );
}

export default MemoCard;

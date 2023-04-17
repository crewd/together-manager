function DetailNotice() {
  return (
    <div className="container mx-auto max-w-[1024px] bg-gray-50 pb-10">
      <div className="rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">제목</h2>
        <div className="mb-4 flex items-center text-gray-400">
          <p>2023/04/23</p>
        </div>
        <div className="mb-4 text-gray-600">
          <p>오늘 일찍 퇴근 하세요!</p>
        </div>
      </div>
      <div className="mt-4 flex w-full justify-center gap-4">
        <button className="rounded-md border bg-white px-6 py-2 shadow transition-colors duration-200 hover:bg-blue-500 hover:text-white">
          수정
        </button>
        <button className="rounded-md border bg-white px-6 py-2 shadow transition-colors duration-200 hover:bg-red-500 hover:text-white">
          삭제
        </button>
      </div>
    </div>
  );
}

export default DetailNotice;

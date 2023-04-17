const NoticeList = () => {
  const dummyNotice = [
    { id: 1, title: '공지사항 1', date: '2023-04-18' },
    { id: 2, title: '공지사항 2', date: '2023-04-18' },
    { id: 3, title: '공지사항 3', date: '2023-04-18' },
    { id: 4, title: '공지사항 4', date: '2023-04-18' },
  ];

  return (
    <div className="container mx-auto max-w-[1024px]">
      <h2 className="pb-6 text-2xl font-bold">공지사항</h2>
      <div className="rounded-md border bg-white shadow">
        {dummyNotice.map((notice) => (
          <div
            className="cursor-pointer transition-colors duration-200 hover:bg-gray-100"
            key={notice.id}
          >
            <div className="border-b p-4">
              <h3 className="text-xl font-semibold">{notice.title}</h3>
              <p className="mt-1 text-gray-500">{notice.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeList;

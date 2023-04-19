import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';

const NoticeList = () => {
  const { storeId } = useParams();
  const dummyNotice = [
    { id: 1, title: '공지사항 1', date: '2023-04-18' },
    { id: 2, title: '공지사항 2', date: '2023-04-18' },
    { id: 3, title: '공지사항 3', date: '2023-04-18' },
    { id: 4, title: '공지사항 4', date: '2023-04-18' },
  ];

  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-2xl font-bold">공지사항</h2>
        <Link
          to={`/store/${storeId}/notice/create`}
          className="rounded-md border bg-white px-4 py-2 shadow"
        >
          <FontAwesomeIcon className="mr-2" icon={faPenToSquare} />
          작성
        </Link>
      </div>
      <div className="rounded-md bg-white shadow-md">
        {dummyNotice.map((notice) => (
          <Link
            to={`/store/${storeId}/notice/1`}
            className="block cursor-pointer bg-white transition-colors duration-200 hover:bg-gray-100"
            key={notice.id}
          >
            <div className="border-b p-4">
              <h3 className="text-xl font-semibold">{notice.title}</h3>
              <p className="mt-1 text-gray-500">{notice.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NoticeList;

import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Notice } from '../types/notice.type';
import { RootState } from '../store/store';
import { useEffect } from 'react';
import { Store } from '../types/store.type';

const NoticeList = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const store: Store = useSelector(
    (state: RootState) => state.storeReducer.stores,
  ).filter((store) => store.storeId === storeId)[0];

  const notices: Notice[] = useSelector(
    (state: RootState) => state.noticeReducer.notices,
  ).filter((notice) => notice.storeId === storeId);

  useEffect(() => {
    if (!store) {
      return navigate('/');
    }
  }, []);

  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-2xl font-bold">공지사항</h2>
        <Link
          to={`/store/${storeId}/notice/create`}
          className="px-4 py-2 bg-white border rounded-md shadow"
        >
          <FontAwesomeIcon className="mr-2" icon={faPenToSquare} />
          작성
        </Link>
      </div>
      <div className="bg-white shadow-md">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <Link
              to={`/store/${storeId}/notice/${notice.noticeId}`}
              className="block transition-colors duration-200 bg-white cursor-pointer hover:bg-gray-100"
              key={notice.noticeId}
            >
              <div className="p-4 border-b">
                <h3 className="text-xl font-semibold">{notice.title}</h3>
                <p className="mt-1 text-gray-500">{notice.createdAt}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 border">
            <h3 className="text-xl font-semibold text-gray-500">
              공지사항이 없습니다
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeList;

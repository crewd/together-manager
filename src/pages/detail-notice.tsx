import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Notice } from '../types/notice.type';
import { RootState } from '../store/store';

function DetailNotice() {
  const { storeId, noticeId } = useParams();
  const navigate = useNavigate();

  const notice: Notice = useSelector(
    (state: RootState) => state.noticeReducer.notices,
  ).filter((notice) => notice.noticeId === noticeId)[0];

  const removeNotice = (noticeId: string) => {
    if (noticeId && window.confirm('공지사항을 삭제하시겠습니까?')) {
      return navigate(`/store/${storeId}/notice`);
    }
  };

  return (
    <div className="container mx-auto max-w-[1024px] bg-gray-50 pb-10">
      <div className="p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-2xl font-bold">{notice.title}</h2>
        <div className="flex items-center mb-4 text-gray-400">
          {notice.createdAt}
        </div>
        <div
          className="mb-4 text-gray-600"
          dangerouslySetInnerHTML={{ __html: notice.content }}
        />
      </div>
      <div className="flex justify-center w-full gap-4 mt-4">
        <button className="px-6 py-2 transition-colors duration-200 bg-white border rounded-md shadow hover:bg-blue-500 hover:text-white">
          수정
        </button>
        <button
          className="px-6 py-2 transition-colors duration-200 bg-white border rounded-md shadow hover:bg-red-500 hover:text-white"
          onClick={() => removeNotice(`notice.noticeId`)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default DetailNotice;

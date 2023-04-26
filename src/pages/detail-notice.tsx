import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

function DetailNotice() {
  const { storeId, noticeId } = useParams();
  const navigate = useNavigate();

  const removeNotice = (noticeId: string) => {
    if (noticeId && window.confirm('공지사항을 삭제하시겠습니까?')) {
      return navigate(`/store/${storeId}/notice`);
    }
  };

  return (
    <div className="container mx-auto max-w-[1024px] bg-gray-50 pb-10">
      <div className="rounded-md bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">notice.title</h2>
        <div className="mb-4 flex items-center text-gray-400">
          notice.createdAt
        </div>
        {/* <div
          className="mb-4 text-gray-600"
          dangerouslySetInnerHTML={{ __html: notice.content }}
        /> */}
      </div>
      <div className="mt-4 flex w-full justify-center gap-4">
        <button className="rounded-md border bg-white px-6 py-2 shadow transition-colors duration-200 hover:bg-blue-500 hover:text-white">
          수정
        </button>
        <button
          className="rounded-md border bg-white px-6 py-2 shadow transition-colors duration-200 hover:bg-red-500 hover:text-white"
          onClick={() => removeNotice(`notice.noticeId`)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default DetailNotice;

import ReactQuill from 'react-quill';
import Editor from '../components/editor';
import { useRef, useState } from 'react';
import { Notice, NoticeFormData } from '../types/notice.type';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { updateNotice } from '../store/modules/notice-reducer';

function UpdateNoticePage() {
  const { storeId, noticeId } = useParams();

  const notice: Notice = useSelector(
    (state: RootState) => state.noticeReducer.notices,
  ).filter((notice) => notice.noticeId === noticeId)[0];

  const [title, setTitle] = useState<string>(notice.title);
  const editorRef = useRef<ReactQuill>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const updateNoticeSubmit = async () => {
    if (!noticeId) {
      return navigate('/');
    }
    if (!title) {
      return alert('제목을 입력해 주세요');
    }

    if (
      !editorRef.current?.getEditor().getText() ||
      editorRef.current?.getEditor().root.innerHTML === '<p><br></p>'
    ) {
      return alert('내용을 입력해 주세요');
    }
    const noticeData: NoticeFormData = {
      title: title,
      content: editorRef.current?.getEditor().root.innerHTML,
    };
    dispatch(updateNotice({ noticeData, noticeId }));
    navigate(`/store/${storeId}/notice`);
  };

  return (
    <div className="container mx-auto max-w-[1024px]">
      <h2 className="text-2xl font-bold">📣 공지사항</h2>
      <div className="mt-6 bg-white shadow-md">
        <input
          type="text"
          placeholder="제목"
          className="w-full border border-b-0 border-[#ccc] px-3 py-3 outline-none"
          defaultValue={title}
          onChange={onChangeTitle}
        />
        <Editor editorRef={editorRef} defaultValue={notice.content} />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          className="px-6 py-2 transition-colors duration-200 bg-white border rounded-md shadow hover:bg-red-500 hover:text-white"
          onClick={() => navigate(`/store/${storeId}/notice/${noticeId}`)}
        >
          취소
        </button>
        <button
          className="px-6 py-2 text-white transition-colors duration-200 bg-blue-500 border rounded-md shadow"
          onClick={updateNoticeSubmit}
        >
          수정
        </button>
      </div>
    </div>
  );
}

export default UpdateNoticePage;

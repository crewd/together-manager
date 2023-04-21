import { useRef, useState } from 'react';
import Editor from '../components/editor';
import { Notice } from '../types/notice.type';
import { useDispatch } from 'react-redux';
import { RootState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { NoticeActionTypes, addNotice } from '../store/modules/notice';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';

function CreateNoticePage() {
  const [title, setTitle] = useState<string>();

  const editorRef = useRef<ReactQuill>(null);

  const { storeId } = useParams();
  const navigate = useNavigate();

  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, NoticeActionTypes>>();

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChageEditor = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getEditor().root.innerHTML);
    }
  };

  const onSubmitNotice = async () => {
    if (!title) {
      return alert('제목을 입력해 주세요');
    }

    if (
      !editorRef.current?.getEditor().getText() ||
      editorRef.current?.getEditor().root.innerHTML === '<p><br></p>'
    ) {
      return alert('내용을 입력해 주세요');
    }
    const noticeData: Notice = {
      title: title,
      content: editorRef.current?.getEditor().root.innerHTML,
    };
    await dispatch(addNotice(noticeData));
    navigate(`/store/${storeId}/notice`);
  };

  return (
    <div className="container mx-auto max-w-[1024px]">
      <h2 className="text-2xl font-bold">공지사항</h2>
      <div className="mt-6 bg-white shadow-md">
        <input
          type="text"
          placeholder="제목"
          className="w-full border border-b-0 border-[#ccc] px-3 py-3 outline-none"
          onChange={onChangeTitle}
        />
        <Editor onChageEditor={onChageEditor} editorRef={editorRef} />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button
          className="rounded-md border bg-blue-500 px-8 py-2 text-white shadow transition-colors duration-200"
          onClick={onSubmitNotice}
        >
          작성
        </button>
      </div>
    </div>
  );
}

export default CreateNoticePage;

import ReactQuill from 'react-quill';
import Editor from '../components/editor';
import { useRef, useState } from 'react';
import { useAppDispatch } from '../store/store';
import { addWorkDetail } from '../store/modules/workDetail-reducer';
import { useNavigate, useParams } from 'react-router-dom';

function CreateWorkDetail() {
  const [title, setTitle] = useState('');

  const editorRef = useRef<ReactQuill>(null);

  const navigate = useNavigate();
  const { storeId, categoryId } = useParams();

  const dispatch = useAppDispatch();

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const createWorkDetail = () => {
    if (!title) {
      return alert('제목을 입력해 주세요');
    }

    if (!editorRef.current) {
      return;
    }

    if (
      !editorRef.current?.getEditor().getText() ||
      editorRef.current?.getEditor().root.innerHTML === '<p><br></p>'
    ) {
      return alert('내용을 입력해 주세요');
    }
    dispatch(
      addWorkDetail({
        categoryId: categoryId!,
        title,
        content: editorRef.current.getEditor().root.innerHTML,
      }),
    );
    navigate(`/store/${storeId}/work`);
  };

  return (
    <div className="container mx-auto max-w-[1024px]">
      <h2 className="text-2xl font-bold">💼 업무 작성</h2>
      <div className="flex flex-col justify-center w-full mt-6">
        <input
          type="text"
          placeholder="제목"
          className="w-full p-3 bg-white border border-b-0 border-gray-300 outline-none"
          onChange={onChangeTitle}
        />
        <Editor editorRef={editorRef} />
        <div className="flex justify-end w-full gap-3 pt-3">
          <button
            className="w-[90px] rounded border bg-white px-2 py-2 shadow-sm hover:bg-red-500 hover:text-white"
            onClick={() => navigate(`/store/${storeId}/work`)}
          >
            취소
          </button>
          <button
            className="w-[90px] rounded border bg-white px-2 py-2 shadow-sm hover:bg-blue-500 hover:text-white"
            onClick={createWorkDetail}
          >
            작성
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkDetail;

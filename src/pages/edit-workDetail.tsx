import { useRef, useState } from 'react';
import Editor from '../components/editor';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { editWorkDetail } from '../store/modules/workDetail-reducer';

function EditWorkDetail() {
  const { storeId, workId } = useParams();

  const workDetail = useSelector(
    (state: RootState) => state.workDetailReducer.workDetails,
  ).filter((data) => data.id === workId)[0];

  const [title, setTitle] = useState(workDetail.title);

  const editorRef = useRef<ReactQuill>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const updateWorkDetail = () => {
    if (!editorRef.current || !workId) {
      return;
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
    dispatch(
      editWorkDetail({
        id: workId,
        title,
        content: editorRef.current.getEditor().root.innerHTML,
      }),
    );
    navigate(`/store/${storeId}/work`);
  };

  return (
    <div className="container mx-auto max-w-[1024px]">
      <h2 className="text-2xl font-bold">💼 업무 작성</h2>
      <div className="mt-6 flex w-full flex-col justify-center">
        <input
          type="text"
          placeholder="제목"
          className="w-full border border-b-0 border-gray-300 bg-white p-3 outline-none"
          defaultValue={title}
          onChange={onChangeTitle}
        />
        <Editor editorRef={editorRef} defaultValue={workDetail.content} />
        <div className="flex w-full justify-end gap-3 pt-3">
          <button
            className="w-[90px] rounded border bg-white px-2 py-2 shadow-sm hover:bg-red-500 hover:text-white"
            onClick={() => navigate(`/store/${storeId}/work`)}
          >
            취소
          </button>
          <button
            className="w-[90px] rounded border bg-white px-2 py-2 shadow-sm hover:bg-blue-500 hover:text-white"
            onClick={updateWorkDetail}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditWorkDetail;

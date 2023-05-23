import {
  faAngleRight,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { RootState, useAppDispatch } from '../store/store';
import {
  deleteCategory,
  updateCategory,
} from '../store/modules/category-reducer';
import Editor from './editor';
import ReactQuill from 'react-quill';
import WorkDetail from './work-detail';
import { useSelector } from 'react-redux';
import { addWorkDetail } from '../store/modules/workDetail-reducer';

function Category({ name, id }: { name: string; id: string }) {
  const [isOpened, setIsOpened] = useState(false);
  const [nameInput, setNameInput] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  const [title, setTitle] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<ReactQuill>(null);

  const workDetails = useSelector(
    (state: RootState) => state.workDetailReducer.workDetails,
  ).filter((data) => data.categoryId === id);

  const dispatch = useAppDispatch();

  const changeName = (event: React.MouseEvent) => {
    event.stopPropagation();
    setNameInput(!nameInput);
  };

  const changeCategory = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!inputRef.current) {
      return;
    }
    dispatch(updateCategory({ id, name: inputRef.current.value }));
    setNameInput(false);
  };

  const changeCategoryKeyPress = (event: React.KeyboardEvent) => {
    if (!inputRef.current) {
      return;
    }
    if (event.key === 'Enter') {
      dispatch(updateCategory({ id, name: inputRef.current.value }));
      setNameInput(false);
    }
  };

  const onDeleteCategory = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm('카테고리를 삭제하시겠습니까?')) {
      dispatch(deleteCategory(id));
    }
  };

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
        categoryId: id,
        title,
        content: editorRef.current.getEditor().root.innerHTML,
      }),
    );
    setEditorOpen(false);
  };

  useEffect(() => {
    if (nameInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [nameInput]);

  return (
    <div>
      <div
        className="flex justify-between px-4 py-2 text-lg font-bold border-b cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faAngleRight}
            className={`${isOpened ? 'rotate-90' : ''} transition duration-300`}
          />{' '}
          {nameInput ? (
            <div className="flex text-base">
              <input
                type="text"
                className="h-[36px] rounded rounded-r-none border px-2 font-normal shadow-inner outline-none"
                ref={inputRef}
                onClick={(event: React.MouseEvent) => event.stopPropagation()}
                onKeyDown={changeCategoryKeyPress}
              />
              <button
                className="px-3 font-normal border border-l-0 rounded rounded-l-none"
                onClick={changeCategory}
              >
                변경
              </button>
            </div>
          ) : (
            <p>{name}</p>
          )}
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <FontAwesomeIcon icon={faPen} onClick={changeName} />
          <FontAwesomeIcon icon={faTrash} onClick={onDeleteCategory} />
        </div>
      </div>
      {isOpened && (
        <div className="w-full p-4 font-normal shadow-inner bg-gray-50">
          <div className="flex flex-col flex-wrap justify-center">
            {editorOpen ? (
              <div className="flex flex-col justify-center w-full">
                <input
                  type="text"
                  placeholder="제목"
                  className="w-full p-2 bg-white border border-b-0 border-gray-300 outline-none"
                  onChange={onChangeTitle}
                />
                <Editor editorRef={editorRef} />
                <div className="flex justify-end w-full gap-3 pt-3">
                  <button
                    className="w-[90px] rounded border bg-white px-2 py-2 shadow-sm hover:bg-red-500 hover:text-white"
                    onClick={() => setEditorOpen(false)}
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
            ) : (
              <div className="flex flex-col justify-center">
                <div
                  className={`m-auto grid grid-cols-1 gap-6 pb-3 md:grid-cols-2 ${
                    workDetails.length <= 2
                      ? 'xl:grid-cols-2'
                      : 'xl:grid-cols-3'
                  }`}
                >
                  {workDetails.length > 0 ? (
                    workDetails.map((data) => (
                      <WorkDetail
                        key={data.id}
                        title={data.title}
                        content={data.content}
                        span={workDetails.length}
                      />
                    ))
                  ) : (
                    <p className="col-span-2 p-2 text-lg font-bold text-gray-500">
                      카테고리를 추가하여 업무관리를 해보세요
                    </p>
                  )}
                </div>
                <div className="flex justify-center w-full pt-3">
                  <button
                    className="flex w-[90px] items-center justify-center gap-1 rounded border bg-white px-2 py-2 shadow-sm hover:bg-blue-500 hover:text-white"
                    onClick={() => setEditorOpen(!editorOpen)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    추가
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;

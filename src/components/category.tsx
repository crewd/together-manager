import {
  faAngleRight,
  faPen,
  faPlus,
  faTrash,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../store/store';
import {
  deleteCategory,
  updateCategory,
} from '../store/modules/category-reducer';
import Editor from './editor';
import ReactQuill from 'react-quill';
import WorkDetail from './work-detail';

function Category({ name, id }: { name: string; id: string }) {
  const [isOpened, setIsOpened] = useState(false);
  const [nameInput, setNameInput] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<ReactQuill>(null);

  const changeName = (event: React.MouseEvent) => {
    event.stopPropagation();
    setNameInput(!nameInput);
  };

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (nameInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [nameInput]);

  return (
    <div>
      <div
        className="flex cursor-pointer justify-between border-b px-4 py-2 text-lg font-bold"
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
                className="rounded rounded-l-none border border-l-0 px-3 font-normal"
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
        <div className="w-full bg-gray-50 p-4 font-normal shadow-inner">
          <div className="flex flex-col flex-wrap justify-center">
            {editorOpen ? (
              <div className="flex w-full flex-col justify-center">
                <input
                  type="text"
                  placeholder="제목"
                  className="w-full border border-b-0 border-gray-300 bg-white p-2 outline-none"
                />
                <Editor editorRef={editorRef} />
                <div className="flex w-full justify-end gap-3 pt-3">
                  <button
                    className="w-[90px] rounded border bg-white px-2 py-2 shadow-sm hover:bg-red-500 hover:text-white"
                    onClick={() => setEditorOpen(false)}
                  >
                    취소
                  </button>
                  <button className="w-[90px] rounded border bg-white px-2 py-2 shadow-sm hover:bg-blue-500 hover:text-white">
                    작성
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <div className="m-auto grid grid-cols-3 gap-6 pb-3">
                  <WorkDetail title="제목" content="<p>안뇽</p>" />
                  <WorkDetail title="제목" content="<p>안뇽</p>" />
                  <WorkDetail title="제목" content="<p>안뇽</p>" />
                </div>
                <div className="flex w-full justify-center pt-3">
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

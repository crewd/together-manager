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
import WorkDetail from './work-detail';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function Category({ name, id }: { name: string; id: string }) {
  const [isOpened, setIsOpened] = useState(false);
  const [nameInput, setNameInput] = useState(false);

  const { storeId } = useParams();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

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
            <div className="flex flex-col justify-center">
              <div
                className={`m-auto grid grid-cols-1 gap-6 pb-3 md:grid-cols-2 ${
                  workDetails.length <= 2 ? 'xl:grid-cols-2' : 'xl:grid-cols-3'
                }`}
              >
                {workDetails.length > 0 ? (
                  workDetails.map((data) => (
                    <WorkDetail
                      key={data.id}
                      title={data.title}
                      content={data.content}
                      span={workDetails.length}
                      storeId={storeId!}
                      workId={data.id}
                    />
                  ))
                ) : (
                  <p className="col-span-2 p-2 text-lg font-bold text-gray-500">
                    업무 상세 내용을 추가해 보세요
                  </p>
                )}
              </div>
              <div className="flex w-full justify-center pt-3">
                <button
                  className="flex w-[90px] items-center justify-center gap-1 rounded border bg-white px-2 py-2 shadow-sm hover:bg-blue-500 hover:text-white"
                  onClick={() =>
                    navigate(`/store/${storeId}/work/${id}/create`)
                  }
                >
                  <FontAwesomeIcon icon={faPlus} />
                  추가
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;

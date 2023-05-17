import {
  faAngleRight,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../store/store';
import { updateCategory } from '../store/modules/category-reducer';

function Category({ name, id }: { name: string; id: string }) {
  const [isOpened, setIsOpended] = useState(false);
  const [nameInput, setNameInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    dispatch(updateCategory({ id: id, name: inputRef.current.value }));
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

  useEffect(() => {
    if (nameInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [nameInput]);

  return (
    <div>
      <div
        className="flex justify-between px-4 py-2 text-lg font-bold border-b cursor-pointer"
        onClick={() => setIsOpended(!isOpened)}
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
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
      {isOpened && (
        <div className="w-full p-3 font-normal shadow-inner bg-gray-50">
          <div className="flex justify-center w-full">
            <button className="w-[80px] rounded border bg-white px-2 py-1 shadow-sm">
              <FontAwesomeIcon icon={faPlus} /> 추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;

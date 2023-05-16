import { faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function Category({ name, id }: { name: string; id: string }) {
  const [isOpened, setIsOpended] = useState(false);
  return (
    <div>
      <div
        className="py-2 text-lg font-bold cursor-pointer w-fit"
        onClick={() => setIsOpended(!isOpened)}
      >
        <FontAwesomeIcon
          icon={faAngleRight}
          className={`${
            isOpened ? 'rotate-90' : ''
          } mr-1 transition duration-300`}
        />{' '}
        {name}
      </div>
      {isOpened && (
        <div className="ml-[20px] w-[calc(100%-40px)] p-2 font-normal">
          <div className="flex justify-center w-full">
            <button className="w-[80px] rounded border px-2 py-1 shadow-sm">
              <FontAwesomeIcon icon={faPlus} /> 추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;

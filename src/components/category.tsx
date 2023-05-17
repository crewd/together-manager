import {
  faAngleRight,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function Category({ name, id }: { name: string; id: string }) {
  const [isOpened, setIsOpended] = useState(false);
  return (
    <div>
      <div
        className="flex justify-between px-4 py-2 text-lg font-bold border-b cursor-pointer"
        onClickCapture={() => setIsOpended(!isOpened)}
      >
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faAngleRight}
            className={`${isOpened ? 'rotate-90' : ''} transition duration-300`}
          />{' '}
          <p>{name}</p>
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <FontAwesomeIcon
            icon={faPen}
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation(); // 이벤트 전파 중지
              // 추가로 수행할 작업
              console.log('pen');
            }}
          />
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

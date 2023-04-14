import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Store } from '../types/store.type';
import { faClock } from '@fortawesome/free-regular-svg-icons';

function ItemCard({
  data,
  onDelete,
}: {
  data: Store;
  onDelete: (storeName: string) => void;
}) {
  const deleteStore = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    onDelete(data.storeName);
  };
  return (
    <div
      className={`flex h-[180px] w-[320px] cursor-pointer flex-col justify-center rounded-xl border p-[16px] shadow-sm hover:shadow-md`}
    >
      <div className="flex justify-between">
        <p className="py-[10px] text-2xl font-bold">{data.storeName}</p>
        <div className="flex w-[70px] justify-between">
          <button className="hover:font-bold hover:text-blue-500">수정</button>
          <button
            className="hover:font-bold hover:text-red-500"
            onClick={deleteStore}
          >
            삭제
          </button>
        </div>
      </div>
      <p className="py-[10px]">{data.address}</p>
      <div className="flex py-[10px]">
        <FontAwesomeIcon className="h-[25px] w-[25px]" icon={faClock} />
        <p className="pl-3">
          {data.startTime} - {data.endTime}
        </p>
      </div>
    </div>
  );
}

export default ItemCard;

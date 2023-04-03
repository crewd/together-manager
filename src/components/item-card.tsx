import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Store } from '../types/store.type';

function ItemCard({ data }: { data: Store }) {
  return (
    <div className="flex h-[180px] w-[320px] cursor-pointer flex-col justify-center rounded-xl border p-[16px] shadow-sm hover:shadow-md">
      <div className="flex justify-between">
        <p className="py-[10px] text-2xl font-bold">{data.name}</p>
        <div className="flex w-[70px] justify-between">
          <button className="hover:font-bold hover:text-blue-500">수정</button>
          <button className="hover:font-bold hover:text-red-500">삭제</button>
        </div>
      </div>
      <p className="py-[10px]">{data.address}</p>
      <div className="flex py-[10px]">
        <FontAwesomeIcon className="h-[25px] w-[25px]" icon={faUsers} />
        <p className="pl-[6px]">
          직원 수:
          <span className="pl-[10px] pr-[6px]">{data.members}</span>명
        </p>
      </div>
    </div>
  );
}

export default ItemCard;

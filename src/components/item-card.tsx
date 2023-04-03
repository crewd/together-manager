import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Store } from '../types/store.type';

function ItemCard({ data }: { data: Store }) {
  return (
    <div className="w-[250px] h-[180px] border p-[24px] rounded-xl shadow-sm cursor-pointer hover:shadow-md flex flex-col justify-center">
      <div className="flex justify-between">
        <p className="text-2xl font-bold py-[10px]">{data.name}</p>
        <button className="hover:text-blue-500 hover:font-bold">수정</button>
      </div>
      <p className="py-[10px]">{data.address}</p>
      <div className="flex py-[10px]">
        <FontAwesomeIcon className="w-[25px] h-[25px]" icon={faUsers} />
        <p className="pl-[6px]">
          직원 수:
          <span className="pl-[10px] pr-[6px]">{data.members}</span>명
        </p>
      </div>
    </div>
  );
}

export default ItemCard;

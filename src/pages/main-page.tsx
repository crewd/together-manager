import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ItemCard from '../components/item-card';
import { Store } from '../types/store.type';

function MainPage() {
  const dummyStore: Store[] = [
    {
      name: 'store_name',
      address: 'store_address',
      members: 2,
    },
    {
      name: 'store_name',
      address: 'store_address',
      members: 2,
    },
    {
      name: 'store_name',
      address: 'store_address',
      members: 2,
    },
    {
      name: 'store_name',
      address: 'store_address',
      members: 2,
    },
    {
      name: 'store_name',
      address: 'store_address',
      members: 2,
    },
  ];
  const user = {
    name: '홍길동',
    role: 'manager',
  };
  return (
    <div>
      <header className="px-[16px] lg:px-[32px] flex justify-between border-b">
        <h2 className="text-2xl font-bold leading-[64px]">투게더</h2>
        <button className="leading-[64px] font-semibold flex items-center">
          <FontAwesomeIcon
            className="w-[20px] h-[20px] align-middle"
            icon={faArrowRightFromBracket}
          />
          <span className="pl-[8px] hidden md:inline-block">로그아웃</span>
        </button>
      </header>
      <main className="w-full m-auto py-[36px] px-[16px] flex justify-center flex-col">
        <div>
          <p className="text-3xl font-bold text-center">매장 목록</p>
        </div>
        {dummyStore.length > 0 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center place-items-center w-full max-w-[1024px] m-auto md:gap-4 sm:gap-2 gap-4 py-[36px]">
            {dummyStore.map((data: Store, index) => (
              <ItemCard data={data} key={data.name + index} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-[36px]">
            <div className="w-[250px] h-[180px] border border-gray-700 border-dashed rounded-xl flex justify-center items-center">
              <p className="text-2xl text-center text-gray-500">
                매장을 추가해 주세요
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button className="bg-blue-500 w-[120px] h-[50px] rounded-md text-xl text-white shadow-md hover:bg-blue-700 hover:scale-105">
            매장 추가
          </button>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

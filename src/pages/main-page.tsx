import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MainPage() {
  const dummyStore = [
    {
      name: '순대국밥',
      address: '무슨시 무슨구 무슨동 123-45',
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
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center place-items-center w-full max-w-[1024px] m-auto gap-4 py-[36px]">
          <div className="col-span-4 w-[300px] h-[200px] border border-gray-700 border-dashed rounded-xl flex justify-center items-center">
            <p className="text-2xl text-center text-gray-500">
              매장을 추가해 주세요
            </p>
          </div>
        </div>
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

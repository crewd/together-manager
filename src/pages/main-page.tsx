import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ItemCard from '../components/item-card';
import { Store } from '../types/store.type';
import AddStore from '../components/add-store';
import { useEffect, useState } from 'react';
import ModalPortal from '../components/modal-portal';

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
  const [modalOpened, setModalOpened] = useState(false);

  const onOpen = () => {
    setModalOpened(true);
  };

  const onClose = () => {
    setModalOpened(false);
  };

  useEffect(() => {
    if (modalOpened) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.removeProperty('overflow');
  }, [modalOpened]);

  return (
    <div>
      <header className="flex justify-between border-b px-[16px] lg:px-[32px]">
        <h2 className="text-2xl font-bold leading-[64px]">투게더</h2>
        <button className="flex items-center font-semibold leading-[64px]">
          <FontAwesomeIcon
            className="h-[20px] w-[20px] align-middle"
            icon={faArrowRightFromBracket}
          />
          <span className="hidden pl-[8px] md:inline-block">로그아웃</span>
        </button>
      </header>
      <main className="m-auto flex w-full flex-col justify-center px-[16px] py-[36px]">
        <div>
          <p className="text-center text-3xl font-bold">매장 목록</p>
        </div>
        {dummyStore.length > 0 ? (
          <div className="m-auto grid w-full max-w-[1024px] grid-cols-1 place-items-center justify-center gap-6 py-[36px] md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {dummyStore.map((data: Store, index) => (
              <ItemCard data={data} key={data.name + index} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-[36px]">
            <div className="flex h-[180px] w-[250px] items-center justify-center rounded-xl border border-dashed border-gray-700">
              <p className="text-center text-2xl text-gray-500">
                매장을 추가해 주세요
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center pt-[36px]">
          <button
            className="h-[50px] w-[120px] rounded-md bg-blue-500 text-xl text-white shadow-md hover:scale-105 hover:bg-blue-700"
            onClick={onOpen}
          >
            매장 추가
          </button>
        </div>
      </main>
      {modalOpened && (
        <ModalPortal>
          <AddStore onClose={onClose} />
        </ModalPortal>
      )}
    </div>
  );
}

export default MainPage;

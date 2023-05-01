import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ItemCard from '../components/item-card';
import { Store } from '../types/store.type';
import AddStore from '../components/add-store';
import { useEffect, useState } from 'react';
import ModalPortal from '../components/modal-portal';
import { RootState, useAppDispatch } from '../store/store';
import { Link } from 'react-router-dom';
import { logout } from '../store/modules/auth-reducer';
import { useSelector } from 'react-redux';

function MainPage() {
  const [modalOpened, setModalOpened] = useState(false);

  const stores: Store[] = useSelector(
    (state: RootState) => state.storeReducer.stores,
  );

  const dispatch = useAppDispatch();

  const onlogout = () => {
    dispatch(logout());
  };

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
        <button
          className="flex items-center font-semibold leading-[64px]"
          onClick={onlogout}
        >
          <FontAwesomeIcon
            className="h-[20px] w-[20px] align-middle"
            icon={faArrowRightFromBracket}
          />
          <span className="hidden pl-[8px] md:inline-block">로그아웃</span>
        </button>
      </header>
      <main className="m-auto flex w-full flex-col justify-center px-[16px] py-[36px]">
        <div>
          <p className="text-3xl font-bold text-center">매장 목록</p>
        </div>
        {stores.length > 0 ? (
          <div
            className={`m-auto grid max-w-[1024px] grid-cols-1 place-items-center justify-center py-[36px] md:grid-cols-2 md:gap-4 ${
              stores.length <= 2
                ? 'gap-0 lg:grid-cols-2'
                : 'gap-6 lg:grid-cols-3'
            } `}
          >
            {stores.map((data: Store, index) => (
              <Link
                to={`/store/${data.storeId}`}
                className={`${stores.length <= 1 && 'col-span-3'}`}
                key={data.storeName + index}
              >
                <ItemCard data={data} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-[36px]">
            <div className="flex h-[180px] w-[320px] items-center justify-center rounded-xl border border-dashed border-gray-700">
              <p className="text-2xl text-center text-gray-500">
                매장을 추가해 주세요
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-center pt-[36px]">
          <button
            className="h-[50px] w-[120px] rounded-md bg-blue-500 text-xl text-white shadow-md hover:bg-blue-600"
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

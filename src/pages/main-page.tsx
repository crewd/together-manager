import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ItemCard from '../components/item-card';
import { Store } from '../types/store.type';
import AddStore from '../components/add-store';
import { useEffect, useState } from 'react';
import ModalPortal from '../components/modal-portal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { StoreActionTypes, deleteStore } from '../store/modules/store';
import { AuthActionTypes, userLogout } from '../store/modules/auth';
import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';

function MainPage() {
  const [modalOpened, setModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dummyStore: Store[] = useSelector(
    (state: RootState) => state.store.stores,
  );

  const storeDispatch =
    useDispatch<ThunkDispatch<RootState, null, StoreActionTypes>>();

  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthActionTypes>>();

  const logout = async () => {
    await setIsLoading(true);
    authDispatch(userLogout());
  };

  const onOpen = () => {
    setModalOpened(true);
  };

  const onClose = () => {
    setModalOpened(false);
  };

  const deleteStoreDispatch = (storeName: string) => {
    if (window.confirm('매장을 삭제하시겠습니까?')) {
      return storeDispatch(deleteStore(storeName));
    }
  };

  useEffect(() => {
    if (modalOpened || isLoading) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.removeProperty('overflow');
  }, [modalOpened, isLoading]);

  return (
    <div>
      <header className="flex justify-between border-b px-[16px] lg:px-[32px]">
        <h2 className="text-2xl font-bold leading-[64px]">투게더</h2>
        <button
          className="flex items-center font-semibold leading-[64px]"
          onClick={logout}
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
          <p className="text-center text-3xl font-bold">매장 목록</p>
        </div>
        {dummyStore.length > 0 ? (
          <div
            className={`m-auto grid max-w-[1024px] grid-cols-1 place-items-center justify-center py-[36px] md:grid-cols-2 md:gap-4 ${
              dummyStore.length <= 2
                ? 'gap-0 lg:grid-cols-2'
                : 'gap-6 lg:grid-cols-3'
            } `}
          >
            {dummyStore.map((data: Store, index) => (
              <Link
                to={`/store/${data.storeId}`}
                className={`${dummyStore.length <= 1 && 'col-span-3'}`}
                key={data.storeName + index}
              >
                <ItemCard data={data} onDelete={deleteStoreDispatch} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center py-[36px]">
            <div className="flex h-[180px] w-[320px] items-center justify-center rounded-xl border border-dashed border-gray-700">
              <p className="text-center text-2xl text-gray-500">
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
      {isLoading && (
        <ModalPortal>
          <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white/50">
            <Spinner />
          </div>
        </ModalPortal>
      )}
    </div>
  );
}

export default MainPage;

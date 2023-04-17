import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import {
  faArrowRightFromBracket,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import RequireAuth from './requireAuth';
import ModalPortal from './modal-portal';
import Spinner from './spinner';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import { AuthActionTypes, userLogout } from '../store/modules/auth';
import { Store } from '../types/store.type';

function Layout({ children }: { children?: React.ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { storeId } = useParams();

  const dummyStore: Store = useSelector(
    (state: RootState) =>
      state.store.stores.filter((data) => data.storeId === storeId)[0],
  );

  const authDispatch =
    useDispatch<ThunkDispatch<RootState, null, AuthActionTypes>>();

  const logout = () => {
    setIsLoading(true);
    authDispatch(userLogout());
  };

  const onClickMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    if (menu || isLoading) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.removeProperty('overflow');
  }, [menu, isLoading]);

  return (
    <RequireAuth>
      <div className="bg-white">
        <header className="fixed top-0 z-30 h-[64px] w-full border-b bg-white shadow-sm">
          <div className="flex w-full justify-between px-[16px] lg:px-[32px]">
            <Link
              className="hidden text-2xl font-bold leading-[64px] lg:block"
              to="/"
            >
              투게더
            </Link>
            <button className="lg:hidden" onClick={onClickMenu}>
              <FontAwesomeIcon className="h-[20px] w-[20px]" icon={faBars} />
            </button>
            <Link
              to={`store/${storeId}`}
              className="text-xl font-semibold leading-[64px]"
            >
              {dummyStore.storeName}
            </Link>
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
          </div>
        </header>
        <aside
          className={`fixed z-50 h-screen w-[250px] border-r bg-white py-[16px] shadow-sm transition-all duration-500 lg:left-0 lg:top-[64px] lg:duration-0 ${
            menu ? 'left-0' : 'left-[-100%]'
          }`}
        >
          <nav className="px-[16px]">
            <div className="flex w-full justify-between p-[16px] lg:hidden">
              <h2 className="text-2xl font-bold">투게더</h2>
              <button className="h-[25px] w-[25px]" onClick={onClickMenu}>
                <FontAwesomeIcon
                  className="h-[25px] w-[25px] align-middle"
                  icon={faXmark}
                />
              </button>
            </div>
            <ul className="flex flex-col gap-[12px] pt-5 lg:pt-0">
              <li className="cursor-pointer rounded-md p-[8px] hover:bg-blue-500 hover:text-white">
                매장관리
              </li>
              <li className="cursor-pointer rounded-md p-[8px] hover:bg-blue-500 hover:text-white">
                <Link to={`store/${storeId}/notice`} className="block w-full">
                  공지사항
                </Link>
              </li>
              <li className="cursor-pointer rounded-md p-[8px] hover:bg-blue-500 hover:text-white">
                직원관리
              </li>
              <li className="cursor-pointer rounded-md p-[8px] hover:bg-blue-500 hover:text-white">
                일정
              </li>
            </ul>
          </nav>
        </aside>
        <main className="min-h-screen bg-gray-50 px-[16px] pb-9 pt-[100px] lg:pl-[276px]">
          {children || <Outlet />}
        </main>
        {menu && (
          <div
            className="fixed left-0 top-0 z-40 h-screen w-screen bg-gray-600/50 lg:hidden"
            onClick={onClickMenu}
          />
        )}
      </div>
      {isLoading && (
        <ModalPortal>
          <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white/40">
            <Spinner />
          </div>
        </ModalPortal>
      )}
    </RequireAuth>
  );
}

export default Layout;

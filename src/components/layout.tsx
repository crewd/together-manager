import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import {
  faArrowRightFromBracket,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Layout({ children }: { children?: React.ReactNode }) {
  const [menu, setMenu] = useState(false);

  const onClickMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.removeProperty('overflow');
  }, [menu]);

  return (
    <div className="bg-white">
      <header className="w-full fixed top-0 bg-white border-b shadow-sm h-[64px]">
        <div className="lg:px-[32px] px-[16px] w-full flex justify-between">
          <h2 className="text-2xl font-bold leading-[64px] hidden lg:block">
            투게더
          </h2>
          <button className="lg:hidden" onClick={onClickMenu}>
            <FontAwesomeIcon className="w-[20px] h-[20px]" icon={faBars} />
          </button>
          <p className="text-xl font-semibold leading-[64px]">가게 상호명</p>
          <button className="leading-[64px] font-semibold flex items-center">
            <FontAwesomeIcon
              className="w-[20px] h-[20px] align-middle"
              icon={faArrowRightFromBracket}
            />
            <span className="pl-[8px] hidden md:inline-block">로그아웃</span>
          </button>
        </div>
      </header>
      <aside
        className={`h-screen py-[16px] w-[250px] border-r shadow-sm bg-white fixed lg:top-[64px] duration-500 z-50 lg:duration-0 transition-all lg:left-0 ${
          menu ? 'left-0' : 'left-[-100%]'
        }`}
      >
        <nav className="px-[16px]">
          <div className="flex justify-between w-full lg:hidden p-[16px]">
            <h2 className="text-2xl font-bold">투게더</h2>
            <button className="w-[25px] h-[25px]" onClick={onClickMenu}>
              <FontAwesomeIcon
                className="w-[25px] h-[25px] align-middle"
                icon={faXmark}
              />
            </button>
          </div>
          <ul className="pt-5 lg:pt-0 flex flex-col gap-[12px]">
            <li className="p-[8px] hover:bg-blue-500 rounded-md hover:text-white cursor-pointer">
              메뉴1
            </li>
            <li className="p-[8px] hover:bg-blue-500 rounded-md hover:text-white cursor-pointer">
              메뉴2
            </li>
            <li className="p-[8px] hover:bg-blue-500 rounded-md hover:text-white cursor-pointer">
              메뉴3
            </li>
            <li className="p-[8px] hover:bg-blue-500 rounded-md hover:text-white cursor-pointer">
              메뉴4
            </li>
          </ul>
        </nav>
      </aside>
      <main className="bg-gray-50 h-[200vh] pt-[100px] lg:pl-[276px] px-[16px]">
        {children || <Outlet />}
      </main>
      {menu && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-gray-600/50 lg:hidden"
          onClick={onClickMenu}
        />
      )}
    </div>
  );
}

export default Layout;

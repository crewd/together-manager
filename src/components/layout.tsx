import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <header className="w-full basis-full fixed top-0 bg-white">
        <div className="px-[32px] h-[64px] w-full m-auto border-b shadow-sm">
          <h2 className="text-2xl font-bold pr-[30px] leading-[64px] ">
            투게더
          </h2>
        </div>
      </header>
      <nav className="h-screen p-[16px] w-[240px] border-r shadow-sm bg-whitew-full m-0 fixed left-0 md:top-[64px] bg-white block">
        <ul className="pt-[64px] md:pt-0">
          <li className="p-[10px]">메뉴1</li>
          <li className="p-[10px]">메뉴2</li>
          <li className="p-[10px]">메뉴3</li>
          <li className="p-[10px]">메뉴4</li>
        </ul>
      </nav>
      <main className="px-[32px] bg-gray-100 h-[200vh] pt-[80px] md:pl-[256px]">
        {children}
      </main>
    </div>
  );
}

export default Layout;

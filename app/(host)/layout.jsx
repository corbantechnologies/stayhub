'use client';

import HostNavbar from "./components/Navbar";

function layout({children}) {
  return (
    <div className='px-4 lg:px-8 relative'>
      <div className='fixed bg-white z-50 right-4 lg:right-8 left-4 lg:left-8'>
      <HostNavbar/>
      </div>
      <section className='pt-[80px]'>
      {children}
      </section>
    </div>
  )
}

export default layout
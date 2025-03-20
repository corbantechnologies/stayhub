'use client';

import GuestNavbar from "./components/Navbar";

function GuestLayout({children}) {
  return (
    <div className='px-4 lg:px-8 relative'>
      <div className='fixed bg-white z-50 right-4 lg:right-8 left-4 lg:left-8'>
      <GuestNavbar/>
      </div>
      <section className='pt-[120px] md:pt-[80px]'>
      {children}
      </section>
    </div>
  )
}

export default GuestLayout
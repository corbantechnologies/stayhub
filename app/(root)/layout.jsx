'use client';

import FloatingNav from "@/components/custom/FloatingNav";
import Navbar from "@/components/custom/Navbar"

function layout({children}) {
  return (
    <div className='px-4 lg:px-8 relative'>
      <div className='fixed bg-white z-50 right-4 lg:right-8 left-4 lg:left-8'>
      <Navbar/>
      </div>
      <section className='pt-[80px]'>
      <div className='fixed bottom-4 right-4 left-4 z-50 md:hidden'>
      <FloatingNav/>
      </div>
      {children}
      </section>
    </div>
  )
}

export default layout
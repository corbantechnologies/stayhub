'use client';

import UserInfoCard from '@/components/custom/UserInfoCard'
import { PartyPopper } from 'lucide-react'
function Guest() {
  return (
    <div>
    <div>
      <h1 className="font-semibold text-xl md:font-2xl">Dashboard</h1>
      <p className="text-gray-500">An overview of your stays</p>
    </div>
    <section className='mt-5 flex flex-col lg:flex-row lg:justify-between md:items-start gap-8'>
    <div className="flex flex-col sm:flex-row gap-5">
      <div className="p-5 rounded-xl bg-slate-100 sm:w-fit">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-black size-8 rounded-md grid place-content-center">
          <PartyPopper color='white' size={18} />
          </div>
          <span>Total experiences</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>
          <span className="text-2xl md:text-4xl font-bold">8</span>
          </span>
          <div className="flex flex-col">
            <small className="text-gray-500">Priceless</small>
          <small className="text-gray-500 leading-none">experiences</small>
          </div>
        </div>
      </div>
    </div>
    <section className=''>
      <UserInfoCard/>
    </section>
    </section>
    <section className='mt-8'>
        <h2 className="font-semibold text-xl md:font-2xl">Recommendations</h2>
    </section>
  </div>
  )
}

export default Guest
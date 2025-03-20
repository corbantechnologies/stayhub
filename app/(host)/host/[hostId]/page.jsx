'use client';
import UserInfoCard from '@/components/custom/UserInfoCard'
import { CalendarCheck, House, TrendingUp, Wallet } from 'lucide-react'

function Host() {
  return (
    <div>
      <div>
        <h1 className="font-semibold text-xl md:font-2xl">Dashboard</h1>
        <p className="text-gray-500">An overview of your business</p>
      </div>
      <section className='mt-5 flex flex-col lg:flex-row md:items-start gap-8'>
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="p-5 rounded-xl bg-slate-100 sm:w-fit">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-black size-8 rounded-md grid place-content-center">
            <House color='white' size={18} />
            </div>
            <span>Total listings</span>
          </div>
          <div className="pl-10 flex gap-2 items-center">
            <span className="text-2xl md:text-4xl font-bold">4</span>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-slate-100 sm:w-fit">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-black size-8 rounded-md grid place-content-center">
            <CalendarCheck color='white' size={18} />
            </div>
            <span>Total reservations</span>
          </div>
          <div className="pl-10 flex gap-2 items-center">
            <span className="text-2xl md:text-4xl font-bold">12</span>
            <div className="flex flex-col">
              <div className="flex gap-2">
            <TrendingUp color="green" />
              <small className="text-green-800 font-semibold">4.5%</small>
              </div>
            <small className="text-gray-500 leading-none">reservation rate</small>
            </div>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-slate-100 sm:w-fit">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-black size-8 rounded-md grid place-content-center">
            <Wallet color='white' size={18} />
            </div>
            <span>Total revenue</span>
          </div>
          <div className="flex gap-2 items-center">
            <span>
              <span className="text-gray-500 mr-1">Ksh</span>
            <span className="text-2xl md:text-4xl font-bold">42,700</span>
            </span>
            <div className="flex flex-col">
              <div className="flex gap-2">
            <TrendingUp color="green" />
              <small className="text-green-800 font-semibold">12%</small>
              </div>
            <small className="text-gray-500 leading-none">last month</small>
            </div>
          </div>
        </div>
      </div>
      <section className='flex-grow'>
        <UserInfoCard/>
      </section>
      </section>
    </div>
  )
}

export default Host
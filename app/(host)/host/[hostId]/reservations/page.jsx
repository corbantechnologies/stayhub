'use client';

import { useGetHostListings } from "@/actions/react-query/queriesAndMutations"
import useAxiosAuth from "@/hooks/useAxiosAuth"
import { formatter } from "@/lib/utils";
import { CalendarCheck, TrendingUp, Wallet } from "lucide-react"
import Image from "next/image";

function Reservations() {
  const axiosAuth = useAxiosAuth()
   const {data:listings} = useGetHostListings(axiosAuth)
  return (
    <div>
      <div>
        <h1 className="font-semibold text-xl md:font-2xl">Reservations</h1>
        <p className="text-gray-500">Information about your reserved listings</p>
      </div>
      <div className="mt-5 flex flex-col sm:flex-row gap-5">
        <div className="p-5 rounded-xl bg-slate-100 sm:w-fit">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-black size-8 rounded-md grid place-content-center">
            <CalendarCheck color='white' size={18} />
            </div>
            <span>New reservations</span>
          </div>
          <div className="pl-10 flex gap-2 items-center">
            <span className="text-2xl md:text-4xl font-bold">12</span>
            <div className="flex flex-col">
              <div className="flex gap-2">
            <TrendingUp color="green" />
              <small className="text-green-800 font-semibold">12%</small>
              </div>
            <small className="text-gray-500 leading-none">last month</small>
            </div>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-slate-100 sm:w-fit">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-black size-8 rounded-md grid place-content-center">
            <Wallet color='white' size={18} />
            </div>
            <span>Income</span>
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
      <section className="mt-8">
        {listings?.length > 0 ?
          listings.map((listing) => (
            <ReservedListing key={listing.id} reservation={listing} />
          ))
          :
          null 
        }
      </section>
    </div>
  )
}

export default Reservations

const ReservedListing = ({reservation}) =>{
  return(
    <div className="overflow-x-auto max-w-screen flex mb-5 pb-2 items-center">
      <div className="flex-shrink-0 flex gap-2 items-center w-84 mr-4">
        <Image src={reservation?.images[0]?.image} alt='listing' width={80} height={60} className="object-cover rounded-xl" />
        <div className="flex flex-col">
        <small className="text-gray-500">Name</small>
        <span>{reservation?.title}</span>
        </div>
      </div>
      <div className="flex-shrink-0 flex flex-col w-32 mr-4">
        <small className="text-gray-500">Price</small>
        <span>{formatter.format(reservation?.pricing)}</span>
        </div>
      <div className="flex-shrink-0 flex flex-col w-32">
        <small className="text-gray-500">Checkin</small>
        <span>{reservation?.checkin}</span>
        </div>
      <div className="flex-shrink-0 flex flex-col w-32">
        <small className="text-gray-500">Checkout</small>
        <span>{reservation?.checkout}</span>
        </div>
    </div>
  )
}
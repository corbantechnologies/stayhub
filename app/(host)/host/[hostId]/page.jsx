'use client';

import { useGetHostListings } from "@/actions/react-query/queriesAndMutations";
import PostCard from "@/components/custom/PostCard";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Host({params:{hostId}}) {
    const axiosAuth = useAxiosAuth()
    const router = useRouter()
    const {data:session} = useSession()
    if(session?.user.is_guest){
      router.replace('/')
    }
    const {data:listings} = useGetHostListings(axiosAuth)
    console.log(listings)
  return (
    <div>
      <h1>Host</h1>
      <Link href={`/host/${hostId}/homes/new`}>Create listing</Link>
      <section>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 justify-center'>
      {listings && listings?.map((home)=>(
          <PostCard key={home.id} image={home.images[0].image} guests={home.guests} title={home.title} location={home.location} price={home.pricing} />
        ))}
      </div>
      </section>
    </div>
  )
}

export default Host
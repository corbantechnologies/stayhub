'use client';

import { useGetHostListings } from "@/actions/react-query/queriesAndMutations";
import Listings from "@/components/custom/Listings";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Host() {
    const axiosAuth = useAxiosAuth()
    const router = useRouter()
    const {data:session} = useSession()
    if(session?.user.is_guest){
      router.replace('/')
    }
    const {data:listings} = useGetHostListings(axiosAuth)
  return (
    <div>
      <section>
      <Listings homes={listings}/>
      </section>
    </div>
  )
}

export default Host
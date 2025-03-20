'use client';

import { useGetHostListings } from "@/actions/react-query/queriesAndMutations";
import Listings from "@/components/custom/Listings";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useParams } from "next/navigation";

function MyListings() {
  const {hostId} = useParams()
    const axiosAuth = useAxiosAuth()
    const {data:listings} = useGetHostListings(axiosAuth)
  return (
    <div>
      <section>
      <Listings homes={listings} hostId={hostId}/>
      </section>
    </div>
  )
}

export default MyListings
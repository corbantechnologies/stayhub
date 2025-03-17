'use client';

import { useGetGlobalListings } from "@/actions/react-query/queriesAndMutations";
import Listings from "@/components/custom/Listings";
import homes from "@/lib/homes";
import { Loader2 } from "lucide-react";

function Home() {
  const {data:listings, isPending} = useGetGlobalListings()
  if(isPending){
    return <div className="h-screen grid place-content-center"> <Loader2 className='animate-spin'/> </div>
  }
  console.log(listings)
  return (
    <div>
      <section>
      <Listings homes={listings}/>
      </section>
    </div>
  )
}

export default Home
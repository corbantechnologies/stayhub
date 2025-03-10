'use client';

import { useGetHostListings } from "@/actions/react-query/queriesAndMutations";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Host({params:{hostId}}) {
    const axiosAuth = useAxiosAuth()
    const {data:session} = useSession()
    // const {data: listings} = useGetHostListings(axiosAuth)
  return (
    <div>
      <h1>Host</h1>
      <Link href={`/host/${hostId}/homes/new`}>Create listing</Link>
    </div>
  )
}

export default Host
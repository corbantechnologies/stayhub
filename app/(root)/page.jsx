'use client';

import PostCard from "@/components/custom/PostCard"
import homes from "@/lib/homes";
import { useSession } from "next-auth/react";

function Home({}) {
  const session = useSession();
  return (
    <div>
      <section>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 justify-center'>
      {homes?.map((home)=>(
          <PostCard key={home.id} image={home.image} title={home.title} location={home.location} features={home.features} price={home.price} />
        ))}
      </div>
      </section>
    </div>
  )
}

export default Home
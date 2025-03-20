import PostCard from "./PostCard"

function Listings({homes, hostId}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6 justify-center'>
      {Array.isArray(homes) && homes.length > 0 ? 
       homes?.map((home)=>(
          <PostCard key={home.id} listingId={home.reference} images={home.images} title={home.title} location={home.location} features={home.features} price={home.pricing} hostId={hostId} />
        ))
      :
      null
}
      </div>
  )
}

export default Listings
import PostCard from "./PostCard"

function Listings({homes}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6 justify-center'>
      {homes?.map((home)=>(
          <PostCard key={home.id} listingId={home.reference} images={home.images} title={home.title} location={home.location} features={home.features} price={home.pricing} />
        ))}
      </div>
  )
}

export default Listings
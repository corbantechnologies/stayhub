'use client';

import { useGetSingleListing } from '@/actions/react-query/queriesAndMutations';
import { ProductForm } from './components/PostForm';

function Listing({params:{homeId}}) {
  const { data:listing, error, isLoading } = useGetSingleListing(homeId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* {homeId !== 'new' ? <ProductForm initialData={listing}/> : <ProductForm/> } */}
      <ProductForm/>
    </div>
  )
}

export default Listing
'use client';

import { useGetSingleListing } from '@/actions/react-query/queriesAndMutations';
import { ProductForm } from './components/PostForm';
import { Loader2 } from 'lucide-react';

function Listing({params:{homeId}}) {
  const { data:listing, error, isPending } = useGetSingleListing(homeId);

  if (isPending) return <div><Loader2 className='animate-spin' /></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* {homeId !== 'new' ? <ProductForm initialData={listing}/> : <ProductForm/> } */}
      <ProductForm/>
    </div>
  )
}

export default Listing
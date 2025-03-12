import{
  useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
}from '@tanstack/react-query'
import { QUERY_KEYS } from './queryKeys'
import { createListing, getGlobalListings, getHostListings, getSingleListing, updateListing } from '@/services/posts'

export const useRegisterUser = ()=>{
    return useMutation({
        mutationFn:(data)=> userRegistration(data.user, data.values),
    })
}
export const useCreateListing = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data)=> createListing(data.values, data.axiosAuth),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getListings'] })
        }
    })
}
export const useGetHostListings = (axiosAuth)=>{
    return useQuery({
        queryKey: [QUERY_KEYS.GET_LISTINGS],
        queryFn:()=> getHostListings(axiosAuth),
        enabled:!!axiosAuth
      });
}
export const useGetGlobalListings = ()=>{
    return useQuery({
        queryKey: [QUERY_KEYS.GET_GLOBAL_LISTINGS],
        queryFn:()=> getGlobalListings(),
      });
}
export const useGetSingleListing = (listingId)=>{
    return useQuery({
        queryKey: [QUERY_KEYS.GET_GLOBAL_LISTINGS],
        queryFn:()=> getSingleListing(listingId),
        enabled:!!listingId && listingId !== 'new'
      });
}
export const useUpdateListing = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data)=> updateListing(data.listingId, data.values, data.axiosAuth),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getListings'] })
        }
    })
}




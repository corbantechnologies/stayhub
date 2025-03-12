import { urlActions, urlMultipartActions } from "@/tools/api";

export const createListing = async (values, axiosAuth) => {
  try {
    console.log(values,axiosAuth);
    const {data} = await urlMultipartActions.post(`/api/listings/`, values, axiosAuth);
    return data;
    
  } catch (error) {
    console.log('Error creating listing', error)
    return error;
  }
}

export const getHostListings = async (axiosAuth) => {
  try {
    const {data} = await urlActions.get("/api/listings/",axiosAuth);
    return data.results;
  } catch (error) {
    console.log('Error fetching host listings', error)
    return error;
  }
};

export const getGlobalListings = async () => {
  try {
    const {data} = await urlActions.get("/api/listings/units/listings");
    return data.results;
  } catch (error) {
    console.log('Error fetching global listings', error)
    return error;
  }
};

export const getSingleListing = async (listingId) => {
  try {
    const {data} = await urlMultipartActions.get(`/api/listings/detail/${listingId}`);
    return data;
  } catch (error) {
    console.log('Error fetching single listing', error)
    return error;
  }
};

export const updateListing = async (listingId, values, axiosAuth) => {
  try {
    const {data} = await urlMultipartActions.patch(`/api/listing/${listingId}/`, values, axiosAuth);
    return data;
  } catch (error) {
    console.log('Error updating product', error)
    throw error
  }
};

import { urlActions, urlMultipartActions } from "@/tools/api";

export const userRegistration = async (user,values) => {
  try {
    const response = await urlActions.post(`/api/auth/signup/${user}/`, values);
    if (response.status === 201) {
      return { success: true };
    } 
  } catch (error) {
    console.log(`Error registering ${user}`, error)
    return error;
  }
};

export const verifyAccount = async (code) => {
  try {
    const response = await urlActions.post(`/api/auth/verify-account/`, code);
    if (response.status === 201) {
      return { success: true };
    }  
  } catch (error) {
    console.log('Error verifying account', error)
    return error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await urlActions.post(`/api/auth/password/reset/`, email);
    if (response.status === 201) {
      return { success: true };
    } 
  } catch (error) {
    console.log('Error submitting email for password reset', error)
    return error;
  }
};

export const resetPassword = async (code,password) => {
  try {
    const {data} = await urlActions.post(`/api/auth/password/new/`, code,password);
    return data; 
  } catch (error) {
    console.log('Error resetting password', error)
    return error;
  }
};

export const getUser = async (userId, axiosAuth) => {
  try{
    const response = await urlActions.get(`/api/auth/${userId}`,axiosAuth);
    return response.data;
  }catch(error){
    console.log('Error fetching user', error)
    // throw new Error('User not found');
  }
};

export const updateUser = async (userId, formData, axiosAuth) => {
  await urlMultipartActions?.patch(`/api/auth/${userId}/`, formData, axiosAuth);
};

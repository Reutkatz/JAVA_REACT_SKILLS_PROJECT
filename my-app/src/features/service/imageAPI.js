import  axios  from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getImagesAPI = async ()=>{
    return await axiosInstance.get('http://localhost:8082/api/Images/getImagesDTO');
};
export const delleteImageAPI = async (id)=>{
    return await axiosInstance.delete(`http://localhost:8082/api/Images/deleteImage/${id}`);
};
export const uploadAPI = async (image)=>{
    return await axiosInstance.post('http://localhost:8082/api/Images/upload',image);
   
};

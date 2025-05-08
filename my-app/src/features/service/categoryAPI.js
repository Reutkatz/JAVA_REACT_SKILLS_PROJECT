import  axios  from "axios";
const server='http://localhost:'
const port='8082'

const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getCategorysDTOAPI = async ()=>{
    return await axiosInstance.get(`${server+port}/api/Categorys/getCategorysDTO`);
};
export const getCategorysAPI = async ()=>{
    return await axiosInstance.get(`${server+port}/api/Categorys/getCategorys`);
};

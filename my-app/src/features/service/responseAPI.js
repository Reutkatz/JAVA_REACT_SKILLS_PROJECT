import  axios  from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getResponsesAPI = async ()=>{
    return await axiosInstance.get('http://localhost:8082/api/Responses/getResponses');
};
export const addResponseAPI = async (response)=>{
    return await axiosInstance.post('http://localhost:8082/api/Responses/addRespons',response);
};
export const delleteResponseAPI = async (id)=>{
    return await axiosInstance.delete(`http://localhost:8082/api/Responses/deleteRespons/${id}`);
};
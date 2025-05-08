import  axios  from "axios";
const server='http://localhost:'
const port='8082'


const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getInterestFieldsAPI = async ()=>{
    return await axiosInstance.get(`${server+port}/api/InterestFields/getInterestFields`);
};
export const addInterestFieldAPI = async (interestField)=>{
    return await axiosInstance.post(`${server+port}/api/InterestFields/addInterestField`,interestField);
};
export const delleteInterestFieldAPI = async (id)=>{
    return await axiosInstance.delete(`${server+port}/api/InterestFields/deleteInterestField/${id}`);
};
export const getInterestFieldByNameAPI = async (name, userName) => {
    return await axiosInstance.get(`${server+port}/api/InterestFields/getInterestFieldByName/${name}`, {
        params: { userName: userName }
    });
};
export const getInterestFieldsByUserIdAPI = async (userId) => {
    const response = await axiosInstance.get(`${server+port}/api/InterestFields/getInterestFields`); 
    const allInterestFields = response.data;
    const filteredInterestFields = allInterestFields.filter(
        (interestField) => interestField.user && interestField.user.id === userId
    );
    return filteredInterestFields; 
};
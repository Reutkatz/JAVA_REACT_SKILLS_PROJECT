import axios from "axios";
const server = 'http://localhost:'
const port = '8082'

const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getUsersAPI = async () => {
    return await axiosInstance.get(`${server + port}/api/Users/getUsersDTO`);
};
export const addUserAPI = async (user) => {
    return await axiosInstance.post(`${server + port}/api/Users/addUser`, user);
};
export const updateUserAPI = async (id, user) => {
    return await axiosInstance.put(`${server + port}/api/Users/updateUser/${id}`, user);
};
export const loginUserAPI = async (user) => {
    return await axiosInstance.post(`${server + port}/api/Users/LogIn`, user);
};
export const getUserDTOByIdAPI = async (id) => {
    const response = await axiosInstance.get(`${server + port}/api/Users/getUserDTO/${id}`);
    return response.data
};
export const uploadAPI = async (user) => {
    return await axiosInstance.post(`${server + port}/api/Users/upload`, user);
};
export const signoutAPI = async () => {
    return await axiosInstance.post(`${server + port}/api/Users/signout`);
};

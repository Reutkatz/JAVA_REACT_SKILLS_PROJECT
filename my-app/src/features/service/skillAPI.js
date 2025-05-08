import  axios  from "axios";


const axiosInstance = axios.create({
    withCredentials: true,
  });
export const getSkillsAPI = async ()=>{
    return await axiosInstance.get('http://localhost:8082/api/Skills/getSkills');
};
export const addSkillAPI = async (skill)=>{
    return await axiosInstance.post('http://localhost:8082/api/Skills/addSkill',skill);
};
export const updateSkillAPI = async (id,skill)=>{
    console.log("api:" +skill);
    return await axiosInstance.put(`http://localhost:8082/api/Skills/updateSkill/${id}`,skill);
};
export const delleteSkillAPI = async (id)=>{
    return await axiosInstance.delete(`http://localhost:8082/api/Skills/deleteSkill/${id}`);
};

export const addHeartAPI = async (id)=>{
    return await axiosInstance.put(`http://localhost:8082/api/Skills/addHeart/${id}`);
};


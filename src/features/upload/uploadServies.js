import axios from "axios";
import { config } from "../../utils/axiosconfig";

const uploadImg = async (data) => {
    const response = await axios.post('http://localhost:5000/api/upload', data, config);
    return response.data;
};

const deleteImg = async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/upload/delete-img/${id}`, config);
    return response.data;
};

const uploadServices = {
    uploadImg,
    deleteImg
};

export default uploadServices;


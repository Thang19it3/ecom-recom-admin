import axios from "axios";
import {
    config
} from "../../utils/axiosconfig";


const getColors = async () => {
    const response = await axios.get('http://localhost:5000/api/color/');

    return response.data;
};

const createColor = async (color) => {
    const response = await axios.post('http://localhost:5000/api/color/', color, config);

    return response.data;
};

const getColor = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/color/${id}`, config);

    return response.data;
};

const updateColor = async (color) => {
    const response = await axios.put(
        `http://localhost:5000/api/color/${color.id}`, {
            title: color.colorData.title
        },
        config
    );

    return response.data;
};

const deleteColor = async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/color/${id}`, config);

    return response.data;
};

const colorService = {
    getColors,
    createColor,
    getColor,
    updateColor,
    deleteColor
};

export default colorService;
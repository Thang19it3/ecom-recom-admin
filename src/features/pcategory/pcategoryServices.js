import axios from "axios";
import {
    config
} from "../../utils/axiosconfig";


const getProductCategory = async () => {
    const response = await axios.get('http://localhost:5000/api/category/');

    return response.data;
};
const createCategory = async (category) => {
    const response = await axios.post('http://localhost:5000/api/category/', category, config);

    return response.data;
};

const getProductCategoryss = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/category/${id}`, config);

    return response.data;
};

const deleteProductCategory = async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/category/${id}`, config);

    return response.data;
};

const updateProductCategory = async (category) => {
    const response = await axios.put(
        `http://localhost:5000/api/category/${category.id}`, {
            title: category.pCatData.title
        },
        config
    );

    return response.data;
};


const pcategoryService = {
    getProductCategory,
    createCategory,
    getProductCategoryss,
    deleteProductCategory,
    updateProductCategory
};

export default pcategoryService;
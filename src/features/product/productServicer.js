import axios from "axios";
import {
    config
} from "../../utils/axiosconfig";
import { config1 } from "../auth/authServices";

const getProduct = async () => {
    const response = await axios.get('http://localhost:5000/api/product/');

    return response.data;
};
const createProduct = async (product) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/product/`, product, config);

        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
        throw new Error('Failed to create product');
    }
};

const createProduct1 = async (product) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/product/`, product, config1);

        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
        throw new Error('Failed to create product');
    }
};

const updateProduct = async (product) => {
    console.log(product);
    const response = await axios.put(`http://localhost:5000/api/product/${product?.id}`, {
        tags: product?.tags,
        isSale: product?.isSale,
        timeSale: product?.timeSale,
        isDiscount: product?.isDiscount,
    }, config);
    console.log(response.config)
     console.log(response.data);
    return response.data;
};

const exProduct = async () => {
    const response = await axios.get('http://localhost:5000/api/product/export-product-title');

    return response.data;
};

const productService = {
    getProduct,
    createProduct,
    createProduct1,
    updateProduct,
    exProduct
};

export default productService;
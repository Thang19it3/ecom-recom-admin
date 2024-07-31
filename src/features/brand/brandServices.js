import axios from "axios";
import {
    config
} from "../../utils/axiosconfig";


const getBrands = async () => {
    const response = await axios.get('http://localhost:5000/api/brand/');

    return response.data;
};
const createBrand = async (brand) => {
    const response = await axios.post(`http://localhost:5000/api/brand/`, brand, config);

    return response.data;
};

const getBrand = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/brand/${id}`, config);

    return response.data;
};

const updateBrand = async (brand) => {
  const response = await axios.put(
    `http://localhost:5000/api/brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

  return response.data;
};

const deleteBrand = async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/brand/${id}`, config);

    return response.data;
};

const brandService = {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
};

export default brandService;
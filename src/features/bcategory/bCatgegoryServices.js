import axios from "axios";
import {
    config
} from "../../utils/axiosconfig";


const getBlogCategories = async () => {
    const response = await axios.get('http://localhost:5000/api/blogcategory/');

    return response.data;
};
const createBlogCategory = async (bcat) => {
    const response = await axios.post('http://localhost:5000/api/blogcategory/', bcat, config);

    return response.data;
};

const updateBlogCategory = async (blogCat) => {
  const response = await axios.put(
    `http://localhost:5000/api/blogcategory/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config
  );

  return response.data;
};

const getBlogCategory = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/blogcategory/${id}`, config);

    return response.data;
};

const deleteBlogCategory = async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/blogcategory/${id}`, config);

    return response.data;
};

const bCategoryService = {
    getBlogCategories,
    createBlogCategory,
    updateBlogCategory,
    getBlogCategory,
    deleteBlogCategory
};

export default bCategoryService;
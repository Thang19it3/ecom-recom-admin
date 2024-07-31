import { React, useEffect, useState } from "react";
import Custominput from '../Component/Custominput'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import "react-quill/dist/quill.snow.css";
import { createNewblogCat, resetState, getABlogCat, updateABlogCat } from "../features/bcategory/bCategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const AddBlogCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];

  
   const newBlogCategory = useSelector((state) => state.bCategory);
    const {
      isSuccess,
      isError,
      isLoading,
      createBlogCategory,
      blogCatName,
      updatedBlogCategory,
    } = newBlogCategory;

    useEffect(() => {
      if (getBlogCatId !== undefined) {
        dispatch(getABlogCat(getBlogCatId));
      } else {
        dispatch(resetState());
      }
    }, [getBlogCatId]);

    useEffect(() => {
      if (isSuccess && createBlogCategory) {
        toast.success("Blog Category Successfullly!");
      }

      if (isSuccess && updatedBlogCategory) {
        toast.success("Blog Category Updated Successfullly!");
        navigate("/admin/blog-category-list");
      }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getBlogCatId, blogCatData: values };
      if (getBlogCatId !== undefined) {
        dispatch(updateABlogCat(data));
        dispatch(resetState());
      } else {
        dispatch(createNewblogCat(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        })
      }
    },
  });
  return (
    <div>
      <h3>{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
      <form action="" onSubmit={formik.handleSubmit}>
        <Custominput
          type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Blog Category"
            id="blogcat"
        />
        <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
        <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
          {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</button>
      </form>
    </div>
  )
}

export default AddBlogCart

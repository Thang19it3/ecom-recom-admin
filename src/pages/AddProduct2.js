import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Custominput from '../Component/Custominput'
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import {  useFormik } from 'formik';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"
import { getBrands } from './../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import {  getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from 'react-dropzone';
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts,exProducts,resetState } from "../features/product/productSlice";
import { toast } from "react-toastify";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  height: yup.string().required("Height is Required"),
  length: yup.string().required("length is Required"),
  width: yup.string().required("width is Required"),
  weight: yup.string().required("weight is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quanlity: yup.number().required("Quantity is Required"),
});

const Addproduct2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  console.log(color);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);
  
  const userState = useSelector((state) => state?.auth?.loginbrand);
  
  const brandState = useSelector((state) => state?.brand?.brands);
  const userBrand = brandState?.find((brand) => brand?.userId?._id === userState?._id)
  const idUser = userBrand?.userId?._id
  console.log(userState?._id)
  const filteredBrandState = brandState?.filter((brand) => brand?.userId?._id === idUser);
  const getBrand = filteredBrandState?.map((brand) => brand.title);
  const brandTitlesString = getBrand ? getBrand?.join(', ') : '';
  console.log(brandTitlesString);
  const catState = useSelector((state) => state?.pCategory?.pCategories);
  const colorState = useSelector((state) => state?.color?.colors);
  const imgState = useSelector((state) => state?.upload?.images);
  const newProduct = useSelector((state) => state?.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  console.log(img);
  useEffect(() => {
    formik.setFieldValue('brand', brandTitlesString || ''); // Gán giá trị cho trường 'brand' trong formik
  }, [brandTitlesString]);

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quanlity: "",
      height: "",
      length: "",
      width: "",
      weight: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
      dispatch(createProducts(values))
      dispatch(exProducts())
      navigate('/brand/list-product')
    },
  });
  const handleColors = (e) => {
    setColor(e);
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <Custominput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <Custominput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
         
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="NEW">NEW</option>
            <option value="BESTSELLER">BESTSELLER</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <Custominput
            type="number"
            label="Enter Product Quantity"
            name="quanlity"
            onChng={formik.handleChange("quanlity")}
            onBlr={formik.handleBlur("quanlity")}
            val={formik.values.quanlity}
          />
          <div className="error">
            {formik.touched.quanlity && formik.errors.quanlity}
          </div>

          <Custominput
            type="number"
            label = "Enter Product height"
            name="height"
            onChng={formik.handleChange("height")}
            onBlr={formik.handleBlur("height")}
            val = {
              formik.values.height
            }
          />
          <div className="error">
            {
              formik.touched.height && formik.errors.height
            }
          </div>

          
          <Custominput
            type="number"
            label = "Enter Product length"
            name="length"
            onChng={formik.handleChange("length")}
            onBlr={formik.handleBlur("length")}
            val = {
              formik.values.length
            }
          />
          <div className="error">
            {
              formik.touched.length && formik.errors.length
            }
          </div>

          <Custominput
            type="number"
            label = "Enter Product width"
            name="width"
            onChng={formik.handleChange("width")}
            onBlr={formik.handleBlur("width")}
            val = {
              formik.values.width
            }
          />
          <div className="error">
            {
              formik.touched.width && formik.errors.width
            }
          </div>

          <Custominput
            type="number"
            label = "Enter Product weight"
            name = "weight"
            onChng={formik.handleChange("weight")}
            onBlr={formik.handleBlur("weight")}
            val = {
              formik.values.weight
            }
          />
          <div className="error">
            {
              formik.touched.weight && formik.errors.weight
            }
          </div>

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct2;
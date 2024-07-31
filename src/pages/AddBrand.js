import { React, useEffect, useState } from "react";
import Custominput from '../Component/Custominput'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createBrand, getABrand, getBrands, resetState, updateABrand } from "../features/brand2/brandSlice"
import { getUsers } from '../features/Customer/customerSlice';
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import Dropzone from 'react-dropzone';

let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const imgState = useSelector((state) => state.upload.images);
  const customerstate = useSelector((state) => state.customer.customers);
  const brandState = useSelector((state) => state.brand.brands)
  const [images, setImages] = useState([]);
  const [usersNotInBrand, setUsersNotInBrand] = useState([]);
    const {
      isSuccess,
      isError,
      isLoading,
      createdBrand,
      brandName,
      updatedBrand,
    } = newBrand;

     const img = [];
     imgState.forEach((i) => {
       img.push({
         public_id: i.public_id,
         url: i.url,
       });
     });
     console.log(img);

    useEffect(() => {
      dispatch(getUsers());
      dispatch(getBrands())
    }, []);

    useEffect(() => {
      if (getBrandId !== undefined) {
        dispatch(getABrand(getBrandId));

      } else {
        dispatch(resetState());
      }
    }, [getBrandId]);

    useEffect(() => {
      if (isSuccess && createdBrand) {
        toast.success("Brand Added Successfullly!");
      }
      if (isSuccess && updatedBrand) {
        toast.success("Brand Updated Successfullly!");
        navigate("/admin/list-brand");
      }

      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);
    useEffect(() => {
      formik.values.images = img;
    }, [img]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
      userId: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined)
      {
        const data = {id: getBrandId, brandData: values};
        dispatch(updateABrand(data))
        dispatch(resetState());
        
      } else {
        alert(JSON.stringify(values));
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        },3000)
      }
    },
  });


  return (
    <div>
      <h3> {getBrandId !== undefined ? "Edit" : "ADD"} Brand</h3>
      <form  action = ''
      onSubmit = {
        formik.handleSubmit
      } >
        <Custominput type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Brand"
            id="brand" />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            name = "userId"
            onChange={formik.handleChange("userId")}
            onBlur={formik.handleBlur("userId")}
            value={formik.values.userId}
            className="form-control py-3 mb-3"
            id=""
            style={{ marginTop:'20px'}}
          >
            <option value="">Select User</option>
            {
              customerstate.filter((user)=>user.role === "brand")
              .map((user, index)=> {
                return(
                <option key={index} value={user._id}>
                  {user.firstname} {user.lastname}
                </option>)
              })
            }
          </select>
          {getBrandId !== undefined && newBrand.userId !== formik.values.userId && (
            <div className="error">Selected user doesn't match brand's user</div>
          )}
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
            {getBrandId !== undefined ? "Edit" : "ADD"} Brand
          </button>
      </form>
    </div>
  )
}

export default AddBrand

import { React, useEffect } from "react";
import Custominput from '../Component/Custominput'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCoupon, resetState } from "../features/coupon/couponSlice"

let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
});

const AddCoupon = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   const getCouponId = location.pathname.split("/")[3];
   const newCoupon = useSelector((state) => state.coupon);
    const {
      isSuccess,
      isError,
      isLoading,
      createdCoupon,
    } = newCoupon;

    useEffect(() => {
      if (isSuccess && createdCoupon) {
        toast.success("Brand Added Successfullly!");
      }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCoupon]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
     try {
       // Dispatch action with serializable payload
       dispatch(createCoupon(values)); // Pass values to createCoupon action
       formik.resetForm();
     } catch (error) {
       // Handle error or dispatch a relevant action
       console.error("Error occurred:", error);
       // Dispatch action to reset state or handle the error state
       dispatch(resetState());
     }
      
    },
  });


  return (
    <div>
      <h3>Add Coupon</h3>
      <form  action = ''
      onSubmit = {
        formik.handleSubmit
      } >
        <Custominput 
            type="text"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            label="Enter Coupon Name"
            id="name"
            />
        <div className="error">
            {formik.touched.name && formik.errors.name}
        </div>
        <Custominput
            type="date"
            name="expiry"
            onChng={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            label="Enter Expiry Data"
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <Custominput
            type="number"
            name="discount"
            onChng={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
            label="Enter Discount"
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
            <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Coupon
          </button>
      </form>
    </div>
  )
}

export default AddCoupon

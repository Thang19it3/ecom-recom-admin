import React, { useEffect } from 'react'
import Custominput from './../Component/Custominput';
import { Link, useNavigate } from 'react-router-dom';
import {useFormik} from "formik"
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../features/auth/authSlice";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let schema = Yup.object().shape({
    email: Yup.string().email("Email should be valid").required("Email is REquired"),
    password: Yup.string().required("Password is Required")
  })
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth);
  console.log(user);
  useEffect(()=>{
    if (!user == null || isSuccess)
    {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message]);
  return (
    <div className='py-5' style={{ background: "#ffd333", height: "100vh"}}>
      <div className='my-5 w-25 bg-white rounded-3 mx-auto my-5 p-4'>
        <h3 className='text-center title'>Login</h3>
        <div className='error text-center'>
          {message.message == "Rejected" ? "You are not an admin" : ""}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Custominput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className='error'>
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <Custominput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className='error'>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <button  className='border-0 px-3 py-2 text-white fw-bold w-100 text-center' style={{ background: "#ffd333"}} type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login

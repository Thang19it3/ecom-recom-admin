import React, { useEffect, useState } from 'react';
import {
    Table
} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getBrands,resetState, deleteABrand } from '../features/brand/brandSlice';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomModal from './../Component/CustomModal';



const columns = [{
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.length - b.name.length,
    }, {
      title: "userId",
      dataIndex: "userId",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];


const BrandList = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
     const [brandId, setbrandId] = useState("");

    const showModal = (e) => {
      setOpen(true);
      setbrandId(e);
    };

    const hideModal = () => {
      setOpen(false);
    };

    useEffect(()=>{
        dispatch(resetState());
        dispatch(getBrands());
    },[])
    const brandState = useSelector((state) => state.brand.brands);

    const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title, 
      userId: brandState[i].userId,
      action: (
        <>
          <Link
            to={`/admin/brand/${brandState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brandState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
      navigate("/admin/list-brand");
    }, 1000);
  };
    return (
    <div>
        <h3 className = 'mb-4' > Brand List </h3> 
        <div >
          <Table columns = {columns} dataSource = {data1}/> 
        </div> 
        <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
    )
}

export default BrandList
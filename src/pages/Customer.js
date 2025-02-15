import React, { useEffect } from 'react';
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { editUsers, getUsers } from '../features/Customer/customerSlice';

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  }, {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  }, {
    title: "Email",
    dataIndex: "email",
  }, {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Role",
    dataIndex: "role",
  }
];
const Customer = () => {
   const dispatch = useDispatch();
   useEffect(() => {
     dispatch(getUsers());
   }, []);
   const customerstate = useSelector((state) => state.customer.customers);
   const data1 = [];
   for (let i = 0; i < customerstate.length; i++) {
     if (customerstate[i].role !== "admin") {
       data1.push({
         key: i + 1,
         name: customerstate[i].firstname + " " + customerstate[i].lastname,
         email: customerstate[i].email,
         mobile: customerstate[i].mobile,
         role: (
          <>
            <select
            name=""
            defaultValue={customerstate[i].role ? customerstate[i].role : "user"}
            className="form-control form-select"
            id=""
             onChange = {
               (e) => setUserStatus(e.target.value, customerstate[i]._id)
             }
          >
            <option value="brand">Brand</option>
            <option value="user">User</option>
          </select>
          </>
         ),
       });
     }
   };

   const setUserStatus = (e , i) => {
     const data = {
      id: i,
      useRoleData: e,
     };
     dispatch(editUsers(data));
   }

  return (
    <div>
      <h3 className='mb-4'>Customer</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Customer

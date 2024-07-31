import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice"
import { getAllOrder, updateAOrder } from "../features/order/orderSlice";
import { getProducts } from "../features/product/productSlice";
import { getUsers } from "../features/Customer/customerSlice";

const columns = [{
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Status",
    dataIndex: "status",
  },

];


const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrder());
    dispatch(getProducts());
    dispatch(getUsers());
  }, []);
  const orderState = useSelector((state) => state?.order?.orders);
  const productState = useSelector((state) => state.product.products);
  const customerstate = useSelector((state) => state.customer.customers);
  console.log(orderState)

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  
  const data = orderState.map((order, index) => {

    const customer = customerstate.find((customer) => customer._id === order.user);
     const customerName = customer ? customer.firstname : "Customer Not Found";

    const products = order.orderItems.map((item, j) => {
      const matchedProduct = productState.find(
        (product) => product._id === item.product
      );
      const title = matchedProduct ? matchedProduct.title : "Product Not Found";
      return (
        <ul key={j}>
          <li>{title}</li>
        </ul>
      );
    });
    let statusButton = null;

    switch (order.orderStatus) {
      case "Ordered":
        statusButton = (
          <button style={{backgroundColor:'#2150cc', color:'#fff',border:'none',padding:'10px 20px',borderRadius:'10px'}} onClick = {
            () => setUserStatus("xác nhận", order._id)
          } >
            Xác nhận
          </button>
        );
        break;
      case "xác nhận":
        statusButton = (
          <button style = {
            {
              backgroundColor: '#2150cc',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px'
            }
          }
          onClick = {
            () => setUserStatus("Giao Hàng", order._id)
          } >
            Giao hàng
          </button>
        );
        break;
      case "Đã nhận":
        statusButton = (
          <button  style = {
            {
              backgroundColor: '#2150cc',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px'
            }
          }
          onClick = {
            () => setUserStatus("Hoàn Thành", order._id)
          } >
            Hoàn thành
          </button>
        );
        break;
      default:
        statusButton = null;
        break;
    }

    return {
      key: index + 1,
      name: customerName,
      product: products,
      amount: formatter.format(order.totalPriceAfterDiscount),
      date: new Date(order.createdAt).toLocaleString(),
      status: statusButton,
    };
  });
  const setUserStatus = (e, i) => {
    const data = {
      id: i,
      orderStatus: e,
    };
    console.log(data)
    dispatch(updateAOrder(data));
  }
  return (
    <div>
      <h3 className='mb-4'>Orders</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default Orders

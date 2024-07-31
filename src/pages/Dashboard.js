import React, { useEffect } from "react";
import {
  BsArrowDownRight,
  BsArrowUpRight
} from "react-icons/bs";
import { Column } from "@ant-design/charts";
import { Table } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from "../features/product/productSlice";
import { getUsers } from "../features/Customer/customerSlice";
import { getAllOrder, updateAOrder } from "../features/order/orderSlice";
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

const Dashboard = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
    dispatch(getAllOrder());
  }, []);

  const productState = useSelector((state) => state.product.products);
  const totalProducts = productState.length;
  const customerstate = useSelector((state) => state.customer.customers);
  const totalUser = customerstate.length;
  const orderState = useSelector((state) => state?.order?.orders);
  const totalPriceSum = orderState.reduce((sum, order) => {
    const orderTotalPrice = parseFloat(order.totalPrice);

    // Check if orderTotalPrice is a valid number
    if (!isNaN(orderTotalPrice)) {
      return sum + orderTotalPrice;
    } else {
      // Log or handle the case where totalPrice is not a valid number
      console.error(`Invalid totalPrice value in order: ${JSON.stringify(order)}`);
      return sum;
    }
  }, 0);

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
      <h3 className='mb-4'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex justify-content-between align-items-end bg-white p-3 roudned-3 col-4'>
          <div>
            <p className=''>Total Product</p>
            <h4 className='mb-0'>{totalProducts}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'><BsArrowUpRight />34%</h6>
            <p className='mb-0'>Compare To April</p>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-end bg-white p-3 roudned-3 col-4'>
          <div>
            <p className=''>Total User</p>
            <h4 className='mb-0'>{totalUser}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'><BsArrowUpRight />34%</h6>
            <p className='mb-0'>Compare To April</p>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-end bg-white p-3 roudned-3 col-4'>
          <div>
            <p className=''>Total Order</p>
            <h4 className='mb-0'>{formatter.format(totalPriceSum)}</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'><BsArrowUpRight />34%</h6>
            <p className='mb-0'>Compare To April</p>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h3>Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>

      
    </div>
  )
}

export default Dashboard

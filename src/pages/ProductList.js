import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, updateAProduct } from "../features/product/productSlice";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    width: 150,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Sale",
    dataIndex: "isSale",
  },
  {
    title: "Button",
    dataIndex: "button",
  }
];

const Productlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
  const productState = useSelector((state) => state.product.products);
  const handleSale1Click = (productId) => {
    console.log(productId);
    // Thực hiện dispatch với giá trị iSale = '1' và timeSale = "3000"
    dispatch(updateAProduct({
        id: productId,
        tags: "SALE",
        isSale: 1,
        timeSale: 50000,
        isDiscount: 30
      }))
      .then(() => {
        // Reload the page after the update is successful
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors if needed
        console.error("Error updating product:", error);
      });

  };
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `${formatter.format(productState[i].price)}`,
      isSale: productState[i].isSale === 1 ? <h6>Sale</h6> : <h6>Not Sale</h6>,
      button: (
        <>
          <button onClick={()=> handleSale1Click(productState[i]._id)} style={{ backgroundColor: '#ed4b4b', border:'none', padding:'10px 20px', color: 'white', borderRadius:'5px', marginRight:'5px'}}>30%</button>
          <button onClick={()=> handleSale1Click(productState[i]._id)} style={{ backgroundColor: '#ed4b4b', border:'none', padding:'10px 20px', color: 'white', borderRadius:'5px'}}>50%</button>
        </>
      ),
    });
  }
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
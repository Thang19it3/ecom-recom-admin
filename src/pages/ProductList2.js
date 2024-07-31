import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, updateAProduct } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { getColors } from "../features/color/colorSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
    width: 200,
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
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Sale",
    dataIndex: "isSale",
  },
   {
     title: "Action",
     dataIndex: "action",
   },
];

const Productlist2 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getColors());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const brandState = useSelector((state) => state?.brand?.brands);
  const userState = useSelector((state) => state?.auth?.loginbrand);
  const userBrand = brandState.find((brand) => brand?.userId?._id === userState?._id)
  const colorState = useSelector(state => state?.color?.colors)
  
  const handleSale1Click = (productId) => {
    // Thực hiện dispatch với giá trị iSale = '1' và timeSale = "3000"
    dispatch(updateAProduct({ id: productId,tags: "SALE", isSale: 1, timeSale: 50000, isDiscount:30}));
  };

  const handleSale2Click = (productId) => {
    // Thực hiện dispatch với giá trị iSale = '1' và timeSale = "3000"
    dispatch(updateAProduct({ id: productId,tags: "SALE", isSale: 1, timeSale: 500000, isDiscount:50}));
  };

  const handleSale3Click = (productId) => {
    // Thực hiện dispatch với giá trị iSale = '1' và timeSale = "3000"
    dispatch(updateAProduct({ id: productId,tags: "NEW", isSale: 0, timeSale: 0, isDiscount:0}));
  };

  const filteredProducts = productState.filter(
    (product) => product?.brand === userBrand?.title
  );



  
  console.log(colorState)
  const data1 = [];
  for (let i = 0; i < filteredProducts.length; i++) {
    data1.push({
      key: i + 1,
      title: filteredProducts[i].title,
      brand: filteredProducts[i].brand,
      category: filteredProducts[i].category,
      price: `${filteredProducts[i].price}`,
      isSale: productState[i].isSale === 1 ? <h6>Sale</h6> : <h6>Not Sale</h6>,
      action: (
         <>
          <button onClick={()=> handleSale1Click(productState[i]._id)} style={{ backgroundColor: '#ed4b4b', border:'none', padding:'10px 20px', color: 'white', borderRadius:'5px', marginRight:'5px'}}>30%</button>
          <button onClick={()=> handleSale2Click(productState[i]._id)} style={{ backgroundColor: '#ed4b4b', border:'none', padding:'10px 20px', color: 'white', borderRadius:'5px'}}>50%</button>
          <button onClick={()=> handleSale3Click(productState[i]._id)} style={{ backgroundColor: '#ed4b4b', border:'none', padding:'10px 20px', color: 'white', borderRadius:'5px', marginLeft:'5px'}}>Not Sale</button>
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

export default Productlist2;
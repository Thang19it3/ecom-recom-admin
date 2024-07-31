import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MainLayout from './Component/MainLayout';
import Login from './pages/Login';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCatList from './pages/BlogCatList';
import Orders from './pages/Orders';
import Customer from './pages/Customer';
import ColorList from './pages/ColorList';
import CategoryList from './pages/CategoryList';
import BrandList from './pages/BrandList';
import ProductList from './pages/ProductList';
import AddBlog from './pages/AddBlog';
import AddBlogCart from './pages/AddBlogCart';
import AddColor from './pages/AddColor';
import Addcat from './pages/Addcat';
import AddBrand from './pages/AddBrand';
import AddBrand2 from './pages/AddBrand2';
import AddProduct from './pages/AddProduct';
import Couponlist from './pages/Couponlist';
import AddCoupon from './pages/AddCoupon';
import ViewEnq from './pages/ViewEnq';
import BrandMenu from './pages/BrandMenu';
import LoginBrand from './pages/LoginBrand';
import MainLayoutBrand from './Component/MainLayoutBrand';
import Dashboard2 from './pages/Dashboard2';
import Addproduct2 from './pages/AddProduct2';
import Productlist2 from './pages/ProductList2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/login-brand' element={<LoginBrand />}/>
        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='enquiries/:id' element={<ViewEnq />} />
          <Route path='blog-list' element={<BlogList />} />
          <Route path='blog' element={<AddBlog />} />
          <Route path='blog/:id' element={<AddBlog />} />
          <Route path='blog-category' element={<AddBlogCart />} />
          <Route path='blog-category/:id' element={<AddBlogCart />} />
          <Route path='blog-category-list' element={<BlogCatList />} />
          <Route path='orders' element={<Orders />} />
          <Route path='customers' element={<Customer />} />
          <Route path='list-color' element={<ColorList />} />
          <Route path='color' element={<AddColor />} />
          <Route path='color/:id' element={<AddColor />} />
          <Route path='list-category' element={<CategoryList />} />
          <Route path='category' element={<Addcat />} />
          <Route path='category/:id' element={<Addcat />} />
          <Route path='list-brand' element={<BrandList />} />
          <Route path='brand' element={<AddBrand />} />
          <Route path='brand2' element={<AddBrand2 />} />
          <Route path='brand/:id' element={<AddBrand />} />
          <Route path='list-product' element={<ProductList />} />
          <Route path='product' element={<AddProduct />} />
          <Route path='coupon-list' element={<Couponlist />} />
          <Route path='coupon' element={<AddCoupon />} />
        </Route>
        <Route path = '/brand' element={<MainLayoutBrand />}>
          <Route index element={<Dashboard />} />
          <Route path='product' element={<Addproduct2 />} />
          <Route path='list-product' element={<Productlist2 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

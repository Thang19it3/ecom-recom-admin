import axios from "axios";
import {
    config
} from "../../utils/axiosconfig";

const getCoupons = async () => {
    const response = await axios.get(`http://localhost:5000/api/coupon`, config);

    return response.data;
};

const createCoupons = async (coupon) => {
    const response = await axios.post('http://localhost:5000/api/coupon', coupon, config);

    return response.data;
};

const getCoupon = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/coupon/${id}`, config);

    return response.data;
};

const updateCoupon = async (coupon) => {
    const response = await axios.put(
        `http://localhost:5000/api/coupon/${coupon.id}`, {
            name: coupon.couponData.name,
            expiry: coupon.couponData.expiry,
            discount: coupon.couponData.discount,
        },
        config
    );

    return response.data;
};

const deleteCoupon = async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/coupon/${id}`, config);

    return response.data;
};

const couponService = {
    getCoupons,
    createCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
};

export default couponService;
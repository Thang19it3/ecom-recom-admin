import axios from "axios";
import {
    config
} from "../../utils/axiosconfig";

const getOrders = async () => {
    const response = await axios.get(`http://localhost:5000/api/order`, config);
    return response.data;
};


const updateOrder = async (order) => {
    console.log(order);
    const response = await axios.put(
        `http://localhost:5000/api/order/${order.id}`, {
            orderStatus: order.orderStatus,
        },
        config
    );

    return response.data;
};


const orderService = {
    getOrders,
    updateOrder,
};

export default orderService;
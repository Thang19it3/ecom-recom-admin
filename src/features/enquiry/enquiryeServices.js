import axios from "axios";
import {
    config
} from "../../utils/axiosconfig";


const getEnquiries = async () => {
    const response = await axios.get('http://localhost:5000/api/enquiry/');

    return response.data;
};

const deleteEnquiry = async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/enquiry/${id}`, config);
    return response.data;
};

const getEnquiry = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/enquiry/${id}`);
    return response.data;
};
const udpateEnquiry = async (enq) => {
    const response = await axios.put(
        `http://localhost:5000/api/enquiry/${enq.id}`, {
            status: enq.enqData
        },
        config
    );
    return response.data;
};

const enquiryService = {
    getEnquiries,
    deleteEnquiry,
    getEnquiry,
    udpateEnquiry,
};

export default enquiryService;
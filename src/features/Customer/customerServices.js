import axios from "axios";
import { config } from "../../utils/axiosconfig";


const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/user/all-users');

    return response.data;
};

const updateUser = async (useRole) => {
    const response = await axios.put(`http://localhost:5000/api/user/edit-role/${useRole.id}`, {
        role: useRole.useRoleData
    }, config);
     return response.data;
}

const customerService = {
    getUsers,
    updateUser
};

export default customerService;
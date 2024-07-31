    import axios from "axios"

    const getTokenFromLocalStorage = localStorage.getItem("user") ?
        JSON.parse(localStorage.getItem("user")) :
        null;

    export const config = {
        headers: {
            Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
        }`,
            Accept: "application/json",
        },
    };

    const getTokenFromLocalStorage1 = localStorage.getItem("brand") ?
        JSON.parse(localStorage.getItem("brand")) :
        null;

    export const config1 = {
        headers: {
            Authorization: `Bearer ${
        getTokenFromLocalStorage1 !== null ? getTokenFromLocalStorage1.token : ""
        }`,
            Accept: "application/json",
        },
    };



    const login = async (user) => {
        const reponse = await axios.post('http://localhost:5000/api/user/admin-login', user);
        if(reponse.data) {
            localStorage.setItem('user',JSON.stringify(reponse.data));
        }
        return reponse.data;
    };
    const loginBrand = async (user) => {
        const reponse = await axios.post('http://localhost:5000/api/user/brand-login', user);
        if (reponse.data) {
            localStorage.setItem('brand', JSON.stringify(reponse.data));
        }
        return reponse.data;
    };
    const getOrders = async () => {
        const response = await axios.get('http://localhost:5000/api/user/all-oders');

        return response.data;
    };

    const logout = async () => {
        const response = await axios.get('http://localhost:5000/api/user/logout');

        return response.data;
    };


    const authService = {
        login,
        getOrders,
        loginBrand
    };
    export default authService;

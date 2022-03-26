import { create } from "apisauce";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.100.16:5000";

// Login
 const login = (email, pass) => {
    return axios.post("/users/login", { email, pass });
};

// Register
const register = (email, pass, name) => {
    return axios.post("/users", { name, email, pass });
};

// Create transaction
const createTransaction = (userEmail, carId, carName, carPrice) => {
    return axios.post("/transaction", { userEmail, carId, carName, carPrice });
};

export default {
    login,
    register,
    createTransaction
};

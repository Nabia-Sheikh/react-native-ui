import { create } from "apisauce";
import axios from "axios";

axios.defaults.baseURL = "https://sheltered-basin-07926.herokuapp.com/";

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

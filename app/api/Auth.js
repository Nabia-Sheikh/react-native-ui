import { create } from "apisauce";
import axios from "axios";
import { URL } from "./url";

axios.defaults.baseURL = URL;

// Login
const login = (email, pass) => {
  return axios.post("/users/login", { email, pass });
};

// Register
const register = (email, pass, name) => {
  return axios.post("/users", { name, email, pass });
};

// Create transaction
const createTransaction = (
  userEmail,
  carId,
  carName,
  carPrice,
  packageCategory,
  packageName,
  packagePrice
) => {
  return axios.post("/transaction", {
    userEmail,
    carId,
    carName,
    carPrice,
    packageCategory,
    packageName,
    packagePrice,
  });
};

// Create Feedback
const addFeedback = (name, email, message) => {
  return axios.post("/feedback", {
    name,
    email,
    message,
  });
};

const requestResetPassword = (email) => {
  return axios.post("/reset-password-request", {
    email,
  });
};

const verifyCode = (id, code) => {
  return axios.post("/verify-code", {
    id,
    code,
  });
};

const newPassword = (id, newPass) => {
  return axios.post("/new-password", {
    id,
    newPass,
  });
};

export default {
  login,
  register,
  createTransaction,
  addFeedback,
  requestResetPassword,
  verifyCode,
  newPassword,
};

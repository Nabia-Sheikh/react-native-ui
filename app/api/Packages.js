import { create } from "apisauce";
import axios from "axios";
import { URL } from "./url";

// Get packages by category
const getPackagesByCategory = (category) => {
  return axios.get(`/packages`);
};

// My transactions
const getMyTransactions = (userEmail) => {
  return axios.get(`/mytransactions`, {
    params: {
      email: userEmail,
    },
  });
  // return axios({
  //   method: "get",
  //   url: URL + "/mytransactions",
  //   headers: {},
  //   data: {
  //     email: userEmail,
  //   },
  // });
};

export default {
  getPackagesByCategory,
  getMyTransactions,
};

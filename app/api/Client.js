import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.100.16:5000",
});

export default apiClient;

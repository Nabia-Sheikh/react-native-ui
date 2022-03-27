import { create } from "apisauce";
import { URL } from "./url";

const apiClient = create({
  baseURL: URL
});

export default apiClient;

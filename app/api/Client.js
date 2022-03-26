import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://sheltered-basin-07926.herokuapp.com/",
});

export default apiClient;

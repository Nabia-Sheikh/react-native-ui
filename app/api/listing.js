import apiClient from "./Client";

const endpoint = "/cars";

const getListings = () => apiClient.get(endpoint);

const addListing = (listing) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);
  listing.images.forEach((image, i) => {
    data.append(`images`, {
      uri: image,
      name: "image_" + i + ".jpg",
      type: "image/jpeg",
    });
  });

  if (listing.location) {
    data.append("location", JSON.stringify(listing.location));
  }

 return apiClient.post(endpoint, data);
}




export default {
  addListing,
  getListings,
};

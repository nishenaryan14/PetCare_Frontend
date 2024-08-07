import axios from "axios";
const API_Key = "0baf619fe59b8580a66ba803f19cc246";
export const fetchFavoritePets = async (userId) => {
  if (!userId) {
    throw new Error("User ID is missing");
  }
  try {
    const response = await axios.get(
      // `http://192.168.38.17:8000/favorite-pets/${userId}/`
      `https://petcare-backend-eu7a.onrender.com/favorite-pets/${userId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite pets:", error);
    throw error;
  }
};

export const getCity = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_Key}`
    );
    // console.log(response.data[0].name);
    return response.data[0].name;
  } catch (error) {
    console.error(error);
  }
};

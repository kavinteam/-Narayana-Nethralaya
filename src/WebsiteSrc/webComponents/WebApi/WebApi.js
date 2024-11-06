import axios from "axios";
import { BASE_URL } from "../../../config";

const WebApi = {

  getDoctorsByPlace: async (requestData) => {
    try {
      const response = await axios.post(`${BASE_URL}/get_doctor_by_place`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Trouble getting doctors list", error.message);
      throw error;
    }
  },
  getDoctorById: async (requestData) => {
    try {
      const response = await axios.post(`${BASE_URL}/get_doctor_by_id`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Trouble getting doctors list", error.message);
      throw error;
    }
  },
  getDoctorReviews: async (requestData) => {
    try {
      const response = await axios.post(`${BASE_URL}/get_review_by_doctor`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Trouble getting doctors list", error.message);
      throw error;
    }
  },
  getLocationReviews: async (requestData) => {
    try {
      const response = await axios.post(`${BASE_URL}/get_review_by_place`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Trouble getting doctors list", error.message);
      throw error;
    }
  },

};

export default WebApi;

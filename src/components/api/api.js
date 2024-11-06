import axios from "axios";
import { BASE_URL } from "../../config";

const api = {
  login: async (userid, password, additionalData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/web_login`,
        {
          userid,
          password,
          ...additionalData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  },
  addNewDoctor: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/doctor_master_creation`,
        formData,
        {
          headers: {
            // "Content-Type": "application/json",
            // "Accept": "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Upload error:", error.message);
      throw error;
    }
  },

  getDashBoardData: async (requestData) => {
    try {
      const response = await axios.post(`${BASE_URL}/admin_graph`, requestData, {
        headers: {
          // "Content-Type": "application/json",
          // "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Trouble getting data:", error.message);
      throw error;
    }
  },
  getDoctors: async (requestData) => {
    try {
      const response = await axios.post(`${BASE_URL}/get_doctor`, requestData, {
        headers: {
          // "Content-Type": "application/json",
          // "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Trouble getting data:", error.message);
      throw error;
    }
  },
  delete_Doctors: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/doctor_deletion`, formData, {
        method: 'DELETE',
        headers: {
          // "Content-Type": "application/json",
          // "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Trouble deleting data:", error.message);
      throw error;
    }
  },

  get_New_Reviews: async (requestData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/get_new_review`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching fc data info data:", error.message);
      throw error;
    }
  },

  get_Doctors: async (requestData) => {
    try {
      const response = await axios.post(`${BASE_URL}/get_doctor`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching fc data info data:", error.message);
      throw error;
    }
  },

  review_Insertion: async (payload) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/posted_review_insertion`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching fc data info data:", error.message);
      throw error;
    }
  },

  review_Archived: async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/review_archived_update`,payload,{
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching fc data info data:", error.message);
      throw error;
    }
  },
};

export default api;

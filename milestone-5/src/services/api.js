import axios from "axios";

const baseURL =  "https://api.escuelajs.co/api/v1/";

/**
 * Makes a GET request to the specified endpoint.
 * @returns An object with `error` and `data` properties.
 */
export const getAPI = async (endpoint) => {
  try {
    const { data } = await axios.get(`${baseURL}${endpoint}`);
    return { error: false, data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific error
      return { error: true, data: error.response?.data || error };
    } else {
      // Handle non-Axios errors
      return { error: true, data: "An unexpected error occurred" };
    }
  }
};

/**
 * Makes a POST request to the specified endpoint with a payload.
 * @returns An object with `error` and `data` properties.
 */
export const postAPI = async (endpoint, payload) => {
  try {
    const { data } = await axios.post(`${baseURL}${endpoint}`, payload);
    return { error: false, data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific error and return the actual error data
      return { error: true, data: error.response?.data || error };
    } else {
      // Handle non-Axios errors
      return { error: true, data: "An unexpected error occurred" };
    }
  }
};

/**
 * Makes a PATCH request to the specified endpoint with a payload.
 * @returns An object with `error` and `data` properties.
 */
export const patchAPI = async (endpoint, payload) => {
  try {
    const data = await axios.patch(`${baseURL}${endpoint}`, payload);
    return { error: false, data: data.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, data: error.response?.data || error };
    } else {
      // Handle non-Axios errors
      return { error: true, data: "An unexpected error occurred" };
    }
  }
};

/**
 * Makes a PUT request to the specified endpoint with a payload.
 * @returns An object with `error` and `data` properties.
 */
export const putAPI = async (endpoint, payload) => {
  try {
    const data = await axios.put(`${baseURL}${endpoint}`, payload);
    return { error: false, data: data.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific error
      return { error: true, data: error.response?.data || error };
    } else {
      // Handle non-Axios errors
      return { error: true, data: "An unexpected error occurred" };
    }
  }
};

/**
 * Makes a DELETE request to the specified endpoint.
 * @returns An object with `error` and `data` properties.
 */
export const deleteAPI = async (endpoint) => {
  try {
    const { data } = await axios.delete(`${baseURL}${endpoint}`);
    return { error: false, data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific error
      return { error: true, data: error.response?.data || error };
    } else {
      // Handle non-Axios errors
      return { error: true, data: "An unexpected error occurred" };
    }
  }
};


import { VERIFY_TOKEN_ENDPOINT } from "@/configs/constants";
import axios from "axios";

export const verifyAndDecodeToken = async (token) => {
  // console.log("token passed to verifyAndDecodeToken = ", token);
  try {
    // set headers and make request
    const headers = {
      Authorization: `${token}`,
    };
    const response = await axios.get(VERIFY_TOKEN_ENDPOINT, { headers });
    // console.log("response from verifyAndDecodeToken = ", response.data);
    return response.data;
  } catch (error) {
    error.response && console.error(error.response);

    // check if response is 401
    if (error.response.status === 401) {
      return "unauthorized";
    } else {
      console.error(error);
      return "error";
    }
  }
};

import axios from "axios";

export const axiosErrorExtractor = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data;
  } else return "This error is not AxiosError";
};

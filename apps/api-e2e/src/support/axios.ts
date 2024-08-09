import axios, { AxiosError } from "axios";

const _axios = axios.create();

_axios.interceptors.response.use(
  response => response, // Pass through successful responses
  (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.toJSON());
    } else {
      console.error('Unexpected error:', error);
    }

    // if (error.name == 'AggregateError') {
      // for (const singleError of (<AxiosError>error).) {
      //   console.error('Individual error:', singleError);
      // }
    // }

    return Promise.reject(error); // Re-throw the error to allow test assertions
  }
);

export default _axios;


import axios from "axios";

// Using Axios and AxionCancelToken
export const getHandleAPIService = (URL) => {
  const source = axios.CancelToken.source();
  const request = axios.get(URL, { cancelToken: source.token });

  return { source, request };
};

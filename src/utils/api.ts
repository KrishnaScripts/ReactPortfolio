import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.instantwebtools.net/v1/passenger?page=0&size=10',
});

instance.interceptors.request.use(
  function(config) {
    // Add authorization header to all requests
    return config;
  },
  function(error) {
    // Handle request errors
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function(response) {
    // Handle successful responses
    return response.data;
  },
  function(error) {
    // Handle error responses
    if (error.response.status === 401) {
      // Handle unauthorized error
      console.log('Unauthorized error!');
    } else {
      // Handle other errors
      console.log('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
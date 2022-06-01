import axios from 'axios';

const proxy = (path) => {
  const FRONTEND_PORT = process.env.PORT || 3000;
  const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || 8000;
  return axios.create({
    baseURL: `http://localhost:${BACKEND_PORT}/api/${path}`,
    headers: {
      'Host': `localhost:${BACKEND_PORT}`,
      'Origin': `http://localhost:${FRONTEND_PORT}`
    }
  });
}

export default proxy;
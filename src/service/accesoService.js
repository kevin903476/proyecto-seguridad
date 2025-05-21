import axiosConfig from '../api/axiosConfig';

const getAllAccess = async () => {
  const response = await axiosConfig.get('/access/getAllAccess');
  return response.data;
};

const getTodayAccess = async () => {
  const response = await axiosConfig.get('/access/getTodayAccess');
  return response.data;
};

const getAccessByDni = async (dni) => {
  const response = await axiosConfig.post('/access/getAccessByDni', { dni });
  return response.data;
};

const registerAccess = async (dni) => {
  const response = await axiosConfig.post('/access/registerAccess', { dni });
  return response.data;
};

export default {
  getAllAccess,
  getTodayAccess,
  getAccessByDni,
  registerAccess
};

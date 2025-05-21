import axiosConfig from '../api/axiosConfig';

const getAllStudents = async () => {
  const response = await axiosConfig.get('/student/getStudent');
  return response.data;
};

const registerStudent = async (studentData) => {
  const response = await axiosConfig.post('/student/registerStudent', studentData);
  return response.data;
};

export default {
  getAllStudents,
  registerStudent
};

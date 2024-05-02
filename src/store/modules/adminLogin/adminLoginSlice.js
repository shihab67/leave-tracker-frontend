import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = [{}];

const adminLoginSlice = createSlice({
  name: 'adminLogin',
  initialState,
  reducers: {}
});

export const store = createAsyncThunk('adminLoginSlice/store', async (data) => {
  const header = { headers: { 'Content-Type': 'application/json' } };
  return await axios
    .post(process.env.REACT_APP_API_URL + 'api/login', data, header)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
});

export const register = createAsyncThunk('adminLoginSlice/register', async (data) => {
  const header = { headers: { 'Content-Type': 'application/json' } };
  return await axios
    .post(process.env.REACT_APP_API_URL + 'api/register', data, header)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
});

export const getAllLeaves = createAsyncThunk('adminLoginSlice/getAllLeaves', async (data) => {
  const header = { headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data } };
  return await axios
    .get(process.env.REACT_APP_API_URL + 'api/leave-request/all', data, header)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
});

export const getUserInfo = (token) => {
  return async () => {
    const fetchData = async () => {
      const header = { headers: { Authorization: 'Bearer ' + token } };
      const response = await axios.post(process.env.REACT_APP_API_URL + 'api/user-info', null, header);
      return await response.data;
    };
    try {
      return await fetchData();
    } catch (error) {
      throw error.response;
    }
  };
};

export default adminLoginSlice.reducer;

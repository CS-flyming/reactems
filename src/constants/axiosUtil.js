import axios from 'axios'
import $ from 'jQuery'

axios.defaults.baseURL = 'http://192.168.1.103:8080/';

axios.interceptors.request.use(function(config) {
  // Do something before request is sent 
  let token = $.cookie('usertoken')
  if (token) {
    config.headers['X-USERTOKEN'] = token
  } else {
    window.location.href = '/login.html'
  }
  return config;
}, function(error) {
  // Do something with request error 
  return Promise.reject(error);
});

// Add a response interceptor 
axios.interceptors.response.use(function(response) {
  // Do something with response data 

  if (response.data.code === '1002' || response.data.code === '1001') {
    window.location.href = '/login.html'
  }
  return response;
}, function(error) {
  // Do something with response error 
  return Promise.reject(error);
});

const $ax = axios

export default $ax
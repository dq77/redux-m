import axios from 'axios';
import { baseUrl } from './config';
// let toastLoading;

// 创建axios实例
const $http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? baseUrl : '',
  timeout: 10000, // 请求超时时间
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie
  headers: {
    'Content-Type': 'application/json'
  }
});

// request 拦截器
$http.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      // Toast("你调用了post请求");
    }

    // 若是有做鉴权token , 就给头部带上token
    // if (getToken()) {
    //   config.headers.Authorization = getToken();
    // }

    // 显示loading
    // toastLoading = Toast.loading({
    //   mask: true,
    //   duration:8000,
    //   message: '数据加载中...'
    // });
    // console.log('请求头配置 :', config);
    return config;
  },
  error => {
    // 输出错误信息
    window.alert({
      type: 'error',
      message: error
    }).then(() => {});

    return Promise.reject(error);
  }
);

// response 拦截器
$http.interceptors.response.use(
  response => {
    // toastLoading.clear();
    return checkStatus(response);
  },

  error => {
    // toastLoading.clear();
    // 用户登录的时候会拿到一个基础信息，比如用户名，token,过期时间戳
    if (error) {
      // 若访问接口的时候没有发现鉴权的基础信息，直接返回登录页
    } else {
      // 如果有基础信息，判断当前时间戳和当前时间，若当前时间大于服务器时间请重新登录
    }

    // 错误页判断
    if (error.response.status === 403 || 1) {
      alert({
        type: 'error',
        message: '网络错误! 请稍后再试'
      });
    }

    return Promise.resolve(error);
  }
);

function checkStatus(response) {
  // loading
  // 如果状态码正常，则直接返回数据
  // console.log("checkStatus", response);

  if (
    (response && response.status === 200) ||
    response.status === 304 ||
    response.status === 400
  ) {

    // console.log("config",response.data);
    // 如果不需要除了data 之外的数据 可直接返回过滤后的数据
    if (response.data.status) {
      return response.data;
    } else {
      // Toast(response.data.message);
      return response.data;
    }
    // 如果不需要除了data 之外的数据 可直接返回过滤后的数据
    // return response.data ;
  }

  return {
    code: -404,
    status: false,
    msg: '请求失败，请求所希望得到的资源未被在服务器上发现。'
  };
}

export default {
  post(url, data, dataType = 'json', contetnType = 'application/json;charset=UTF-8') {
    return $http({
      method: 'post',
      url,
      data,
      dataType,
      headers: {
        'Content-Type': contetnType
      }
    });
  },
  get(url, params) {
    return $http({
      method: 'get',
      url,
      params
    });
  },
  put(url, data) {
    return $http({
      method: 'put',
      url,
      data
    });
  },

  patch(url, data) {
    return $http({
      method: 'patch',
      url,
      data
    });
  },
  delete(url, data) {
    return $http({
      method: 'delete',
      url,
      data
    });
  }
};

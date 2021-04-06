import request from '../utils/request';

const productsApi = {
  getList(data){ return request.get('/api/get', data)},
  setList(data){ return request.post('/api/post', data)},
}
export default productsApi
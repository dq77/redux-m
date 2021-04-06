import productsApi from '../services/products';
export default {
    namespace: 'products',
    state: {
      productsList: [
        { name: 'dva', id: '1' },
        { name: 'antd', id: '2' },
      ],
      otherStates: ''
    },
    effects: {
      *delete({ payload }, { call, put, select }) {
        const { productsList } = yield select(state => state.products)

        // 发送异步请求
        const data = yield call(productsApi.getList, payload);
        const id = data.args.id
        // 同步保存
        return yield put({
          type: 'save',
          payload: {
            productsList: productsList.filter(item => { return item.id !== id })
          }
        })
      },
    },
    reducers: {
      save(state, { payload }) {
        return { ...state, ...payload };
      }
    },
  };
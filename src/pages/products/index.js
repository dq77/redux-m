import React from 'react';
import { connect } from 'dva';
import dqPlugin from 'dqplugin'
import ProductList from '../../components/ProductList';
import './index.scss'

@connect(({ products }) => ({
  ...products,
}))
export default class Products extends React.Component{

  componentDidMount = () => {
    const a = dqPlugin.getBrowserType()
    console.log(a);
  }

  handleDelete = (id) => {
    this.props.dispatch({
      type: 'products/delete',
      payload: {
        id: 1
      },
    }).then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <div className='products-page'>
        <h2 className='p-title'>List of Products</h2>
        <ProductList onDelete={this.handleDelete} />
        <div className='vis'></div>
      </div>
    );
  }
}

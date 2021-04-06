import React from 'react';
import { connect } from 'dva';
import './index.less';

@connect(({ products }) => ({
  ...products,
}))
export default class IndexPage extends React.Component{

  componentDidMount = () => {
  }

  render() {
    return (
      <div className='normal'>
        <h1 className='title'>dva project</h1>
        <div className='tips'>To get started, edit <code>src/index.js</code> and save to reload.</div>
      </div>
    );
  }
}

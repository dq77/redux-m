import React from 'react';
import { connect } from 'dva';
import dqPlugin from 'dqplugin'
import { Button, ImagePicker } from 'antd-mobile';


@connect(({ products }) => ({
  ...products,
}))
export default class ProductList extends React.Component {
  state = {
    files: [],
  }
  componentDidMount = () => {
    console.log(this.props.productsList);
  }
  onChange = async (res) => {
    const workbook = await dqPlugin.readXlsxFile(res[0]?.file)
    let sheet = workbook.Sheets[workbook.SheetNames[0]]
    for ( let key in sheet ) {
      console.log(sheet[key].v || null)
    }
  }

  render() {
    const { files } = this.state
    return (
      <div>
        <Button onClick={() => {this.props.onDelete(2)}}>Delete</Button>
        { this.props.productsList.map(item => (
          <span key={item.id}>{item.name}</span>
        )) }
        
        <ImagePicker files={files} onChange={this.onChange} />
      </div>
    );
  }
}
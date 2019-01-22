import React from 'react';
import {
  List, Button, Skeleton,
} from 'antd';

export default class RequestsListView extends React.Component {

  state = {
    initLoading: false,
    loading: false,
    list: [],
    pageItemsCount: 10,
    currentPage: 1
  }

  getData = async () => {
    this.props.fetchRequests({ count: this.state.pageItemsCount * this.state.currentPage });
  }

  deleteRequest = async (data) => {
    this.props.deleteRequest(data);
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps() {
    console.log(this.props.app.requests);
    this.setState({
      loading: false,
      list: this.props.app.requests
    });
  }

  onLoadMore = async () => {
    await this.setState({
      loading: true,
      currentPage: this.state.currentPage + 1
    });
    this.getData();
  }

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore = !initLoading && !loading ? (
      <div style={{
        textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
      }}
      >
        <Button onClick={this.onLoadMore}>loading more</Button>
      </div>
    ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => {

          async function deleteRequest() {
            try {
              await this.setState({
                loading: true
              });
              await this.deleteRequest({ msgId: item._id });
            } catch (err) {
              throw err;
            }
          }

          return (
            <List.Item actions={[<Button type="primary" shape="circle" icon="delete" onClick={deleteRequest.bind(this)} />]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  title={item.u.username}
                  description={item.ts}
                />
                <div>{item.msg}</div>
              </Skeleton>
            </List.Item >
          )
        }}
      />
    );
  }
}
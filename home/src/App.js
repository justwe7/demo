import React, { Component } from "react";
import { Layout, Menu, Icon, Spin, Alert, Tooltip, Row, Col } from "antd";
import http from "./api";
import "./App.css";
const doamin = "https://justwe7.github.io"

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class MyTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: {}
    };
  }

  componentDidMount() {
    this.fetchTree();
  }

  fetchTree = () => {
    http({
      url: "./entry.json",
      method: "get"
    })
      .then(res => {
        this.setState({
          treeData: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleClick = ({ item, key, keyPath, domEvent }) => {
    // console.log( item, key, keyPath, domEvent);
    this.props.__linkChange(key);
    try {
      document.title = item.props.children;
    } catch (error) {}
  };

  dataToCommponent = (name, path, isFilder = false) => {
    if (isFilder) {
      const entries = Object.entries(path);
      return (
        <SubMenu
          key={name}
          title={
            <span>
              <Icon type="folder" />
              {name}
            </span>
          }
        >
          {entries.map(v => {
            const filderName = v[0];
            const filePath = v[1];
            if (typeof filePath == "object") {
              return this.dataToCommponent(filderName, filePath, true);
            } else {
              return (
                <Menu.Item key={filePath} onClick={this.handleClick}>
                  {filderName}
                </Menu.Item>
              );
            }
          })}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={path} onClick={this.handleClick}>
          {name}
        </Menu.Item>
      );
    }
  };

  render() {
    const entries = Object.entries(this.state.treeData);
    return (
      <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
        {entries.map(v => {
          const filderName = v[0];
          const filePath = v[1];
          if (typeof filePath == "object") {
            return this.dataToCommponent(filderName, filePath, true);
          } else {
            return this.dataToCommponent(filderName, filePath);
          }
        })}
      </Menu>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      // viewUrl: "https://justwe7.github.io/弹性盒模型/align-self.html",
      iframeH: "95vh",
      viewUrl: "",
      lock: false
    };
    this.lock = false

    window.onpopstate = function(event) {
      console.log(event);
      
      console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
      // window.history.replaceState({}, null, '/')
    };
  }

  __linkChange = link => {
    this.setState({
      loading: true,
      viewUrl: `${doamin}/${link}`
    });
  };

  iframeLoad = (e, v, a) => {
    if (this.lock) {
      window.history.replaceState({}, null, this.state.viewUrl.replace(doamin, ''))
    } else {
      window.history.pushState({}, null, this.state.viewUrl.replace(doamin, ''))
    }

    this.setState({
      loading: false,
      iframeH: `${e.target.clientHeight}px`
    });
    this.lock = true
  };

  render() {
    return (
      <div className="App">
        <Layout>
          <Layout>
            <Sider
              width={220}
              theme="dark"
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0
              }}
            >
              <MyTree __linkChange={this.__linkChange.bind(this)} />
            </Sider>
            <Layout style={{ marginLeft: 220 }}>
              <Content
                style={{
                  background: "#fff",
                  margin: 0
                }}
              >
                {this.state.viewUrl ? (
                  <Spin spinning={this.state.loading}>
                    <iframe
                      title="This is a unique title"
                      src={this.state.viewUrl}
                      frameBorder="0"
                      width="100%"
                      height="100%"
                      style={{ minHeight: "100vh", height: this.state.iframeH }}
                      onLoad={this.iframeLoad}
                    />
                  </Spin>
                ) : (
                  <div style={{marginTop: '20px'}}>
                    <Tooltip placement="topLeft" title="页面打不开不是报错！！！">
                      <h2>justwe7のDEMO小仓库</h2>
                    </Tooltip>
                    <Row style={{padding: '10px 0 10px'}}>
                      <Col span={3}><a href="https://github.com/justwe7/justwe7.github.io" target="_blank" rel="noopener noreferrer">github仓库</a></Col>
                      <Col span={3}><a href="http://lihx.top" target="_blank" rel="noopener noreferrer">blog地址</a></Col>
                    </Row>
                    <Alert
                      message="点击左边导航查看demo，！！！空白的页面查看控制台有打印log"
                      description="展示都是iframe页面=>可以在新窗口打开调试"
                      type="success"
                    />
                  </div>
                )}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;

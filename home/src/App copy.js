import React, { Component } from "react";
import { Button, Tree } from "antd";
import http from "./api";
import "./App.css";
const { TreeNode, DirectoryTree } = Tree;

class MyTreeNode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TreeNode title="parent 0" key="oldDemo">
        <TreeNode title="leaf 文件夹1" key="oldDemo-0" isLeaf />
        <TreeNode title="leaf 文件夹2" key="oldDemo-4">
          <TreeNode title="leaf ddd" key="oldDemo-4-2" />
        </TreeNode>
      </TreeNode>
    );
  }
}

class MyTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: {
        "index.html": "index.html",
        mvvm: { "index.html": "mvvm/index.html" },
        views: {
          JavaScript: {
            "实现一个new.html": "views/JavaScript/实现一个new.html",
            "对象的继承.html": "views/JavaScript/对象的继承.html",
            "手写promise copy 2.html":
              "views/JavaScript/手写promise copy 2.html",
            "手写promise copy 3.html":
              "views/JavaScript/手写promise copy 3.html",
            "手写promise copy.html": "views/JavaScript/手写promise copy.html",
            "手写promise.html": "views/JavaScript/手写promise.html"
          }
        }
      }
      // treeData: {}
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
        // console.log(Object.entries(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSelect = (keys, event) => {
    console.log("Trigger Select", keys, event);
  };

  onExpand = () => {
    console.log("Trigger Expand");
  };

  dataToCommponent = (name, path, isFilder = false) => {
    // const {treeData} = this.state;
    // console.log(Object.entries(treeData));
    // const [title, file] = Object.entries(treeData)
    if (isFilder) {
      const entries = Object.entries(path);
      // dataToCommponent
      /* return (
        entries.map(v => {
          const file = v[1]
          const filderName = v[0]
          if (typeof file == 'object') {
            return this.dataToCommponent(filderName, file, true);
          } else {
            return this.dataToCommponent(filderName, file);
          }
        })
      ); */
      return <TreeNode title={name} key={name}>
        {
          entries.map(v => {
            const filderName = v[0]
            const filePath = v[1]
            if (typeof filePath == 'object') {
              return this.dataToCommponent(filderName, filePath, true);
            } else {
              return <TreeNode title={filderName} key={filePath} isLeaf>
              </TreeNode>;
            }
          })
        }
        {/* {this.dataToCommponent()} */}
      </TreeNode>;
    } else {
      return <TreeNode title={name} key={path} isLeaf>
      </TreeNode>;
    }

  
    return (
      <TreeNode title="parent 0" key="oldDemo">
        <TreeNode title="leaf 文件夹1" key="oldDemo-0" isLeaf />
        <TreeNode title="leaf 文件夹2" key="oldDemo-4">
          <TreeNode title="leaf ddd" key="oldDemo-4-2" />
        </TreeNode>
      </TreeNode>
    );
  };

  deepRender = data => {

  }

  render() {
    const entries = Object.entries(this.state.treeData);
    return (
      <DirectoryTree showLine >
        {
          entries.map(v => {
            const filderName = v[0]
            const filePath = v[1]
            if (typeof filePath == 'object') {
              return this.dataToCommponent(filderName, filePath, true);
            } else {
              return this.dataToCommponent(filderName, filePath);
            }
          })
        }
        {/* {this.dataToCommponent(this.state.treeData)} */}
        {/* <TreeNode title="parent 1" key="0-1">
          <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
          <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
        </TreeNode> */}
      </DirectoryTree>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyTree />
      </div>
    );
  }
}

export default App;

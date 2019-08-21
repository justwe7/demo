import React, { Component } from 'react';
import { Button, Tree } from 'antd';
import http from './api';
import './App.css';
const { TreeNode, DirectoryTree } = Tree;


class MyTreeNode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.state.treeList.map((user,i)=>{
        console.log(user);
        return <Button>222</Button>;
      })
    );
  }
}


var treeList = [
  "oldDemo/01.scroll.html", "oldDemo/02.iScroll.html",
  "filder2/es6/4.Iterator.html", "filder2/es6/5.class.html", 'filder2/index.html'
]

var o = {
  oldDemo: {
    [Symbol()]: ['01.scroll.html', '02.iScroll.html']
  },
  filder2: {
    [Symbol()]: ['index.html'],
    es6: ['4.Iterator.html', '5.class.html']
  }
}

/* 
return fileList.reduce((entryObj, current) => {
  let filePath = path.parse(
    path.relative(path.join(__dirname, "src"), current)
  ); //读取基于当前文件系统路径信息
  let filePathUri = path.join(filePath.dir, filePath.name); //合并出webpack entry的 key
  entryObj[filePathUri] = path.resolve(__dirname, current);
  return entryObj;
}, {});
*/
var SymbolKey = "_KEY"
// var SymbolKey = Symbol()
  var _obj = {};
function foo(treeList) {
  treeList.forEach((str) => {
    var _arr = str.split('/')
    // console.log(_arr.length);

    if (_arr.length > 1 && /\/(\S+)/.test(str)) {
      var key = _arr[0]
      if (_arr.length > 2) {
        _obj[key] = _obj[key] || []
        _obj[key].push(RegExp.$1)
        console.log(_obj[key]);
        foo(_obj[key])
      } else {
        _obj[SymbolKey] = _obj[SymbolKey] || []
        _obj[SymbolKey].push(RegExp.$1)
      }
    } else {

    }
    
    return _obj;
    /* if (_arr.length > 1) {
      foo
    } */

  })
  // foo(treeList)
}
foo(treeList)
console.log(_obj);

// function foo(treeList) {
//   var _obj = {};
//   return treeList.reduce((obj, str) => {
//     console.log(obj);
    
//     var _arr = str.split('/')
//     // console.log(_arr.length);

//     if (_arr.length > 1 && /\/(\S+)/.test(str)) {
//       var key = _arr[0]
//       if (_arr.length > 2) {
//         _obj[key] = _obj[key] || []
//         _obj[key].push(RegExp.$1)
//         console.log(_obj[key]);
        
//         foo(_obj[key])
//       } else {
//         _obj[SymbolKey] = _obj[SymbolKey] || []
//         _obj[SymbolKey].push(RegExp.$1)
//       }
//     }
    
//     return _obj;
//     /* if (_arr.length > 1) {
//       foo
//     } */

//   }, _obj)
//   // foo(treeList)
// }
// console.log(foo(treeList));


class MyTree extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      treeList: [
        "oldDemo/01.scroll.html", "oldDemo/02.iScroll.html",
        "filder2/es6/4.Iterator.html", "filder2/es6/5.class.html"
      ]
    }

    /* var tree = this.state.treeList.reduce((obj, key) => {
      // console.log(el);
      if (key.indexOf('/')) {
        
      }
    }, {})
    this.fetchTree() */
  }

  fetchTree = () => {
    http({
      url: './entry.json',
      method: 'get',
    }).then(res => {
      console.log(this);
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  onSelect = (keys, event) => {
    console.log('Trigger Select', keys, event);
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };



  /* render() {
    return (
      this.state.treeList.map((user,i)=>{
        // console.log(user);
        return <Button key={i}>{user}</Button>;
      })
    );
  } */
  render() {
    return (
      <DirectoryTree  showLine defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
        <TreeNode title="parent 0" key="oldDemo">
          <TreeNode title="leaf oldDemo" key="oldDemo-0" isLeaf />
          <TreeNode title="leaf oldDemo2" key="oldDemo-4">
          <TreeNode title="leaf ddd" key="oldDemo-4-2" isLeaf />
          </TreeNode>
        </TreeNode>
        <TreeNode title="parent 1" key="0-1">
          <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
          <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
        </TreeNode>
      </DirectoryTree>
    );
  }
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
        <MyTree></MyTree>
      </div>
    );
  }
}

export default App;
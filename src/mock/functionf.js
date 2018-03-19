import Mock from 'mockjs'

const List = [
{ id:1, name:"父节点1 - 展开", open:true,
  children: [
    { id:2, name:"父节点11 - 折叠",
      children: [
        { id:3, name:"叶子节点111"},
        { id:4, name:"叶子节点112"},
        { id:5, name:"叶子节点113"},
        { id:6, name:"叶子节点114"}
      ]},
    { id:7, name:"父节点12 - 折叠",
      children: [
        { id:8, name:"叶子节点121"},
        { id:9, name:"叶子节点122"},
        { id:10, name:"叶子节点123"},
        { id:11, name:"叶子节点124"}
      ]},
    { id:12, name:"父节点13 - 没有子节点", isParent:true}
  ]},
{ id:13, name:"父节点2 - 折叠",
  children: [
    { id:14, name:"父节点21 - 展开", open:true,
      children: [
        { id:15, name:"叶子节点211"},
        { id:16, name:"叶子节点212"},
        { id:17, name:"叶子节点213"},
        { id:18, name:"叶子节点214"}
      ]},
    { id:20, name:"父节点22 - 折叠",
      children: [
        { id:21, name:"叶子节点221"},
        { id:22, name:"叶子节点222"},
        { id:23, name:"叶子节点223"},
        { id:24, name:"叶子节点224"}
      ]},
    { id:25, name:"父节点23 - 折叠",
      children: [
        { id:26, name:"叶子节点231"},
        { id:27, name:"叶子节点232"},
        { id:28, name:"叶子节点233"},
        { id:29, name:"叶子节点234"}
      ]}
  ]},
{ id:30, name:"父节点3 - 没有子节点", isParent:true}
]

export default {
  getList: config => {

    return List
  }
}
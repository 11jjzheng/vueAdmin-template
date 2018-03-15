import Mock from 'mockjs'

const List = [
{
  id: 1,
  label: '规则配置',
  children: [{
    id: 2,
  	label: '规则项列表'
  }]
}, 
{
  id: 3,
  label: '参数配置',
  children: [{
    id: 4,
    label: '规则参数'
  }, 
  {
    id: 5,
    label: '评分卡等级'
  }, 
  {
    id: 6,
    label: '关键字'
  }]
}, 
{
  id: 7,
  label: '规则管理',
  children: [{
    id: 8,
    label: '规则管理',
    children: [{
      id: 9,
      label: '规则集列表'
    },
    {
      id: 10,
      label: '预处理列表'
    },
    {
      id: 11,
      label: '规则逻辑列表'
    }]
  }, 
  {
    id: 12,
    label: '常用数据管理',
    children: [{
      id: 13,
      label: '渠道列表'
    },
    {
      id: 14,
      label: '城市列表'
    },
    {
      id: 15,
      label: '白名单列表'
    },
    {
      id: 16,
      label: '城市等级列表'
    }]
  }]
}, 
{
  id: 17,
  label: '规则结果',
  children: [{
    id: 18,
    label: '原始数据列表'
  }, 
  {
    id: 19,
    label: '规则结果集列表'
  }, 
  {
    id: 20,
    label: '拒绝名单列表'
  }]
}, 
{
  id: 21,
  label: '系统管理',
  children: [{
    id: 22,
    label: '用户列表'
  }, 
  {
    id: 23,
    label: '功能管理'
  }, 
  {
    id: 24,
    label: '角色管理'
  }, 
  {
    id: 25,
    label: '操作日志'
  }, 
  {
    id: 26,
    label: '组织管理'
  }]
}
]

export default {
  getList: config => {

    return List
  }
}
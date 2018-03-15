<template>
  <div class="dashboard-container">
    <div class="system-introduction">
      <h4 class="title">系统介绍</h4>&nbsp;&nbsp;&nbsp;&nbsp;<h5 class="title">当前版本  2.0.0</h5>
    </div>
    <div class="system-introduction-content">
      <p>规则配置 ：根据需求可以在具体规则集下配置规则项。</p>
      <p>参数配置 ：根据需求可以配置规则集相关参数，如规则参数、评分卡等级、关键字。</p>
      <p>规则管理</p>
      <p class="contentLine">|</p>
      <p class="contentLine">|</p>
      <p class="contentLine">—— 规则管理 ：对规则集、规则逻辑等规则信息的管理，如添加规则集、删除规则集等</p>
      <p class="contentLine">|</p>
      <p class="contentLine">|</p>
      <p class="contentLine contentLastLine">—— 常用数据管理 ：对一些常用数据如城市信息、白名单信息等的管理</p>
      <p>规则结果 ：对规则结果等信息的查询，其中包括原始数据信息、规则结果集信息、拒绝名单信息</p>
      <p>系统管理 ：与系统有关的一些操作，其中包括用户管理、功能管理、角色管理、操作日志查询等</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container{
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .system-introduction {
      margin-top: 20px;
      .title {
        display: inline;
      }
    }
    .system-introduction-content {
      margin-top: 10px;
      margin-left: 30px;
      .contentLine {
        margin-left: 27px;
        margin-top: -12px;
        margin-bottom: 2px;
      }
      .contentLastLine {
        margin-bottom: 8px;
      }
    }
  }
</style>

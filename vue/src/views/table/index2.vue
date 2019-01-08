<template>
  <div class="table">
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Table extends Vue {
  tableData: any[] = [{
    date: '1',
    name: '1',
    address: '1',
  }, {
    date: '2',
    name: '2',
    address: '2',
  }, {
    date: '3',
    name: '3',
    address: '3',
  }, {
    date: '4',
    name: '4',
    address: '4',
  }];
}
</script>
<style lang="less" scoped>
.table{
  padding: 20px;
}
</style>

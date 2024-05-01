<template>
    <el-table :data="tableData" border height="500" style="width: 100%">
        <el-table-column prop="casename" label="案名" width="180" />
        <el-table-column prop="customername" label="姓名" width="180" />
        <el-table-column prop="adds" label="居住區域" />
        <el-table-column prop="age" label="年齡" />
    </el-table>
    <div class="pagination">
      <el-pagination
        :page-sizes="[10, 25, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotal"
      />
    </div>
    
</template>
<script setup lang="ts">
  import {ref} from 'vue';
  import axios from 'axios';
  import { ElMessage } from 'element-plus'

  let tableData = ref([
    {
      casename:'',
      customername:'',
      adds:'',
      age:'',
    }
  ])
  let dataTotal=ref(0)

  axios.get('https://cusys.api.srl.tw/ajax/data.php', {
    headers: {
      'Authorization': sessionStorage['jwt'],
      'Refresh-Token': localStorage['refresh_jwt'],
    }
  })
  .then((data)=>{
      let _data=data.data
      tableData.value=_data.data
      dataTotal.value=_data.data.length
      console.log(_data.data)
  })
  .catch((error)=>{
    ElMessage({
        message: error,
        type:'error',
        customClass:'alert'
    })
  })

    
</script>
<style lang="scss" scoped>
    .pagination{
      padding: 15px 0px;
      .el-pagination{
        justify-content: flex-end;
      }
    }
</style>
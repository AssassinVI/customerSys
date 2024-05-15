<template>
    <Search />
    
    <el-table :data="tableData" border height="600" style="width: 100%">
        <el-table-column prop="casename" label="案名" width="180" />
        <el-table-column prop="customername" label="姓名" width="180" />
        <el-table-column prop="adds" label="居住區域" />
        <el-table-column prop="age" label="年齡" />
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:page-size="pageSize"
        :page-sizes="[25, 50, 100]"
        v-model:current-page="currentPage"
        layout="total, sizes, prev, pager, next"
        :total="dataTotal"
      />
    </div>
    
</template>
<script setup lang="ts">
  import {ref, watch} from 'vue';
  import Search from '@/views/main/search.vue';
  import { ElMessage } from 'element-plus'
  import useAxios from '@/hook/useAxios'

  //-- 表格資料 --
  let tableData = ref([
    {
      casename:'',
      customername:'',
      adds:'',
      age:'',
    }
  ])

  
  //-- 資料總數 --
  let dataTotal=ref(0)
  //-- 一頁總數 --
  let pageSize=ref(25)
  //-- 第幾頁 --
  let currentPage=ref(1)
  //-- 查詢物件 --
  let search = ref({
    caseid: '',
    county: ''
  })


  //-- 撈資料 --
  function getData() {
    useAxios({
      method: 'post',
      url: `data.php`,
      data: {
        type: 'data',
        pageSize: pageSize.value,
        currentPage: currentPage.value,
        search: search.value
      }
    })
    .then((data)=>{
      let _data=data.data

      if(_data.success){
        tableData.value=_data.data
        // console.log(_data.data)
      }
      else{
          ElMessage({
              message: _data.msg,
              type:'error',
              customClass:'alert',
          })
      }
    })
  }
  getData()
  

  //-- 總數 --
  function getDataTotal() {
    useAxios({
      method: 'post',
      url: `data.php`,
      data: {
        type: 'dataTotal',
        search: search.value
      }
    })
    .then((data)=>{
      let _data=data.data
      if(_data.success){
        dataTotal.value=parseInt( _data.data.total)
      }
    })
  }
  getDataTotal()
  

  watch([currentPage, pageSize], ()=>{
    getData()
  })

  watch(search, ()=>{
    getData()
    getDataTotal()
  },{ deep: true })


  defineExpose({search, pageSize})
</script>
<style lang="scss" scoped>
    .pagination{
      padding: 15px 0px;
      .el-pagination{
        justify-content: flex-end;
      }
    }
</style>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <MenuCom/>
      </el-aside>
      <el-container>
        <el-header>
           <HeaderCom/>
        </el-header>
        <el-main>
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">

  import HeaderCom from '@/components/header.vue';
  import MenuCom from '@/components/menu.vue';

  
</script>

<style lang="scss" scoped>
  .common-layout{
    height: 100vh;
    .el-container{
      height: 100%;
      .el-aside{
        background-color: #f1f1f1;
        box-shadow: 0px 0px 15px #00000030;
        z-index: 10;
        
      }
      .el-header{
        background-color: #eeeeee;

        .flex_box{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 2%;
          height: 100%;
        }
      }
    }
  }
</style>
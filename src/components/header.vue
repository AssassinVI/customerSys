<template >
    <div class="flex_box">
        <div class="tool_box">
            HOME
        </div>
        <div class="logout">
            <el-button type="primary" round @click="logout">登出</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
 import {useRouter} from 'vue-router'
 import {useLogin} from '@/stores/login'
 import { ElMessageBox } from 'element-plus'

 const loginStores=useLogin()
 const route=useRouter()

 function logout() {
    ElMessageBox.alert('已登出後台', {
      confirmButtonText: '確定',
      callback: () => {
        sessionStorage.removeItem('jwt')
        localStorage.removeItem('refresh_jwt');
        loginStores.clean()
        route.push('/')
      },
    })
  }
</script>
<style lang="scss">
    
</style>
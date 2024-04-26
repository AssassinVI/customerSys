<template>
  <div>
    <h1>HOME</h1>
    <p>{{ user.name }}</p>
  </div>
</template>
<script setup lang="ts">
  import {onMounted, reactive} from 'vue'
  import axios from 'axios'
  import {useLoginJWT} from '@/stores/loginJWT'
  import { ElMessage } from 'element-plus'

  const loginStores=useLoginJWT()

  let user=reactive({
    Group_name: "",
    Permissions: "",
    Tb_index: "",
    admin_per: "",
    name: ""
  })

  onMounted(() => {
    axios.get('https://cusys.api.srl.tw/ajax/login.php', {
      headers: {
        'Authorization': sessionStorage['jwt'],
        'Refresh-Token': localStorage['refresh_jwt'],
      }
    })
    .then((data)=>{
       if(data.data.success){
         user.name=data.data.data.name
         user.Group_name=data.data.data.Group_name
         user.Permissions=data.data.data.Permissions
         user.Tb_index=data.data.data.Tb_index
         user.admin_per=data.data.data.admin_per
       }
       console.log(data)
    })
    .catch((error)=>{
      ElMessage({
          message: error,
          type:'error',
          customClass:'alert'
      })
    })
  })
</script>

<style lang="scss" scoped>
  
</style>
import { ref, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'
import {useRouter} from 'vue-router';
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

export const useLogin = defineStore('login', () => {
  
  let user=ref({
    Group_name: "",
    Permissions: "",
    Tb_index: "",
    admin_per: "",
    name: ""
  })
  let route=useRouter()

  function clean() {
    user.value={
      Group_name: "",
      Permissions: "",
      Tb_index: "",
      admin_per: "",
      name: ""
    }
  }
  
  onBeforeMount(() => {

    axios.get('https://cusys.api.srl.tw/ajax/login.php', {
      headers: {
        'Authorization': sessionStorage['jwt'],
        'Refresh-Token': localStorage['refresh_jwt'],
      }
    })
    .then((data)=>{
       let _data=data.data
       if(_data.success){
        user.value=_data.data;
       }
       else{
          ElMessageBox.alert(_data.msg, {
            confirmButtonText: '確定',
            callback: () => {
              route.push('/')
            },
          })
       }

      //  console.log(user.value)
    })
    .catch((error)=>{
      ElMessage({
          message: error,
          type:'error',
          customClass:'alert'
      })
    })
  })

  

  return { user, clean }
})

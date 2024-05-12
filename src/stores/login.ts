import { ref, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'
import {useRouter} from 'vue-router';
import useAxios from '@/hook/useAxios'
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

    useAxios({
      method: 'get',
      url: 'login.php',
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
  })

  

  return { user, clean }
})

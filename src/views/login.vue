<template>
  <div class="login_box">
    <el-card style="width: 480px">
    <h1>撈客資系統</h1>
    <el-form
        label-position="top"
        label-width="auto"
        :model="formInput"
        style="max-width: 600px"
        size="large"
    >
            <el-form-item label="帳號">
            <el-input v-model="formInput.admin_id" />
            </el-form-item>
            <el-form-item label="密碼">
            <el-input v-model="formInput.admin_pwd" type="password" />
            </el-form-item>
            <el-button type="primary" id="login_btn" @click="submit_login">登入系統</el-button>
        </el-form>
    </el-card>
  </div>
  
    
</template>
<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import useAxios from '@/hook/useAxios'


    const formInput = reactive({
        admin_id: '',
        admin_pwd: '',
    })

    const router=useRouter()

    //-- 登入會員 --
    function submit_login() {

        useAxios({
            method: 'post',
            url: 'login.php',
            data: {
                admin_id: formInput.admin_id,
                admin_pwd: formInput.admin_pwd
            }
        })
        .then(function (response) {
            
            if(response.data.success){
                ElMessageBox.alert(response.data.msg, '系統訊息', {
                    confirmButtonText: '確定',
                    callback: () => {
                        router.push('/data')
                    },
                })
                sessionStorage['jwt']=`Bearer ${response.data.jwt}`
                localStorage['refresh_jwt']=response.data.refresh_jwt
            }
            else{
                ElMessage({
                    message: response.data.msg,
                    type:'error',
                    customClass:'alert',
                })
            }
            
        })
    }

    
</script>

<style lang="scss" scoped>
    .login_box{
       position: absolute;
       width: 100%;
       height: 100%;
       display: flex;
       justify-content: center;
       align-items: center;
       .el-button{
        width: 100%;
       }
       h1{
        margin: 0;
        margin-bottom: 4%;
       }
    }
</style>
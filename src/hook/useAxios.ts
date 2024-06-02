import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus'

// 建立 Axios instance
const axiosInstance = axios.create({
    baseURL: 'https://cusys.api.srl.tw/ajax/',
});

// 設定請求攔截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 在每個請求中自動添加 headers
        config.headers['Authorization'] = `Bearer ${sessionStorage["jwt"]}`;
        config.headers['Refresh-Token'] = localStorage["refresh_jwt"];
        //-- 開啟測試資料庫用 --
        // config.headers['Test'] = 'test';
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

// 添加response攔截器
axiosInstance.interceptors.response.use(
    (response) => {
        // 檢查response中的data.success屬性是否為false
        // console.log(response.data)
        //-- 延長token --
        if(response.data.jwt && response.data.jwt.jwt!==''){
            window.sessionStorage.setItem("jwt", response.data.jwt);
            window.localStorage.setItem("refresh_jwt", response.data.refresh_jwt);
        }
        else if (response.data && response.data.success === false) {
            // 執行您的操作，例如顯示錯誤訊息、重新導向到錯誤頁面等
            // let router=useRouter()
            // router.push('/')
        }
        return response;
    },
    (error) => {
          if (error.response){

            let route=useRouter()

            switch (error.response.status) {
              case 404:
                //console.log("你要找的頁面不存在")
                ElMessageBox.alert("你要找的頁面不存在", {
                  confirmButtonText: '確定',
                })
                // go to 404 page
                break
              case 500:
                // console.log("程式發生問題")
                ElMessageBox.alert("你要找的頁面不存在", {
                  confirmButtonText: '確定',
                  callback: () => {
                    route.push('/')
                  },
                })
                // go to 500 page
                break
              default:
                // console.log(error.message)
                ElMessageBox.alert("你要找的頁面不存在", {
                  confirmButtonText: '確定',
                })
            }
          } 
          if (!window.navigator.onLine) {
            // alert("網路出了點問題，請重新連線後重整網頁");
            ElMessageBox.alert("網路出了點問題，請重新連線後重整網頁", {
              confirmButtonText: '確定',
            })
            return;
          }
          return Promise.reject(error);
    }
);
// 現在您可以在您的 function 中使用這個 axiosInstance
export default axiosInstance;
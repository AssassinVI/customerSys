<template>

    <el-form :model="form" label-width="auto" >
        <el-form-item label="建案名稱">
            <el-autocomplete
                v-model="search_case"
                size="large"
                :fetch-suggestions="querySearch"
                clearable
                class="inline-input w-50"
                placeholder="請輸入建案名稱"
                @select="handleCase"
                @change="changeCase"
            />
        </el-form-item>
        
        <div class="cityArea_box">
            <el-form-item label="縣市">
                <el-select
                    v-model="search_city"
                    clearable
                    placeholder="選擇縣市"
                    size="large"
                    style="width: 200px"
                    >
                    <el-option
                        v-for="item in form.city"
                        :key="item.rowid"
                        :label="item.tw_city"
                        :value="item.tw_city"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="鄉鎮市區">
                <el-select
                    v-model="search_district"
                    clearable
                    placeholder="選擇鄉鎮市區"
                    size="large"
                    style="width: 200px"
                    >
                    <el-option
                        v-for="item in form.district"
                        :key="item.rowid"
                        :label="item.tw_name"
                        :value="item.tw_name"
                    />
                </el-select>
            </el-form-item>
        </div>
        
        
        <el-form-item>
            <el-button type="primary" :icon="Search" @click="send_search($parent)">查詢</el-button>
        </el-form-item>
    </el-form>
  
</template>
<script setup lang="ts">
    import { reactive, ref, onMounted, watch } from 'vue'
    import useAxios from '@/hook/useAxios'
    import { Search } from '@element-plus/icons-vue'

    //-- 必須使用value 當顯示資料 --
    interface caseItem {
        tb_index: string
        value: string
    }

    // do not use same name with ref
    let form = reactive<any>({
        case: [],
        city: [],
        district: []
    })

    //-- 輸入框內容 --
    let search_case=ref('')
    let search_city=ref('')
    let search_district=ref('')

    //-- 輸入框內容 --
    let case_obj=ref<caseItem>()

    const restaurants = ref<caseItem[]>([])
    const querySearch = (queryString: string, cb: any) => {
        const results = queryString
            ? restaurants.value.filter(createFilter(queryString))
            : restaurants.value
        // call callback function to return suggestions
        cb(results)
    }
    const createFilter = (queryString: string) => {
    return (restaurant: caseItem) => {
        return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
    }

    //-- 選擇建案 --
    function handleCase (item:caseItem) {
        case_obj.value=item
    }
    //-- 清除建案 --
    function changeCase () {
        case_obj.value={
            tb_index: '',
            value: ''
        }
    }

    //-- 顯示篩選資料 --
    function send_search(parent:any) {
        parent.search.caseid=case_obj.value?.tb_index
        parent.search.city=search_city.value
        parent.search.district=search_district.value
    }

    onMounted(()=>{
        //-- 撈建案資料 --
        useAxios({
            method: 'get',
            url: `search.php?type=case`,
        })
        .then((data)=>{
            let _data=data.data
            if(_data.success){
                form.case=_data.data
                restaurants.value=_data.data
            }
        })

        //-- 撈縣市 --
        useAxios({
            method: 'get',
            url: `search.php?type=city`,
        })
        .then((data)=>{
            let _data=data.data
            if(_data.success){
                form.city=_data.data
            }
        })
    })

    watch(search_city, (city)=>{
        search_district.value=''
        //-- 撈鄉鎮市區 --
        useAxios({
            method: 'get',
            url: `search.php?type=district&city=${city}`,
        })
        .then((data)=>{
            let _data=data.data
            if(_data.success){
                form.district=_data.data
            }
        })
    })
    
</script>
<style lang="scss" scoped>
    .el-form{
        padding: 15px;
        border: 1px solid #e6e6e6;
        margin-bottom: 20px;
    }
    .cityArea_box{
        display: flex;
        gap: 15px;
    }
</style>
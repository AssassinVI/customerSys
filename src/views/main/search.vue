<template>

    <el-form :model="form" label-width="auto" >
        <el-form-item label="建案名稱">
            <el-autocomplete
                v-model="search_name"
                :fetch-suggestions="querySearch"
                clearable
                class="inline-input w-50"
                placeholder="請輸入建案名稱"
                @select="handleSelect"
            />
        </el-form-item>
        <el-form-item label="縣市">
            
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" :icon="Search" @click="send_search($parent)">查詢</el-button>
        </el-form-item>
    </el-form>
  
</template>
<script setup lang="ts">
    import { reactive, ref, onMounted } from 'vue'
    import useAxios from '@/hook/useAxios'
    import { Search } from '@element-plus/icons-vue'

    //-- 必須使用value 當顯示資料 --
    interface caseItem {
        tb_index: string
        value: string
    }

    // do not use same name with ref
    let form = reactive({
        case: [],
    })
    let search_name=ref('')
    let search_obj=ref<caseItem>()

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
    function handleSelect (item:caseItem) {
        search_obj.value=item
    }

    //-- 顯示篩選資料 --
    function send_search(parent:any) {
        console.log(parent)
        parent.search.caseid=search_obj.value?.tb_index
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
    })
    
</script>
<style lang="scss" scoped>
    .el-form{
        padding: 15px;
        border: 1px solid #e6e6e6;
        margin-bottom: 20px;
    }
</style>
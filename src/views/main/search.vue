<template>

    <el-form :model="form" label-width="auto" >
        <!-- <el-radio-group v-model="form.case.tb_index">
            <el-radio-button v-for="item in form.case" :key="item.tb_index" :value="item.tb_index">{{item.casename}}</el-radio-button>
        </el-radio-group> -->

        <el-autocomplete
            v-model="search_name"
            :fetch-suggestions="querySearch"
            clearable
            class="inline-input w-50"
            placeholder="Please Input"
            @select="handleSelect"
        />
    </el-form>
  
</template>
<script setup lang="ts">
    import { reactive, ref, onMounted } from 'vue'
    import useAxios from '@/hook/useAxios'

    interface caseItem {
        tb_index: string
        casename: string
    }

    // do not use same name with ref
    let form = reactive({
        case: [],
    })
    let search_name=ref('')
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
        restaurant.tb_index.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
    }

    function handleSelect (item:caseItem) {
        console.log(item)
        
    }

    onMounted(()=>{
        useAxios({
            method: 'get',
            url: `search.php?type=case`,
        })
        .then((data)=>{
            let _data=data.data
            if(_data.success){
                form.case=_data.data
                restaurants.value=_data.data
                console.log(restaurants.value)
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
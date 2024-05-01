<template >
    <div class="avatar_box">
        <el-avatar :size="50" :icon="UserFilled" />
        <p>{{ loginStores.user.name }}</p>
    </div>
    <el-scrollbar max-height="80vh">
        <div class="menu">
        <el-menu
            default-active="2"
            class="el-menu-vertical"
            :collapse="false"
        >
            <el-sub-menu index="1">
            <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
            </el-sub-menu>

            <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>Navigator Two</span>
            </el-menu-item>

            <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>Navigator Three</span>
            </el-menu-item>

            <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
            </el-menu-item>
            
        </el-menu>
        </div>
    </el-scrollbar>
</template>
<script setup lang="ts">
  import {useLogin} from '@/stores/login'
  import { UserFilled, Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

  const loginStores=useLogin()

</script>
<style lang="scss" scoped>
    .avatar_box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 8% 0;
        background-color: #f1f1f1;
        p{
        margin-bottom: 0;
        }
    }
    .el-scrollbar{
        max-height: 75vh;
    }
</style>
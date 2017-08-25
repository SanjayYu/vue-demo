<template>
    <Menu active-name="1" theme="dark" width="auto">
        <div class="layout-logo-left"></div>
        <Menu-item name="1">
            <Icon type="ios-navigate" :size="iconSize"></Icon>
            <span class="layout-text"> <router-link to="/home" activeClass="active" exact>平台首页</router-link></span>
        </Menu-item>
        <Menu-item name="2">
            <Icon type="ios-keypad" :size="iconSize"></Icon>
            <span class="layout-text"> <router-link to="/user" activeClass="active">用户模块</router-link></span>
        </Menu-item>
        <Menu-item name="3">
            <Icon type="ios-analytics" :size="iconSize"></Icon>
            <span class="layout-text"> <router-link to="/cate" activeClass="active">分类模块</router-link></span>
        </Menu-item>
        <Menu-item name="4">
            <Icon type="ios-keypad" :size="iconSize"></Icon>
            <span class="layout-text"> <router-link to="/news" activeClass="active">新闻模块</router-link></span>
        </Menu-item>
        <Menu-item name="5">
            <Icon type="ios-navigate" :size="iconSize"></Icon>
            <span class="layout-text"> <router-link to="/upload" activeClass="active">上传模块</router-link></span>
        </Menu-item>
        <Menu-item name="6">
            <Icon type="ios-navigate" :size="iconSize"></Icon>
            <span class="layout-text"> <router-link to="/photo" activeClass="active">相册模块</router-link></span>
        </Menu-item>
    </Menu>
</template>

<script>
    export default {
        props:['iconSize']
    }
</script>
<style scoped>
    .active{
        color:white
    }
</style>

<template>
    <div id="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TabBarItem',
        props:{
            path:String,
            activeColor:{
                type:String,
                default:'yellow'
            }
        },
        data:function(){
            return {
//                isActive:true,
            }
        },
        computed:{
            isActive:function () {
                return this.$route.path.indexOf(this.path) !== -1;
            },
            activeStyle: function () {
                return this.isActive ? {color:this.activeColor}: {}
            }
        },
        methods:{
            itemClick: function () {
                this.$router.replace(this.path);
            }
        }

    }
</script>

<style>
    #tab-bar-item{
        /*设置均等分布*/
        flex: 1;
        /*居中*/
        text-align: center;
        /*设置高度*/
        height: 49px;
        /*设置字体大小*/
        font-size: 14px;
    }

    #tab-bar-item img{
        width: 24px;
        height: 24px;
        margin-top: 3px;
        vertical-align: middle;
        margin-bottom: 2px;
    }
    /*.active{*/
        /*color: red;*/
    /*}*/
</style>

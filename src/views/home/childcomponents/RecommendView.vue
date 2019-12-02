<template>
    <div class="recommend">
        <div v-for="item in recommends" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt=""/>
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'RecommendView',
        props:{
            recommends:{
                type:Array,
                default:function(){
                    return []
                 }
            }
        }
    }
</script>

<style>
   /*设置推荐的样式*/
    .recommend{
        display: flex;
        width: 100%;

        text-align: center;
        font-size: 12px;

        padding: 15px 0 20px;

        border-bottom: 10px solid #eee;
    }

    .recommend-item{
        flex: 1;
    }

    .recommend-item img{
        width: 70px;
        height: 70px;

        /*设置文字距离底部的位置*/
        margin-bottom:10px ;
    }
</style>

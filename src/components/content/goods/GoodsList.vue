<template>
    <div class="goods">
        <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
    </div>
</template>

<script type="text/ecmascript-6">
    import GoodsListItem from './GoodsListItem.vue'

    export default {
        name: 'GoodsList',
        components:{
            GoodsListItem
        },
        props:{
            goods:{
                type:Array,
                default:function(){
                    return []
                }
            }
        }
    }
</script>

<style>
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        padding: 2px;
    }


</style>

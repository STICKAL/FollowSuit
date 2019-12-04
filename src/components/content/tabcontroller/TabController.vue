<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles"
             class="tab-control-item"
             :class="{active:index === currentIndex}" @click="itemclick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'TabController',
        props:{
            titles:{
                type:Array,
                default:function(){
                    return []
                }
            }
        },
        data:function(){
            return {
                currentIndex:0
            }
        },
        methods:{
            itemclick: function (index) {
                this.currentIndex = index;
                this.$emit('tabClick',index)
            }
        }

    }
</script>

<style>
    .tab-control{
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        background-color: #fff;
    }

    .tab-control-item{
        flex: 1;
    }

    .tab-control-item span{
        padding: 5px;
    }

    .active{
        color: var(--color-high-text);

    }

    .active span{
        border-bottom: 3px solid var(--color-tint);
    }
</style>

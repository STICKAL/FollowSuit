<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt=""/>
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles"
                     class="title-item"
                     :class="{active: index === currentIndex}"
                     @click="titleClick(index)">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script type="text/ecmascript-6">
    import NavBar from 'components/common/navbar/NavBar.vue'

    export default {
        name: 'DetailNavBar',
        components:{
            NavBar
        },
        data:function(){
            return {
                titles:['商品','参数','评论','推荐'],
                currentIndex:0
            }
        },
        methods:{
            titleClick:function(index){
                this.currentIndex = index;
            },
            backClick:function(){
//                使用back或者go(-1)都能返回上次点击
                this.$router.back();
//                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .title{
        display: flex;
        font-size: 16px;
    }

    .title-item{
        flex: 1;
    }
    
    .active{
        color: var(--color-high-text);
    }

    .back img{
        margin-top:12px;
    }
</style>

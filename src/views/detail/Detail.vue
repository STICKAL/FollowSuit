<template>
    <div id="detail">
        <!--详情页{{iid}}-->
        <detail-nav-bar></detail-nav-bar>
        <detail-swiper :top-images="topImages"></detail-swiper>
    </div>
</template>

<script type="text/ecmascript-6">

    import DetailNavBar from './childComponents/DetailNavBar.vue'
    import DetailSwiper from './childComponents/DetailSwiper.vue'

    import { getDetail } from "network/detail.js"

    export default {
        name: 'Detail',
        components:{
            DetailNavBar,
            DetailSwiper
        },
        data:function(){
            return {
                iid:null,
                topImages:[
                    require("assets/img/goods/Popular/2.png"),
                    require("assets/img/goods/Popular/4.png"),
                    require("assets/img/goods/Popular/6.png"),
                    require("assets/img/goods/Popular/8.png"),
                    require("assets/img/goods/Popular/13.png"),
                    require("assets/img/goods/Popular/14.png"),
                    require("assets/img/goods/Popular/15.png"),
                ]
            }
        },
        created:function(){
//            保存传入的iid（商品Id）
            this.iid = this.$route.params.iid

//            根据Id请求详情数据
            getDetail(this.iid).then(res => {
//                console.log(res);
//                获取顶部的图片轮播数据
                this.topImages = res.result.itemInfo.topImages;
            })

        }

    }
</script>

<style>
</style>

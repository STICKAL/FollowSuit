<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"

                >
            <!-- :pull-up-load="true @pullingUp="loadMore" 上拉加载属性"-->
            <home-swiper :banners="banners"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-controller class="tab-control"
                            :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-controller>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>

        <back-top  @click.native="backClick" v-show="isShowBackTop"/>

    </div>
</template>

<script type="text/ecmascript-6">
    import HomeSwiper from './childcomponents/HomeSwiper.vue'
    import RecommendView from './childcomponents/RecommendView.vue'
    import FeatureView from './childcomponents/FeatureView.vue'

    import NavBar from 'components/common/navbar/NavBar.vue'
    import TabController from 'components/content/tabcontroller/TabController.vue'
    import GoodsList from 'components/content/goods/GoodsList.vue'
    import Scroll from 'components/common/scroll/Scroll.vue'
    import BackTop from 'components/content/backtop/BackTop.vue'

    import { getHomeMultidata,getHomeGoods } from "network/home";

    export default {
        name: 'Home',
        components: {
            HomeSwiper,
            RecommendView,
            FeatureView,

            NavBar,
            TabController,
            GoodsList,
            Scroll,
            BackTop
        },
        data:function() {
            return {
                banners:[],
                recommends:[],
                goods:{
                    "pop": {
                        page:0,
//                        list:[]
                        list:[
                            {
                                "show":{
                                    "img":require("assets/img/goods/1.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/2.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/3.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/4.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/5.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/6.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/7.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/8.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/9.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/10.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/11.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            }, {
                                "show":{
                                    "img":require("assets/img/goods/12.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/13.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/14.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/15.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/16.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/17.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/18.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/19.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/20.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/21.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/22.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/23.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/24.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/25.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/26.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/27.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/28.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/29.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/30.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/31.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/32.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/33.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/34.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/35.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/36.png")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/37.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/38.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/39.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/40.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                        ]
                    },
                    "news":{
                        page:0,
//                        list:[]
                        list:[
                            {
                                "show":{
                                    "img":require("assets/img/goods/40.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/40.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/3.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/4.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/5.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/6.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/7.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/8.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/9.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/10.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/11.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            }, {
                                "show":{
                                    "img":require("assets/img/goods/12.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/13.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/14.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/15.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/16.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/17.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/18.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/19.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/20.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/21.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/22.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/23.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/24.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/25.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/26.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/27.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/28.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/29.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/30.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/31.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/32.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/33.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/34.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/35.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/36.png")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/37.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/38.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/39.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/40.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                        ]
                    },
                    "sell":{
                        page:0,
//                        list:[]
                        list:[
                            {
                                "show":{
                                    "img":require("assets/img/goods/1.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/2.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/3.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/4.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/5.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/6.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/7.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/8.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/9.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/10.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/11.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            }, {
                                "show":{
                                    "img":require("assets/img/goods/12.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/13.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/14.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/15.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/16.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/17.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/18.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/19.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/20.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/21.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/22.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/23.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/24.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/25.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/26.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/27.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/28.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/29.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/30.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/31.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/32.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/33.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/34.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/35.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/36.png")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/37.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/38.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/39.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/40.jpg")
                                },
                                "title":"十二生肖戒指女",
                                "price":"88.58",
                                "cfav":"12"
                            },
                        ]
                    },
                },
                currentType:'pop',
                isShowBackTop:false
        }
        },
        computed:{
            showGoods:function(){
                return this.goods[this.currentType].list
            }
        },
        created:function() {
            //1.请求多个数据
            this.getHomeMultidata();

//            2.请求商品数据
//            this.getHomeGoods('pop');
//            this.getHomeGoods('news');
//            this.getHomeGoods('sell');


        },
        mounted:function(){
            const refresh = this.debounce(this.$refs.scroll.refresh,50)

            //3.监听item中图片加载完成
            this.$bus.$on('itemImageLoad',() => {
//                this.$refs.scroll.refresh()
                refresh()
            })
        },
        methods:{
            /**
             *  事件监听相关方法
             */
            debounce(func,delay) {
                let timer = null
                return function (...args) {
                    if(timer) clearTimeout(timer)
                    timer = setTimeout(() => {
                        func.apply(this,args)
                    },delay)
                }

            },
            tabClick:function(index){
              switch (index){
                  case 0:
                    this.currentType = 'pop'
                    break;
                  case 1:
                      this.currentType = 'news'
                      break;
                  case 2:
                      this.currentType = 'sell'
                      break;
              }
            },
            backClick:function() {
                this.$refs.scroll.scrollTo(0,0);
            },
            contentScroll:function(position){
//                console.log(position);
                this.isShowBackTop = (-position.y) >1000
            },
//            loadMore:function(){
////                console.log('上拉加载更多');
//                this.getHomeGoods(this.currentType)
//            },

            /**
             *  网络请求相关方法
             */
            getHomeMultidata:function(){
                getHomeMultidata().then(res => {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            getHomeGoods:function(type) {
                const page = this.goods[type].page + 1;
                getHomeGoods(type,page).then(res =>{
//                    console.log(res);
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1;
//                     上拉加载数据
//                    this.$refs.scroll.finishPullUp()
                })
            },

        }

    }
</script>

<style scoped>
    #home{
        padding-top: 44px;
        /*vh:设置实扣高度*/
        height: 100vh;
        position: relative;
    }

    .home-nav{
        background-color: var(--color-tint);
        color: #fff;

        /*固定顶部位置*/
        position: fixed;
        left: 0;
        right: 0;
        top: 0;

        z-index: 9;
    }

    .tab-control{
        /*设置让标题固定*/
        position: sticky;
        top: 44px;

        z-index: 9;
    }

    .content{
        overflow: hidden;

        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;

    }

    /*.content{*/
        /*height: calc(100% - 93px);*/
        /*overflow: hidden;*/
        /*margin-top: 51px;*/
    /*}*/
</style>

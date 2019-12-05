<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-controller :titles="['流行','新款','精选']"
                        @tabClick="tabClick"
                        ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-controller>
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore"
                >
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-controller :titles="['流行','新款','精选']"
                            @tabClick="tabClick"
                            ref="tabControl2"></tab-controller>
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
    import { debounce } from 'common/utils.js'

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
                                    "img":require("assets/img/goods/Popular/1.png")
                                },
                                "title":"京东京造十元店 麻布纹带盖收纳盒桌面杂物化妆品整理储物篮宿舍浴室厨房置物篮 带盖收纳箱 ",
                                "price":"12.80",
                                "cfav":"99",
                                "iid":1

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/2.png")
                                },
                                "title":"加厚法兰绒睡衣",
                                "price":" 68.9",
                                "cfav":"99",
                                "iid":2

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/3.png")
                                },
                                "title":"99超值秒杀冲锋衣",
                                "price":"99",
                                "cfav":"99",
                                "iid":3

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/4.png")
                                },
                                "title":"加绒加厚加两件打底裤女外穿",
                                "price":"9.9",
                                "cfav":"99",
                                "iid":4

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/5.png")
                                },
                                "title":"倩滋（QIANZI）竹炭吸黑头撕拉面膜 深吸黑头 去白头 去粉刺 去黑头 火山泥撕拉去黑头面膜 ",
                                "price":"9.90",
                                "cfav":"99",
                                "iid":5

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/6.png")
                                },
                                "title":"赛亿（Shinee）取暖器 电暖脚器 暖脚宝 电暖鞋 暖脚炉 暖脚袋 家用办公充电 烤火炉暖脚神器 暖腿神器NJ701 ",
                                "price":"46.90",
                                "cfav":"99",
                                "iid":6

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/7.png")
                                },
                                "title":"24K黄金烟酰胺原液 保湿水润 细化毛孔 提亮肤色",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":7

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/8.png")
                                },
                                "title":"奥兰百合连衣裙早秋赫本风洋气名媛女神范俏皮网红毛衣搭配长裙子两件套装秋冬装 牛油果绿 均码 ",
                                "price":"79.90",
                                "cfav":"99",
                                "iid":8

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/9.png")
                                },
                                "title":"2019秋冬新款保暖中长款毛呢风衣外套TJ 17111黑色 XL ",
                                "price":"88.00",
                                "cfav":"99",
                                "iid":9

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/10.png")
                                },
                                "title":"真空保温杯车载杯便携不锈钢水杯带过滤杯子旅行杯学生杯商务水杯杯子 格调黑500ml ",
                                "price":"29.90",
                                "cfav":"99",
                                "iid":10

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/7.png")
                                },
                                "title":"24K黄金烟酰胺原液 保湿水润 细化毛孔 提亮肤色",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":7

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/11.png")
                                },
                                "title":"茨米萨 2019夏季防晒衣女长款雪纺衫宽松大码中长款外套女薄款户外海晒服防晒开衫 粉色 L",
                                "price":"47.00",
                                "cfav":"99",
                                "iid":11

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/7.png")
                                },
                                "title":"24K黄金烟酰胺原液 保湿水润 细化毛孔 提亮肤色",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":7

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/12.png")
                                },
                                "title":"富贵鸟【品牌热卖 】【舒适休闲】中长款风衣外套男 D67黑色 XL ",
                                "price":"88.00",
                                "cfav":"99",
                                "iid":12

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/13.png")
                                },
                                "title":"艾蘭莎 大码女装",
                                "price":"99.00",
                                "cfav":"99",
                                "iid":13

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/14.png")
                                },
                                "title":"法国KJ聚拢文胸 ",
                                "price":"68.00",
                                "cfav":"99",
                                "iid":14

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/15.png")
                                },
                                "title":"语缦 旗袍女2019新款",
                                "price":"98.00",
                                "cfav":"99",
                                "iid":15

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/16.png")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":16

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/17.png")
                                },
                                "title":"男士外套",
                                "price":"99.99",
                                "cfav":"99",
                                "iid":17

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/18.png")
                                },
                                "title":"四季结果草莓苗",
                                "price":"9.9",
                                "cfav":"99",
                                "iid":18

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/19.png")
                                },
                                "title":"南极人家纺被子冬天",
                                "price":"54.90",
                                "cfav":"99",
                                "iid":19

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/20.png")
                                },
                                "title":"不锈钢厨房置物架调料架收纳架储物砧板刀架",
                                "price":"29.90",
                                "cfav":"99",
                                "iid":20

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/21.png")
                                },
                                "title":"搓澡巾搓泥去污成人双面搓澡手套",
                                "price":"13.90",
                                "cfav":"99",
                                "iid":21

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/22.png")
                                },
                                "title":"园艺用品雨花石铺面石彩石彩沙彩砂亚克力彩色石子",
                                "price":"9.90",
                                "cfav":"99",
                                "iid":22

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/23.png")
                                },
                                "title":"简约家居布艺收纳筐桌面杂物化妆品整理储物篮宿舍浴室厨房置物篮",
                                "price":"12.80",
                                "cfav":"99",
                                "iid":23

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/24.png")
                                },
                                "title":"魔铁 迷你手电筒",
                                "price":"9.90",
                                "cfav":"99",
                                "iid":24

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/25.png")
                                },
                                "title":"艾暖 暖宝宝 暖足贴脚底发热贴",
                                "price":"8.80",
                                "cfav":"99",
                                "iid":25

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/26.png")
                                },
                                "title":"陈李济 润喉糖 糖果润喉糖28.8g/盒 化痰薄荷草本硬糖",
                                "price":"9.90",
                                "cfav":"99",
                                "iid":26

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/27.png")
                                },
                                "title":"阿玛熊 红糖麻花拉丝麻花传统糕点小吃 大罐礼盒装 260g/袋 ",
                                "price":"8.90",
                                "cfav":"99",
                                "iid":27

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/28.png")
                                },
                                "title":"touch马克笔套装",
                                "price":"19.90",
                                "cfav":"99",
                                "iid":28

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/29.png")
                                },
                                "title":"捷路者 蓝牙耳机 无线运动防水快充",
                                "price":"58.40",
                                "cfav":"99",
                                "iid":29

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/30.png")
                                },
                                "title":"多肉植物种子生石花种子屁股花 进口混合种子多肉种子石生花种孑 7花纹玉生石花种子40颗 ",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":30

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/Popular/31.png")
                                },
                                "title":"中长款长袖连衣裙",
                                "price":"98",
                                "cfav":"99",
                                "iid":31

                            },


                        ]
                    },
                    "news":{
                        page:0,
//                        list:[]
                        list:[
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/1.jpg")
                                },
                                "title":"夕昧毛呢半身裙女秋冬2019新品女装韩版学院风百褶包臀格子短裙X552",
                                "price":"49.00",
                                "cfav":"99",
                                "iid":101

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/2.jpg")
                                },
                                "title":"中长款风衣男",
                                "price":"87.8",
                                "cfav":"99",
                                "iid":102

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/3.jpg")
                                },
                                "title":"芊之雅秋季睡衣女纯棉长袖睡裙可爱甜美卡通小熊中裙家居服春秋款",
                                "price":"45.00",
                                "cfav":"99",
                                "iid":103

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/4.jpg")
                                },
                                "title":"2019丅恤新款韩版潮流男士纯棉上衣服 t恤长袖秋装体恤打底衫",
                                "price":"58.92",
                                "cfav":"99",
                                "iid":104

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/5.jpg")
                                },
                                "title":"商务休闲鞋秋冬款透气皮鞋商务软底男士皮鞋套脚懒人鞋",
                                "price":"99.00",
                                "cfav":"99",
                                "iid":105

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/6.jpg")
                                },
                                "title":"高帮鞋男士马丁靴男新品男靴学生百搭休闲防滑耐磨雪地靴",
                                "price":"97.00",
                                "cfav":"99",
                                "iid":106

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/7.jpg")
                                },
                                "title":"圣茵娜衬衫女长袖加绒2019春秋季新款韩范修身显瘦休闲百搭立领荷叶边衬衫",
                                "price":"60.00",
                                "cfav":"99",
                                "iid":107

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/8.jpg")
                                },
                                "title":"运动套装男2019秋季新款卫衣男韩版潮流ins运动休闲学生男士两件套网红长袖T恤男运动裤",
                                "price":"58.00",
                                "cfav":"99",
                                "iid":108

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/9.jpg")
                                },
                                "title":"戴冠女士过膝袜",
                                "price":"22.90",
                                "cfav":"99",
                                "iid":109

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/10.jpg")
                                },
                                "title":"红蜻蜓 T恤女长袖",
                                "price":"109.00",
                                "cfav":"99",
                                "iid":110

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/11.jpg")
                                },
                                "title":" 2019秋冬新款大码女装韩版时尚打底裙",
                                "price":"79.00",
                                "cfav":"99",
                                "iid":111

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/12.jpg")
                                },
                                "title":"瑶益连帽卫衣女",
                                "price":"70.80",
                                "cfav":"99",
                                "iid":112
                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/13.jpg")
                                },
                                "title":"富贵鸟秋季新品圆领卫衣套装男",
                                "price":"68.00",
                                "cfav":"99",
                                "iid":113

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/14.jpg")
                                },
                                "title":"毛毛百搭女鞋",
                                "price":"44.00",
                                "cfav":"99",
                                "iid":114

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/15.jpg")
                                },
                                "title":"蜜长袖针织连衣裙女装",
                                "price":"99.00",
                                "cfav":"99",
                                "iid":115

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/16.jpg")
                                },
                                "title":"秋季新款男士休闲工装裤",
                                "price":"48.00",
                                "cfav":"99",
                                "iid":116

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/17.jpg")
                                },
                                "title":"名仕爵（MSTRE）手表男",
                                "price":"98.00",
                                "cfav":"99",
                                "iid":117

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/18.jpg")
                                },
                                "title":"半身裙大摆长裙格子打底冬裙",
                                "price":"64.80",
                                "cfav":"99",
                                "iid":118

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/19.jpg")
                                },
                                "title":"英格娅半身裙",
                                "price":"49.00",
                                "cfav":"99",
                                "iid":119

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/20.jpg")
                                },
                                "title":"谜草集 氨基酸洗面奶洁面乳",
                                "price":"19.90",
                                "cfav":"99",
                                "iid":120

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/21.jpg")
                                },
                                "title":"珂妃娅 皮裙子短款半身裙",
                                "price":"63.00",
                                "cfav":"99",
                                "iid":121

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/22.jpg")
                                },
                                "title":"宽松型女百搭韩版格子衬衫长袖针织衫",
                                "price":"59.00",
                                "cfav":"99",
                                "iid":122

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/23.jpg")
                                },
                                "title":"男士香水持久淡香古龙香水",
                                "price":"68.00",
                                "cfav":"99",
                                "iid":123

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/24.jpg")
                                },
                                "title":"眼部冷敷理疗贴护眼贴眼膜缓解眼疲劳眼干眼涩眼痛模糊",
                                "price":"69.90",
                                "cfav":"99",
                                "iid":124

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/25.jpg")
                                },
                                "title":"吉列手动剃须刀刀片锋速3刮胡刀头",
                                "price":"99.00",
                                "cfav":"99",
                                "iid":125

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/26.jpg")
                                },
                                "title":"千仞岗男士轻薄羽绒服",
                                "price":"179.00",
                                "cfav":"99",
                                "iid":126

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/27.jpg")
                                },
                                "title":"圣茵娜女士棉服短款",
                                "price":"99.00",
                                "cfav":"99",
                                "iid":127

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/28.jpg")
                                },
                                "title":"加绒加厚蕾丝打底衫女2019秋冬新款韩版",
                                "price":"109.00",
                                "cfav":"99",
                                "iid":128

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/29.jpg")
                                },
                                "title":"宝利博纳 加厚加绒针织衫",
                                "price":"149.00",
                                "cfav":"99",
                                "iid":129

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/news/30.jpg")
                                },
                                "title":"侬依拉帽子女冬天毛线帽",
                                "price":"59.90",
                                "cfav":"99",
                                "iid":130

                            },



                        ]
                    },
                    "sell":{
                        page:0,
//                        list:[]
                        list:[
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/1.jpg")
                                },
                                "title":"京东京造十元店 麻布纹带盖收纳盒桌面杂物化妆品整理储物篮宿舍浴室厨房置物篮 带盖收纳箱 ",
                                "price":"12.80",
                                "cfav":"99",
                                "iid":201

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/2.jpg")
                                },
                                "title":"加厚法兰绒睡衣",
                                "price":" 68.9",
                                "cfav":"99",
                                "iid":202

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/3.jpg")
                                },
                                "title":"99超值秒杀冲锋衣",
                                "price":"99",
                                "cfav":"99",
                                "iid":203

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/4.jpg")
                                },
                                "title":"加绒加厚加两件打底裤女外穿",
                                "price":"9.9",
                                "cfav":"99",
                                "iid":204

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/5.jpg")
                                },
                                "title":"倩滋（QIANZI）竹炭吸黑头撕拉面膜 深吸黑头 去白头 去粉刺 去黑头 火山泥撕拉去黑头面膜 ",
                                "price":"9.90",
                                "cfav":"99",
                                "iid":205

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/6.jpg")
                                },
                                "title":"赛亿（Shinee）取暖器 电暖脚器 暖脚宝 电暖鞋 暖脚炉 暖脚袋 家用办公充电 烤火炉暖脚神器 暖腿神器NJ701 ",
                                "price":"46.90",
                                "cfav":"99",
                                "iid":206

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/7.jpg")
                                },
                                "title":"24K黄金烟酰胺原液 保湿水润 细化毛孔 提亮肤色",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":207

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/8.jpg")
                                },
                                "title":"奥兰百合连衣裙早秋赫本风洋气名媛女神范俏皮网红毛衣搭配长裙子两件套装秋冬装 牛油果绿 均码 ",
                                "price":"79.90",
                                "cfav":"99",
                                "iid":208

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/9.jpg")
                                },
                                "title":"2019秋冬新款保暖中长款毛呢风衣外套TJ 17111黑色 XL ",
                                "price":"88.00",
                                "cfav":"99",
                                "iid":209

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/10.jpg")
                                },
                                "title":"真空保温杯车载杯便携不锈钢水杯带过滤杯子旅行杯学生杯商务水杯杯子 格调黑500ml ",
                                "price":"29.90",
                                "cfav":"99",
                                "iid":210

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/11.jpg")
                                },
                                "title":"24K黄金烟酰胺原液 保湿水润 细化毛孔 提亮肤色",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":211

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/12.jpg")
                                },
                                "title":"茨米萨 2019夏季防晒衣女长款雪纺衫宽松大码中长款外套女薄款户外海晒服防晒开衫 粉色 L",
                                "price":"47.00",
                                "cfav":"99",
                                "iid":212

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/13.jpg")
                                },
                                "title":"24K黄金烟酰胺原液 保湿水润 细化毛孔 提亮肤色",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":213

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/14.jpg")
                                },
                                "title":"富贵鸟【品牌热卖 】【舒适休闲】中长款风衣外套男 D67黑色 XL ",
                                "price":"88.00",
                                "cfav":"99",
                                "iid":214

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/15.jpg")
                                },
                                "title":"艾蘭莎 大码女装",
                                "price":"99.00",
                                "cfav":"99",
                                "iid":215

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/16.jpg")
                                },
                                "title":"法国KJ聚拢文胸 ",
                                "price":"68.00",
                                "cfav":"99",
                                "iid":216

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/17.jpg")
                                },
                                "title":"语缦 旗袍女2019新款",
                                "price":"98.00",
                                "cfav":"99",
                                "iid":217

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/18.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":218

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/19.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":219

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/20.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":220

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/21.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":221

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/22.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":222

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/23.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":223

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/24.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":224

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/25.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":225

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/26.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":226

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/27.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":227

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/28.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":228

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/29.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":229

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/30.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":230

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/31.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":231

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/32.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":232

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/33.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":233

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/34.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":234

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/35.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":235

                            },
                            {
                                "show":{
                                    "img":require("assets/img/goods/choice/36.jpg")
                                },
                                "title":"6桶正宗酸辣粉",
                                "price":"9.80",
                                "cfav":"99",
                                "iid":236

                            },

                        ]
                    },
                },
                currentType:'pop',
                isShowBackTop:false,
                tabOffsetTop:0,
                isTabFixed:false
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
//            监听图片加载完成
            const refresh = debounce(this.$refs.scroll.refresh,50)
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
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;

            },
            backClick:function() {
                this.$refs.scroll.scrollTo(0,0);
            },
            contentScroll:function(position){
//                console.log(position);
//                判断BackTop是否显示
                this.isShowBackTop = (-position.y) >1000

//                决定tabcontrol是否吸顶position:fixed
                this.isTabFixed = (-position.y) > this.tabOffsetTop
            },
            loadMore:function(){
//                console.log('上拉加载更多');
                this.getHomeGoods(this.currentType)
            },
            swiperImageLoad:function(){
//             2.获取tabControl的offsetTop
//            所有的组件都有一个属性$el：用于获取组件中的元素
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
//                console.log(this.tabOffsetTop);

            },

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
                    this.$refs.scroll.finishPullUp()
                })
            },
        }

    }
</script>

<style scoped>
    #home{
        /*padding-top: 44px;*/
        /*vh:设置实扣高度*/
        height: 100vh;
        position: relative;
    }

    .home-nav{
        background-color: var(--color-tint);
        color: #fff;

        /*固定顶部位置*/
        /*在使用浏览器原生滚动时，为了不让导航跟随一起滚动*/
        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/

        /*z-index: 9;*/
    }

    /*.tab-control{*/
        /*/!*设置让标题固定*!/*/
        /*position: sticky;*/
        /*top: 44px;*/

        /*z-index: 9;*/
    /*}*/

    .content{
        overflow: hidden;

        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;

    }

    .tab-control{
        position: relative;
        z-index: 9;
    }



    /*.content{*/
        /*height: calc(100% - 93px);*/
        /*overflow: hidden;*/
        /*margin-top: 51px;*/
    /*}*/
</style>

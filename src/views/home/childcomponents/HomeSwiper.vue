<template>
    <swiper>
        <swiper-item v-for="item in banners">
            <a :href="item.link" alt="">
                <img :src="item.image" alt=""/>
            </a>
        </swiper-item>
    </swiper>
</template>

<script type="text/ecmascript-6">
    import {Swiper, SwiperItem} from 'components/common/swiper'

    export default {
        name: 'HomeSwiper',
        props:{
            banners:{
                type:Array,
                default:function(){
                    return [];
                 }
                }
        },
        components:{
            Swiper,
            SwiperItem
        }
    }
</script>

<style>
</style>

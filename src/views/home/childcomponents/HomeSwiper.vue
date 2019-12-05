<template>
    <swiper>
        <swiper-item v-for="item in banners">
            <a :href="item.link" alt="">
                <img :src="item.image" alt="" @load="imageLoad"/>
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
        data:function(){
            return {
                isLoad:false
            }
        },
        components:{
            Swiper,
            SwiperItem
        },
        methods:{
            imageLoad:function(){
//                console.log('图片加载完成');
                if(!this.isLoad){
                    this.$emit('swiperImageLoad')
                    this.isLoad = true;
                }


            }
        }
    }
</script>

<style>
</style>

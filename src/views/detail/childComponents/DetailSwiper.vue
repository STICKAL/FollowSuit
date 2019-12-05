<template>
    <swiper class="detail-swiper">
        <swiper-item  v-for="item in topImages">
            <img :src="item" alt=""/>
        </swiper-item>
    </swiper>
</template>

<script type="text/ecmascript-6">
    import {Swiper,SwiperItem} from 'components/common/swiper'

    export default {
        name: 'DetailSwiper',
        components:{
            Swiper,
            SwiperItem
        },
        props:{
            topImages:{
                type:Array,
                default:function(){
                    return []
                }
            }
        }
    }
</script>

<style>
    .detail-swiper{
        height: 300px;
        overflow: hidden;
    }
</style>

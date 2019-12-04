<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>

    </div>
</template>

<script>

    import BScroll from 'better-scroll'

    export default {
        name: "Scroll",
        props:{
            probeType:{
                type:Number,
                default:0
            },
//            pullUpLoad:{
//                type:Boolean,
//                default:false
//            }
        },
        data:function(){
            return {
                scroll:null
            }
        },
        mounted:function() {
//            1.创建BScroll对象
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,
                probeType:this.probeType,
                pullUpLoad:this.probeType
            })
//            2.监听滚动的位置
            this.scroll.on('scroll',(position) =>{
//                console.log(position);
                this.$emit('scroll',position)
            })

//            3.监听上拉事件
//            this.scroll.on('pullingUp',() => {
//                this.$emit('pullingUp')
//            })

        },
        methods:{
            scrollTo:function(x, y, time=300) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp:function(){
                this.scroll.finishPullUp()
            },
            refresh:function(){
                this.scroll && this.scroll.refresh()
            }


        }

    }
</script>

<style scoped>

</style>

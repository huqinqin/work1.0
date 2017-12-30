<template>
    <div>
        order detail {{$route.params.tid}}
    </div>
</template>
<script>
    export default {
        props: {},
        components: {
        },
        data() {
            return {
                data: {
                    tid: ''
                }
            }
        },
        methods: {
            get () {

            }
        },
        mounted(){
            console.log(this.$route.params);
        },
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
            }
        }
    }
</script>
<style lang="less">

</style>

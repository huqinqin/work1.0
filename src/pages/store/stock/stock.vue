<template>
    <div>
        <router-view>

        </router-view>
    </div>
</template>
<script>
    import stock from './components/stock'
    export default {
        props: {},
        name: 'stock',
        components: {stock},
        data () {
            return {
            }
        },
        methods: {
        }

    }
</script>

<style scoped>

</style>


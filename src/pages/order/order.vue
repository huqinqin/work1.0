<template>
    <div>
        <router-view>

        </router-view>
    </div>
</template>
<script>
    import list from './components/list'
    import detail from './components/detail'
    export default {
        props: {},
        name: 'order',
        components: {list, detail},
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


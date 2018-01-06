<template>
    <div>
        <router-view>

        </router-view>
    </div>
</template>
<script>
    import list from './components/list'
    export default {
        props: {},
        name: 'delivery',
        components: {list},
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


<template>
  <div>
    <router-view>

    </router-view>
  </div>
</template>
<script>
  import merchantsList from './components/merchantsList'
  import addMerchants from './components/addMerchants'
  import editMerchants from './components/editMerchants'
  export default {
    props: {},
    name: 'merchants',
    components: {merchantsList, addMerchants, editMerchants},
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


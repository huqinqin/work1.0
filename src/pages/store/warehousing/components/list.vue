<template>
    <div>
        <lts-search-form @get-from="getParameter" :form-fileds="formFileds" :form-inlines="params"></lts-search-form>

    </div>
</template>
<script>
    import {dateUtils} from 'ltsutil'
    import {ltsSearchForm} from 'ui'
    import deliveryService from '@/services/DeliveryService'

    export default {
        components: {
            ltsSearchForm
        },
        data() {
            return {
                loading: true,
                datalist: [],
                params: {
                },
                formFileds: [

                ],
            }
        },
        mounted(){
            this.search();
        },
        methods: {
            getParameter(bizParams) {
                this.search()
            },
            search() {
                this.loading = true;
                this.datalist = [];
            }
        }
    }
</script>
<style lang="less">

</style>

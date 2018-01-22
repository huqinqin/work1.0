<template>
    <div id="app">
        <el-alert :title="error_message" show-icon center v-if="error_message" type="warning"></el-alert>
    </div>
</template>
<script>
    import userService from '@/services/UserService'
    import session from '@/library/Session'
    export default {
        data() {
            return {
                error_message: ''
            }
        },
        mounted() {
            userService.logout().then((resp) => {
                session.logout();
            },(err) => {
                this.error_message = err.error_message;
            })
        }
    }
</script>
<style scoped>
</style>

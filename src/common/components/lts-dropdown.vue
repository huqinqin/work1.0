<template>
  <el-dropdown trigger="click" placement="bottom">
    <el-button :type="type">{{ title }}<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :key="val" v-for="val in content">{{ val }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    name: 'lts-dropdown',
    props: ['options'],
    data () {
      return {
        type: this.options.type,
        title: this.options.title,
        content: this.options.content
      }
    }
  }
</script>


<template>
    <div>
        全部课程
    </div>
</template>

<script>
import router from 'vue-router'
    export default {
        name:"total",
        mounted() {
           console.log(this.$route.query.courseId)
        }
    }
</script>

<style lang="scss" scoped>

</style>
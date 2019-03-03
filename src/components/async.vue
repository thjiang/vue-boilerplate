<template>
    <div class="content">
        这是{{page}}页面
        这是一段蓝色的字
    </div>
</template>

<script>
export default {
    data: function () {
        return { page: '异步模块' };
    }
};
</script>

<style lang="scss" scoped="scoped">
    .content {
        color: blue;
        transform: translateY(40px);
    }
</style>

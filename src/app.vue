<template>
    <div id="app" class="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            data: 1
        };
    },
    methods: {},
    watch: {
        '$route': {
            handler(newData) {
                this.data = newData;
            }
        }
    },
    mounted() {}
};
</script>

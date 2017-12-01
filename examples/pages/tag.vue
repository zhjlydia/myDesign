<template>
    <Tag v-if="show" closable @on-close="handleClose">标签</Tag>
</template>
<script>
export default {
    data() {
        return {
            show: true
        }
    },
    methods: {
        handleClose() {
            this.show = false;
        }
    }
}
</script>

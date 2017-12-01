<template>
    <div>
        <Tree-Node v-for="item in data" :key="item.title" :data="item" visible></Tree-Node>
    </div>
</template>
<script>
import Emitter from '../../mixins/emitter';
import clickoutside from '../../directives/clickoutside';
import TreeNode from './node.vue';
export default {
    name: 'Tree',
    mixins: [Emitter],
    components: { TreeNode },
    directives: {
        clickoutside
    },
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            prefixCls: "sp-tree",
        };
    },
    computed: {
        classes() {
            return [
                this.prefixCls, {
                    [this.prefixCls + '-visible']: true
                }
            ];
        }
    },
    methods: {

    },
    mounted() {

    },
    watch: {

    }
};
</script>

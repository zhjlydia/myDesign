<template>
    <div :class="classes">
        <slot></slot>
        <Icon v-if="closable" type="close" @click.native.stop="close"></Icon>
    </div>
</template>
<script>
import Icon from '../icon';
const prefixCls = 'sp-tag';

export default {
    name: 'Tag',
    components: { Icon },
    props: {
        closable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        classes() {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-closable`]: this.closable
                }
            ];
        },
    },
    methods: {
        close() {
            this.$emit('on-close');
        }
    }
};
</script>

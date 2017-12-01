<template>
    <li :class="classes" @click="selectItem()" v-show="visible">
        <slot>{{label}}</slot>
    </li>
</template>
<script>
import Emitter from '../../mixins/emitter';
export default {
    name: 'iOption',
    componentName: 'option',
    mixins: [Emitter],
    props: {
        value: {
            type: [String, Number],
            required: true
        },
        label: {
            type: [String, Number]
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            prefixCls: "sp-select-drop-item",
            selectedItem: {
                value: "",
                label: ""
            },
            visible: true
        };
    },
    computed: {
        selected() {
            if (!this.$parent.multiple) {
                return this.value === this.$parent.model;
            } else {
                return this.$parent.model.indexOf(this.value) > -1;
            }
        },
        classes() {
            return [
                this.prefixCls,
                {
                    [this.prefixCls + '-disabled']: this.disabled,
                    [this.prefixCls + '-selected']: this.selected,
                    [this.prefixCls + '-focus']: this.isFocus
                }
            ];
        },
        showLabel() {
            return (this.label) ? this.label : this.value;
        }
    },
    methods: {
        selectItem() {
            if (this.disabled) {
                return false;
            }
            this.selectedItem.value = this.value;
            this.selectedItem.label = (this.label === undefined) ? this.$el.innerHTML : this.label;
            this.dispatch('iSelect', 'on-select-selected', this.selectedItem);
        },
        queryChange(query) {
            // query 里如果有正则中的特殊字符，需要先将这些字符转义
            let parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
            this.visible = new RegExp(parsedQuery, 'i').test(this.searchLabel);
        }
    },
    mounted() {
        this.searchLabel = this.label ? this.label : this.$el.innerHTML;
        this.$on('on-query-change', (val) => {
            this.queryChange(val);
        });
    },
    watch: {
        visible(val) {
            if (val) {
                this.dispatch('iSelect', 'on-select-visible', {
                    value: this.value,
                    label: this.label
                });
            }
        }
    }
};
</script>

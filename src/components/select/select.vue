<template>
    <div :class="classes" v-clickoutside="handleClose">
        <div :class="[prefixCls + '-body']" @click="toggleDropdown()">
            <Tag v-for="(item, index) in selectedMultiple" :key="item.value" closable @on-close="removeTag(index)">{{item.label}}</Tag>
            <span :class="[prefixCls + '-placeholder']" v-show="showPlaceholder && !filterable">{{ localePlaceholder }}</span>
            <span :class="[prefixCls + '-selected-value']" v-show="!showPlaceholder && !multiple && !filterable">{{ selectedSingle }}</span>
            <input type="text" v-model="query" v-if="filterable" :style="inputStyle" :class="[prefixCls + '-input']" :placeholder="showPlaceholder ? localePlaceholder : ''" @keydown="resetInputState" ref="input"></input>
            <div :class="[prefixCls + '-icon']">
                <Icon type="arrow-down" :class="[prefixCls + '-arrow']"></Icon>
                <Icon type="close" v-show="showCloseIcon" @click.native.stop="clearSingleSelect()"></Icon>
            </div>
        </div>
        <transition name="slide-up">
            <div :class="[prefixCls + '-dropdown']" v-show="isShowDropDown" style="width:100%">
                <ul :class="[prefixCls + '-dropdown-list']">
                    <slot></slot>
                    <li class="sp-select-drop-item" v-show="!options.length">无匹配数据</li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
import Emitter from '../../mixins/emitter';
import clickoutside from '../../directives/clickoutside';
export default {
    name: 'iSelect',
    mixins: [Emitter],
    components: {},
    directives: {
        clickoutside
    },
    props: {
        value: {
            type: [String, Number, Array],
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        filterable: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String
        },
        remote: {
            type: Boolean,
            default: false
        },
        remoteMethod: {
            type: Function
        }
    },
    data() {
        return {
            prefixCls: "sp-select",
            isShowDropDown: false,
            inputLength: 20,
            options: [],
            selectedSingle: "",
            selectedMultiple: [],
            model: this.value,
            query: "",
            selectToChangeQuery: true
        };
    },
    computed: {
        classes() {
            return [
                this.prefixCls, {
                    [this.prefixCls + '-visible']: this.isShowDropDown,
                    [this.prefixCls + '-disabled']: this.disabled,
                    [this.prefixCls + '-multiple']: this.multiple,
                    [this.prefixCls + '-single']: !this.multiple,
                    [this.prefixCls + '-clear']: this.showCloseIcon
                }
            ];
        },
        inputStyle() {
            let style = {};
            if (this.multiple) {
                if (this.showPlaceholder) {
                    style.width = '100%';
                } else {
                    style.width = `${this.inputLength}px`;
                }
            }
            return style;
        },
        showPlaceholder() {
            return this.model === null || this.model === '' || (Array.isArray(this.model) && !this.model.length);
        },
        localePlaceholder() {
            if (this.placeholder === undefined) {
                return "请选择";
            } else {
                return this.placeholder;
            }
        },
        showCloseIcon() {
            return !this.multiple && this.clearable && !this.showPlaceholder;
        }
    },
    methods: {
        toggleDropdown() {
            this.isShowDropDown = !this.isShowDropDown;
        },
        handleClose() {
            this.isShowDropDown = false;
        },
        clearSingleSelect() {
            this.model = "";
            this.selectedSingle = "";
        },
        resetInputState() {
            this.inputLength = this.$refs.input.value.length * 12 + 20;
        },
        removeTag(index) {
            this.model.splice(index, 1);
            this.selectedMultiple.splice(index, 1);
        },
        getChild(callback) {
            var findChild = function (child) {
                if (child.$options.componentName === "option") {
                    callback(child);
                }
                else {
                    child.$children.forEach(item => {
                        findChild(item);
                    })
                }
            };
            this.$children.forEach((child) => {
                findChild(child);
            });
        },
        getOptions() {
            this.options = [];
            this.getChild(child => {
                if (child.visible) {
                    this.options.push({
                        value: child.value,
                        showLabel: child.showLabel
                    })
                }
            })
        }
    },
    mounted() {
        this.$on('on-select-selected', (selectedItem) => {
            if (this.multiple) {
                const index = this.model.indexOf(selectedItem.value);
                if (index >= 0) {
                    this.removeTag(index);
                } else {
                    this.model.push(selectedItem.value);
                    this.selectedMultiple.push({
                        value: selectedItem.value,
                        label: selectedItem.label
                    })
                }
                this.query = "";
            } else {
                this.model = selectedItem.value;
                this.selectedSingle = selectedItem.label;
                this.selectToChangeQuery = false;//选中时不搜索
            }
        });
        this.getOptions();
    },
    watch: {
        isShowDropDown(val) {
            if (val) {
                if (this.filterable) {
                    if (this.multiple) {
                        this.$refs.input.focus();
                    } else {
                        this.$refs.input.select();
                    }
                }
            } else {
                if (this.filterable) {
                    this.$refs.input.blur();
                }
            }
        },
        query(newv, oldv) {
            if (this.selectToChangeQuery) {
                if (this.remote) {
                    this.remoteMethod(newv);
                }
                else {
                    this.broadcast('iOption', 'on-query-change', newv);
                }
                this.$nextTick(() => this.getOptions());
            }
            this.selectToChangeQuery = true;
        },
        model(val) {
            if (!this.multiple && this.filterable) {
                this.query = this.selectedSingle;
            }
        }
    }
};
</script>

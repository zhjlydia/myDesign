<template>
    <div :class="classes">
        <div :class="[prefixCls + '-body']">
            <div :class="[prefixCls + '-icon']" @click="toggleDropdown()">
                <Icon type="arrow-down" v-show="!isShowDropDown"></Icon>
                <Icon type="arrow-up" v-show="isShowDropDown"></Icon>
            </div>
        </div>
        <div :class="[prefixCls + '-dropdown']" v-show="isShowDropDown">
            <ul :class="[prefixCls + '-dropdown-list']">
                <slot></slot>
            </ul>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Select',
    components: {},
    props: {

    },
    data() {
        return {
            prefixCls: "sp-select",
            isShowDropDown: false
        };
    },
    computed: {
        classes() {
            return [
                this.prefixCls
            ];
        }
    },
    methods: {
        toggleDropdown() {
            this.isShowDropDown = !this.isShowDropDown;
        }
    },
    mounted() {

    }
};
</script>

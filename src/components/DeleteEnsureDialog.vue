<template>
    <a-modal v-model="visible" :title="title" onOk="handleOk" :maskClosable="false" :centered="true"
         @cancel="cancel">
        <template slot="footer">
            <a-button key="back" @click="cancel">返回</a-button>
            <a-button @click="ensure">确认</a-button>
        </template>
        <slot></slot>
    </a-modal>
</template>
<script>
    export default {
        components: {},
        props: {
            title:{
                type: String,
                default: ''
            }
        },
        data() {
            return {
                visible:false
            }
        },
        methods: {
            cancel(){
                this.visible = false
            },
            show() {
                this.visible = true
            },
            ensure(){
                this.$emit('ensure')
                this.visible = false
            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
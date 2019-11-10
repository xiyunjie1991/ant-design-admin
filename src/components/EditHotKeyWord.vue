<template>
        <a-modal v-model="visible" title="更新关键词" onOk="handleOk" :maskClosable="false" :centered="true"
             @cancel="cancel">
            <template slot="footer">
                <!-- <a-button key="back" @click="cancel">返回</a-button> -->
                <a-button @click="ensure" type="primary">确认</a-button>
            </template>
            <slot>
                <span>关键字</span>
                <a-input v-model="name"></a-input>
            </slot>
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
                    name:'',
                    visible:false
                }
            },
            methods: {
                cancel(){
                    this.visible = false
                },
                show(name) {
                    this.visible = true
                    this.name = name
                },
                ensure(){
                    this.$emit('ensure',this.name)
                    this.visible = false
                }
            },
        }
    </script>
    
    <style rel="stylesheet/scss" lang="scss" scoped>
    
    </style>
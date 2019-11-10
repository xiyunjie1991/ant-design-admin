<template>
        <div>
            <a-modal v-model="visible" title="创建频道分组" onOk="handleOk" :maskClosable="false" :centered="true"
                :cancel="cancel">
                <template slot="footer">
                    <a-button @click="ensure" type="primary">创建/更新频道名称</a-button>
                </template>
                <a-row class="input-row">
                    <a-col :span="4">
                        <span>频道名称</span>
                    </a-col>
                    <a-col :span="10" :offset="2">
                        <a-input size="small" v-model="item.name" />
                    </a-col>
                </a-row>
                <a-row v-show="item.id === 0" class="input-row">
                        <a-col :span="4">
                            <span>频道分类</span>
                        </a-col>
                        <a-col :span="10" :offset="2">
                            <a-select size="small" style="width:100px;" v-model="item.type">
                                <a-select-option v-for="(item,index) in options" :key="item.value" >{{item.label}}</a-select-option>
                            </a-select>
                        </a-col>
                    </a-row>
            </a-modal>
        </div>
    </template>
    
    <script>
        import moment from "moment"; //导入文件
        import { UpdateOrbRoom } from "@/api/orb";
        export default {
            components: {},
            watch: {},
            data() {
                return {
                    item: {},
                    visible: false,
                    options:[
                        {
                            value:0,
                            label:'内容频道'
                        },
                        {
                            value:1,
                            label:'聊天频道'
                        }
                    ]
                };
            },
            computed: {
                dragOptions() {
                    return {
                        animation: 200,
                        group: "description",
                        disabled: false,
                        ghostClass: "ghost"
                    };
                }
            },
            methods: {
                async ensure() {
                    const r = await UpdateOrbRoom(this.item.id, this.item.group_id, this.item.name, this.item.type)
                    if (r.status === 0) {
                        this.$emit("createSuccess", this.item);
                        this.visible = false;
                        this.item = {};
                    }
                },
                cancel() {
                    this.item = {};
                    this.visible = false;
                },
                show(item) {
                    this.item = item;
                    this.visible = true;
                }
            }
        };
    </script>
    
    <style rel="stylesheet/scss" lang="scss" scoped>
    </style>
<template>
    <div>
        <a-modal v-model="visible" title="创建频道分组" onOk="handleOk" :maskClosable="false" :centered="true"
            :cancel="cancel">
            <template slot="footer">
                <a-button @click="ensure" type="primary">创建/更新分类</a-button>
            </template>
            <a-row class="input-row">
                <a-col :span="4">
                    <span>分组名称</span>
                </a-col>
                <a-col :span="10" :offset="2">
                    <a-input size="small" v-model="item.name" />
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
    import moment from "moment"; //导入文件
    import { UpdateOrbRoomGroup } from "@/api/orb";
    export default {
        components: {},
        watch: {},
        data() {
            return {
                item: {},
                visible: false,
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
                const r = await UpdateOrbRoomGroup(this.item.id, this.item.orb_id, this.item.name)
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
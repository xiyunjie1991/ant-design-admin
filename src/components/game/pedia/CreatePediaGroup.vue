<template>
        <div>
          <a-modal
            v-model="visible"
            title="创建百科分类"
            onOk="handleOk"
            :maskClosable="false"
            :centered="true"
            :cancel="cancel"
          >
            <template slot="footer">
              <a-button  key="back" @click="cancel">取消</a-button>
              <a-button  @click="ensure" type="primary">创建分类</a-button>
            </template>
            <a-row class="input-row">
              <a-col :span="10">
                <span >分类名称</span>
              </a-col>
              <a-col :span="10" :offset="2">
                <a-input v-model="name"/>
              </a-col>
            </a-row>
      
          </a-modal>
        </div>
      </template>
      
      <script>
        import moment from "moment"; //导入文件
        import { CreateGamePediaGroup } from "@/api/game";
        export default {
          components: {},
          watch: {},
          data() {
            return {
              item: {},
              visible: false,
              name:'',
              game_id:0
            };
          },
          methods: {
            async ensure() {
              const r = await CreateGamePediaGroup(this.game_id,this.name)
              if (r.status === 0) {
                this.$emit("createSuccess");
                this.visible = false;
                this.item = {};
              }
            },
            cancel() {
              this.item = {};
              this.visible = false;
            },
            show(game_id) {
              this.game_id = game_id;
              this.visible = true;
            }
          }
        };
      </script>
      
      <style rel="stylesheet/scss" lang="scss" scoped>
      </style>
      
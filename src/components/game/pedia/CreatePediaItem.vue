<template>
    <div>
        <a-modal v-model="visible" title="更新百科词条" onOk="handleOk" :maskClosable="false" :centered="true"
            :cancel="cancel">
            <template slot="footer">
                <a-button key="back" @click="cancel">取消</a-button>
                <a-button @click="ensure" type="primary">保存</a-button>
            </template>
            <a-row class="input-row">
                <a-col :span="5">
                    <span>词条名称</span>
                </a-col>
                <a-col :span="10" :offset="2">
                    <a-input v-model="item.name" />
                </a-col>
            </a-row>
            <a-row class="input-row">
                <a-col :span="5">
                    <span>选择对应文章</span>
                </a-col>
                <a-col :span="10" :offset="2">
                    <a-select showSearch v-model="article_id" style="width:150px;" @search="remoteMethod"
                        :showArrow="false" :filterOption="false" :defaultActiveFirstOption="false"
                        :notFoundContent="null" @change="remoteMethod" placeholder="请输入关键词">
                        <a-select-option v-for="item in articles" :key="item.id">{{item.title}}</a-select-option>
                    </a-select>
                </a-col>
            </a-row>

        </a-modal>
    </div>
</template>

<script>
    import { FindArticles, GetArticle } from '@/api/articles'
    import moment from "moment"; //导入文件
    import { CreateGamePediaItem } from "@/api/game";
    export default {
        components: {},
        watch: {},
        data() {
            return {
                item: {},
                visible: false,
                name: '',
                game_id: 0,
                article_id: null,
                articles: [],
                loading: false,
                index: -1
            };
        },
        created() {
        },
        methods: {
            remoteMethod(query) {
         
                this.loading = true
                FindArticles({ query: query }).then(v => {
                    this.loading = false
                    this.articles = v.data.articles
                }).catch(e => {

                })
            },
            async ensure() {
                if (this.index === -1) {
                    const r = await CreateGamePediaItem(this.item.group_id, this.item.name, this.article_id)
                    if (r.status === 0) {
                        this.$emit("createItemSuccess", r.data,this.index);
                        this.visible = false;
                        this.item = {};
                    }
                } else {
                    this.$emit("createItemSuccess", this.item,this.index);
                    this.visible = false;
                    this.item = {};
                }

            },
            cancel() {
                this.item = {};
                this.visible = false;
            },
            show(item, i) {
                this.index = i
                if(i === -1){
                    this.remoteMethod("")
                }else{
                    GetArticle(item.article_id).then(v => {
                    this.remoteMethod(v.data.title)
                })
                }
              
                this.item = item;
                this.article_id = item.article_id
                this.visible = true;
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
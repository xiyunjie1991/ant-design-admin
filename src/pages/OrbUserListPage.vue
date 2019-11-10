<template>
    <div class="root">
        <a-input-search placeholder="请输入完整手机号或者昵称" style="width: 200px;margin-bottom:10px;" @search="onSearch"
            size="small" v-model="query" />
        <a-table :columns="columns" :loading="loading" :dataSource="users" :rowKey="r => r.id" :pagination="{total:total,pageSize:pageSize,current:page,showSizeChanger:true,
                               showTotal:total => `总供 ${total} 条`,size:'small',}" @change="changePage">
            <span slot="avatar" slot-scope="text, record, index">
                <img style="width:60px;height: 60px;" :src="getFileUrl(record.avatar,60)"></img>
            </span>
            <span slot="utype" slot-scope="text, record, index">
                <div>{{ record.utype | utypeFilter}}</div>
            </span>
            <span slot="gender" slot-scope="text, record, index">
                <div>{{ record.gender | genderFilter}}</div>
            </span>
        </a-table>
    </div>
</template>

<script>
    import { getFileUrl } from "@/api/file";
    import { FindOrbUsers, GetOrbInfo } from "@/api/orb";
    import { GetUserInfo} from "@/api/user";
    export default {

        filters: {
            utypeFilter: function (value) {
                if (value === 0) {
                    return "普通账户"
                } else {
                    return "管理员账户"
                }
            },
            genderFilter: function (value) {
                if (value === 0) {
                    return "未知"
                } else if (value === 1) {
                    return "男"
                } else if (value === 2) {
                    return "女"
                }
            }
        },
        data() {
            return {
                loading: false,
                page: 1,
                pageSize: 10,
                total: 0,
                id: 0,
                query: '',
                orbInfo:{},
                users: [],
                creater:{},
                columns: [
                    {
                        dataIndex: 'avatar',
                        title: '用户头像',
                        scopedSlots: { customRender: 'avatar' }
                    },
                    {
                        dataIndex: 'username',
                        title: '用户名',
                        // scopedSlots: { customRender: 'username' }
                    },
                    {
                        dataIndex: "nickname",
                        title: "用户昵称",
                        // scopedSlots: { customRender: 'nickname' }
                    },
                    {
                        dataIndex: 'phone',
                        title: '手机号',
                    },
                    {
                        dataIndex: 'utype',
                        title: '账号类型',
                        scopedSlots: { customRender: 'utype' }
                    },
                    {
                        dataIndex: 'gender',
                        title: '性别',
                        scopedSlots: { customRender: 'gender' }
                    },
                ],
            };
        },
        created() {
            this.id = Number(this.$route.params.id);
            this.init()
        },
        methods: {
            getFileUrl,
            deleteArticle(index) {

            },
            changePage(pagination) {
                this.page = pagination.current;
                this.pageSize = pagination.pageSize;
                this.init();
            },
            onSearch() {
                this.init();
            },
            async init() {
                const r2  = GetOrbInfo(this.id)
                if(r2.status === 0){
                    this.orbInfo = r2.data;
                    GetUserInfo(this.orbInfo.creator_id).then(v => {
                            if (v.data.status === 0) {
                                this.creater = v.data.data;
                            }
                        });
                }
                const r = await FindOrbUsers( this.page,this.pageSize, this.query, this.id)
                if (r.status !== 0) {
                    this.$message.warn("未知错误 status=" + r.status);
                } else {
                    this.users = r.data.users
                    this.page = r.data.page;
                    this.pageSize = r.data.page_size;
                    this.total = r.data.total;
                }
            },
        },
    };
</script>
<style>
</style>
<template>
	<div class="root">
		<a-input-search placeholder="请输入猩球名称" style="width: 200px;margin-bottom:10px;" @search="onSearch" size="small"
			v-model="query" />
		<a-table :columns="columns" :loading="loading" :dataSource="orbList" :rowKey="r => r.id" :pagination="{total:total,pageSize:pageSize,current:page,showSizeChanger:true,
					 showTotal:total => `总供 ${total} 条`,size:'small',}" @change="changePage">
			<span slot="action" slot-scope="text, record, index">
				<a-dropdown>
					<a>
						<a-icon type="dash" />
					</a>
					<a-menu slot="overlay">
						<a-menu-item>
							<router-Link :to="'/orb/' + record.id">
							<a>猩球详情</a>
							</router-Link>
						</a-menu-item>
						<a-menu-item>
							<router-Link :to="'/orb/userlist/' + record.id">
							<a>猩球人员信息</a>
							</router-Link>
						</a-menu-item>
						<a-menu-item>
							<a-popconfirm title="确定要删除猩球吗" @confirm="deleteOrb(record.id)" okText="Yes"
								cancelText="No">
								<a-tooltip placement="top">
									<template slot="title">
									</template>
									<a style="color:#F56C6C">删除猩球</a>
								</a-tooltip>
							</a-popconfirm>
						</a-menu-item>
					</a-menu>
				</a-dropdown>
			</span>
		</a-table>
	</div>
</template>

<script>
	import { FindOrbs,RemoveOrb } from '@/api/orb'
	import { getFileUrl } from '@/api/file'
	export default {
		watch: {
			page() {
				history.replaceState(null, "", "/orb/list?page=" + this.page);
			}
		},
		data() {
			return {
				loading: false,
				page: 1,
				pageSize: 10,
				total: 0,
				query: '',
				orbList: [],
				columns: [
					{
						dataIndex: 'id',
						key: 'id',
						title: '#',
					},
					{
						dataIndex: 'name',
						key: 'name',
						title: '猩球名称',
					},
					{
						dataIndex: "avatar",
						key: "avatar",
						title: "图标",
						customRender: (text, row, index) => {
							return <a-avatar src={getFileUrl(row.picture, 50)} icon="user" />;
						}
					},
					{
						dataIndex: 'is_official',
						key: 'is_official',
						title: '是否为官方',
						customRender: (text, row, index) => {
							if (row.is_official) {
								return <span style="color:#409EFF">是</span>
							} else {
								return <span style="color:#F56C6C">否</span>
							}


						},
					},
					{
						dataIndex: 'gameName',
						key: 'gameName',
						title: '所属游戏',
						customRender: (text, row, index) => {
							if (row.game) {
								return <router-link to={'/game/' + row.game.id}>
									<span style="color:#409EFF ">{row.game.name}</span>
								</router-link>
							} else {
								return <div></div>
							}

						},
					},
					{
                        title: '更多操作',
                        scopedSlots: { customRender: 'action' }
                    },
				],
			};
		},
		created() {
			this.init()
		},
		methods: {
			jumpToOrbUserList(id) {
				this.$router.push({ path: 'orbUserList/' + row.id })
			},
			getFileUrl(avarar, size) {
				getFileUrl(avarar, size);
			},
			deleteOrb(orb_id) {
				RemoveOrb(orb_id).then(v=>{
					if(v.status === 0){
						this.$message.info('删除成功')
						this.init()
					}
				})
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
				const r = await FindOrbs(this.page, this.pageSize, this.query)
				if (r.status !== 0) {
					this.$message.warn("未知错误 status=" + r.status);
				} else {
					this.orbList = r.data.orbs
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
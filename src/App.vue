<template>
    <a-locale-provider :locale="zh_CN">
        <div id="app">
            <router-view></router-view>
        </div>
    </a-locale-provider>
</template>

<script>
	import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
	import moment from 'moment';
	import 'moment/locale/zh-cn';

	export default {
		name: 'app',
		data() {
			return {
				zh_CN: zh_CN,
			}
		},
	};
</script>

<style>
    div#app {
        height: 100%;
        width: 100%;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>

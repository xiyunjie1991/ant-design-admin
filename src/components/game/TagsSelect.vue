<template>
  <a-select mode="multiple" v-model="defaultValue_" style="width: 100%" placeholder="Please select">
    <a-select-option v-for="item in list" :key="item.id">{{item.name}}</a-select-option>
  </a-select>

   <!-- <a-select ref='modes' mode="multiple" v-model="gameModes" style="width: 100%"  placeholder="Please select">
            <a-select-option v-for="i in defaultGameModes" :key="i.id">{{i.name}}</a-select-option>
          </a-select> -->
</template>

<script>
  export default {
    components: {},
    props: {
      defaultValue: {
        type: Array,
        default: function(){
          return []
        }
      },
      apiFunc: {
      type:Function,
      default: null
    },
    },
    watch: {
      defaultValue(){
          this.defaultValue_ = this.defaultValue.map(v=>{
            return v.id
          })
      }
    },
    data() {
      return {
          defaultValue_:[],
        list:[]
      }
    },
    methods: {
      getData(){
          return this.defaultValue_
      },
      async  init() {
        this.defaultValue_ = this.defaultValue.map(v=>{
            return v.id
          })
          const r = await this.apiFunc()
          this.list = r.data
      }
    },
    created() {
   this.init()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
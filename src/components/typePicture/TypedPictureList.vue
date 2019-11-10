<template>
  <transition-group name="item" tag="div" class="root">
    <div v-for="(item,index) in pictureList" :key="JSON.stringify(item)" class="item">
      <img v-if="item.type === 0" :src="getFileUrl(item.picture,160)">
      <video v-if="item.type === 1" :poster="getFileUrl(item.picture,320)" :src="getVideoUrl(item.video)"
        controls></video>
      <a-button-group class="action">
        <a-button v-if="(index !== 0)" size="small" icon="left" @click="move(index-1,index)" />
        <a-button size="small" icon="edit" @click="edit(item,index)" />
        <a-button size="small" icon="delete" @click="remove(index)" />
        <a-button v-if="(index !== value.length-1)" size="small" icon="right" @click="move(index,index+1)" />
      </a-button-group>
    </div>
    <div class="upload item" key="upload">
      <a-icon class="icon-upload" type="plus" @click="edit(null,-1)"></a-icon>
    </div>
    <div key="typed">
      <TypedPicture ref="TypedPicture" @update="update"></TypedPicture>
    </div>
  </transition-group>
</template>

<script>
  import { getFileUrl, getVideoUrl } from "@/api/file";
  import TypedPicture from "@/components/typePicture/TypedPicture";

  export default {
    components: {
      TypedPicture
    },
    props: {
      value: {
        type: Array,
        default: ()=>{return []}
      }
    },
    watch: {
      value: {
        handler() {
          this.pictureList = this.value;
        },
        deep: true
      },
      pictureList: {
        handler(newVal) {
          this.$emit('input',newVal)
        },
        deep: true
      },
    },
    data() {
      return {
        getFileUrl: getFileUrl,
        getVideoUrl: getVideoUrl,
        pictureList: [],
        editing: -1
      };
    },
    created() {
      this.pictureList = this.value;
    },
    methods: {
      move(i, j) {
        const t = this.pictureList[i];
        this.pictureList.splice(i, 1);
        this.pictureList.splice(j, 0, t);
      },
      remove(index) {
        this.pictureList.splice(index, 1);
      },
      edit(item, index) {
        if (!item) {
          item = { type: 0, picture: "", video: "" };
        }
        this.editing = index;
        this.$refs.TypedPicture.show(Object.assign({}, item));
      },
      update(item) {
        if (this.editing < 0) {
          this.pictureList.push(item);
        } else {
          this.$set(this.pictureList, this.editing, item);
        }
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  div.root {
    padding: 0;
    position: relative;
    display: flex;
    flex-wrap: wrap;

    .item {
      margin: 5px;
      padding: 5px;
      border: 1px solid #dcdfe6;
      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04);
      transition: all 1s ease;
      -webkit-transition: all 1s ease;

      width: 170px;
      height: 132px;

      img,
      video {
        width: 160px;
        max-height: 90px;
        display: block;
      }

      .action {
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      &.item-enter-active,
      &.item-move,
      &.item-leave-active {
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
      }

      &.item-enter {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
      }

      &.item-leave-active {
        opacity: 0;
        position: absolute;
        -webkit-transform: scale(0);
        transform: scale(0);
      }
    }

    .upload {
      text-align: center;
      position: relative;

      .icon-upload {
        position: absolute;
        font-size: 26px;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
      }
    }
  }
</style>
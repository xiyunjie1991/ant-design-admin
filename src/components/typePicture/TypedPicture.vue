<template>
  <a-modal
    v-model="visible"
    title="图片/视频上传"
    onOk="handleOk"
    :maskClosable="false"
    :centered="centered"
    :cancel="cancel"
    :width="option.width+20"
  >
    <template slot="footer">
      <a-button key="back" @click="cancel">取消</a-button>
      <a-button
        @click="ensure"
        :disabled="pic.picture==='' || (pic.type===1 && pic.video==='')"
        type="primary"
      >确认</a-button>
    </template>
    <a-select v-model="pic.type" size="small">
      <a-select-option
        v-for="(item,index) in options"
        :key="index"
        :value="item.value"
      >{{item.label}}</a-select-option>
    </a-select>
    <p class="form-title">图片/视频封面图</p>
    <picture-uploader
      :width="Number(800)"
      :height="Number(450)"
      class="picture-uploader"
      :fileid="pic.picture"
      :fileType="Number(0)"
      @onchange="updatePicture"
    ></picture-uploader>
    <p v-show="pic.type === 1" class="form-title">视频</p>
    <picture-uploader
      v-show="pic.type === 1"
      :width="Number(800)"
      :height="Number(450)"
      class="picture-uploader"
      :fileid="pic.video"
      :fileType="Number(1)"
      @onchange="updateVideo"
    ></picture-uploader>
    <!-- </a-spin> -->
  </a-modal>
</template>

<script>
import { getFileUrl } from "@/api/file";
import { uploadFile } from "@/api/upload";
import PictureUploader from "@/components/typePicture/PictureUploader";

export default {
  components: {
    PictureUploader
  },
  data() {
    return {
      loading: false,
      visible: false,
      autoCrop: true,
      centered: true,
      fixedNumber: [],
      getFileUrl: getFileUrl,
      width: 0,
      pic: {
        type: 0,
        value: "图片",
        picture: "",
        video: ""
      },
      options: [
        {
          value: 0,
          label: "图片"
        },
        {
          value: 1,
          label: "视频"
        }
      ],
      imgUrl: "",
      out: {
        height: 180,
        width: 320
      },
      option: {
        img: "",
        size: 1,
        full: true,
        outputType: "png",
        canMove: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        high: true,
        fixedBox: false,
        infoTrue: false,
        downImg: "#",
        centerBox: true,
        fixed: true,
        fixedNumber: [],
        maxImgSize: 3000 // 图片最大像素
      }
    };
  },
  methods: {
    updatePicture(value) {
      this.pic.picture = value;
    },
    updateVideo(value) {
      this.pic.video = value;
    },
    handleChange(value) {
    },
    imgLoad(msg) {
      console.log(msg);
    },

    ensure() {
      this.$emit("update", this.pic);
      this.visible = false;
    },
    cancel() {
      (this.pic = {}), (this.visible = false);
    },
    change(e) {},
    show(pic) {
      this.pic = pic;
      this.visible = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.picture-uploader {
  width: 320px;
  height: 180px;
}
.video-uploader {
  width: 320px;
  height: 180px;
}

.form-title {
  line-height: 14px;
  font-size: 14px;
  margin: 10px 0;
}
</style>
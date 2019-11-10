<template>
  <a-modal
    v-model="visible"
    title="图片上传"
    onOk="handleOk"
    :maskClosable="false"
    :centered="centered"
    :width="option.width+20"
    @cancel="cancel"
  >
    <template slot="footer">
      <a-button key="back" @click="cancel">返回</a-button>
      <a-button @click="ensure">确认上传</a-button>
    </template>
    <a-spin :spinning="loading" tip="Loading...">
      <div :style="{height:out.height+'px',width:out.width+'px'}">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputType="option.outputType"
          :info="true"
          :fixed="option.fixed"
          :centerBox="option.centerBox"
          :full="option.full"
          :autoCropHeight="out.height"
          :autoCropWidth="out.width"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixedBox="option.fixedBox"
          :fixedNumber="option.fixedNumber"
          @imgLoad="imgLoad"
        ></vueCropper>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
import { getFileUrl } from "@/api/file";
import { uploadFile } from "@/api/upload";
import { VueCropper } from "vue-cropper";

export default {
  components: {
    VueCropper
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
      pic: "",
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
    inputClick() {
      this.loading = true;
    },
    inputCancel() {
      this.loading = false;
    },
    imgLoad(msg) {
      console.log(msg);
    },
    ensure() {
      this.loading = true;
      this.$refs.cropper.getCropData(data => {
        let file = this.convertBase64UrlToBlob(data);
        let a = Date.now();
        file.name = "avatar" + a + ".jpg";
        const s = new FormData();
        s.append("file", file);
        uploadFile(s).then(v => {
          this.$emit("changeImg", v.data.fileid);
          this.option.img = "";
          this.visible = false;
          this.loading = false;
        });
      });
    },
    convertBase64UrlToBlob(urlData) {
      let bytes = window.atob(urlData.split(",")[1]); //去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/jpeg" });
    },

    cancel() {
      this.option.img = "";
      this.visible = false;
      this.$emit("cleanInput");
    },
    change(e) {},
    show(orb) {
      this.option.img = orb.img;
      this.out.width = orb.width;
      this.out.height = orb.height;
      this.option.fixedNumber.push(Number(orb.width));
      this.option.fixedNumber.push(Number(orb.height));
      this.visible = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cropper-content {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  .cropper {
    width: 350px;
    height: 350px;
  }
  .show-preview {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    .preview {
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #cccccc;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}

.footer-btn {
  width: 100px;
  margin-top: 30px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-start;
  -webkit-justify-content: flex-start;
  .scope-btn {
    width: 100px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }
  .upload-btn {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
  }
  .btn {
    outline: none;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 8px 15px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
  }
}
</style>

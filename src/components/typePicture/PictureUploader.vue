<template>
  <div class="root">
    <div class="upload" v-show="fileid_=== ''" @click="openFileDialog()">
      <a-icon class="icon-upload" v-if="(fileType===1 & loading)" type="loading"></a-icon>
      <a-icon class="icon-upload" v-if="!(fileType===1 & loading)" type="upload"></a-icon>
    </div>

    <div class="box" v-show="fileid_ !== ''">
      <img v-show="fileType === 0" :src="getFileUrl(fileid_,320)">
      <video v-show="fileType === 1" :src="getFileUrl(fileid_)" controls></video>
      <div class="bmbox">
        <div class="icons">
          <a-icon type="eye" @click="show()"/>
          <a-icon style="margin-left:8px" type="delete" @click="remove()"/>
        </div>
      </div>
    </div>

    <input type="file" ref="input" style="display: none" :accept="accept" @change="filechange">
    <cropper-dialog ref="CropperDialog" @changeImg="onchange" @cleanInput="cleanInput"></cropper-dialog>
  </div>
</template>
<script>
import { getFileUrl, getVideoUrl } from "@/api/file";
import { uploadFile } from "@/api/upload";
import CropperDialog from "@/components/typePicture/CropperDialog";

export default {
  props: {
    width: {
      type: Number,
      default: 160
    },
    height: {
      type: Number,
      default: 90
    },
    fileid: {
      type: String,
      default: ""
    },
    fileType: {
      type: Number,
      default: 0
    }
  },
  computed: {
    accept() {
      return this.fileType === 0 ? "image/*" : "video/*";
    }
  },
  components: {
    CropperDialog
  },
  data() {
    return {
      fileid_: this.fileid,
      loading: false
    };
  },
  watch: {
    fileid() {
      this.fileid_ = this.fileid;
    }
  },
  methods: {
    uploadFile,
    getFileUrl,
    getVideoUrl,
    openFileDialog() {
      this.$refs.input.click();
    },
    show() {
      window.open(this.getFileUrl(this.fileid_), "_blank");
    },
    remove() {
      this.fileid_ = "";
      this.$emit("onchange", this.fileid_);
    },
    cleanInput() {
      this.$refs.input.value = "";
    },
    onchange(fileid) {
      this.fileid_ = fileid;
      this.$emit("onchange", this.fileid_);
    },
    async filechange(e) {
      if (e.target.files.length == 0) {
        return;
      }
      var file = e.target.files[0];
      if (this.fileType === 0) {
        var reader = new FileReader();
        reader.onload = e => {
          let data;
          if (typeof e.target.result === "object") {
            data = window.URL.createObjectURL(new Blob([e.target.result]));
          } else {
            data = e.target.result;
          }
          const obj = {
            width: this.width,
            height: this.height,
            img: data
          };
          this.$refs.CropperDialog.show(obj);
        };
        reader.readAsDataURL(file);
      } else if (this.fileType === 1) {
        this.loading = true;
        try {
          const f = new FormData();
          f.append("file", file);
          const r = await uploadFile(f);
          this.fileid_ = r.data.fileid;
          this.$emit("onchange", this.fileid_);
        } catch (error) {
          this.$message.error("网络错误");
          console.error(error);
        } finally {
          this.loading = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div.root {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  display: inline-block;
  padding: 2px;
  cursor: pointer;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04);
  position: relative;

  .box {
    width: 100%;
    height: 100%;
    position: relative;

    &:hover .bmbox {
      opacity: 0.5;
      transition: ease-in opacity 0.1s;
    }

    img {
      width: 100%;
      max-height: 100%;
    }

    video {
      width: 100%;
      max-height: 100%;
    }

    .bmbox {
      width: 100%;
      height: 100%;
      background: black;
      position: absolute;
      display: inline-block;
      top: 0px;
      left: 0px;
      opacity: 0;
      color: white;
      transition: ease-in opacity 0.1s;

      .icons {
        position: absolute;
        font-size: 20px;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
      }
    }
  }

  .upload {
    width: 100%;
    height: 100%;
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
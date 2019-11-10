<template>
  <div class="root">
    <div>

      <p class="form-title">标题</p>
      <a-input v-model="article.title" style="width: 200px;"></a-input>
      <a-row>
        <a-col :span="10">
          <p class="form-title">封面图</p>
          <PictureUploader :width="Number(800)" :height="Number(450)" class="picture-uploader" :fileid="article.picture"
            :fileType="Number(0)" @onchange="updatePicture"></PictureUploader>
        </a-col>
        <a-col :offset="2" :span="10">
          <p class="form-title">视频</p>
          <PictureUploader :width="Number(800)" :height="Number(450)" class="picture-uploader" :fileid="article.video"
            :fileType="Number(1)" @onchange="uploadVideo"></PictureUploader>
        </a-col>
      </a-row>
      <p class="form-title">类型</p>
      <a-select v-model="article.show_type">
        <a-select-option v-for="(item,index) in sType" :value="item.value" :key="item.value">
          {{item.name}}
        </a-select-option>
      </a-select>
      <p class="form-title">文本编辑</p>
      <TinymceEditor id="tinymce" v-model="article.content" @release="changeContent"
        style="width:600px; margin-top: 6px; margin-bottom: 10px;">
      </TinymceEditor>
      <a-button type="primary" @click="submit">保存</a-button>
    </div>
  </div>
</template>

<script>
  import TinymceEditor from "@/components/editor/tinymce-editor";
  import PictureUploader from "@/components/typePicture/PictureUploader";
  import { UpdateArticle, GetArticle } from "@/api/articles";
  import validator from "@/util/validator";
  export default {
    name: "EditorDemo",
    components: {
      TinymceEditor,
      PictureUploader
    },
    data() {
      const validateTitle = (rule, value, callback) => {
        if (value.length > 64 || value.length === 0) {
          callback(new Error("标题请输入1~64个字符"));
        } else {
          callback();
        }
      };
      return {
        id: 0,
        articleRule: {
          title: [{ required: true, trigger: "blur", validator: validateTitle }]
        },
        editorSetting: {
          width: 960,
          height: 960
        },
        article: {
          content: "",
          title: "",
          picture: "",
          video: "",
          show_type: 0,
          pictureUrl: ""
        },
        pictureUrl: "",
        videoUrl: "",
        sType: [
          {
            name: "纯文本标题",
            value: 0
          },
          {
            name: "小图",
            value: 1
          },
          {
            name: "大图",
            value: 2
          },
          {
            name: "视频标题",
            value: 3
          }
        ]
      };
    },
    computed: {

      video() {
        return process.env.FILE_ACTION + this.article.video;
      }
    },
    watch: {
      picture: function (newValue, oldValue) { },
      video: function (newValue, oldValue) { }
    },

    created() {
      const id = this.$route.params.id;
      console.info("this.$route", this.$route);
      this.id = Number(id);
      this.initData();
    },
    methods: {
      updatePicture(value) {
        this.article.picture = value;
      },
      uploadVideo(value) {
        this.article.video = value;
      },
      changeContent(content) {
        this.article.content = content;
        console.info("content", content);
      },
      subContent(cont) {
        this.article.content = cont;
      },
      initData() {
        if (this.id !== 0) {
          GetArticle(this.id)
            .then(v => {
              if (v.status === 0) {
                this.article = v.data;
                console.info("this.article", v.data);
                document.title = document.title + "-" + this.article.title;
              }
            })
            .catch(e => {
              this.$message.warn("获取文章失败 " + e)
            });
        }
      },
      submit(formName) {
        if (this.article.show_type !== 0 && this.article.picture === "") {
          this.$message.warn("非纯文字类帖子必须上传封面图 ")
          return;
        }
        if (this.article.show_type === 3 && this.article.video === "") {
          this.$message.warn("视频类文章必须展示封面视频 ")
          return;
        }
        if (!validator.validatorStr(this.article.title, 30)) {
          this.$message.error("文章标题不能为空且长度不能大于30个字符");
          return
        }
        UpdateArticle(
          this.id,
          this.article.title,
          this.article.picture,
          this.article.video,
          this.article.show_type,
          this.article.content
        ).then(v => {
          if (v.status === 0) {
            const vid = v.data.id;
            history.replaceState(null, "", "/article/articleEditor/" + vid);
            this.$message.info("更新完成")
          }
        });

        // if () {
        //   const articleForm = Object.assign({}, this.article);

        //   const con = this.article.content;
        //   const cons2 = con.replace(
        //     '<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
        //     ""
        //   );
        //   UpdateArticle(
        //     this.id,
        //     this.article.title,
        //     this.article.picture,
        //     this.article.video,
        //     this.article.show_type,
        //     cons2
        //   ).then(v => {
        //     if (v.data.status === 0) {
        //       const vid = v.data.data.id;
        //       history.replaceState(null, "", "/article/articleEditor/" + vid);
        //       this.$notify({
        //         title: "更新完成",
        //         type: "success"
        //       });
        //     }
        //   });
        // } else {
        //   this.$notify({
        //     title: "警告",
        //     message: "提交错误",
        //     type: "warning"
        //   });
        //   return false;
        // }
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .root {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      margin: 5px;
    }

    .picture-uploader {
      width: 240px;
      height: 135px;
    }
  }
</style>
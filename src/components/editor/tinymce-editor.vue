<template>
  <div>
    <editor id="tinymceEditor" :init="init" v-model="content" :key="tinymceFlag"></editor>
  </div>
</template>
<script>
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/silver/theme'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/plugins/advlist'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/autolink'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/imagetools'
  import { uploadFile } from '@/api/upload'
  import { getFileUrl, getVideoUrl } from '@/api/file'
  // import 'tinymce/plugins/uploadvideo'

  export default {
    name: 'TinymceEditor',
    props: {
      // 传入一个value，使组件支持v-model绑定
      value: {
        type: String,
        default: ''
      },
      plugins: {
        type: [String, Array],
        default: 'lists image media imagetools code table textcolor colorpicker  autolink paste '
      },
      toolbar: {
        type: [String, Array],
        default: 'undo redo | fontsizeselect | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media  code table | removeformat | preview'
      }
    },
    components: {
      'editor': Editor
    },
    watch: {
      value(newValue) {
        this.content = newValue
      },
      content(newValue) {
        this.$emit('input', newValue)
      }
    },
    data() {
      return {
        content: this.value,
        init: {
          skin_url: '/tinymce/skins/ui/oxide',
          language_url: `/tinymce/langs/zh_CN.js`,
          language: 'zh_CN',
          height: 700,
          browser_spellcheck: true, // 拼写检查
          branding: false, // 去水印
          plugins: this.plugins,
          toolbar: this.toolbar,
          imagetools_cors_hosts: ['oos.pog'],
          branding: false,
          menubar: false,
          paste_auto_cleanup_on_paste: true,
          paste_remove_styles: true,
          paste_remove_styles_if_webkit: true,
          paste_strip_class_attributes: true,
          add_form_submit_trigger: false,
          add_unload_trigger: false,
          hidden_input: false,
          file_picker_types: 'media',
          style_formats: [
            {
              title: 'Image', selector: 'img', styles: {
                'margin': '0 10px 0 10px',
                'max-width': '100%'
              }
            }
          ],
          video_template_callback: function (data) {
            console.info('video_template_callback data', data)
            if (data.width === 0) {
              this.$notification[warning]({
                message: '宽度设置错误',
              });
              return ''
            } else {
              return '<video style="max-width: 100%;width：100%;height:100%;"  controls="controls">\n' + '<source src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' + (data.source2 ? '<source src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') + '</video>'
            }
          },
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input')
            this.loading = true
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'video/*')
            input.onchange = function () {
              var file = this.files[0]
              if (file.size > 52428800) {
                this.$notification[warning]({
                  message: '上传的视频超过50m',
                });
                return
              }
              console.info('file', file)
              var reader = new FileReader()
              reader.onload = function () {
                console.info('value', value)
                const s = new FormData()
                s.append('file', file)
                uploadFile(s).then(v => {
                  console.info(v.data)
                  if (v.status === 0) {

                    const url = getVideoUrl(v.data.fileid)
                    console.info('url', url)
                    cb(url, { title: file.name })

                  } else {
                    this.$notification[warning]({
                      message: '上传失败',
                    });
                  }
                  this.loading = false
                }).catch(e => {
                  this.$notification[warning]({
                    message: '上传失败',
                  });
                  this.loading = false
                })
              }
              reader.readAsDataURL(file)
            }

            input.click()
          },
          images_upload_handler: (blobInfo, success, failure) => {
            console.info('blobInfo.blob()', blobInfo.blob())
            const s = new FormData()
            s.append('file', blobInfo.blob())
            uploadFile(s).then(v => {
              console.info("uploadFile", v)
              if (v.status === 0) {
                success(getFileUrl(v.data.fileid, 600))
              }
            })
            //
          }
        },
        tinymceFlag: 1,
        tinymceInit: {},
      }
    },
    methods: {
      // 插入图片至编辑器
      insertImage(res, file) {
        let src = '' // 图片存储地址
        tinymce.execCommand('mceInsertContent', false, `<img src=${src}>`)
      }
    },
    activated() {
      this.tinymceFlag++
    },
    mounted() {
      tinymce.init({})
    }
  }
</script>
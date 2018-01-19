<template>
    <div>
        <vue-html5-editor :content="content" @change="updateData" :height="500" ref="editor"></vue-html5-editor>
    </div>
</template>
<script>
    import Vue from 'vue'
    const opotion = {
        language: "zh-cn",
        icons: {
            text: "fa fa-pencil",
            color: "fa fa-paint-brush",
            font: "fa fa-font",
            align: "fa fa-align-justify",
            list: "fa fa-list",
            link: "fa fa-chain",
            unlink: "fa fa-chain-broken",
            tabulation: "fa fa-table",
            image: "fa fa-file-image-o",
            hr: "fa fa-minus",
            eraser: "fa fa-eraser",
            undo: "fa-undo fa",
            "full-screen": "fa fa-arrows-alt"
        },
        // 配置图片模块
        // config image module
        image: {
            // 文件最大体积，单位字节  max file size
            sizeLimit: 750 * 1024,
            // 上传参数,默认把图片转为base64而不上传
            // upload config,default null and convert image to base64
            upload: {
                url: '/cgi/upload/file/item/image',
                headers: {},
                params: {},
                fieldName: 'file'
            },
            // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
            // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
            // set null to disable compression
            compress: null,
            // 响应数据处理,最终返回图片链接
            // handle response data，return image url
            uploadHandler(responseText){
                //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
                var json = JSON.parse(responseText);
                if (!json.success) {
                    this.$ltsMessage.show({type:'error',message:json.msg})
                } else {
                    return json.data.url;
                }
            }
        },
        i18n: {
            //specify your language here
            "zh-cn": {
                "align": "对齐方式",
                "image": "图片",
                "list": "列表",
                "link": "链接",
                "unlink": "去除链接",
                "table": "表格",
                "font": "文字",
                "full screen": "全屏",
                "text": "排版",
                "eraser": "格式清除",
                "info": "关于",
                "color": "颜色",
                "please enter a url": "请输入地址",
                "create link": "创建链接",
                "bold": "加粗",
                "italic": "倾斜",
                "underline": "下划线",
                "strike through": "删除线",
                "subscript": "上标",
                "superscript": "下标",
                "heading": "标题",
                "font name": "字体",
                "font size": "文字大小",
                "left justify": "左对齐",
                "center justify": "居中",
                "right justify": "右对齐",
                "ordered list": "有序列表",
                "unordered list": "无序列表",
                "fore color": "前景色",
                "background color": "背景色",
                "row count": "行数",
                "column count": "列数",
                "save": "确定",
                "upload": "上传",
                "progress": "进度",
                "unknown": "未知",
                "please wait": "请稍等",
                "error": "错误",
                "abort": "中断",
                "reset": "重置"
            }
        }
    }
    var editor = require("vue-html5-editor")
    Vue.use(editor,opotion);
    export default {
        name : 'lts-editor',
        data(){
            return{
                content: "",
            }
        },
        methods:{
            updateData(data){
                console.log(this.$refs.editor);
                this.content = data;
            }
        }
    }
</script>

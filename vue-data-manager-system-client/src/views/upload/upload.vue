<template>
    <div id="app">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="#">首页</Breadcrumb-item>
                <Breadcrumb-item href="#">上传管理</Breadcrumb-item>
            </Breadcrumb>
        </div>

        <div class="div1">
        <Tree :data="baseData" @on-select-change="onSelectChange"></Tree>
        <Table class="t1" :columns="columns1" :data="list" @on-selection-change="onSelectionChange"></Table>

        </div>
        <div class="btns">
            <Button type="error" @click="removes()">删除选择</Button>
        </div>
        <Modal
                v-model="modal1"
                title="普通的Modal对话框标题"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="介绍" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </Form-item>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>

        <div class="demo-upload-list" v-for="item in uploadList">
            <img :src="'http://localhost:3000/'+item.filename">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.filename)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </div>
        <Upload
                ref="upload"
                name="avatar"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                :action="postUrl"
                style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="查看图片" v-model="visible">
            <img :src="'http://localhost:3000/'+this.imgName" v-if="visible" style="width: 50%; height:40%">
        </Modal>
    </div>
</template>

<script>
    import md5 from 'crypto-js/md5';
    import base from '../../common/base'
    export default {
        mixins:[base],
        data () {
            return {
                defaultList: [

                ],
                module:'uploads',
                baseData:[],
                imgName: '',
                info:'',
                visible: false,
                uploadList: [],
                filter:{
                    cateId:0,
                    originalname:null
                },
                postData:{
                    _id: null
                },
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '分类id',
                        key: 'cateId'
                    },
                    {
                        title: '上传日期',
                        key: 'date'
                    },
                    {
                        title: '原上传名',
                        key: 'originalname'
                    },
                    {
                        title: '上传名',
                        key: 'filename'
                    },
                    {
                        title: '文件名',
                        key: 'fieldname'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                            this.$http.delete(`http://localhost:3000/uploads/`+params.row._id).then(res=>{
                                console.log(res)
                            this.getData()
                                    })
                                        }
                                }
                            }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                        console.log(params.row)
                                    this.modal1=true;
                                    this.formValidate=params.row;
                                    this.formValidate.dataId=params.row._id
                                }
                            }
                            }, '编辑')
                            ])
                            }
                            }
                         ],
            formValidate: {
                        dataId:'',
                        desc: '爱睡觉爱学习爱money爱社会主义你说还有啥'
            },
            ruleValidate: {
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' }
                ],
                        cateId: [
                    { required: true, message: '分类不能为空', trigger: 'blur' }
                ],
                        desc: [
                    { required: true, message: '请输入新闻内容', trigger: 'blur' },
                    { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                ]
            }
            }
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;


            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                this.$http.delete("http://localhost:3000/uploads/"+file._id).then(res=>{
                    this.getData()
                })
            },
            handleSuccess (res, file) {
                // 因为上传过程为实例，这里模拟添加 url
                this.getData();
                file.url = `http://localhost:3000/${res.filename}`;
                this.info= `http://localhost:3000/${res.filename}`
                file.name = res.originalname;
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
                    });
                }
                return check;
            },
            getTreeData(){
                this.$http.get("http://localhost:3000/cate/3").then(res=>{
                    this.baseData=res.data
                })
            },
            onSelectChange(nodes){
                this.filter.cateId=nodes[0]._id;
                this.postData._id=nodes[0]._id;
                this.getData();
            },
            getData(){
                this.$http.post(`http://localhost:3000/uploads/list`,this.filter).then(res=>{
                    this.uploadList=res.data.docs;
                    this.list=res.data.docs
                    console.log(res.data.docs)


                })
            },
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        },
        created(){
            this.getTreeData();
            this.getData();
        },
        computed:{
            postUrl(){
                return `http://localhost:3000/uploads/filedata/${this.filter.cateId}`
            }
        }
    }
</script>

<style>
    .div1{
        display: flex;
        justify-content: flex-start;
        margin: 20px 0;

    }
    .btns{
       display: flex;
        justify-content: flex-end;
    }
    .t1{
        margin-left: 40px;
    }
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="#">首页</Breadcrumb-item>
                <Breadcrumb-item href="#">新闻管理</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div class="btns">
            <Input v-model="filter.name" style="width:80%">
            <span slot="prepend">请输入搜索内容</span>
            <Button slot="append" icon="ios-search" @click="search"></Button>
            </Input>
            <Button type="primary" @click="addData()">添加</Button>
            <Button type="error" @click="removes()">删除选择</Button>
        </div>
        <div class="div1">
        <Tree :data="baseData" @on-select-change="onSelectChange"></Tree>
        <Table class="t1" :columns="columns1" :data="list" @on-selection-change="onSelectionChange"></Table>
        </div>
        <Modal
                v-model="modal1"
                title="普通的Modal对话框标题"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="分类" prop="cateId">
                    <Input v-model="formValidate.cateId" placeholder="cateId"></Input>
                </Form-item>
                <Form-item label="标题" prop="title">
                    <Input v-model="formValidate.title" placeholder="请输入姓名"></Input>
                </Form-item>

                <Form-item label="介绍" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                    <quill-editor v-model="formValidate.desc"
                                  ref="myQuillEditor"
                                  :options="editorOption"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @ready="onEditorReady($event)">
                    </quill-editor>
                </Form-item>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import md5 from 'crypto-js/md5';
    import base from '../../common/base'
    import { quillEditor } from 'vue-quill-editor'
    export default {
        mixins:[base],
        data(){
            return {
                module:'news',
                baseData: [],
                filter:{
                    cateId:0
                },
                editorOption: {
                    // some quill options
                },
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '内容',
                        key: 'desc'
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
                                    console.log(params)
                                this.deleteData(params.row._id)
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
                                    this.editData(params.row)
                            }
                        }
                        }, '编辑')
                        ])
                        }
                        }
                 ],
                formValidate: {
                            dataId:'',
                            title: '123',
                            cateId:'',
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
        methods:{
            getTreeData(){
                this.$http.get("http://localhost:3000/cate/1").then(res=>{
                    this.baseData=res.data
                })
            },
            onSelectChange(nodes){
                this.filter.cateId=nodes[0]._id;
                this.formValidate.cateId=nodes[0]._id
                this.getData();
            },
            onEditorBlur(editor) {

            },
            onEditorFocus(editor) {

            },
            onEditorReady(editor) {

            },
            onEditorChange({ editor, html, text }) {

                this.formValidate.desc = html
            }

        },
        created(){
            this.getTreeData();
        },
        components: {
            quillEditor
        }

    }
</script>

<style>
    .div1{
        display: flex;
        justify-content: flex-start;
        margin: 20px 0;

    }
    .t1{
        margin-left: 30px;
    }
    .btns{
        display:flex;
    }
</style>
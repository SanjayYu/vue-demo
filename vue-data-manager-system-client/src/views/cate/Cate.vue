<template>
    <div >
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="#">首页</Breadcrumb-item>
                <Breadcrumb-item href="#">分类管理</Breadcrumb-item>

            </Breadcrumb>
        </div>
        <Button-group>
            <Button @click="changeType(1)" :class="{active:formValidate.type === 1 }">日志分类</Button>
            <Button @click="changeType(2)" :class="{ active: formValidate.type === 2 }">上传分类</Button>
            <Button @click="changeType(3)" :class="{ active: formValidate.type === 3 }">相册分类</Button>
        </Button-group>
        <Tree :data="baseData" @on-select-change="onSelectChange"></Tree>
        <input type="text" v-model="formValidate.parentId">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Form-item label="节点" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入节点名称"></Input>
            </Form-item>
            <Form-item>
                <Button @click="addRootNode">添加根节点</Button>
                <Button @click="editNode">修改节点</Button>
                <Button @click="remove">删除</Button>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </Form-item>
        </Form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                modal1:false,
                baseData: [],
                formValidate: {
                    dataId:'',
                    parentId:null,
                    currentParentId:null,
                    title:'',
                    type:1

                },
                ruleValidate: {
                    title: [
                        { required: true, message: '节点不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            changeType(type) {
                this.formValidate.type = type;
                this.getData()
            },
            getData(){
                this.$http.get("http://localhost:3000/cate/"+this.formValidate.type).then(res=>{
                    console.log(res.data)
                        this.baseData=res.data

                })
            },
            addRootNode(){
                this.formValidate.parentId=null
            },
            editNode(){
                this.formValidate.parentId=this.formValidate.currentParentId
                this.$http.put("http://localhost:3000/cate/data/"+this.formValidate.dataId,this.formValidate).then(res=>{
                console.log(1)
                var type=this.formValidate.type
                Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                this.formValidate.type=type;
                this.getData();
                })
            },
            remove(){
                this.$http.delete("http://localhost:3000/cate/"+this.formValidate.dataId,this.formValidate).then(res=>{
                    console.log(1)
                var type=this.formValidate.type
                Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                this.formValidate.type=type;
                this.getData();
            })
            },
            onSelectChange(node){
                console.log(node);
                this.formValidate.parentId=node[0]._id
                this.formValidate.dataId=node[0]._id
                this.formValidate.currentParentId=node[0].parentId
                this.formValidate.title=node[0].title
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if(valid){
                        this.$http.post("http://localhost:3000/cate/data",this.formValidate).then(res=>{

                            var type=this.formValidate.type
                            Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                            this.formValidate.type=type;
                            this.getData();
                    })
                    }else{
                        this.$Message.error('表单验证失败!');
            }
                })
            }
        },
        created(){
            this.getData()
        }
    }
</script>

<style scoped>
.active{
    color:white;
    background: red;
    border:0
}
</style>
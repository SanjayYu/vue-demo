
import md5 from 'crypto-js/md5';
export default {
    data () {
        return {
            pageSizeOpts:[5,10,15,20],
            list:[],
            ids:[],
            filter:{
                total:0,
                page:1,
                pages:0,
                limit:5,
                name:''
            },
            modal1:false

        }
    },
    created(){
        this.getData()

    },
    computed: {
        iconSize () {
            return this.spanLeft === 5 ? 14 : 24;
        }
    },
    methods: {
        ok () {
            this.$Message.info('点击了确定');
        },
        cancel () {
            this.$Message.info('点击了取消');
        },
        toggleClick () {
            if (this.spanLeft === 5) {
                this.spanLeft = 2;
                this.spanRight = 22;
            } else {
                this.spanLeft = 5;
                this.spanRight = 19;
            }
        },
        getData(){
            this.$http.post(`http://localhost:3000/${this.module}/list`,this.filter).then(res=>{
                this.filter.total=res.data.total;
                this.filter.page=res.data.page;
                this.filter.pages=res.data.pages;
                this.list=res.data.docs;
                console.log(1)
            })
        },
        onChangePage(page){
            this.filter.page=page;
            this.getData();
        },
        onPageSizeChange(pageSize){
            this.filter.limit=pageSize;
            this.getData();
        },
        addData(){
            this.modal1=true;
        },
        editData(row){
            console.log(row)
            this.modal1=true;
            this.formValidate=row;
            this.formValidate.dataId=row._id
        },
        deleteData(id){
            this.$http.delete(`http://localhost:3000/${this.module}/data/`+id).then(res=>{
                console.log(res)
                this.getData()
            })
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.formValidate.password=md5(this.formValidate.password).toString();
                    if(this.formValidate.dataId.trim().length>0){
                        this.$http.put(`http://localhost:3000/${this.module}/data/`+this.formValidate.dataId,this.formValidate).then(res=>{
                            this.modal1=false;
                            this.getData();
                            Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                        })
                    }else{
                        this.$http.post(`http://localhost:3000/${this.module}/data`,this.formValidate).then(res=>{
                            this.modal1=false;
                            this.getData();
                            Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                        })
                    }

                }else{
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        search(){
            console.log(this.filter)
            this.getData()

        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        onSelectionChange(options){
            if(options&&options.length>0){
                var Length=options.length;
                var ids=[]
                for(var i=0;i<Length;i++){
                    ids.push(options[i]._id)
                }
                this.ids=ids;
            }

        },
        removes(){

            if(this.ids.length>0){
                this.$Modal.confirm({
                    title:'确认删除数据',
                    content:'<b>确定删除数据</b>',
                    onOk:()=>{
                        this.$http.post(`http://localhost:3000/${this.module}/removes`,{ids:this.ids}).then(res=>{
                            this.$Message.info('删除成功')
                            this.getData()


                        })
                    },
                    onCancel:()=>{

                    }
                })
            }else{
                this.$Message.info('请选择删除的数据')
            }
        }
    }
}

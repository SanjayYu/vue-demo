<template>
    <div id="app">
        <h1>管理员登录信息</h1>
        <Table border :columns="columns6" :data="data5"></Table>
        <Button type="warning" class="c1" @click="exit">退出登录</Button>
    </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex'
    export default {
        props:['database'],
        data () {
            return {
                columns6: [
                    {
                        title: '登录日期',
                        key: 'date'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: 'id号',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address',
                        filters: [
                            {
                                label: '北京',
                                value: '北京'
                            },
                            {
                                label: '上海',
                                value: '上海'
                            },
                            {
                                label: '深圳',
                                value: '深圳'
                            }
                        ],
                        filterMethod (value, row) {
                            return row.address.indexOf(value) > -1;
                        }
                    }
                ],
                data5: [
                    {
                        name: '',
                        age: 0,
                        address: '',
                        date: ''

                    }
                ]
            }
        },
        created(){
            console.log(this.database);
            this.data5[0].name=this.database.name;
            this.data5[0].date=this.database.date;
            this.data5[0].age=this.database._id;
            this.data5[0].address=this.database.city;
            console.log( this.data5[0].age)
        },
        methods:{
           ...mapActions(['checkLogin']),
            exit(){
                this.database=null;
                this.checkLogin(false)
            }
        },
        computed:{
            ...mapGetters(['login'])
        }
    }
</script>

<style>
h1{margin:20px auto;text-align: center}
    .c1{float:right;margin:30px 50px}
</style>
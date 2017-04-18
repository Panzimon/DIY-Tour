<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="form.gender" clearable placeholder="请选择">
                        <el-option label="未知" value="0"></el-option>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出发地">
                    <el-input v-model="form.origin"></el-input>
                </el-form-item>
                <el-form-item label="目的地">
                    <el-input v-model="form.destination"></el-input>
                </el-form-item>
                <el-form-item label="出发日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="最早出发日期" v-model="form.early" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="最晚出发日期" v-model="form.late" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="旅行天数">
                    <el-input-number v-model="form.days" :min="1" :max="180"></el-input-number>
                </el-form-item>
                <el-form-item label="旅行人数">
                    <el-input-number v-model="form.number" :min="1" :max="1000"></el-input-number>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.comment"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form: {
                    nickname: '',
                    gender:'',
                    origin: '',
                    destination: '',
                    early: '',
                    late: '',
                    days: '',
                    number: '',
                    phone: '',
                    comment: '',
                    sessionId: () => (Math.random()*10000).toString()
                }
            }
        },
        methods: {
            onSubmit() {
                let self = this;
                this.$axios({
                    method: 'post',
                    url: 'form/savePreferForm',
                    headers: {'content-type': 'application/x-www-form-urlencoded',
                              'charset': 'utf-8'
                    },
                    data: self.form
                })
                //this.$axios.post('form/savePreferForm',self.form)
                .then(() => {
                    self.$message.success('提交成功');
                }).catch(function (error) {
                    self.$message.error(`提交失败！请检查是否填写完整 ${error}`);
                });
                
            }
        }
    }
</script>
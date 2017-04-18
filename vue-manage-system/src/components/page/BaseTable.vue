<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="tableData" border style="width: 100%" max-height="500">

            <el-table-column label="用户信息">
                <el-table-column prop="nickname" label="用户名" width="150">
                </el-table-column>
                <el-table-column prop="gender" label="性别" width="100">
                </el-table-column>
            </el-table-column>

            <el-table-column label="定制需求">
                <el-table-column prop="origin" label="出发地" width="150">
                </el-table-column>
                <el-table-column prop="destination" label="目的地" width="150">
                </el-table-column>
                <el-table-column prop="early" label="最早出发" sortable width="150">
                </el-table-column>
                <el-table-column prop="late" label="最晚出发" sortable width="150">
                </el-table-column>
                <el-table-column prop="days" label="旅行天数" sortable width="150">
                </el-table-column>
                <el-table-column prop="number" label="旅行人数" sortable width="150">
                </el-table-column>
                <el-table-column prop="phone" label="联系方式" width="150">
                </el-table-column>
                <el-table-column prop="comment" label="备注" width="300">
                </el-table-column>
            </el-table-column>

            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1
            }
        },
        created(){
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                this.$axios.post('/api/table',{page:self.cur_page}).then((res) => {
                    self.tableData = res.data.data;
                })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
                //todo
            }
        }
    }
</script>
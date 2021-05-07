<template>
    <div class="Excel">
        <h1>Spreadsheet测试</h1>

        <hr>
        <input type="file" @change="inputChage">
        <el-button @click="getData">console表格数据</el-button>
        <el-button @click="exportExcel">导出Excel</el-button>
        <el-button @click="openRenameDialog">修改表名</el-button>

        <x-spreadsheet ref="xs" @spreadsheet="getSpreadsheet"></x-spreadsheet>

        <el-dialog title="修改表格名称" :visible.sync="renameDialog">

            <el-form ref="form" :model="renameSheetForm" label-width="80px">

                <el-form-item label="表单">
                    <el-select v-model="renameSheetForm.ind" placeholder="请选择操作的表单" required="true">
                        <div v-for="(item, ind) in xsData" :key="ind">
                            <el-option :label="item.name" :value="ind"></el-option>
                        </div>
                    </el-select>
                </el-form-item>
                <el-form-item label="表格名称">
                    <el-input v-model="renameSheetForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="renameSubmit">修改</el-button>
                    <el-button @click="renameDialog = false">取消</el-button>
                </el-form-item>

            </el-form>

        </el-dialog>


    </div>
</template>
<script>
import xSpreadsheet from '../../../packages/xspreadsheet';

export default {
    name: 'Test',
    components: {
        xSpreadsheet
    },
    data() {
        return {
            xsData: [],
            renameDialog: false,
            renameSheetForm: {
                ind: '',
                name: ''
            }
        };
    },
    mounted() {
        window.aaa = this;
    },
    methods: {
        // 获取电子表格的方法，监听可以写到里面去
        getSpreadsheet(xs) {
            /**
             // 监听方法演示
             xs.on('cell-selected', (cell, ri, ci) => {
                // 监听选择单个单元格
                console.log('cell:', cell, ', ri:', ri, ', ci:', ci);
            }).on('cells-selected', (cell, {sri, sci, eri, eci}) => {
                // 监听选择多个单元格
                console.log('cell:', cell, ', sri:', sri, ', sci:', sci, ', eri:', eri, ', eci:', eci);
            }).on('cell-edited', (text, ri, ci) => {
                // 监听单元格的编辑
                console.log(text, ri, ci)
            });
             */
        },
        getData() {
            return this.$refs.xs.getData();
        },
        // 加载excel文件
        inputChage(fileSelected) {
            return this.$refs.xs.getWorkbook(fileSelected);
        },
        // 导出excel
        exportExcel() {
            return this.$refs.xs.exportExcel();
        },

        /** 打开编辑名称的弹窗 */
        openRenameDialog() {
            this.xsData = this.getData();
            this.renameDialog = true;
        },
        renameSubmit() {
            this.xsData[this.renameSheetForm.ind].name = this.renameSheetForm.name;
            console.log(this.xsData)
            this.$refs.xs.loadData(this.xsData);
            this.renameDialog = false;
        },
    },
    watch: {
        'renameSheetForm.ind'(val, oldVal) {
            this.renameSheetForm.name = this.xsData[val].name;
            console.log("renameSheetForm.ind: " + val, oldVal);
        }
    }
}
</script>

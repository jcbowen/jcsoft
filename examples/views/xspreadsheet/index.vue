<template>
    <div class="Excel">
        <h1>Spreadsheet测试</h1>

        <hr>
        <input type="file" @change="inputChage">
        <el-button @click="getData">console表格数据</el-button>
        <el-button @click="exportExcel">导出Excel</el-button>
        <xs ref="xs" :on-change="onChange" @spreadsheet="getSpreadsheet"></xs>
    </div>
</template>
<script>
import xs from '../../../packages/xspreadsheet';

export default {
    name: 'Test',
    components: {
        xs
    },
    data() {
        return {};
    },
    mounted() {
    },
    methods: {
        // 监听变化
        onChange(data) {
            // console.log(data);
        },
        // 获取电子表格的方法，监听可以写到里面去
        getSpreadsheet(xs) {
            /**
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
            let a = this.$refs.xs.getData();
            console.log(a)
            // console.log();
        },
        // 加载excel文件
        inputChage(fileSelected) {
            return this.$refs.xs.getWorkbook(fileSelected);
        },
        // 导出excel
        exportExcel() {
            return this.$refs.xs.exportExcel();
        }
    }
}
</script>

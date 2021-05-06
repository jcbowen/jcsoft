<template>
    <div class="Excel">
        <h1>Excel测试</h1>

        <hr>
        <el-button @click="getData">1</el-button>
        <div id="x-spreadsheet-demo"></div>

    </div>
</template>
<script>

import zhCN from 'x-data-spreadsheet/src/locale/zh-cn';
import Spreadsheet from "x-data-spreadsheet";
// import XLSX from 'xlsx';

//设置中文
Spreadsheet.locale('zh-cn',zhCN);

export default {
    name: 'Test',
    components: {},
    data() {
        return {
            s: null
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let config = {
                mode: 'edit', // edit | read
                showToolbar: true,
                showGrid: true,
                showContextmenu: true,
                view: {
                    height: () => document.documentElement.clientHeight,
                    width: () => document.documentElement.clientWidth,
                },
                row: {
                    len: 100,
                    height: 25,
                },
                col: {
                    len: 26,
                    width: 100,
                    indexWidth: 60,
                    minWidth: 60,
                },
                style: {
                    bgcolor: '#ffffff',
                    align: 'left',
                    valign: 'middle',
                    textwrap: false,
                    strike: false,
                    underline: false,
                    color: '#0a0a0a',
                    font: {
                        name: 'Helvetica',
                        size: 10,
                        bold: false,
                        italic: false,
                    },
                },
            };

            this.s = new Spreadsheet(
                '#x-spreadsheet-demo'
                , config
            )
            .loadData({})
            .change(data => {
                console.log(data)
            });

            this.s.on('cell-selected', (cell, ri, ci) => {
            });
            this.s.on('cells-selected', (cell, {sri, sci, eri, eci}) => {
            });
            // edited on cell
            this.s.on('cell-edited', (text, ri, ci) => {
            });


        },
        getData() {
            const d = this.s.getData()
            console.log(d)
        }
    }
}
</script>

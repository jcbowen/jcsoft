<template>
    <div :id="spreadsheetId"></div>
</template>
<script>

import jiuchet from "../../utils/jiuchet";

import Spreadsheet from "x-data-spreadsheet";
import zhCN from 'x-data-spreadsheet/src/locale/zh-cn';
import xlsx from 'xlsx';

//设置中文
Spreadsheet.locale('zh-cn', zhCN);

export default {
    name: 'xSpreadsheet',
    props: {
        id: {
            type: String,
            default: () => {
                return 'vue-xspreadsheet-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
            }
        },
        config: {
            type: Object,
            default: () => {
                return {}
            }
        },
        defData: Array,
        onChange: {
            type: Function,
        }
    },
    data() {
        return {
            xsConfig: {
                mode: 'edit', // edit | read
                showToolbar: true,
                showGrid: true,
                showContextmenu: true,
                view: {
                    height: () => 500,
                    width: () => 750,
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
            },
            spreadsheetId: this.id,
            spreadsheet: null,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.xsConfig = jiuchet.extend(true, this.xsConfig, this.config);
            this.spreadsheet = new Spreadsheet(`#${this.spreadsheetId}`, this.xsConfig)
            if (typeof this.defData === 'object') this.spreadsheet.loadData(this.defData)
            this.spreadsheet.change(data => {
                typeof this.onChange === 'function' && this.onChange(data);
            });
            this.$emit('spreadsheet', this.spreadsheet);
            window.qqq = this;
        },
        /**
         * 监听事件
         *
         * 目前支持的事件：
         * cell-selected/cells-selected/cell-edited
         *
         * @param eventName string 事件名称
         * @param callback function 回调函数
         */
        on(eventName, callback) {
            this.spreadsheet.on(eventName, callback);
        },
        getData() {
            return this.spreadsheet.getData()
        },
        /**
         * 加载数据
         *
         * @param data json
         *
         * 通过 getData() 方法，获取数据格式
         */
        loadData(data = {}) {
            return this.spreadsheet.loadData(data)
        },
        /**
         * 添加表
         *
         * @param name string 名称
         * @param active boolean 默认为 true
         */
        addSheet(name, active = true) {
            return this.spreadsheet.addSheet(name, active);
        },
        /**
         * 获得单元格内容
         *
         * @param ri number 行坐标
         * @param ci number 列坐标
         * @param sheetIndex number 默认值为：0，当前表格index
         */
        cell(ri, ci, sheetIndex = 0) {
            return this.spreadsheet.cell(ri, ci, sheetIndex)
        },
        /**
         * 获得单元格样式属性
         *
         * @param ri number 行坐标
         * @param ci number 列坐标
         * @param sheetIndex number 默认值为：0，当前表格index
         */
        cellStyle(ri, ci, sheetIndex = 0) {
            return this.spreadsheet.cellStyle(ri, ci, sheetIndex)
        },
        /**
         * 设置指定单元格的值
         *
         * @param ri number 行坐标
         * @param ci number 列坐标
         * @param text string
         * @param sheetIndex number 默认值为：0，当前表格index
         * @returns {*|string}
         */
        setCellText(ri, ci, text, sheetIndex = 0) {
            return this.spreadsheet.cellText(ri, ci, text, sheetIndex);
        },
        /**
         * 刷新表格
         */
        reRender() {
            return this.spreadsheet.reRender()
        },
        /** 导出excel */
        exportExcel() {
            var new_wb = this.xtos(this.getData());
            /* generate download */
            xlsx.writeFile(new_wb, "SheetJS.xlsx");
        },
        /**
         * 上传excel
         */
        loadExcelFile(fileSelected) {
            var workbook_object = this.getWorkbook(fileSelected)
            this.loadData(this.stox(workbook_object));
        },
        s2ab(s) {
            let buf = new ArrayBuffer(s.length)
                , view = new Uint8Array(buf);
            for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        },
        /** 将x-data-spreadsheet中的数据格式转为xlsx中的workbook */
        xtos(sdata) {
            let out = xlsx.utils.book_new();

            jiuchet.each(sdata, (ind, xws) => {
                let aoa = [[]]
                    , rowobj = xws.rows;

                for (let ri = 0; ri < rowobj.len; ++ri) {
                    let row = rowobj[ri];
                    if (!row) continue;
                    aoa[ri] = [];

                    jiuchet.each(Object.keys(row.cells), (i, k) => {
                        let idx = +k;
                        if (isNaN(idx)) return true;
                        aoa[ri][idx] = row.cells[k].text;
                    })
                }

                let ws = xlsx.utils.aoa_to_sheet(aoa);

                /** 读取在线中的合并单元格，并写入导出的数据中
                 * merges: Array(19)
                 0: "A16:P16"
                 1: "A17:P17"
                 2: "O2:P2"
                 3: "F2:G2"
                 */
                ws['!merges'] = []

                jiuchet.each(xws.merges, (ind, merge) => {
                    ws['!merges'].push(xlsx.utils.decode_range(merge))
                });

                xlsx.utils.book_append_sheet(out, ws, xws.name);
            })
            return out;
        },
        stox(wb) {
            var out = [];

            jiuchet.each(wb.SheetNames, (ind, name) => {
                let o = {name: name, rows: {}, merges: []},
                    ws = wb.Sheets[name],
                    aoa = xlsx.utils.sheet_to_json(ws, {raw: false, header: 1});

                jiuchet.each(aoa, (i, r) => {
                    let cells = {};

                    jiuchet.each(r, (j, c) => {
                        cells[j] = ({text: c});
                    })

                    o.rows[i] = {cells: cells};
                })

                // 设置合并单元格
                jiuchet.each(ws['!merges'], (ind, merge) => {
                    let cell = o.rows[merge.s.r].cells[merge.s.c]

                    //无内容单元格处理
                    if (!cell) {
                        cell = {text: ""}
                    }
                    cell.merge = [merge.e.r - merge.s.r, merge.e.c - merge.s.c]
                    o.rows[merge.s.r].cells[merge.s.c] = cell

                    // 修改 merges
                    o.merges.push(xlsx.utils.encode_range(merge))
                });

                out.push(o);
            })

            return out;
        },
        /**
         * 获取文件内容，并存到表格中
         * @param fileSelected
         */
        getWorkbook(fileSelected) {
            // console.log('fileSelected', fileSelected)
            let file = fileSelected.target.files[0]
            let reader = new FileReader()
            reader.onload = e => {
                let data = e.target.result,
                    fixedData = this.fixData(data),
                    workbook = xlsx.read(btoa(fixedData), {type: 'base64'})
                this.loadData(this.stox(workbook));
                // console.log("workbook",workbook)
                // console.log("fixedData", fixedData)
                // console.log("this.stox(workbook)",this.stox(workbook))
            }
            reader.readAsArrayBuffer(file)
            // return workbook
        },
        /** 数据过滤 */
        fixData(data) {
            var o = "", l = 0, w = 10240
            for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
            return o
        },
    }
}
</script>

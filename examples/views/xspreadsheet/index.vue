<template>
    <div class="Excel">
        <h1>Spreadsheet测试</h1>

        <hr>
        <el-button type="primary" size="mini" @click="choseFile">加载Excel</el-button>
        <el-button size="mini" @click="exportExcel">导出Excel</el-button>
        <el-button size="mini" @click="loadSomeData">加载其他数据</el-button>

        <span class="float-right">
            <el-button type="primary" size="mini" @click="openRenameDialog">修改表名</el-button>
            <el-button size="mini" @click="consoleData">console数据</el-button>
        </span>
        <x-spreadsheet ref="xs" :xSpreadsheetHookButton="false" @spreadsheet="getSpreadsheet"
                       :def-data="initData"
                       :config="config">
        </x-spreadsheet>
    </div>
</template>
<script>
import xSpreadsheet from '../../../packages/xspreadsheet';

export default {
    name: 'XSpreadsheet',
    components: {
        xSpreadsheet
    },
    data() {
        return {
            config: {
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
                    height: 30,
                },
                col: {
                    len: 26,
                    width: 85,
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
            initData: [
                {
                    "name": "sheet1",
                    "freeze": "A1",
                    "styles": [
                        {
                            "align": "center"
                        },
                        {
                            "align": "center",
                            "bgcolor": "#01b0f1"
                        },
                        {
                            "align": "center",
                            "bgcolor": "#bdd7ee"
                        },
                        {
                            "align": "center",
                            "bgcolor": "#deeaf6"
                        },
                        {
                            "align": "center",
                            "bgcolor": "#deeaf6",
                            "color": "#ffffff"
                        },
                        {
                            "align": "center",
                            "bgcolor": "#deeaf6",
                            "color": "#000100"
                        },
                        {
                            "align": "center",
                            "bgcolor": "#c5e0b3",
                            "color": "#000100"
                        },
                        {
                            "align": "center",
                            "bgcolor": "#c5e0b3",
                            "color": "#ffffff"
                        },
                        {
                            "align": "center",
                            "bgcolor": "#c5e0b3",
                            "color": "#ffffff",
                            "font": {
                                "size": 22
                            }
                        }
                    ],
                    "merges": [
                        "A1:G11"
                    ],
                    "rows": {
                        "0": {
                            "cells": {
                                "0": {
                                    "merge": [
                                        10,
                                        6
                                    ],
                                    "style": 8,
                                    "text": "这是渲染时就加载的一条数据～～～"
                                },
                                "1": {
                                    "style": 8
                                },
                                "2": {
                                    "style": 8
                                },
                                "3": {
                                    "style": 8
                                },
                                "4": {
                                    "style": 8
                                },
                                "5": {
                                    "style": 8
                                },
                                "6": {
                                    "style": 8
                                }
                            }
                        },
                        "1": {
                            "cells": {
                                "0": {
                                    "style": 8
                                },
                                "1": {
                                    "style": 8
                                },
                                "2": {
                                    "style": 8
                                },
                                "3": {
                                    "style": 8
                                },
                                "4": {
                                    "style": 8
                                },
                                "5": {
                                    "style": 8
                                },
                                "6": {
                                    "style": 8
                                }
                            }
                        },
                        "2": {
                            "cells": {
                                "0": {
                                    "style": 8
                                },
                                "1": {
                                    "style": 8
                                },
                                "2": {
                                    "style": 8
                                },
                                "3": {
                                    "style": 8
                                },
                                "4": {
                                    "style": 8
                                },
                                "5": {
                                    "style": 8
                                },
                                "6": {
                                    "style": 8
                                }
                            }
                        },
                        "3": {
                            "cells": {
                                "0": {
                                    "style": 8
                                },
                                "1": {
                                    "style": 8
                                },
                                "2": {
                                    "style": 8
                                },
                                "3": {
                                    "style": 8
                                },
                                "4": {
                                    "style": 8
                                },
                                "5": {
                                    "style": 8
                                },
                                "6": {
                                    "style": 8
                                }
                            }
                        },
                        "4": {
                            "cells": {
                                "0": {
                                    "style": 8
                                },
                                "1": {
                                    "style": 8
                                },
                                "2": {
                                    "style": 8
                                },
                                "3": {
                                    "style": 8
                                },
                                "4": {
                                    "style": 8
                                },
                                "5": {
                                    "style": 8
                                },
                                "6": {
                                    "style": 8
                                }
                            }
                        },
                        "5": {
                            "cells": {
                                "0": {
                                    "style": 8
                                },
                                "1": {
                                    "style": 8
                                },
                                "2": {
                                    "style": 8
                                },
                                "3": {
                                    "style": 8
                                },
                                "4": {
                                    "style": 8
                                },
                                "5": {
                                    "style": 8
                                },
                                "6": {
                                    "style": 8
                                }
                            }
                        },
                        "6": {
                            "cells": {
                                "0": {
                                    "style": 8
                                },
                                "1": {
                                    "style": 8
                                },
                                "2": {
                                    "style": 8
                                },
                                "3": {
                                    "style": 8
                                },
                                "4": {
                                    "style": 8
                                },
                                "5": {
                                    "style": 8
                                },
                                "6": {
                                    "style": 8
                                }
                            }
                        },
                        "7": {
                            "cells": {
                                "0": {
                                    "style": 8
                                },
                                "1": {
                                    "style": 8
                                },
                                "2": {
                                    "style": 8
                                },
                                "3": {
                                    "style": 8
                                },
                                "4": {
                                    "style": 8
                                },
                                "5": {
                                    "style": 8
                                },
                                "6": {
                                    "style": 8
                                }
                            }
                        },
                        "8": {
                            "cells": {
                                "0": {
                                    "style": 8
                                },
                                "1": {
                                    "style": 8
                                },
                                "2": {
                                    "style": 8
                                },
                                "3": {
                                    "style": 8
                                },
                                "4": {
                                    "style": 8
                                },
                                "5": {
                                    "style": 8
                                },
                                "6": {
                                    "style": 8
                                }
                            }
                        },
                        "9": {
                            "cells": {
                                "0": {
                                    "style": 8
                                },
                                "1": {
                                    "style": 8
                                },
                                "2": {
                                    "style": 8
                                },
                                "3": {
                                    "style": 8
                                },
                                "4": {
                                    "style": 8
                                },
                                "5": {
                                    "style": 8
                                },
                                "6": {
                                    "style": 8
                                }
                            }
                        },
                        "10": {
                            "cells": {
                                "0": {
                                    "style": 8
                                },
                                "1": {
                                    "style": 8
                                },
                                "2": {
                                    "style": 8
                                },
                                "3": {
                                    "style": 8
                                },
                                "4": {
                                    "style": 8
                                },
                                "5": {
                                    "style": 8
                                },
                                "6": {
                                    "style": 8
                                }
                            }
                        },
                        "len": 100
                    },
                    "cols": {
                        "len": 26
                    },
                    "validations": [],
                    "autofilter": {}
                }
            ],
        };
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
        // 获取表格数据
        getData() {
            return this.$refs.xs.getData();
        },
        // 加载excel文件
        choseFile() {
            return this.$refs.xs.choseFile();
        },
        // 导出excel
        exportExcel() {
            return this.$refs.xs.exportExcel();
        },
        // console表格数据
        consoleData() {
            return console.log(this.getData())
        },
        // 加载初始数据
        loadSomeData() {
            const initData = [
                {
                    "name": "门窗",
                    "freeze": "A1",
                    "styles": [{
                        "border": {
                            "bottom": ["thin", "#000"],
                            "top": ["thin", "#000"],
                            "left": ["thin", "#000"],
                            "right": ["thin", "#000"]
                        }
                    }, {
                        "border": {
                            "bottom": ["thin", "#000"],
                            "top": ["thin", "#000"],
                            "left": ["thin", "#000"],
                            "right": ["thin", "#000"]
                        }, "font": {"bold": true}
                    }, {"font": {"bold": true}}, {
                        "border": {
                            "bottom": ["thin", "#000"],
                            "top": ["thin", "#000"],
                            "left": ["thin", "#000"],
                            "right": ["thin", "#000"]
                        }, "font": {"bold": true, "size": 18}
                    }, {"font": {"bold": true, "size": 18}}, {
                        "border": {
                            "bottom": ["thin", "#000"],
                            "top": ["thin", "#000"],
                            "left": ["thin", "#000"],
                            "right": ["thin", "#000"]
                        }, "font": {"bold": true, "size": 18}, "align": "center"
                    }, {"font": {"bold": true, "size": 18}, "align": "center"}, {
                        "border": {
                            "bottom": ["thin", "#000"],
                            "top": ["thin", "#000"],
                            "left": ["thin", "#000"],
                            "right": ["thin", "#000"]
                        }, "font": {"bold": true}, "align": "center"
                    }, {"font": {"bold": true}, "align": "center"}, {
                        "border": {
                            "bottom": ["thin", "#000"],
                            "top": ["thin", "#000"],
                            "left": ["thin", "#000"],
                            "right": ["thin", "#000"]
                        }, "align": "center"
                    }],
                    "merges": ["A1:M1", "E2:G2", "H2:J2", "K2:M2", "A2:A3", "B2:B3", "C2:C3", "D2:D3"],
                    "rows": {
                        "0": {
                            "cells": {
                                "0": {"text": "成本控制表格（门窗）", "merge": [0, 12], "style": 5},
                                "1": {"style": 6},
                                "2": {"style": 6},
                                "3": {"style": 6},
                                "4": {"style": 6},
                                "5": {"style": 6},
                                "6": {"style": 6},
                                "7": {"style": 6},
                                "8": {"style": 6},
                                "9": {"style": 6},
                                "10": {"style": 6},
                                "11": {"style": 6},
                                "12": {"style": 6}
                            }, "height": 41
                        },
                        "1": {
                            "cells": {
                                "0": {"text": "序号", "merge": [1, 0], "style": 7},
                                "1": {"text": "施工内容", "merge": [1, 0], "style": 7},
                                "2": {"text": "工程量", "merge": [1, 0], "style": 7},
                                "3": {"text": "材料分类", "merge": [1, 0], "style": 7},
                                "4": {"text": "预控成本", "merge": [0, 2], "style": 7},
                                "5": {"style": 8},
                                "6": {"style": 8},
                                "7": {"text": "实际成本", "merge": [0, 2], "style": 7},
                                "8": {"style": 8},
                                "9": {"style": 8},
                                "10": {"text": "情况分析", "merge": [0, 2], "style": 7},
                                "11": {"style": 8},
                                "12": {"style": 8}
                            }
                        },
                        "2": {
                            "cells": {
                                "0": {"style": 8},
                                "1": {"text": "施工内容", "style": 7},
                                "2": {"text": "体量", "style": 8},
                                "3": {"text": "材料分类", "style": 7},
                                "4": {"text": "数量", "style": 7},
                                "5": {"text": "单价", "style": 7},
                                "6": {"text": "合计", "style": 7},
                                "7": {"text": "数量", "style": 7},
                                "8": {"text": "单价", "style": 7},
                                "9": {"text": "合计", "style": 7},
                                "10": {"text": "数量", "style": 7},
                                "11": {"text": "单价", "style": 7},
                                "12": {"text": "合计", "style": 7}
                            }
                        },
                        "3": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"text": "10", "style": 9},
                                "2": {"text": "5000", "style": 9},
                                "3": {"text": "玻璃", "style": 9},
                                "4": {"text": "5000", "style": 9},
                                "5": {"text": "", "style": 9},
                                "6": {"text": "=E4*F4", "style": 9},
                                "7": {"text": "6000", "style": 9},
                                "8": {"style": 9},
                                "9": {"text": "=H4*I4", "style": 9},
                                "10": {"text": "-1000", "style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "4": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9, "text": ""},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "5": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "6": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "7": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "8": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "9": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "10": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "11": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9, "text": ""},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "12": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "13": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "14": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "15": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "16": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "17": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "18": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "19": {
                            "cells": {
                                "0": {"style": 9},
                                "1": {"style": 9},
                                "2": {"style": 9},
                                "3": {"style": 9},
                                "4": {"style": 9},
                                "5": {"style": 9},
                                "6": {"style": 9},
                                "7": {"style": 9},
                                "8": {"style": 9},
                                "9": {"style": 9},
                                "10": {"style": 9},
                                "11": {"style": 9},
                                "12": {"style": 9}
                            }
                        },
                        "len": 100
                    },
                    "cols": {"len": 26},
                    "validations": [],
                    "autofilter": {}
                }, {
                    "name": "Sheet2",
                    "freeze": "A1",
                    "styles": [],
                    "merges": [],
                    "rows": {"len": 100},
                    "cols": {"len": 26},
                    "validations": [],
                    "autofilter": {}
                }, {
                    "name": "Sheet3",
                    "freeze": "A1",
                    "styles": [],
                    "merges": [],
                    "rows": {"len": 100},
                    "cols": {"len": 26},
                    "validations": [],
                    "autofilter": {}
                }];
            return this.$refs.xs.loadData(initData);
        },
        // 打开编辑表单名称的dialog
        openRenameDialog() {
            return this.$refs.xs.openRenameDialog();
        },
    }
}
</script>
<style lang="scss">
.float-right {
    float: right;
}
</style>

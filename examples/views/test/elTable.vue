<template>
    <div class="Test">
        <h1>组件测试</h1>

        <hr>

        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column type="expand">
                {{ msg }}
            </el-table-column>
            <el-table-column
                label="商品 ID"
                prop="id">
            </el-table-column>
            <el-table-column
                label="商品名称"
                prop="name">
            </el-table-column>
            <el-table-column
                label="描述"
                prop="desc">
            </el-table-column>
        </el-table>


    </div>
</template>
<script>

export default {
    data() {
        return {
            msg: 'SL1617953309Of8',
            tableData: [{
                id: '12987122',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }, {
                id: '12987123',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }, {
                id: '12987125',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }, {
                id: '12987126',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            }]
        }
    },
    created() {
        window.VM = this;
    }
}
</script>

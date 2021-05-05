<template>
    <div class="Excel">
        <h1>Excel测试</h1>

        <hr>

        <div id="x-spreadsheet-demo"></div>

    </div>
</template>
<script>

import Spreadsheet from "x-data-spreadsheet";
export default {
    name: 'Test',
    components: {},
    data() {
        return {}
    },
    created() {
        window.VM = this;
    }
}
</script>

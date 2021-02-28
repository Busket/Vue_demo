<template>
  <div class="warp-main">
    <el-row :span="24" v-loading="loading" element-loading-text="拼命加载中">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
          sortable
        ></el-table-column>
        <el-table-column
          prop="week"
          label="星期"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total"
          label="可预约总人数数"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="Reserved"
          label="已预约"
          width="180"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="100"
          fixed="right"
          width="268"
        >
          <template slot-scope="scope">
            <el-button type="primary" @click="pathTo('Subject_2')"
              >科目二预约</el-button
            >
            <el-button type="primary" @click="deleteUser(scope.row.email)"
              >科目三预约</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ dialogText }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2021-2-1",
          week: "星期一",
          total: 36,
          Reserved: 12
        }
      ],
      dialogVisible: false,
      dialogText: "点击成功"
    };
  },
  methods: {
    pathTo(subject) {
      this.$router.push({
        path: "/appointment/detail",
        query: { subject: subject }
      }); //用go刷新
    }
  }
};
</script>
<style></style>

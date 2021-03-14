<template>
  <div class="list-content">
    <h3>计划详情</h3>
    <ul>
      <li>
        <span>日期:</span>
        <div>{{ infoData.date }}</div>
      </li>
      <li>
        <span>车牌号:</span>
        <div>{{ infoData.carNumber }}</div>
      </li>
      <li>
        <span>教练:</span>
        <div>{{ infoData.coach }}</div>
      </li>
      <li>
        <span>训练内容:</span>
        <div>{{ infoData.content }}</div>
      </li>
      <li>
        <span>开始时间:</span>
        <div>{{ infoData.startTime }}</div>
      </li>
      <li>
        <span>结束时间:</span>
        <div>{{ infoData.finishTime }}</div>
      </li>
      <li>
        <span>该车预约人数:</span>
        <div>{{ infoData.Reserved }}</div>
      </li>
      <li>
        <span>备注:</span>
        <div>{{ infoData.remark }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoData: {
        date: "2021-2-1",
        total: 36,
        Reserved: 12,
        place: "狮岭校区",
        coach: "小黑",
        carNumber: "粤A12345",
        content: "科目二练习",
        startTime: "2018-04-20 08:00:00",
        finishTime: "2018-04-20 09:00:00",
        remark: "备注内容"
      }
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.list-content {
  h3 {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  ul {
    padding: 10px;
    li {
      position: relative;
      line-height: 40px;
      min-height: 40px;
      span {
        position: absolute;
        left: 0;
        display: inline-block;
        width: 90px;
        color: #999;
      }
      & > div {
        margin-left: 90px;
      }
    }
  }
}
</style>

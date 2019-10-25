<template>
  <div class="aside">
    <h4 class="header">相关攻略</h4>
    <div class="post_list" v-for="(item,index) in data" :key="index" @click="handleDetail(item.id)">
      <img src="../../imgs/zan.jpg" v-if="item.images.length===0" />
      <img :src="item.images[0]" v-else />

      <div class="left">
        <h5>{{item.title}}</h5>
        <p>
          <span class="time">2019-10-22 09:45</span>
          <span class="reader_number">阅读</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["data"],
  methods: {
    handleDetail(id) {
      if (this.$route.query.id == id) {
        return;
      }
      this.$emit("handleAside", id);
    }
  }
};
</script>

<style scoped lang="less">
.aside {
  width: 280px;
  margin-left: 20px;
  .header {
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .post_list {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    vertical-align: middle;
    border-bottom: 1px solid #ddd;
    img {
      width: 100px;
      height: 80px;
      display: block;
    }
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 200px;
      margin-left: 10px;
      h5 {
        font-size: 16px;
        font-weight: 400;
      }
      p {
        span {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
<template>
  <el-row class="containar">
    <Item :data="data.parent" v-if="data.parent" @handleReply="handleReply" />
    <el-row class="user" type="flex" justify="space-between">
      <el-row class="user_info">
        <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" />
        <span>{{data.account.nickname}}</span>
        <i>{{data.created_at|format}}</i>
      </el-row>
      <em>{{data.level}}</em>
    </el-row>
    <el-row class="content">
      <p>{{data.content}}</p>
      <el-row type="flex" justify="start">
        <el-row
          class="content_img"
          v-for="(item,index) in data.pics"
          v-show="data.pics"
          :key="index"
        >
          <img :src="$axios.defaults.baseURL+item.url" alt />
        </el-row>
      </el-row>
      <span class="reply" @click="handleReply(data)">回复</span>
    </el-row>
  </el-row>
</template>

<script>
import moment from "moment";
export default {
  name: "Item",
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    //点击回复
    handleReply(item) {
      this.$emit("handleReply", item);
    }
  },
  filters: {
    format(val) {
      val = moment().format("YY-MM-DD hh:mm", val);
      return val;
    }
  }
};
</script>

<style scoped lang="less">
.containar {
  padding: 10px 3px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  width: 720px;
  .user {
    margin-bottom: 10px;
    margin-top: 5px;
    font-size: 13px;

    .user_info {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    img {
      width: 17px;
      height: 17px;
    }
    span {
      color: #666666;
    }
    i {
      color: #999;
    }
  }
  .content {
    position: relative;
    width: 100%;
    p {
      margin-bottom: 10px;
    }
    .content_img {
      padding: 5px;
      width: 80px;
      height: 80px;
      border-radius: 5px;
      box-sizing: border-box;
      margin: 0 5px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: -10px;
        left: 0;
      }
    }
    span {
      position: absolute;
      display: none;
      right: 0;
      bottom: 0;
      font-size: 14px;
    }
    &:hover span {
      display: block;
      color: #409eff;
      cursor: pointer;
    }
  }
}
</style>
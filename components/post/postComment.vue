<template>
  <!-- 评论楼层 -->
      <el-row class="comment_list" v-for="(com,index) in comments" :key="index">
        <el-row class="comment_title_info">
          <el-row class="user_info">
            <img :src="$axios.defaults.baseURL+com.account.defaultAvatar" alt />
            <span class="username">{{com.account.nickname}}</span>
            <span class="com_time">{{creat_time}}</span>
          </el-row>
          <span class="com_floor">{{com.level}}</span>
        </el-row>
        <el-row class="comment_content">{{com.content}}</el-row>
        <el-row class="comment_pic" v-if="showPic">
          <img src="#" alt />
        </el-row>
        <el-row class="reply">回复</el-row>

        <!-- 评论楼层 -->
          <PostComment :data="comments" />
     
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style scoped lang="less">
.comment_list {
  border: 1px solid #dcdfe6;
  margin: 10px 0;
  box-sizing: border-box;
  padding: 15px 20px;

  .comment_title_info {
    position: relative;
    font-size: 12px;
    height: 20px;
    .user_info {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        border-radius: 20px;
      }
      .username {
        margin: 0 8px;
      }
    }

    .com_floor {
      position: absolute;
      right: 0;
    }
  }

  .comment_content {
    font-size: 14px;
    padding: 10px 0;
  }

  .reply {
    text-align: right;
    font-size: 14px;
    color: #409eff;
  }
}
</style>
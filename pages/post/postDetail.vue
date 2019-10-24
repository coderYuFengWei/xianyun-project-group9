<template>
  <!-- 整个页面 -->
  <el-row type="flex" justify="space-between" class="container">
    <!-- 主页面 -->
    <el-row class="main">
      <!-- 头部 -->
      <el-row class="header">
        <nuxt-link to="/post">旅游攻略</nuxt-link>/
        <span>攻略详情</span>
        <h1>{{item.title}}</h1>
      </el-row>

      <el-row class="time_reader" type="flex" justify="end">
        <span class="time">攻略：{{creat_time}}</span>
        <span class="reader_number">阅读：{{item.watch}}</span>
      </el-row>
      <!-- 文章 -->
      <el-row class="post">
        <el-row class="content" v-html="item.content"></el-row>
      </el-row>

      <!-- 按钮 -->
      <el-row class="btn">
        <el-row class="comment">
          <i class="el-icon-edit-outline"></i>
          <span>评论(100)</span>
        </el-row>
        <el-row class="collect">
          <i class="el-icon-star-off" @click="handleCollect"></i>
          <span>收藏</span>
        </el-row>
        <el-row class="share">
          <a href="https://wx.qq.com">
            <i class="el-icon-share"></i>
          </a>
          <span>分享</span>
        </el-row>
        <el-row class="like">
          <i class="iconfont iconding" @click="handleLike"></i>
          <span>点赞(54)</span>
        </el-row>
      </el-row>

      <!-- 评论部分 -->
      <PostComment />
    </el-row>

    <!-- 相关攻略 -->
    <PostDetailAside :data="aside" @handleAside="handleAside" />
  </el-row>
</template>

<script>
import PostDetailAside from "@/components/post/postDetailAside";
import PostComment from "@/components/post/postComment";
import moment from "moment";
export default {
  data() {
    return {
      item: {},
      comments: [],
      aside: [],
      creat_time: "",
      dialogImageUrl: "",
      dialogVisible: false,

      commentContent: {
        content: "",
        post: this.$route.query.id,
        pics: [],
        follow: 0,
        score: {},
        account: {}
      },
      postId: 1,
      sort: "",
      limit: 2,
      start: 1,
      filters: {},
      showPic: false
    };
  },
  components: {
    PostDetailAside,
    PostComment
  },
  
  methods: {
    //收藏文章
    handleCollect() {
      this.$axios({
        url: "/posts/star",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        params: this.$route.query
      }).then(res => {
        if (res.status === 200) {
          this.$message.success(res.data.message);
        }
      });
    },

    //文章点赞
    handleLike() {
      this.$axios({
        url: "/posts/like",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        params: this.$route.query
      }).then(res => {
        if (res.status === 200) {
          this.$message.success(res.data.message);
        }
      });
    },

    // 渲染页面
    getItem() {
      this.$axios({
        url: "/posts",
        params: this.$route.query
      }).then(res => {
        let { data } = res.data;
        let cityId = res.city;
        this.item = data[0];
        console.log(this.item);
        this.creat_time = moment(this.item.update_at).format(
          `YYYY-MM-DD  hh:mm`
        );

        this.$axios({
          url: "/posts/recommend",
          params: this.$route.query
        }).then(res => {
          let { data } = res.data;
          this.aside = data;
        });
      });
    },

    //点击侧边栏跳转
    handleAside(id) {
      this.$axios({
        url: "/posts",
        params: { id }
      }).then(res => {
        let { data } = res.data;
        let cityId = res.city;
        this.item = data[0];
        this.creat_time = moment(this.item.update_at).format(
          `YYYY-MM-DD  hh-mm`
        );
        this.$router.push(`/post/postDetail?id=` + id);
        this.$axios({
          url: "/posts/recommend",
          params: this.$route.query
        }).then(res => {
          let { data } = res.data;
          this.aside = data;
        });
      });
    },

    //切换评论条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getComments();
    },

    //切换当前评论页
    handleCurrentChange(val) {
      this.pageIndex = (val - 1) * this.pageSize;
      this.getComments();
    }
  },

  mounted() {
    this.getItem();
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 15px 0;
  .main {
    width: 720px;
    .time_reader {
      padding: 20px 0;
      color: #999;
      .reader_number {
        padding: 0 20px;
      }
    }
    .post {
      /deep/ img {
        width: 100% !important;
      }
    }
    .header {
      h1 {
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
      }
      a {
        font-size: 14px;
        font-weight: 700;
        &:hover {
          color: #409eff;
        }
      }
      span {
        font-size: 14px;
        font-weight: 400;
      }
    }
    .btn {
      display: flex;
      justify-content: center;
      padding: 30px 0;
      .comment,
      .collect,
      .share,
      .like {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 18px;
        i {
          color: tomato;
          font-size: 28px;
        }
        span {
          color: #999;
          margin-top: 5px;
        }
      }
    }

    .com_part {
      width: 720px;
      h4 {
        font-weight: normal;
        padding-bottom: 10px;
      }

      textarea {
        width: 720px;
        border: none;
        resize: none;
        outline: none;
        padding: 10px 15px;
        border-radius: 5px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
      }

      .handleIn {
        box-sizing: border-box;
        padding: 10px 0;

        /deep/.el-upload--picture-card {
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /deep/.el-button--primary {
          width: 56px;
          height: 28px;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          padding: 5px;
        }
      }
    }

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

      .comment_pic {
        border: 1px dashed #cccccc;
        width: 90px;
        height: 90px;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 5px;
      }

      .reply {
        text-align: right;
        font-size: 14px;
        color: #409eff;
      }
    }

    /deep/.el-pagination__jump:hover {
      cursor: pointer;
    }
  }
}
.but {
  float: right;
}
.aaa {
  display: inline-block;
}
</style>
<template>
  <el-row class="content">
    <p class="title">评论</p>
    <!-- 当点击回复的时候显示需要回复的评论用户，否则隐藏 -->
    <span class="huifu" v-if="isShow">
      回复 @{{isShow}}
      <i class="iconfont icon-guanbi" @click="handleCancel"></i>
    </span>
    <!-- 输入框 -->
    <el-row>
      <textarea
        class="textarea"
        placeholder="说点什么吧..."
        v-model="form.content"
        autocomplete="off"
        style="resize: none"
        ref="textarea"
      ></textarea>
    </el-row>
    <!-- 图片的选择和提交按钮 -->
    <el-row class="submit el-row is-justify-space-between el-row--flex">
      <!-- 调用图片上传组件 -->
      <el-row class="upload">
        <el-upload
          ref="buttons"
          action="http://127.0.0.1:1337/upload"
          name="files"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :clearFiles="handleclearFiles"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-row>
      <p class="button" @click="handlesubmit">提交</p>
    </el-row>
    <!-- 评论的主要内容 -->
    <comments
      v-for="(item,index) in datalist"
      :key="index"
      :data="item"
      class="commends"
      @handlehuifu="handlehuifu"
    ></comments>
    <!-- 如果评论内容为空的话显示为暂无评论 -->
    <el-row v-if="commend.length==0" class="noCommend">暂无评论内容,赶快来写下您的精彩评论吧~~</el-row>
    <!-- 分页组件 -->
    <el-row class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="commend.length"
      ></el-pagination>
    </el-row>
  </el-row>
</template>

<script>
//引入评论列表
import comments from "@/components/post/commentFloor.vue";
export default {
  //注册评论主要内容的组件
  components: {
    comments
  },
  data() {
    return {
      //评论输入框的输入内容
      //图片上传中删除功能和下载功能是否禁用
      disabled: false,
      //评论的数据内容
      commend: [],
      //当前页码
      currentPage: 1,
      //截取后的数据
      datalist: [],
      //当前的页码
      pageNumber: 1,
      //当前页显示的条数
      pageSize: 2,
      //提交评论所需要的数据
      form: {
        content: "",
        pics: [],
        post: this.$route.query.id,
        follow: Number
      },
      isShow: ""
    };
  },
  methods: {
    //上传图片组件
    //点击放大时触发
    handlePictureCardPreview(file) {
      console.log(file);
    },
    //点击移除的时候触发
    handleRemove(file, fileList) {
      const id = file.response[0].id;
      const arr = [];
      this.form.pics.forEach(v => {
        if (v.id !== id) {
          arr.push(v);
        }
      });
      this.form.pics = arr;
    },
    //图片上传成功的时候触发
    handleAvatarSuccess(res, file) {
      this.form.pics.push({
        id: res[0].id
      });
      // console.log(res.data.data)
      // console.log(res[0].id)
    },
    //提交成功后触发清除图片
    handleclearFiles() {},
    //分页组件
    //当前每页显示条数发生变化的时候触发
    handleSizeChange(val) {
      //切换条数
      this.pageSize = val;
      //重新回到第一页
      this.datalist = this.commend.slice(0, this.pageSize);
    },
    //当前页码发生改变的时候触发
    handleCurrentChange(val) {
      //修改当前的页码
      this.pageNumber = val;
      //修改机票的列表
      this.datalist = this.commend.slice(
        (this.pageNumber - 1) * this.pageSize,
        this.pageSize * this.pageNumber
      );
    },
    //提交评论的时候触发
    handlesubmit() {
      if (this.form.content == "" && this.form.pics.length == 0) {
        this.$message.warning("评论内容或图片不能为空，请正确填写您的评论");
        return;
      }
      console.log(this.form);
      //请求接口发布评论
      this.$axios({
        url: "/comments",
        method: "POST",
        data: this.form,
        headers: {
          // 添加 token 信息
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        if (res.status == 200) {
          this.$message.success("评论成功！");
          //评论成功后重新请求数据
          this.$axios({
            url: "/posts/comments",
            params: {
              post: this.$route.query.id
            }
          }).then(res => {
            const { data } = res.data;
            this.commend = data;
            //第一页的数据
            this.datalist = this.commend.slice(0, this.pageSize);
          });
          this.form.content = "";
          this.form.pics = [];
          this.$refs.buttons.clearFiles();
        }
      });

    },

    //点击回复
    handlehuifu(value) {
      //提交评论需要的数据 回复id
      console.log(value);
      this.form.follow = value.id;
      this.isShow = value.account.nickname;
      console.log(this.form.follow);
      this.$refs.textarea.focus();
    },

    //点击关闭按钮时触发取消评论的回复
    handleCancel() {
      this.isShow = "";
    }
  },
  mounted() {
    //页面加载完成后从后台请求评论的数据
    const id = this.$route.query.id;
    console.log(id);
    this.$axios({
      url: "/posts/comments",
      params: {
        post: id
      }
    }).then(res => {
      const { data } = res.data;
      this.commend = data;
      //第一页的数据
      this.datalist = this.commend.slice(0, this.pageSize);
    });
  }
};
</script>

<style lang='less' scoped>
.content {
  margin-bottom: 20px;
  .huifu {
    background-color: #f4f4f5;
    margin-bottom: 10px;
    color: #909399;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    display: inline-block;
    border-radius: 4px;
    border: 1px solid rgba(64, 158, 255, 0.2);
    i:hover {
      background-color: #909399;
      color: white;
    }
  }
  .title {
    columns: #000000;
    margin-bottom: 20px;
  }
  .textarea {
    min-height: 35px;
    padding: 10px;
    width: 100%;
  }
  .submit {
    margin-top: 10px;
    margin-bottom: 30px;
    .button {
      text-align: center;
      background-color: #409eff;
      color: #fff;
      width: 60px;
      height: 30px;
      border-radius: 5px;
      line-height: 30px;
    }
  }
  .noCommend {
    color: #cccccc;
    text-align: center;
    margin-bottom: 50px;
  }
  .commends {
    border-bottom: 1px dashed #cccccc;
  }
}
</style>

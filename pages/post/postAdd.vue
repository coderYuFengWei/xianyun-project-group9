<template>
  <div class="container">
    <div class="main">
      <p>发表新攻略</p>
      <span>分享你的个人游记，让更多人看到哦！</span>

      <el-form ref="form" :model="form" label-width="90px">
        <!-- 标题输入框 -->
        <el-form-item class="title">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <!-- 富文编辑框 -->
        <el-form-item>
          <VueEditor :config="config" ref="vueEditor" />
        </el-form-item>

        <div class="ppp">
          <span class="cities">选择城市</span>
          <!-- 选择城市输入框 -->
          <el-form-item>
            <el-autocomplete
              class="inline-input"
              v-model="form.city"
              :fetch-suggestions="querySearch"
              placeholder="请搜索游玩城市"
              @blur="handleBlur"
            ></el-autocomplete>
          </el-form-item>
        </div>

        <!-- 发布 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布</el-button>&nbsp;或者
          <a href="#" @click="handleDraft">保存到草稿</a>
        </el-form-item>
      </el-form>

      <!-- 草稿箱 -->
      <div class="aside">
        <h4>草稿箱 ({{$store.state.post.draft.length}})</h4>
        <el-row
          class="btn"
          v-for="(item,index) in $store.state.post.draft"
          :key="index"
          v-if="$store.state.post.draft.length"
        >
          <el-col :span="16" class="draft">
            <i @click="handleEdit(index)" class="el-icon-edit-outline"></i>
            {{item.title}}
          </el-col>
          <el-col :span="8">
            <el-button type="danger" @click="handleDelet(index)" class="del">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>store
<script>
import "quill/dist/quill.snow.css";
import moment from "moment";

let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  name: "container",
  data() {
    return {
      form: {
        content: "",
        title: "",
        city: ""
      },

      //   存放arr城市的数组
      cities: [],

      input: "",

      arr: [],

      config: {
        // 上传图片的配置
        uploadImage: {
          url: `${this.$axios.defaults.baseURL}/upload`,
          name: "files",
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`,

          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data[0].url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: `${this.$axios.defaults.baseURL}+/upload`,
          name: "files",
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data[0].url);
          }
        }
      }

      // rules: {
      //     title: [{ required: true, message: "", trigger: "blur" }]
      //     city: [
      //         {
      //             required: true,
      //             message: "请输入正确城市",
      //             trigger: "blur"
      //         }
      //     ]
      // }
    };
  },

  components: {
    VueEditor
  },

  // 监听变化
  watch: {
    $store() {
      const arr = this.$store.state.post.draft;
      this.arr = arr;
    }
  },

  mounted() {
    const arr = this.$store.state.post.draft;
    this.arr = arr;
    console.log(this.arr);
  },

  methods: {
    // 提交表单时触发
    onSubmit() {
      var quill = this.$refs.vueEditor.editor;
      this.form.content = quill.root.innerHTML;
      console.log(this.form);
      if (!this.form.title) {
        this.$confirm("请填写标题", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      if (!this.form.city) {
        this.$confirm("请选择城市", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/posts",
            data: this.form,
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
            }
          }).then(res => {
            console.log(res.status);
            if (res.status === 200) {
              this.$message.success(res.data.message);
              this.$router.push({ path: "/post" });
              // window.location.reload();

              this.form = {
                content: "",
                title: "",
                city: ""
              };
            }
          });
        } else {
          this.$message.error("请完善游记再提交!");
          return false;
        }
      });
    },

    // 城市获得焦点时触发
    querySearch(value, cb) {
      if (!value) {
        cb([]);
        return false;
      } else {
        this.$axios({
          url: "/airs/city?name=" + value
        }).then(res => {
          const { data } = res.data;
          const arr = data.map((item, index) => {
            item.value = item.name;
            return item;
          });
          this.cities = arr;
          cb(arr);
        });
      }
    },

    // 输入框失去焦点时
    handleBlur() {
      if (this.cities.length > 0) {
        this.form.city = this.cities[0].value;
      }
    },

    // 草稿箱点击时触发
    handleDraft() {
      var quill = this.$refs.vueEditor.editor;
      this.form.content = quill.root.innerHTML;

      var time = moment().format("YYYY-MM-DD");
      const data = { ...this.form, time };
      this.$store.commit("post/setdraft", data);
      window.location.reload();
      // console.log(data, 11111);
    },

    // 草稿箱点击删除时触发
    handleDelet(index) {
      this.$confirm("此操作将永久删除该草稿箱, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$store.commit("post/deldraft", index);
          this.form = {};
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 点击草稿箱内容时执行
    handleEdit(index) {
      const { time, ...prop } = this.$store.state.post.draft[index];
      this.form = prop;
      var quill = this.$refs.vueEditor.editor;
      quill.clipboard.dangerouslyPasteHTML(0, this.form.content);
    }
  }
};
</script>;

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  position: relative;
  .main {
    width: 750px;
    p {
      font-size: 22px;
      margin-bottom: 10px;
      margin-right: 65px;
    }
    span {
      display: block;
      font-size: 12px;
      color: #999;
      margin-bottom: 20px;
    }
  }
}
/deep/ .el-form-item__content {
  margin: 0 !important;
  vertical-align: middle;
}
/deep/ .ql-container.ql-snow {
  height: 400px;
}
/deep/.ql-toolbar.ql-snow {
  padding: 8px 0;
  margin-top: 20px;
}
/deep/ .ql-toolbar {
  line-height: 40px;
}
.selected {
  font-size: 14px;
  color: #606266;
  padding: 0 10px 0 0;
}
.citys {
  margin: 20px 0;
}
/deep/.el-button {
  padding: 9px 15px;
}
.container span[data-v-9d84ab6a] {
  font-size: 14px;
  color: black;
  margin-bottom: 0;
  line-height: 210%;
  margin: 0 0 0 10px;
}
a {
  color: orange;
  font-size: 14px;
}
.aside {
  border: 1px solid #ccc;
  width: 205px;
  position: absolute;
  top: 20px;
  left: 800px;
  padding: 10px;
  h4 {
    font-weight: 400;
    color: #666;
    margin-bottom: 10px;
  }

  .btn {
    margin-bottom: 10px;
    .draft {
      display: inline-block;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      .el-icon-edit-outline:hover {
        color: orangered;
      }
    }
  }
  .del {
    margin-left: 20px;
    // padding-top: 8px;
  }
  .el-button {
    position: relative;
    width: 18px;
    height: 25px;
    text-align: center;
    line-height: 20px;
    i {
      position: absolute;
      top: 3px;
      left: 7px;
    }
  }
}
.container .main[data-v-9d84ab6a] span {
  margin-bottom: 5px;
  font-size: 12px;
  color: #999;
}
.container span[data-v-9d84ab6a][data-v-9d84ab6a] {
  margin-bottom: 5px;
}
/deep/.el-form-item__content {
  margin-top: 20px;
}
/deep/.el-form-item__label {
  margin-top: 20px;
}
.el-icon-edit {
  font-size: 20px;
}
.el-icon-edit-outline :hover {
  color: orangered;
}
.inline-input {
  padding-top: 21px;
}

/deep/.ppp {
  display: flex;
  justify-content: start;
  align-items: center;
  .cities {
    margin-top: 14px;
    margin-right: 10px;
    font-size: 16px !important;
    color: black !important;
  }
}
</style>
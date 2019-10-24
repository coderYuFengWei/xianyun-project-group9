<template>
  <div class="box">
    <div class="headerSearch">
      <input type="text" placeholder="请输入想去的地方， 比如：'广州'" @keydown="searchStrategy" class="val" />
      <i class="el-icon-search" @click="searchStrategy"></i>
    </div>

    <!-- 城市推荐导航 -->
    <div class="cityNav">
      <em>推荐：</em> 
      <span v-for="(item,index) in datas.children" :key="index" @click="getCity(item.city)">{{item.city}}</span>
    </div>
    <div class="heade">
      <span>推荐攻略</span>
      <span @click="jumpPage" class="notes">
        <i class="el-icon-edit"></i> 写游记
      </span>
    </div>
    <!-- 3张图片 -->
    <div
      class="articleDetails"
      v-for="(item,index) in articleData"
      :key="index"
      v-if="item.images.length >= 3"
      @click="jumpDetail(item.id)"
    >
      <div class="title">{{item.title}}</div>
      <div class="article" v-html="item.summary"></div>

      <div class="imgLists">
        <img :src="item.images[0]" alt />
        <img :src="item.images[1]" alt />
        <img :src="item.images[2]" alt />
      </div>

      <div class="user">
        <span class="city">
          <i class="el-icon-location-outline"></i>
          {{item.cityName}}
        </span>
        <span class="userImg">
          by
          <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt />
          <em>{{item.account.nickname}}</em>
        </span>
        <span class="browseVolume">
          <i class="el-icon-view"></i>
          {{item.watch === null ? 0 : item.watch}}
        </span>
        <span class="like">{{item.like === null ? 0 : item.like}} 赞</span>
      </div>
    </div>

    <!-- 1张或者2张 -->
    <div
      class="articleDetailsx"
      v-for="(item,index) in articleData"
      :key="index"
      v-if="item.images.length === 1 || item.images.length === 2"
      @click="jumpDetail(item.id)"
    >
      <div class="imgLists">
        <img :src="item.images[0]" alt />
      </div>

      <div class="articleList">
        <div class="title">{{item.title}}</div>
        <div class="article" v-html="item.summary"></div>

        <div class="user">
          <span class="city">
            <i class="el-icon-location-outline"></i>
            {{item.cityName}}
          </span>
          <span class="userImg">
            by
            <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt />
            <em>{{item.account.nickname}}</em>
          </span>
          <span class="browseVolume">
            <i class="el-icon-view"></i>
            {{item.watch === null ? 0 : item.watch}}
          </span>
          <span class="like">{{item.like === null ? 0 : item.like}} 赞</span>
        </div>
      </div>
    </div>

    <!-- 没有图片 -->

    <div
      class="articleDetails"
      v-for="(item,index) in articleData"
      :key="index"
      v-if="item.images.length === 0"
      @click="jumpDetail(item.id)"
    >
      <div class="title">{{item.title}}</div>
      <div class="article" v-html="item.summary"></div>

      <div class="user">
        <span class="city">
          <i class="el-icon-location-outline"></i>
          {{item.cityName}}
        </span>
        <span class="userImg">
          by
          <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt />
          <em>{{item.account.nickname}}</em>
        </span>
        <span class="browseVolume">
          <i class="el-icon-view"></i>
          {{item.watch === null ? 0 : item.watch}}
        </span>
        <span class="like">{{item.like === null ? 0 : item.like}} 赞</span>
      </div>
    </div>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,3, 5, 10, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="paging"
      v-if="articleData.length > 0"
    ></el-pagination>
    <div class="test" v-if="articleData.length === 0 && isShow">！该城市暂无数据</div>
  </div>
</template>

<script>
export default {
  props: {
    cityData: {
      type: String,
      default: ""
    },
    datas:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      articleData: [],
      total: 0,
      // 每一页加载条数据
      pageSize: 3,
      pageIndex: 0,
      currentPage: 1,
      searchCity: "",
      isShow: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    searchStrategy(event) {
      if (event.keyCode === 13 || event.type === "click") {
        var val = document.querySelector(".val").value;
        if (val === "") return;
        this.searchCity = val;
      }
    },
    getCity(get_city){
      // console.log(get_city)
      this.searchCity = get_city;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageIndex = (val - 1) * this.pageSize;
      this.getData();
    },

    getData() {
      let data = {
        _start: this.pageIndex,
        _limit: this.pageSize
      };
      if (this.searchCity) {
        data.city = this.searchCity;
      } else if (this.cityData) {
        data.city = this.cityData;
      }
      this.$axios({
        url: "/posts",
        params: data
      }).then(res => {
        // console.log(res);
        const { data, total } = res.data;
        this.articleData = data;
        this.total = total;
        this.isShow = true;
      });
    },
    jumpPage(){
      this.$router.push({path:"/post/postAdd"})
    },
    jumpDetail(id){
      this.$router.push({path:"/post/postDetail",query:{id:id}})
      // console.log(id)
    }
  },
  watch: {
    cityData() {
      this.getData();
    },
    searchCity(){
      this.getData();
    }
  }
};
</script>

<style scoped lang="less">
.heade {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  span:first-child {
    font-size: 20px;
    color: #ffa500;
    border-bottom: 2px solid #ffa500;
    padding-bottom: 8px;
  }
  span:last-child {
    display: inline-block;
    width: 100px;
    height: 40px;
    background: #409eff;
    color: #fff;
    text-align: center;
    line-height: 40px;
    border-radius: 10px;
    margin-bottom: 5px;

  }
}
.title {
  font-size: 19px;
  padding-bottom: 15px;
}
.title:hover {
  color: #ffa500;
}

.user {
  font-size: 13px;
  border-bottom: 1px solid #ccc;
  span {
    padding: 7px;
    color: #666;
  }
  .userImg {
    display: inline-block;
    padding-top: 20px;
    img {
      vertical-align: middle;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    em {
      color: #ffa500;
    }
  }
  .like {
    float: right;
    font-size: 16px;
    color: #ffa500;
  }
}
.articleDetails {
  padding-top: 40px;
  cursor: pointer;
  .article {
    color: #666;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-bottom: 15px;
  }

  .imgLists {
    img {
      float: left;
      display: inline-block;
      width: 220px;
      height: 150px;
      margin-left: 10px;
    }
  }
}
.articleDetailsx {
  border-bottom: 1px solid #ccc;
  padding-top: 50px;
  display: flex;
  cursor: pointer;
  .articleList {
    width: 65%;
    margin-left: 48px;
    .article {
      color: #666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .user {
      border-bottom: none;
      font-size: 13px;
    }
  }

  .imgLists {
    width: 30%;
    img {
      width: 250px;
    }
  }
}

.paging {
  padding: 20px 0 20px 60px;
}
.headerSearch {
  position: relative;
  input {
    border: 3px solid #ffa500;
    width: 100%;
    height: 38px;
    text-indent: 15px;
    outline: none;
  }
  i {
    position: absolute;
    top: 9px;
    right: 10px;
    font-size: 20px;
    font-weight: 700;
    color: #ffa500;
  }
  i:hover {
    cursor: pointer;
  }
}
.cityNav {
  padding: 10px 0;
  font-size: 14px;
  color: #666;
  span:hover {
    color: #ffa500;
    border-bottom: 1px solid #ffa500;
    cursor: pointer;
  }
  span{
    margin-right: 10px;
  }
}
.test {
  width: 100%;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 18px;
}
.notes:hover{
  cursor: pointer;
}
</style>
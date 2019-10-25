<template>
  <section class="container">
    <div v-for="(item,index) in hotelData" :key="index">
      <!-- 面包屑 -->
      <div class="headeCrumbs">
        <nuxt-link to="/hotel">
          <span class="hotelNav">酒店</span>
          <i class="el-icon-arrow-right"></i>
        </nuxt-link>
        <nuxt-link to="/hotel">
          <span class="hotelNav">{{item.real_city + item.big_cate}}</span>
          <i class="el-icon-arrow-right"></i>
        </nuxt-link>
        <span>{{item.name}}</span>
      </div>

      <!-- 酒店详情 -->
      <div class="hotelDetails">
        <div class="header">
          <div class="title">
            {{item.name}}
            <span v-if="item.hotellevel=== null"></span>
            <span v-if="item.hotellevel !== null && item.hotellevel.level === 5">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <em>5星级</em>
            </span>

            <span v-if="item.hotellevel !== null && item.hotellevel.level === 4">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <em>4星级</em>
            </span>

            <span v-if="item.hotellevel !== null && item.hotellevel.level === 3">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <em>3星级</em>
            </span>

            <span v-if="item.hotellevel !== null && item.hotellevel.level === 2">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <em>2星级</em>
            </span>

            <span v-if="item.hotellevel !== null && item.hotellevel.level === 1">
              <i class="el-icon-star-on"></i>
              <em>1星级</em>
            </span>
          </div>
        </div>

        <div class="address">
          <span class="el-icon-location-outline"></span>
          {{item.address}}
        </div>

        <!-- 图片 -->
        <div class="hotelImgs clearfix">
          <div class="large">
            <img src="../../imgs/1.jpeg" alt />
          </div>

          <div class="small">
            <img src="../../imgs/1.jpeg" alt />
            <img src="../../imgs/1.jpeg" alt />
            <img src="../../imgs/1.jpeg" alt />
            <img src="../../imgs/1.jpeg" alt />
            <img src="../../imgs/1.jpeg" alt />
            <img src="../../imgs/1.jpeg" alt />
          </div>
        </div>

        <!-- 价格 -->
        <div class="Price">
          <div class="frist">
            <span>价格来源</span>
            <span>低价房型</span>
            <span>最低价格/每晚</span>
          </div>

          <div v-for="(iteme,index) in item.products" :key="index">
            <span>{{iteme.name}}</span>
            <span>{{iteme.bestType}}</span>
            <span>
              <em class="color">￥{{iteme.price}}&nbsp;</em>起
              <em class="color">></em>
            </span>
          </div>
        </div>

        <!-- 地图组件 -->
        <div class="Matse">
          <div style="padding:50px;">
            <span>请输入出发地点</span>

            <el-row style="margin-bottom:20px;">
              <el-col :span="5">
                <el-input placeholder="出发地点" v-model="start"></el-input>
              </el-col>
              <el-col :span="5">
                <el-input placeholder="到达地点" v-model="item.address"></el-input>
              </el-col>
              <el-button :span="2" @click="handleSearch">搜索</el-button>
            </el-row>

            <!-- 地图的容器 -->
            <div id="container">
              <img src="../../imgs/map1.jpg" alt />
            </div>
            <div id="panel"></div>
          </div>
        </div>

        <!-- 酒店信息 -->
        <div class="hotelInformation">
          <div>
            <em>基本信息</em>
            <!-- <i>-</i> 没有数据显示 -->
            <span>入住时间: 14:00之后</span>
            <span>离店时间: 12:00之前</span>
            <span>{{item.renovat_time}}/ {{item.creation_time}}</span>
            <span>酒店规模: {{item.roomCount}} 间客房</span>
          </div>
          <div>
            <em>主要设施</em>
            <span>外币兑换服务</span>
          </div>
          <div>
            <em>停车服务</em>
            <i v-if="item.parking === null">-</i>
            <span v-else>{{item.parking}}</span>
          </div>
          <div>
            <em>品牌信息</em>
            <i v-if="item.hotelbrand === null">-</i>
            <span v-else>{{item.hotelbrand.name}}</span>
          </div>
        </div>

        <!-- 用户评论· -->
        <div class="comment clearfix">
          <div class="number">
            <ul>
              <li class="numLi">0条真实用户评论</li>
              <li>总评数：{{item.very_good_remarks + item.very_bad_remarks}}</li>
              <li>好评数：{{item.very_good_remarks}}</li>
              <li>差评数：{{item.very_bad_remarks}}</li>
            </ul>
          </div>

          <div class="score">
            <el-rate
              v-model="item.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
              class="scorexx"
            ></el-rate>
            <span v-if="item.stars >= 3">推荐</span>
          </div>
          <div class="scores">
            <el-progress
              type="circle"
              :percentage="item.scores.environment === null ? 0 : item.scores.environment * 10"
              :stroke-width="5"
              :show-text="false"
              :width="90"
            ></el-progress>
            <span class="scoresa">
              <em>环境</em>
              <em>{{item.scores.environment === null ? 0 : item.scores.environment}}分</em>
            </span>
            <el-progress
              type="circle"
              :percentage="item.scores.product === null ? 0 : item.scores.product * 10"
              :stroke-width="5"
              :show-text="false"
              :width="90"
            ></el-progress>
            <span class="scoresb">
              <em>产品</em>
              <em>{{item.scores.product === null ? 0 : item.scores.product}}分</em>
            </span>
            <el-progress
              type="circle"
              :percentage="item.scores.service === null ? 0 : item.scores.service * 10"
              :stroke-width="5"
              :show-text="false"
              :width="90"
            ></el-progress>
            <span class="scoresc">
              <em>服务</em>
              <em>{{item.scores.service === null ? 0 :item.scores.service}}分</em>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      hotelData: [],

      start: "",
      end: "",
      activeName2: "first"
    };
  },
  components: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSearch() {
      this.map();
    },
    map() {
      // 地图对象
      var map = new AMap.Map("container", {
        zoom: 11 //级别
        //center: [113.3245904, 23.1066805]//中心点坐标
      });

      // 点标记
      // var marker1 = new AMap.Marker({
      //   content: `<div style="width:20px; height:20px; border-radius: 50px; background:red; color:#fff; text-align:center; line-height: 20px;">99</div>`,
      //   position:[113.3245904, 23.1066805]//位置
      // })
      // var marker2 = new AMap.Marker({
      //   position:[113.3345904, 23.1266805]//位置
      // })
      // var markerList = [marker1, marker2];
      // map.add(markerList);//添加到地图

      // 异步加载插件
      AMap.plugin(["AMap.ToolBar", "AMap.Driving"], () => {
        //异步加载插件
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);

        // 驾车路线的插件
        var driving = new AMap.Driving({
          map: map,
          panel: "panel",
          policy: AMap.DrivingPolicy.LEAST_TIME
        }); //驾车路线规划

        var points = [{ keyword: this.start }, { keyword: this.end }];

        driving.search(points, function(status, result) {});
      });
    }
  },
  mounted() {
    const id = this.$route.query.id;
    this.$axios({
      url: "/hotels",
      params: {
        id
      }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.hotelData = data;
    });

    // 整个页面加载完毕之后执行
    window.onLoad = () => {
      this.map();
    };

    // 地图的连接
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=d70dddbdc043fda6d20f723182f101e9";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;

  .headeCrumbs {
    padding: 17px 0;
    color: #666;
    .hotelNav:hover {
      color: blue;
    }
    .hotelNav {
      font-weight: 600;
      color: #000;
    }
  }
}
.hotelDetails {
  .header {
    .title {
      padding-top: 10px;
      font-size: 25px;
      color: #333;
      i {
        color: #ff9900;
      }
      em {
        color: #ff9900;
        font-weight: 400;
        font-family: SimSun;
        font-style: oblique;
      }
    }
  }
}
.address {
  font-size: 14px;
  color: #333;
  padding: 12px 0 30px 0;
}
.hotelImgs {
  margin-bottom: 40px;
  .large {
    float: left;
    img {
      width: 640px;
      height: 360px;
      display: block;
    }
  }
  .small {
    float: right;
    width: 350px;
    img {
      width: 164px;
      display: block;
      float: right;
      margin: 0 10px 10px 0;
    }
  }
}
.Price {
  div {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    color: #666;
  }
  div:hover {
    background: #f5f7fa;
    cursor: pointer;
  }
  div:first-child {
    font-weight: 600;
    color: #777;
  }
  .frist:hover {
    background: none;
    cursor: auto;
  }
}
.localMap {
  height: 200px;
  background: pink;
  margin: 35px 0;
}
.clearfix::after {
  content: ".";
  clear: both;
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
}
.clearfix {
  *zoom: 1;
}
.hotelInformation {
  div {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    em {
      margin-right: 60px;
    }
    span {
      margin-left: 5px;
      padding: 5px;
      background: #ddd;
      border-radius: 6px;
    }
  }

  div:first-child {
    display: flex;
    justify-content: space-between;
    em {
      margin-right: 0;
    }
    span {
      background: none;
    }
  }
}
.comment {
  padding: 30px 0;
  div {
    padding: 0 20px;
  }
  .number {
    float: left;
  }
  .score {
    float: left;
  }
  .scores {
    float: left;
    position: relative;
    span {
      display: inline-block;
      width: 37px;
      color: blue;
    }
    .scoresa {
      position: absolute;
      top: 25px;
      left: 65px;
    }
    .scoresb {
      position: absolute;
      top: 24px;
      left: 205px;
    }
    .scoresc {
      position: absolute;
      top: 24px;
      right: 65px;
    }
  }
}
.number {
  li {
    color: #888;
  }
  .numLi {
    color: #000;
    font-weight: 600;
    padding-bottom: 10px;
  }
}
.score {
  margin-top: 43px;
  position: relative;

  span {
    display: inline-block;
    width: 90px;
    height: 90px;
    border: 1px solid red;
    color: red;
    text-align: center;
    line-height: 90px;
    font-size: 40px;
    font-weight: 300;
    border-radius: 50%;

    transform: rotate(10deg);
    -ms-transform: rotate(19deg);
    -moz-transform: rotate(15deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(7deg);
    position: absolute;
    top: -35px;
    left: 52px;
    opacity: 0.3;
  }
}
.color {
  color: #ff9900;
}

#container {
  width: 600px;
  height: 300px;
}
#panel {
  position: fixed;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 10px;
  right: 10px;
  width: 280px;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
.Matse {
  color: blue;
  // margin-left: 80px;
  span {
    color: #000;
  }
  h3 {
    padding: 30px 0;
    font-size: 26px;
  }
}
</style>
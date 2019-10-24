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
        <div class="localMap"></div>

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
            <span v-if="item.stars > 3">推荐</span>
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
      hotelData: []
    };
  },
  components: {},
  methods: {},
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
      em{
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
</style>
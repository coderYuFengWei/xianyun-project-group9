<template>
  <div class="scenicNav">
    <div class="cityNav" @mouseleave="hiddenCity">
      <div class="city">
      <p v-for="(item,index) in cityMenuList" :key="index"  @mouseover="getDisplay(index)">
        {{item.type}}
        <span class="el-icon-arrow-right"></span>
      </p>
      </div>

      <div class="cityAttractions" v-if="isShow && cityMenuList[listIndex].children">
        <p v-for="(item,index) in cityMenuList[listIndex].children"
        :key="index">
          <span>{{index + 1}}</span>
          <em @click="acquiringCities(item.city)">{{item.city}}</em><i @click="acquiringCities(item.city)">{{item.desc}}</i>
        </p>
      </div>
    </div>

    <div class="recommendedCities">
      <p>推荐城市</p>
      <img src="../../imgs/timg.gif" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityMenuList: [

      ],
      listIndex: 0,
      isShow: false,
    };
  },
  mounted() {
    // 这个是侧边栏请求
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      const { data } = res.data;
      this.cityMenuList = data;
    this.$emit("getPopularCity",this.cityMenuList[1])
    });
  
  },
  methods: {
    getDisplay(index){
      this.listIndex = index;
      this.isShow = true;
    },
    hiddenCity(){
      this.isShow = false;
    },
    acquiringCities(city){
      this.$emit("getCity",city)
    },
  }
};
</script>

<style scoprd lang="less">
.scenicNav {
  width: 25%;

 
  .cityNav {
     position: relative;
     .city{
           p {
      height: 40px;
      border: 1px solid #ccc;
      border-bottom: none;
      line-height: 40px;
      text-indent: 15px;
      font-size: 14px;

      span {
        padding-left: 120px;
        font-size: 18px;
        color: #ccc;
      }
    }
    p:last-child {
      border-bottom: 1px solid #ccc;
    }
    p:hover {
      color: #ffa500;
      span {
        color: #ffa500;
      }
    }
     }
  }

  .recommendedCities {
    padding-top: 20px;
    p:first-child {
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
    img {
      margin-top: 10px;
      width: 100%;
      display: block;
    }
  }
}
  .cityAttractions {
    position: absolute;
    top: 0;
    left: 249px;
    width: 320px;
    height: 250px;
    border: 1px solid #ccc;
    z-index: 10;
    background: #fff;
    color: #999999;
    font-size: 14px;
    p {
      padding: 5px 0 10px 0;
      span {
        padding: 0 10px;
        font-size: 24px;
        font-style: italic;
        color: #ffa500;
      }
      em {
        padding-right: 10px;
        color: #ffa500;
        font-size: 17px;
      }
      em:hover{
        text-decoration: underline;
      }
      i:hover{
        text-decoration: underline;
      }
    }
    p:hover{
      cursor:pointer;
    }
  }
</style>
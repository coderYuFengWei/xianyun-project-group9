<template>
  <section class="container">
    <!-- 头部景点导航 左边侧边栏-->

    <!-- 组件 -->
    <ScenicSpotNav @getCity="getCity" @getPopularCity="getPopularCity"/>

    <!-- 文章列表 -->
    <div class="articleList">
      <!-- 头部搜索 -->

      <!-- 推荐攻略列表 -->

      <!-- 组件 -->
      <ArticleList :cityData="cityData" :datas="popularCity"/>
    </div>
  </section>
</template>

<script>
import ScenicSpotNav from "@/components/post/ScenicSpotNav";
import ArticleList from "@/components/post/ArticleList";
export default {
  data() {
    return {
      cityData: "",
      popularCity:{}
    };
  },
  components: {
    ScenicSpotNav,
    ArticleList
  },
  methods: {
    getCity(city) {
      this.cityData = city;
    },
    getPopularCity(PopularCity){
      this.popularCity = PopularCity
    }
  }
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  padding-top: 18px;

  .articleList {
    width: 70%;

    float: right;
    margin-left: 45px;
  }
}
</style>
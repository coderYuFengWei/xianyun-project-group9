<template>
  <div class="container">
    <el-row class="select">
      <el-col :span="8">
        <div class="block">
          <el-row class="demonstration" justify="space-between" type="flex" style="margin-bottom:0">
            <i>价格</i>
            <span>{{filters.progress}}</span>
          </el-row>
          <el-slider v-model="filters.progress" :max="4000" :step="10"></el-slider>
        </div>
      </el-col>
      <el-col :span="4">
        <span class="text">住宿等级</span>
        <el-select
          v-model="filters.level"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="不限"
        >
          <el-option
            v-for="(item,index) in data.levels"
            :key="item.level"
            :label="item.name"
            :value="item.id"
          >
            <!--<span style="float: left">{{ item.name }}</span>-->
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <span class="text">住宿类型</span>
        <el-select
          v-model="filters.type"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="不限"
        >
          <el-option
            v-for="(item,index) in data.types"
            :key="item.type"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <span class="text">酒店设施</span>
        <el-select
          v-model="filters.asset"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="不限"
        >
          <el-option
            v-for="(item,index) in data.assets"
            :key="item.asset"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <span class="text">酒店品牌</span>
        <el-select
          v-model="filters.brand"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="不限"
        >
          <el-option
            v-for="(item,index) in data.brands"
            :key="item.brand"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="center" v-for="(item,index) in hotelList">
      <el-col :span="8" style="width:320px;height:210px;">
        <nuxt-link :to="`/hotel/hotelDetails?id=${item.id}`">
          <el-image style="width: 320px; height: 210px" :src="item.photos"></el-image>
        </nuxt-link>
      </el-col>
      <el-col :span="11" class="detail">
        <nuxt-link :to="`/hotel/hotelDetails?id=${item.id}`">
          <h2>{{item.name}}</h2>
        </nuxt-link>
        <p class="type">
          {{item.alias}}
          <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
          <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
          <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
          <span v-if="cityId">{{item.hoteltype.name}}</span>
        </p>
        <el-row style="margin:15px 0px;">
          <el-col :span="9" style="font-size:30px;">
            <el-rate
              v-model="item.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </el-col>
          <el-col :span="7">
            <span style="color:#f90">{{item.all_remarks}}</span>评论
          </el-col>
          <el-col :span="8">
            <span style="color:#f90">{{item.common_remarks}}</span>篇游记
          </el-col>
        </el-row>
        <p style="color:#666;font-size:16px;">
          <i class="iconfont icon-htmal5icon14" style="font-size:25px;"></i>
          位于: {{item.address}}
        </p>
      </el-col>
      <el-col :span="5" class="link">
        <el-row v-for="(item,index) in item.products">
          <el-col>
            <span class="classify">{{item.name}}</span>
            <span style="color:#f90">￥{{item.price}}</span>起
            <i class="iconfont icon-jiantou"></i>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin:30px 0;text-align:right">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="total"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3.7,
      pageIndex: 1,
      pageSize: 6,
      total: 100,
      list: {},
      data: {
        assets: [],
        brands: [],
        levels: [],
        types: [],
        stars: 0
      },
      filters: {
        level: [],
        type: [],
        asset: [],
        brand: [],
        progress: 4000
      },
      hotel: [],
      cacheHotel: [],
      limit: 6
    };
  },
  props: ["cityId"],
  watch: {
    filters: {
      deep: true,
      handler() {
        let data = `/hotels?city=${this.cityId}&price_lt=${this.filters.progress}`;

        if (this.filters.level > 0) {
          this.filters.level.forEach(v => {
            data += `&hotellevel_in=${v}`;
          });
        }

        if (this.filters.type > 0) {
          this.filters.type.forEach(v => {
            data += `&hoteltype_in=${v}`;
          });
        }

        if (this.filters.asset > 0) {
          this.filters.asset.forEach(v => {
            data += `&hotelasset_in=${v}`;
          });
        }

        if (this.filters.brand > 0) {
          this.filters.brand.forEach(v => {
            data += `&hotelbrand_in=${v}`;
          });
        }

        this.$axios(data).then(res => {
          this.hotel = res.data.data;
          this.total = res.data.total;
          this.$emit("handleHotel", this.hotelList);
        });
      }
    }
  },
  computed: {
    hotelList() {
      return this.hotel.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageIndex = val;
      if (this.cityId == 12) {
        this.getDate(this.limit * val);
      } else {
        this.getHotel(this.limit * val, this.cityId);
      }
    },
    async getHotel(limit, id) {
      const list = await this.$axios({
        url: "/hotels",
        params: {
          city: id,
          _limit: limit,
          _start: this.pageIndex
        }
      });
      this.hotel = list.data.data;
      this.total = list.data.total;
      this.cacheHotel = [...list.data.data];
      this.$emit("handleHotel", this.hotelList);
    },
    async getDate(limit) {
      const list = await this.$axios({
        url: "/hotels",
        params: {
          _limit: limit,
          _start: this.pageIndex
        }
      });
      this.hotel = list.data.data;
      this.total = list.data.total;
      this.cacheHotel = [...list.data.data];
      this.$emit("handleHotel", this.hotelList);
    }
  },
  async mounted() {
    const res = await this.$axios({
      url: "/hotels/options"
    });
    const { data } = res.data;
    this.data = data;
    this.getDate(this.limit);
  }
};
</script>

<style scoped lang="less">
.select {
  border: 1px solid #ccc;
  padding: 5px 20px;
  margin: 20px 0px;
  .el-col {
    padding: 5px;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    &:last-child {
      border-right: none;
    }
    &:first-child {
      padding: 5px 30px 5px 0;
    }
    .text {
      padding-left: 15px;
    }
  }
}

/deep/.el-select {
  margin-left: 0px !important;
  .el-input {
    .el-input__inner {
      border: none;
      padding: none !important;
      width: 100%;
    }
  }
}

.center {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  .detail {
    padding: 0px 20px;
    font-size: 20px;
    h2 {
      font-size: 28px;
      font-weight: normal;
    }
    .type {
      color: #999;
      i {
        color: #f90;
      }
    }
  }
}

.link {
  margin-top: 26px;
  /deep/.el-row {
    line-height: 49px;
    border-bottom: 1px solid #ccc;
    .classify {
      display: inline-block;
      width: 150px;
    }
  }
}
</style>

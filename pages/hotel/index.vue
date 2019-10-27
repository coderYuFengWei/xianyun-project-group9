<template>
  <div class="container">
    <p style="margin:20px 0 0 10px">
      酒店
      <span v-if="form.city">>{{form.city}}酒店预订</span>
    </p>
    <div>
      <el-row style="margin:20px 0" :gutter="20">
        <el-col :span="5">
          <el-autocomplete
            style="width:100%"
            class="inline-input"
            v-model="form.city"
            :fetch-suggestions="querySearch"
            placeholder="目的地"
            :trigger-on-focus="false"
            @blur="handleBlur('city')"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
        <el-col :span="10">
          <el-date-picker
            style="width:100%"
            v-model="form.date"
            type="daterange"
            range-separator="至"
            start-placeholder="入住时间"
            end-placeholder="离店时间"
            @change="handleDate"
          ></el-date-picker>
        </el-col>
        <el-col :span="5">
          <el-popover placement="bottom" width="400" trigger="click">
            <template :data="gridData">
              <el-row :gutter="20">
                <el-col :span="5" style="margin-top:10px">
                  <span>每间</span>
                </el-col>
                <el-col :span="9">
                  <el-select v-model="adult" placeholder="0成人">
                    <el-option
                      v-for="item in adults"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="9">
                  <el-select v-model="child" placeholder="0儿童">
                    <el-option
                      v-for="item in childs"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-button type="primary" style="float:right" @click="handlePrimary">确定</el-button>
            </template>
            <el-input v-model="val" slot="reference" placeholder="人数未定" suffix-icon="el-icon-user"></el-input>
          </el-popover>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" style="width:100%" @click="handleSubmit(cityId)">搜索酒店</el-button>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <el-row>
        <el-col :span="13" class="introduction">
          <el-row>
            <el-col :span="3">区域：</el-col>
            <el-col :span="21">
              <nuxt-link to :class="{'active':tag==-1}" @click.native="tag=-1">全部</nuxt-link>
              <nuxt-link
                to="#"
                v-for="(item,index) in showList"
                :key="index"
                @click.native="hangletag(index)"
                :class="{'active':index==tag}"
                style="line-height:30px;"
              >{{item.name}}</nuxt-link>
              <el-col @click.native="label = !label" style="cursor: pointer">
                <i class="iconfont icon-jiantou_yemian_xiangxia_o" v-show="!label"></i>
                <i class="iconfont icon-jiantou_yemian_xiangshang_o" v-show="label"></i>
                {{street.length}}等个区域
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">攻略:</el-col>
            <el-col
              :span="21"
            >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              均价:
              <el-tooltip
                class="item"
                effect="dark"
                content="等级均价由平日价格计算得出，节假日价格会有上浮"
                placement="top-start"
              >
                <el-button class="price">
                  <i class="iconfont icon-wenhao" style="color:#ccc;font-size:20px;"></i>
                </el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="21">
              <el-tooltip
                class="item"
                effect="dark"
                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                placement="bottom"
              >
                <el-button class="price">
                  <span>
                    <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                    <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                    <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                    ¥332
                  </span>
                </el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                placement="bottom"
              >
                <el-button class="price">
                  <span>
                    <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                    <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                    <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                    <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                    ¥521
                  </span>
                </el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                placement="bottom"
              >
                <el-button class="price">
                  <span>
                    <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                    <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                    <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                    <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                    <i class="iconfont icon-huiyuanhuangguanguanjun"></i>
                    ¥768
                  </span>
                </el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11">
          <hotelMap :hotel="hotel"></hotelMap>
        </el-col>
      </el-row>
    </div>
    <hotelFilters @handleHotel="handleHotel" :cityId="cityId" ref="child"></hotelFilters>
    <div
      v-if="!handleHotel.length"
      style="padding:20px; text-align: center;font-size:30px;"
    >暂无符合条件的酒店</div>
  </div>
</template>

<script>
import moment from "moment";
import hotelMap from "@/components/hotel/hotelMap.vue";
import hotelFilters from "@/components/hotel/hotelFilters.vue";

export default {
  data() {
    return {
      hotel: {},
      cityId: 12,
      tag: -1,
      label: false,
      cities: [],
      street: [],
      form: {
        city: "",
        date: []
      },
      state1: "",
      state: "",
      adults: [
        {
          value: 1,
          label: "1成人"
        },
        {
          value: 2,
          label: "2成人"
        },
        {
          value: 3,
          label: "3成人"
        },
        {
          value: 4,
          label: "4成人"
        },
        {
          value: 5,
          label: "5成人"
        },
        {
          value: 6,
          label: "6成人"
        },
        {
          value: 7,
          label: "7成人"
        }
      ],
      childs: [
        {
          value: 1,
          label: "1儿童"
        },
        {
          value: 2,
          label: "2儿童"
        },
        {
          value: 3,
          label: "3儿童"
        },
        {
          value: 4,
          label: "4儿童"
        }
      ],
      adult: "",
      child: "",
      val: ""
    };
  },
  components: {
    hotelFilters,
    hotelMap
  },
  computed: {
    showList() {
      if (this.label == false) {
        //当数据不需要完全显示的时候
        var showList = []; //定义一个空数组
        if (this.street.length > 11) {
          //这里我们先显示前三个
          for (var i = 0; i < 11; i++) {
            showList.push(this.street[i]);
          }
        } else {
          showList = this.street;
        }
        return showList; //返回当前数组
      } else {
        return this.street;
      }
    }
  },
  methods: {
    hangletag(index) {
      this.tag = index;
    },
    querySearch(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        url: `/cities?name=${value}`
      }).then(res => {
        const { data } = res.data;
        const arr = data.map(v => {
          return {
            ...v,
            value: v.name
          };
        });
        this.cities = arr;
        cb(arr);
      });
      cb(this.cities);
    },
    handleBlur(type) {
      if (this.cities.length === 0) return;
      this.form["city"] = this.cities[0].value;
    },
    handleDate(value) {
      const arr = value.map(v => {
        return moment(v).format("YYYY-MM-DD");
      });
      this.form.date = arr;
    },
    handlePrimary() {
      this.val = `${this.adult} ${this.child}`;
    },
    handleSubmit(id) {
      this.$refs.child.getHotel(6, id);
    },
    handleSelect(item) {
      this.cityId = item.id;
      this.street = item.scenics;
    },
    handleHotel(data) {
      this.hotel = data;
    }
  }
};
</script>

<style scoped lang="less">
.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.introduction {
  color: #666;
  padding-left: 10px;
  padding-right: 10px;
  /deep/.el-row {
    margin-bottom: 20px;
    a {
      margin-right: 15px;
      &:hover {
        text-decoration: underline;
        color: #409eff;
      }
    }
    i {
      color: #f90;
    }
  }
}

.icon-jiantou_yemian_xiangxia_o,
.icon-jiantou_yemian_xiangshang_o {
  font-size: 25px;
  padding-top: 2px;
}

.active {
  padding: 3px;
  border-radius: 6px;
  background: #eee;
  color: #999;
}

.price {
  border: none;
  padding: 0;
  &:hover {
    background: none;
    color: #000;
  }
}
</style>
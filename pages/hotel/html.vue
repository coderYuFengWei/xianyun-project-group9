<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-top:20px;">
            <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">南京酒店</el-breadcrumb-item>
            <el-breadcrumb-item>好来阁商务宾馆</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row style="padding:20px 0 50px;">
            <el-row>
                <h2>好来阁商务宾馆</h2>
                <i class="iconfont icon-huiyuanhuangguanguanjun" style="color:#f90"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun" style="color:#f90"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun" style="color:#f90"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun" style="color:#f90"></i>
                <i class="iconfont icon-huiyuanhuangguanguanjun" style="color:#f90"></i>
            </el-row>
            <p>hao lai ge shang wu hotel</p>
            <p>
                <i class="iconfont icon-htmal5icon14" style="font-size:25px;"></i>高淳县淳溪镇镇兴路118号(高淳县委党校对面)</p>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="16">
                <el-image style="width: 780px; height: 368px;" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"></el-image>
            </el-col>
            <el-col :span="8">
                <el-image style="width: 160px; height: 110.5px; padding:0 10px 15px" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"></el-image>
                <el-image style="width: 160px; height: 110.5px; padding:0 10px 15px" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"></el-image>
                <el-image style="width: 160px; height: 110.5px; padding:0 10px 15px" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"></el-image>
                <el-image style="width: 160px; height: 110.5px; padding:0 10px 15px" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"></el-image>
                <el-image style="width: 160px; height: 110.5px; padding:0 10px 15px" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"></el-image>
                <el-image style="width: 160px; height: 110.5px; padding:0 10px 15px" src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"></el-image>
            </el-col>
        </el-row>

        <el-row style="padding:40px 0;">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="价格来源" width="440">
                </el-table-column>
                <el-table-column prop="name" label="低价房型" width="440">
                </el-table-column>
                <el-table-column prop="address" label="最低价格/每间">
                </el-table-column>
            </el-table>
        </el-row>

        <!--地图组件-->
        <el-row style="hight:100px">

        </el-row>

        <el-row class="assest">
            <el-col :span="4">基本信息</el-col>
            <el-col :span="5">入住时间: 14:00之后</el-col>
            <el-col :span="5">离店时间: 12:00之前</el-col>
            <el-col :span="5">2010年开业 / 2015年装修</el-col>
            <el-col :span="5">酒店规模: 148间客房</el-col>
        </el-row>
        <el-row class="assest">
            <el-col :span="4">主要设施</el-col>
            <el-col :span="20">外币兑换服务电梯洗衣服务热水壶</el-col>
        </el-row>

        <el-row class="assest">
            <el-col :span="4">品牌信息</el-col>
            <el-col :span="20">-</el-col>
        </el-row>
        <el-row class="assest">
            <el-col :span="4">品牌信息</el-col>
            <el-col :span="20">-</el-col>
        </el-row>
       
        <!--<el-row>
                            <h3>0条真实用户评论</h3>
                        </el-row>-->

    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                date: '携程',
                name: '高级大床房A',
                address: '￥130 起 >',
            }, {
                date: '携程',
                name: '高级大床房A',
                address: '￥130 起 >',
            }, {
                date: '携程',
                name: '高级大床房A',
                address: '￥130 起 >',
            }],
        }
    },

}
</script>

<style scoped lang="less">
.container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
}

.assest {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
}
</style>

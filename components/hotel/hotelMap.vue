<template>
    <el-row>
        <div id="container"></div>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            address: []
        }
    },
    props: ['hotel'],
    watch: {
        hotel() {
            const arr = this.hotel.map((v) => {
                const obj = { ...v.location }
                obj['name'] = v.name
                return obj
            })
            this.address = arr
            this.map();
        }
    },
    methods: {
        map() {
             const markerList = this.address.map(v => {
                return new AMap.Marker({
                    position: new AMap.LngLat(v.longitude, v.latitude),
                    title: v.name
                });
            });

            this.address.forEach(v => {
                const marker = new AMap.Map('container', {
                    zoom: 9,//级别
                    center: [v.longitude, v.latitude]
                });

                if (markerList.length !== 0) {
                    marker.add(markerList);
                }
            });
        }
    },
    mounted() {
        window.onLoad = () => {
            this.map([])
        }
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=715c56c74adc23b1541af84d659504d1&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }
}
</script>

<style>
#container {
    width: 500px;
    height: 350px;
}
</style>

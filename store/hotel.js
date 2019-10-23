// 存放的是同步修改state的方法
export const state = ()=>{
    return{
        hotelCity:''
    }
}

export const mutations = {
    sethotelCity(state,data){
        state.hotelCity = data
    }
}
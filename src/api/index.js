import request from '@/utils/request'

// 商品
export const getGoods = params => request({ method: 'get', url: '/good', params }) // page=1  size=200
export const getRecommend = params => request({ method: 'get', url: '/good/recommend', params }) //  params:{id:3,page:1,size:10}
export const getCategory = () => request.get('category')
export const getDetail = params => request({ method: 'get', url: '/good/detail', params }) // id

// 购物车
export const getCart = () => request.get('cart')
export const putCart = data => request.put('cart', data) //  "goods_id":107, "goods_num":9
export const addCart = data => request.post('cart', data) // goods_id
export const removeCart = data => request.post('cart/remove', data) //  goods_id
export const selectAll = data => request.post('cart/selectAll', data)

// 订单

// 登陆
export const getOrder = data => request.get('order', data)
export const addOrder = data => request.post('order', data)

//  username password
export const register = data => request({ method: 'post', url: 'user/register', data })
export const login = data => request.post('user/login', data)
export const editPassword = data => request.post('user', data)
export const upload = data => request.post('user/upload', data)

// 个人信息
export const updateUserInfo = data => request.post('user/userInfo', data)

// 地址
export const createAddress = data => request.post('address', data)
export const getAddress = () => request.get('address')
export const putAddress = (id, data) => request.put(`address/${id}`, data)
export const removeAddress = (id, data) => request.delete(`address/${id}`, data)
export const setDefaultAddr = id => request.patch(`address/${id}`)

export const getCityName = () => request.get('cityName')

// export const getUserInfo = params => request({ method: 'get', url: '/userinfo', params })

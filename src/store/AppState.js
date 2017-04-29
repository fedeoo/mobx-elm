import { observable, action } from 'mobx';
import { getUser, getAddressList } from '../service/getData';
import { setStore, getStore } from '../config/mUtils';

class AppState {
  @observable latitude = ''; // 当前位置纬度
  @observable longitude = ''; // 当前位置经度
  @observable cartList = {}; // 加入购物车的商品列表
  @observable shopDetail = null; // 商家详情信息
  @observable userInfo = null; // 用户信息
  @observable shopid = null; // 商铺id
  @observable remarkText = null; // 可选备注内容
  @observable inputText = ''; // 输入备注内容
  @observable invoice = false; // 开发票
  @observable newAddress = []; // 确认订单页新的地址
  @observable searchAddress = null; // 搜索并选择的地址
  @observable geohash = 'wtw3sm0q087'; // 地址geohash值
  @observable choosedAddress = null; // 选择地址
  @observable addressIndex = null; // 选择地址的索引值
  @observable needValidation = null; // 确认订单时是否需要验证
  @observable cartId = null; // 购物车id
  @observable sig = null; // 购物车sig
  @observable orderParam = null; // 订单的参数
  @observable orderMessage = null; // 订单返回的信息
  @observable orderDetail = null; // 订单详情
  @observable login = true; // 是否登录
  @observable imgPath = null; // 头像地址
  @observable removeAddress = []; // 移除地址
  @observable addAddress = ''; // 新增地址
  @observable question = null; // 问题详情
  @observable cartPrice = null; // 会员卡价格


  @action
  RECORD_ADDRESS({
    latitude,
    longitude,
  }) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  @action
  RECORD_SHOPDETAIL(detail) {
    this.shopDetail = detail;
  }
    // 加入购物车
  @action
  ADD_CART({
      shopid,
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
      packing_fee,
      sku_id,
      stock,
    }) {
    const cart = this.cartList;
    cart[shopid] = (cart[shopid] || {});
    const shop = cart[shopid];
    shop[category_id] = (shop[category_id] || {});
    const category = shop[category_id];
    category[item_id] = (category[item_id] || {});
    const item = category[item_id];
    if (item[food_id]) {
      item[food_id].num++;
    } else {
      item[food_id] = {
        num: 1,
        id: food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock,
      };
    }
    this.cartList = { ...cart,
    };
      // 存入localStorage
    setStore('buyCart', this.cartList);
  }
    // 移出购物车
  REDUCE_CART({
      shopid,
      category_id,
      item_id,
      food_id,
      name,
      price,
      specs,
    }) {
    const cart = this.cartList;
    const shop = (cart[shopid] || {});
    const category = (shop[category_id] || {});
    const item = (category[item_id] || {});
    if (item && item[food_id]) {
      if (item[food_id].num > 0) {
        item[food_id].num--;
        this.cartList = { ...cart,
        };
          // 存入localStorage
        setStore('buyCart', this.cartList);
      } else {
          // 商品数量为0，则清空当前商品的信息
        item[food_id] = null;
      }
    }
  }
    // 网页初始化时从本地缓存获取购物车数据
  INIT_BUYCART() {
    const initCart = getStore('buyCart');
    if (initCart) {
      this.cartList = JSON.parse(initCart);
    }
  }
    // 清空当前商品的购物车信息
  CLEAR_CART(shopid) {
    this.cartList[shopid] = null;
    this.cartList = { ...this.cartList,
    };
    setStore('buyCart', this.cartList);
  }
    // 记录用户信息
  RECORD_USERINFO(info) {
    this.userInfo = info;
    this.login = true;
    const validity = 30;
    const now = new Date();
    now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
    document.cookie = `USERID=${info.user_id};expires=${now.toGMTString()}`;
    document.cookie = `${'SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw' + ';expires='}${now.toGMTString()}`;
  }
    // 获取用户信息存入vuex
  GET_USERINFO(info) {
    if (this.userInfo && (this.userInfo.username !== info.username)) {
      return;
    }
    if (!this.login) {
      return;
    }
    if (!info.message) {
      this.userInfo = { ...info,
      };
      const validity = 30;
      const now = new Date();
      now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
      document.cookie = `USERID=${info.user_id};expires=${now.toGMTString()}`;
      document.cookie = `${'SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw' + ';expires='}${now.toGMTString()}`;
    } else {
      this.userInfo = null;
    }
  }
    // 修改用户名
  RETSET_NAME(username) {
    this.userInfo = Object.assign({}, this.userInfo, {
      username,
    });
  }
    // 保存商铺id
  SAVE_SHOPID(shopid) {
    this.shopid = shopid;
  }
    // 记录订单页面用户选择的备注, 传递给订单确认页面
  CONFIRM_REMARK({
      remarkText,
      inputText,
    }) {
    this.remarkText = remarkText;
    this.inputText = inputText;
  }
    // 是否开发票
  CONFIRM_INVOICE(invoice) {
    this.invoice = invoice;
  }
    // 选择搜索的地址
  CHOOSE_SEARCH_ADDRESS(place) {
    this.searchAddress = place;
  }
    // 保存geohash
  SAVE_GEOHASH(geohash) {
    this.geohash = geohash;
    if (true) {}
  }
    // 确认订单页添加新的的地址
  CONFIRM_ADDRESS(newAddress) {
    this.newAddress.push(newAddress);
  }
    // 选择的地址
  CHOOSE_ADDRESS({
      address,
      index,
    }) {
    this.choosedAddress = address;
    this.addressIndex = index;
  }
    // 保存下单需要验证的返回值
  NEED_VALIDATION(needValidation) {
    this.needValidation = needValidation;
  }
    // 保存下单后购物id 和 sig
  SAVE_CART_ID_SIG({
      cart_id,
      sig,
    }) {
    this.cart_id = cart_id;
    this.sig = sig;
  }
    // 保存下单参数，用户验证页面调用
  SAVE_ORDER_PARAM(orderParam) {
    this.orderParam = orderParam;
  }
    // 修改下单参数
  CHANGE_ORDER_PARAM(newParam) {
    this.orderParam = Object.assign({}, this.orderParam, newParam);
  }
    // 下单成功，保存订单返回信息
  ORDER_SUCCESS(order) {
    this.cartPrice = null;
    this.orderMessage = order;
  }
    // 进入订单详情页前保存该订单信息
  SAVE_ORDER(orderDetail) {
    this.orderDetail = orderDetail;
  }
    // 退出登录
  OUT_LOGIN() {
    this.userInfo = null;
    this.login = false;
  }
    // 保存图片
  SAVE_AVANDER(imgPath) {
    this.imgPath = imgPath;
  }
    // 删除地址列表
  SAVE_ADDRESS(newAdress) {
    this.removeAddress = newAdress;
  }
    // 添加地址name
  SAVE_ADDDETAIL(addAddress) {
    this.addAddress = addAddress;
  }
    // 保存所选问题标题和详情
  SAVE_QUESTION(question) {
    this.question = { ...question,
    };
  }
    // 增加地址
  ADD_ADDRESS(obj) {
    this.removeAddress = [obj, ...this.removeAddress];
  }
    // 会员卡价格纪录
  BUY_CART(price) {
    this.cartPrice = price;
  }

  async getUserInfo() {
    const res = await getUser();
    this.GET_USERINFO(res);
  }
  async saveAddress() {
    if (this.removeAddress.length > 0) return;

    const addres = await getAddressList(this.userInfo.user_id);
    this.SAVE_ADDRESS(addres);
  }
}

export default AppState;

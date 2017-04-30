import { observable, action } from 'mobx';
import { currentcity, searchplace } from 'service/getData';
import { getStore, setStore } from 'config/mUtils';

class CityState {
  @observable inputVaule = ''; // 搜索地址
  @observable cityid = ''; // 当前城市id
  @observable cityname = ''; // 当前城市名字
  @observable placelist = []; // 搜索城市列表
  @observable placeHistory = []; // 历史搜索记录
  @observable historytitle = true; // 默认显示搜索历史头部，点击搜索后隐藏
  @observable placeNone = false; // 搜索无结果，显示提示信息

  @action mounted(cityid) {
    this.cityid = cityid;
    // 获取当前城市名字
    currentcity(this.cityid).then((res) => {
      this.cityname = res.name;
    });
    // 获取搜索历史记录
    if (getStore('placeHistory')) {
      this.placelist = JSON.parse(getStore('placeHistory'));
    }
  }

  @action.bound postpois(inputVaule) {
      // 输入值不为空时才发送信息
    if (inputVaule) {
      searchplace(this.cityid, inputVaule).then((res) => {
        this.historytitle = false;
        this.placelist = res;
        this.placeNone = !res.length;
      });
    }
  }
  /**
   * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
   * 如果没有则新增，如果有则不做重复储存
   */
  @action.bound saveHistory(index, geohash) {
    const history = getStore('placeHistory');
    const choosePlace = this.placelist[index];
    if (history) {
      let checkrepeat = false;
      this.placeHistory = JSON.parse(history);
      this.placeHistory.forEach((item) => {
        if (item.geohash === geohash) {
          checkrepeat = true;
        }
      });
      if (!checkrepeat) {
        this.placeHistory.push(choosePlace);
      }
    } else {
      this.placeHistory.push(choosePlace);
    }
    setStore('placeHistory', this.placeHistory);
  }
}

export default CityState;

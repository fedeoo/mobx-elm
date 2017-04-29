import { observable, action, computed } from 'mobx';
import { cityGuess, hotcity, groupcity } from '../../service/getData';

class HomeState {
  @observable guessCity = '';   // 当前城市
  @observable guessCityid = 1; // 当前城市id
  @observable hotcity = [];     // 热门城市列表
  @observable groupcity = {};   // 所有城市列表

  @action mounted() {
    // 获取当前城市
    cityGuess().then((res) => {
      this.guessCity = res.name;
      this.guessCityid = res.id;
    });
    // 获取热门城市
    hotcity().then((res) => {
      this.hotcity = res;
    });
    // 获取所有城市
    groupcity().then((res) => {
      this.groupcity = res;
    });
  }

  @computed get sortgroupcity() {
    const sortobj = {};
    for (let i = 65; i <= 90; i++) {
      if (this.groupcity[String.fromCharCode(i)]) {
        sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
      }
    }
    return sortobj;
  }
}

export default HomeState;

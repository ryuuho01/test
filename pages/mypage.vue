<template>
  <div>
    <div class="mypage-container">
      <div v-if="user_feedback.length !== 0" class="feedback appear">ページ下に{{user_feedback.length}}件のフィードバックのお願いがあります！</div>
    <!------------ left side ------------>
      <div v-show="display === true" class="left-side">
        <h2>予約状況</h2>
        <div v-if="reservationsCurrent[0] === undefined && display === true" class="nothing">予約はありません</div>
        <div v-for="(item, index) in reservationsCurrent" :key="item.id" class="reservation">
          <p>予約{{index+1}}</p>
          <div class="time-pic">
            <img src="/time.png" alt="画像">
          </div>
          <div class="close-pic">
            <img @click="destroy(item.id)" src="/close.png" alt="画像" data-test="delete">
          </div>
          <table>
            <tr>
              <th>Shop</th>
              <td>{{item.shop_name}}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td v-for="obj in item.reservations" :key="obj.id">{{obj.reservation_date.replace(obj.reservation_date.slice(-9),'')}}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td v-for="obj in item.reservations" :key="obj.id">{{obj.reservation_date.slice(-9).slice(0,6)}}</td>
            </tr>
            <tr>
              <th>Number</th>
              <td v-for="obj in item.reservations" :key="obj.id">{{obj.num_members}}人</td>
            </tr>
          </table>
          <div class="change">
            <button @click="modal(index+1)">変 更</button>
          </div>
        </div>
      </div>
      <!-- <CurrentReservation /> -->
    <!------------ right side ------------>
      <div v-show="display === true" class="right-side">
        <h2 class="disappear">{{userName}}さん</h2>
        <div v-if="user_feedback.length !== 0" class="feedback disappear">ページ下に{{user_feedback.length}}件のフィードバックのお願いがあります！</div>
        <p class="favorite-ttl">お気に入り店舗</p>
        <div v-if="favoriteCurrent[0] === undefined && display === true" class="nothing">お気に入り店舗はありません</div>

        <div class="shopcards">

          <div v-for="item in favoriteCurrent" :key="item.id" class="shopcard">

            <div class="shop-pic">
              <img :src="item.pic_path" alt="画像">
            </div>

            <div class="shop-des">
              <h2>{{item.shop_name}}</h2>
              <p>
                <span>#{{item.area_name}} </span>
                <span>#{{item.genre_name}} </span>
              </p>
              <div class="flex">
                <button @click="detail(item.id)" data-test="detail">詳しくみる</button>
                <div>
                  <img v-if="item.favorites === 1" @click="deleteFavorite(item.id)" src="/heart2.png" alt="画像" data-test="deletefavorite">
                  <img v-else @click="addFavorite(item.id)" src="/heart1.png" alt="画像" data-test="addfavorite">
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
    <!------------ feedback ------------>
    <Feedback />
    <!------------ modal ------------>
    <validation-observer ref="obs" v-slot="ObserverProps">
      <div id="modal" :class="vClass" @click="close2">
        <div class="modal__content">
          <div class="modal__content-inner">
            <p>【予約{{modalNumber}}の変更を行います】</p>
            <div class="change_flex">
              <table>
                <tr class="change-ttl">
                  <th colspan="2">予約{{modalNumber}}変更前</th>
                </tr>
                <tr>
                  <th>Shop</th>
                  <td>{{modalCurrent.shop_name}}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{{modalCurrent.reservations[0].reservation_date.replace(modalCurrent.reservations[0].reservation_date.slice(-9),'')}}</td>
                </tr>
                <tr>
                  <th>Time</th>
                  <td>{{modalCurrent.reservations[0].reservation_date.slice(-9).slice(0,6)}}</td>
                </tr>
                <tr>
                  <th>Number</th>
                  <td>{{modalCurrent.reservations[0].num_members}}人</td>
                </tr>
              </table>
              <div>⇨</div>
              <table>
                <tr class="change-ttl">
                  <th colspan="2">予約{{modalNumber}}変更後</th>
                </tr>
                <tr>
                  <th>Shop</th>
                  <td>{{modalCurrent.shop_name}}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>
                    <input id="reservation_date" type="date" v-model="reservationDate">
                  </td>
                </tr>
                <tr>
                  <th>Time</th>
                  <td>
                    <validation-provider rules="custom_rule:時間">
                      <select name="reservation_time" v-model="changeTime">
                        <option hidden>時間</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                      </select>
                    </validation-provider>
                  </td>
                </tr>
                <tr>
                  <th>Number</th>
                  <td>
                    <validation-provider rules="custom_rule:人数">
                      <select name="num_members" v-model="changeNumMembers">
                        <option hidden>人数</option>
                        <option>1人</option>
                        <option>2人</option>
                        <option>3人</option>
                        <option>4人</option>
                        <option>5人</option>
                        <option>6人</option>
                        <option>7人</option>
                        <option>8人</option>
                        <option>9人</option>
                        <option>10人</option>
                        <option>11人</option>
                        <option>12人</option>
                        <option>13人</option>
                        <option>14人</option>
                        <option>15人</option>
                        <option>16人</option>
                        <option>17人</option>
                        <option>18人</option>
                        <option>19人</option>
                        <option>20人</option>
                      </select>
                    </validation-provider>
                  </td>
                </tr>
              </table>
            </div>
            <div class="change_button">
              <div>
                <button :disabled="ObserverProps.invalid || !ObserverProps.validated" @click="reservation">予約変更</button>
              </div>
              <div>
                <button @click="close1">閉じる</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
    userId: number|null,
    userName: string,
    shopCurrent: Array<string|number>,
    reservationsCurrent: Array<string|number>,
    favoriteCurrent: Array<string|number>,
    vClass: string,
    modalCurrent: any,
    modalNumber: number,
    reservationDate: Date,
    changeTime:  string,
    changeNumMembers: string,

    feedback: Array<string|number>,
    user_feedback: Array<string|number>,

    display: boolean,
}
export default Vue.extend({
  data(): Data {
      return {
        userId: null,
        userName: "",
        shopCurrent: [],
        reservationsCurrent: [],
        favoriteCurrent: [],
        vClass: "modal",
        modalCurrent: {
          reservations: [{
            reservation_date: '0000-00-00 00:00:00',
            num_members: 0
          }]
        },
        modalNumber: 0,
        reservationDate: (this as any).today_set(),
        changeTime: "時間",
        changeNumMembers:"人数",

        feedback: [],
        user_feedback: [],

        display: false,
      }
  },

  beforeRouteEnter (to, from, next:any) {
    next((vm: { $auth: { loggedIn: any; }; $router: string[]; }) => {
      if (vm.$auth.loggedIn) {next();}
      else {vm.$router.push('/login');}
    })
  },

  async fetch() {
    await this.$axios
      .get(this.$config.baseURL+"/api/shop")
      .then((response) => (this.shopCurrent = response.data.data));

      if ((this as any).$auth.loggedIn) {
        this.userId = (this as any).$auth.user.id;
        this.userName = (this as any).$auth.user.name;
        // 予約のデータを取得
        let shops = [];
        for(let i=0; i < (this as any).shopCurrent.length; i++) {
          for(let j=0; j < (this as any).shopCurrent[i]["reservations"].length; j++) {
            if((this as any).shopCurrent[i]["reservations"][j]["user_id"] == this.userId) {
              shops.push((this as any).shopCurrent[i]);
            }
          }
        }
        (this as any).reservationsCurrent = shops;

        // お気に入りデータを取得
        let favorite = [];
        let count = 0;
        for(let i=0; i < (this as any).shopCurrent.length; i++) {
          for(let j=0; j < (this as any).shopCurrent[i]["favorites"].length; j++) {
            if((this as any).shopCurrent[i]["favorites"][j]["user_id"] == this.userId && (this as any).shopCurrent[i]["favorites"][j]["favorite"] == 1) {
              favorite.push((this as any).shopCurrent[i]);
              count++;
            }
          }
          if(count != 0){
            (this as any).shopCurrent[i]["favorites"] = 1;
          } else {
            (this as any).shopCurrent[i]["favorites"] = 0;
          }
        }
        (this as any).favoriteCurrent = favorite;
      }
    this.getEvaluation();
    this.display = true;
  },

  methods: {
    async getEvaluation() {
      await this.$axios
      .get(this.$config.baseURL+"/api/evaluation")
      .then((response) => ((this as any).feedback = response.data.data));
      const filtered = [];
      for (let i in (this as any).feedback) {
        let user_feedback: any = (this as any).feedback[i];
        if (user_feedback.user_id === (this as any).$auth.user.id && user_feedback.answer === 0) {
            filtered.push(user_feedback);
        }
      }
      this.user_feedback = filtered;
    },
    async getInfo() {
      await this.$axios
      .get(this.$config.baseURL+"/api/shop")
      .then((response) => (this.shopCurrent = response.data.data));
      let shops = [];
      for(let i=0; i < (this as any).shopCurrent.length; i++) {
        for(let j=0; j < (this as any).shopCurrent[i]["reservations"].length; j++) {
          if((this as any).shopCurrent[i]["reservations"][j]["user_id"] == this.userId) {
            shops.push((this as any).shopCurrent[i]);
          }
        }
      }
      (this as any).reservationsCurrent = shops;

      let favorite = [];
        let count = 0;
        for(let i=0; i < (this as any).shopCurrent.length; i++) {
          for(let j=0; j < (this as any).shopCurrent[i]["favorites"].length; j++) {
            if((this as any).shopCurrent[i]["favorites"][j]["user_id"] == this.userId && (this as any).shopCurrent[i]["favorites"][j]["favorite"] == 1) {
              favorite.push((this as any).shopCurrent[i]);
              count++;
            }
          }
          if(count != 0){
            (this as any).shopCurrent[i]["favorites"] = 1;
          } else {
            (this as any).shopCurrent[i]["favorites"] = 0;
          }
        }
        (this as any).favoriteCurrent = favorite;
    },
    destroy: async function(item_id:number){
      const $answer = window.confirm('予約を本当に取り消しますか？');
      if ($answer) {
      const reservationresData = await this.$axios.get(this.$config.baseURL+"/api/reservation");
      let reservationId = 0;
      for(let i=0; i < reservationresData.data.data.length; i++) {
          if(reservationresData.data.data[i]["user_id"] === this.userId && reservationresData.data.data[i]["shop_id"] === item_id) {
            reservationId = reservationresData.data.data[i]["id"];
          };
      }
      const deletepath = this.$config.baseURL+"/api/reservation/"+reservationId;
      await this.$axios.delete(deletepath);
      this.getInfo();
      alert("予約を取り消しました");
      } else {
        return
      }
    },

    detail: function(item_id:number) {
        this.$router.push('/detail/'+item_id);
    },

    addFavorite: async function(item_id:number) {
      if((this as any).$auth.loggedIn) {
      const favoriteData = {
        user_id: this.userId,
        shop_id: item_id,
        favorite: true,
      }
      await this.$axios
        .post(this.$config.baseURL+"/api/favorite",favoriteData);

      this.getInfo();

      } else {
        this.$router.push('/login')
      };
    },

    deleteFavorite: async function(item_id:number) {
      let favoriteId = 0;
      const favoriteresData = await this.$axios.get(this.$config.baseURL+"/api/favorite");
      for(let i=0; i < favoriteresData.data.data.length; i++) {
        if(favoriteresData.data.data[i]["user_id"] == this.userId && favoriteresData.data.data[i]["shop_id"] == item_id) {
          favoriteId = favoriteresData.data.data[i]["id"];
          break
        };
      }
      const deletepath = this.$config.baseURL+"/api/favorite/"+favoriteId;
      await this.$axios
      .delete(deletepath);

      this.getInfo();
    },

    modal: async function(item_id:number) {
      (this as any).modalCurrent = this.reservationsCurrent[item_id-1];
      this.modalNumber = item_id;
      this.reservationDate = (this as any).today_set();
      this.changeTime = "時間";
      this.changeNumMembers = "人数";
      this.vClass = "modal-open";
    },
    close1() {
      this.vClass = "modal";
    },
    close2() {
      window.addEventListener('click', (e:any) => {
        if (!e.target.closest('.modal__content-inner') && !e.target.closest('.change')) {
          this.vClass = "modal";
        }
      });
    },
    today_set() {
        var today = new Date();
        today.setDate(today.getDate());
        var yyyy = today.getFullYear();
        var mm = ("0"+(today.getMonth()+1)).slice(-2);
        var dd = ("0"+today.getDate()).slice(-2);
        return yyyy+'-'+mm+'-'+dd;
    },
    async reservation() {
      if(!(this as any).$auth.loggedIn) {
        this.$router.push('/login')
      } else {
        if((document.getElementById("reservation_date") as any).value === '') {
          alert("日付を選択して下さい");
          return
        } else if (new Date(this.reservationDate+" "+this.changeTime).getTime() < new Date().getTime()) {
          alert("現在以降の日付と時間を選択して下さい");
          return
        }
        const $answer = window.confirm('予約を本当に変更しますか？');
        if ($answer) {
          const sendreservationData = {
            user_id: (this as any).$auth.user.id,
            shop_id: this.modalCurrent.reservations[0].shop_id,
            user_name: (this as any).$auth.user.name,
            user_email: (this as any).$auth.user.email,
            shop_name: this.modalCurrent.shop_name,
            reservation_date: this.reservationDate,
            reservation_time: this.changeTime,
            num_members: this.changeNumMembers,
          };
          try {
            const put_res = await this.$axios.put(this.$config.baseURL+"/api/reservation/"+this.modalCurrent.reservations[0].id, sendreservationData);
            if( put_res.data.message === "Not found"){
              alert("システムエラーが発生しました");
              return
            }
            const jobres:any = await this.$axios.get(this.$config.baseURL+"/api/job");
            if (jobres) {
              const job_id = jobres.data.data[jobres.data.data.length - 1].id;
              const jobData = {
                job_id: job_id
              };
              await this.$axios.put(this.$config.baseURL+"/api/reservation/"+this.modalCurrent.reservations[0].id, jobData);
            }

            this.getInfo();
            alert("予約の変更が完了しました");
            this.close1();

          } catch(e:any) {
            if (e.response.data.errors.reservation_date != undefined){
              alert(e.response.data.errors.reservation_date);
              return
            } else if (e.response.data.errors.reservation_time != undefined) {
              alert(e.response.data.errors.reservation_time);
              return
            } else if (e.response.data.errors.num_members != undefined) {
              alert(e.response.data.errors.num_members);
              return
            } else {
              alert("システムエラーが発生しました");
              return
            }
          }
        } else {
          return
        }
      }
    }
  },
})
</script>


<style scoped>
.nothing {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  font-size: 20px;
}
.mypage-container {
  display: flex;
  margin: 0 105px;
}
.left-side {
  width: 37%;
  margin-right: 80px;
}
.left-side h2 {
  font-size: 20px;
  padding: 30px 0;
  margin-top: 45px;
}
.reservation {
  width: 100%;
  height: 250px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  color: white;
  position: relative;
  margin-bottom: 20px;
}
.time-pic {
  background-color: white;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 28px;
  left: 25px;
}
.time-pic img {
  width: 25px;
  height: 25px;
}
.close-pic {
  width: 21px;
  height: 21px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 28px;
  right: 27px;
}
.close-pic img {
  width: 23px;
  height: 23px;
  cursor: pointer;
}
.close-pic img:hover {
  opacity: 0.7;
  transition: 0.3s;
}

.reservation p {
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 12px;
  height: 80px;
  padding-left: 75px;
}
.reservation table {
  width: 100%;
  text-align: left;
}
.reservation table tr {
  height: 32px;
}
.reservation table th {
  font-size: 12px;
  font-weight: normal;
  width: 80px;
  vertical-align: middle;
  padding-left: 25px;
}
.reservation table td {
  font-size: 12px;
  vertical-align: middle;
}
.change {
  text-align: right;
  padding-right: 25px;
}
.change button:hover {
  cursor: pointer;
}
</style>

<style scoped>
.right-side {
  width: 55%;
}
.right-side h2 {
  font-size: 25px;
  padding: 10px 0;
}
.right-side p {
  padding: 30px 0;
  font-size: 20px;
  font-weight: bold;
}

@keyframes blink{
    0% {opacity:0;}
    100% {opacity:1;}
}
.feedback {
  color: red;
  animation:blink 1s ease-in-out infinite alternate;
}

.shopcards {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}
.shopcard {
  width: 260px;
  height: 245px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  margin-bottom: 20px;
}
.shop-pic {
  height: 130px;
  border-radius: 5px 5px 0 0;
}
.shop-pic img {
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}
.shop-des {
  width: 270px;
  height: 110px;
}
.shop-des h2 {
  padding: 15px 0 0 20px;
  font-size: 15px;
}
.shop-des p {
  padding: 7px 20px;
  font-size: 12px;
}
.shop-des button {
  border-radius: 5px;
  border: none;
  background-color: rgb(48, 93, 255);
  color: white;
  padding: 5px 13px;
  cursor: pointer;
  font-size: 12px;
}
.shop-des button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}
.flex div img {
  height: 27px;
  width: 27px;
  margin-right: 10px;
  cursor: pointer;
}
</style>

<style scoped>
.modal {
  display: none;
  position: fixed;
  left: 0%;
  top: 0%;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.5);
}
.modal-open {
  display: block;
  position: fixed;
  left: 0%;
  top: 0%;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.5);
}
.modal__content{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.modal__content-inner{
  background-color: white;
  width: 500px;
  text-align: center;
  padding: 50px;
  border-radius: 10px;
}
.modal__content-inner p {
  font-size: 20px;
}
.modal__content-inner button {
  cursor: pointer;
}

.change_flex {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}
.change-ttl {
  text-align: center;
}
.change_flex table {
  margin: 0 20px;
  text-align: left;
}
.change_flex table tr {
  height: 50px;
}
.change_flex table tr td {
  padding-left: 10px;
}
.change_button {
  cursor: pointer;
  display: flex;
  justify-content: center;
}
.change_button div {
  margin: 0 25px;
}

.error {
  color: red;
  font-size: 15px;
  padding: 5px 0;
}

.appear {
  display: none;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .appear {
    display: block;
  }
  .disappear {
    display: none;
  }
  .mypage-container {
    margin: 0 80px;
    flex-direction: column;
  }
  .left-side {
    width: 100%;
    margin: auto;
  }
  .left-side h2 {
    font-size: 20px;
    padding: 30px 0;
    margin-top: 0px;
  }
  
  .reservation p {
    font-size: 17px;
  }

  .reservation table th {
    font-size: 17px;
  }
  .reservation table td {
    font-size: 17px;
    padding-left: 40px;
  }

  .right-side {
    width: 100%;
  }
  .favorite-ttl {
    width: 100%;
  }
  .shopcard {
    width: 240px;
  }

  .flex div img {
    margin-right: 25px;
  }
}
</style>
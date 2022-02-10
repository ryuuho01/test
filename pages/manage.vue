<template>
  <div class="flex">
    <div>
      <AddingManager v-if="$auth.user !== null && $auth.user.authority === 0" />
      <JobTest v-if="$auth.user !== null && $auth.user.authority === 0" />
    </div>
    <ShopCreate v-if="$auth.user !== null && $auth.user.authority === 1 && $auth.user.shop_id === null" />
    <EdittingShop v-if="$auth.user !== null && $auth.user.authority === 1 && $auth.user.shop_id !== null" />
    <SendingEmail />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return{
    }
  },
  beforeRouteEnter (to, from, next:any) {
    next((vm: { $auth: { user: any; }; $router: string[]; }) => {
      if (vm.$auth.user !== null && (vm.$auth.user.authority === 0 || vm.$auth.user.authority === 1)) {
        next();
      } else {
        vm.$router.push('/');
      }
    })
  },
  methods: {
  },
})
</script>

<style scoped>
.flex {
  /* width: 1240px; */
  margin: auto;
  display: flex;
  justify-content: center;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .flex {
    flex-direction: column;
  }
}
</style>
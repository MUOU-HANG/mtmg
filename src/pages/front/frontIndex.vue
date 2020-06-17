<template>
  <div>
    <the-header @toggle-open="toggleOpen"></the-header>
    <div class="main">
      <router-view></router-view>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import nav from '../front/nav.vue'
export default {
  data() {
    return {
      activeIndex: '',
      msg:'111111'
    }
  },
  components:{
    'the-header': nav
  },
  methods: {
     toggleOpen(index) {
      if (index == 1) {
        this.$router.push("/frontHome");
      }
    }
  }
}
</script>

<style>
.card{
  width: 500px;
  height: 60px;
  position: absolute;
  top:20px;left:600px;
}
</style>



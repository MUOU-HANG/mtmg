<template>
  <div class="header">
     
    <div class="header_border">
      <h1 class="h1">2019级新生军训</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "2019级新生军训"
    };
  },
  methods: {
    info() {
      this.$router.push("/student");
    }
  }
};
</script>

<style>
.header_border h1 {
  margin: 200px auto;
  width: 420px;
  font-size: 50px;
  padding: 20px;
  border-top:5px solid white;
  border-bottom:5px solid white;
  color:white;
}

</style>



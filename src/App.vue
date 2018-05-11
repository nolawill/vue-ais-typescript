<template>
  <div>
    <h1 v-if="flag">Split.io feature flag works!</h1>
    <ais-index
      app-id="latency"
      api-key="3d9875e51fbd20c7754e65422f7ce5e1"
      index-name="bestbuy"
      >
      <ais-search-box></ais-search-box>
      <ais-results>
        <template slot-scope="{ result }">
          <h2>
            <ais-highlight :result="result" attribute-name="name"></ais-highlight>
          </h2>
        </template>
      </ais-results>
    </ais-index>
  </div>
</template>

<script>
export default {
  props: ["splitio"],
  data: function() {
    return {
      flag: false
    };
  },
  created() {
    const searchBar = this.splitio.getTreatment("search-bar");
    console.log("searchBar flag is: " + searchBar);
    if (searchBar == "on") {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

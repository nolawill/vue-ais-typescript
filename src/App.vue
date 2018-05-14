<template>
  <div>
    <h1 v-if="splitState != 'loading'">Split.io feature flag works! treatments are: {{ splitFlags }}</h1>
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
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["splitState", "splitFlags"])
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

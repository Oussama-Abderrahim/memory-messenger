<template>
  <v-text-field light
    classs="search-bar"
    flat
    label="Solo"
    placeholder="Mot, phrase ou synonyme"
    solo
    append-icon="search"
    v-model='query'
  ></v-text-field>
</template>


<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    search() {
      console.log(query)
    }
  }

}  
</script>


<style <style lang="scss" scoped>
.search-bar {
  width: 100%;
}
</style>

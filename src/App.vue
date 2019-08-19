<template>
  <div id="app">
    <navbar @search="getSearch"/>
    <div class="container">
      <router-view :api="api" :params="params" />
    </div>
  </div>
</template>

<script>
const md5 = require('js-md5');
import navbar from './components/navbar';
import {keys} from './clave.json';

export default {
  components:{
    navbar
  },
  data(){
    return{
      params:{limit:0,page:0,offset:0,search:''},
      api:{}
    }
  },
  methods:{
    getParams(){
      let {page,limit} = this.$route.query;
      this.params.page = page?page:1;
      this.params.limit = limit?limit:5;
      this.params.offset = (this.params.page-1) * this.params.limit;
    },
    getApi(){
      var api = keys;

      const time = Date.now();
      const hash = md5(time+api.privateKey+api.publicKey);
      api.time = time;
      api.hash = hash;
      this.api = api;
    },
    getSearch(value){
      this.params.search=value.trim();
      this.getParams();
    }
  },
  watch:{
    '$route'(){
      this.getParams();
    }
  },
  created(){
    this.getParams();
    this.getApi();
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body{
  background-color: rgb(241, 241, 241);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

.container{
  padding: 2rem;
  width: 100%;
}

.shadow-sm{
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
}

.shadow{
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
}
</style>

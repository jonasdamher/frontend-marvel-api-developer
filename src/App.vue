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
      this.params.limit = limit?limit:10;
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
  background-color: #ecf0f1;
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
  padding: 0;
  width: 100%;
}

.shadow-sm{
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
}

.shadow{
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
}

#list-comics{
  width: 100%;
  height: 1200px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: space-between;
  align-items: flex-start;
}

#list-comics .card{
  margin: 1%;
  width: 18%;
  height: auto;
}

.img-comics{
    border-radius: .15rem;
    width: 100%;
}

.card-body{
  padding: 0.75rem;
  text-align: center;
}

.card-body a{
  text-decoration: none;
  color:rgb(58, 58, 58);
  font-weight: bold;
}

.card-body a:hover{
  color:rgb(114, 114, 114);
}
</style>

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
      this.params.limit = limit?limit:20;
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

@font-face {
  font-family: VarelaRoundRegular;
  src: url('assets/fonts/VarelaRound-Regular.ttf');
}

body{
  background-color: #ecf0f1;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #222;
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

#list-comics{
  width: 100%;
  height: 1124px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: space-between;
}

#list-comics .card{
  width: 13%;
  height: auto;
}

.card-content-img{
  display: block;
  position: relative;
}

.img-comics{
    border-radius: .15rem;
    width: 100%;
}

.card-body{
  padding: 1rem;
  text-align: center;
}

.card-body a{
  text-decoration: none;
  color: #222;
  font-weight: bold;
  font-family: VarelaRoundRegular;
}

.card-body a:hover{
  color:rgb(114, 114, 114);
}

@media (max-width: 1440px) {
  #list-comics{
    height: 1000px;
  }
  #list-comics .card{
    width: 12%;
  }
}

@media (max-width: 1024px) {
  #list-comics{
    height: 1420px;
  }

  #list-comics .card{
    width: 18%;
  }
}

@media (max-width: 768px) {
  #list-comics{
    height: 1743px;
  }

  #list-comics .card{
    width: 23%;
  }
}

@media (max-width: 425px) {
  #list-comics{
    height: auto;
  }

  #list-comics .card{
    width: 100%;
  }
}

.card-fade:hover .bg-fade{
  position: absolute;
  left: 0;
  right: 0;
  top:0;
  bottom: 3px;
  background-color: rgba(34, 34, 34, 0.185);
  border-radius: .15rem;
  transition: .5s;
}
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparents; 
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #555555; 
}
</style>

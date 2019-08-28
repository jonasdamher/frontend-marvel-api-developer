<template>
  <div class="home">
    
    <div id="list-comics">

      <div class="card" v-for="comic in comics" :key="comic.id">
        <router-link v-if="comic" :to="'/comics/details/' + comic.id">
          <img class="img-comics shadow-sm" :src="comic.thumbnail.path+'.'+comic.thumbnail.extension" alt="comic" />
        </router-link>
        <div class="card-body">
          <router-link :to="'/comics/details/' + comic.id">{{comic.variantDescription?comic.variantDescription:comic.title}}</router-link>
        </div>
      </div>

      <div class="card shadow-sm" v-if="error">
        <div class="card-body">
          <p>{{error}}</p>
        </div>
      </div>
      
    </div>

    <pagination :pageParams="pageParams"/>

  </div>
</template>

<script>

import pagination from '../components/pagination';

export default {
  name: 'comics',
  components:{
    pagination
  },
  data(){
    return {
      error:'',
      comics: [],
      pageParams: {total:0,page:0}
    }
  },
  props:{
    params: {type:Object},
    api: {type:Object}
  },
  methods:{
    getComics(){
      const url = 'http://gateway.marvel.com/v1/public/comics?ts='+this.api.time+'&apikey='+this.api.publicKey+'&hash='+this.api.hash+'&offset='+this.params.offset+'&limit='+this.params.limit+(this.params.search.length>0?'&title='+this.params.search:'');

      this.axios.get(url)
      .then(res =>{
        let resultado = res.data.data.results;

        this.comics=resultado;
        this.pageParams.total = Math.ceil(res.data.data.total/this.params.limit);
        this.pageParams.page = this.params.page;
      })
      .catch(err =>{
        this.error=err;
      });
    }
  },
  watch:{
    '$route'(){
      this.getComics();
    },
    'params.search'(){
      this.getComics();
    }
  },
  mounted(){
    this.getComics();
  }
}

</script>

<style scoped>
#home{
  width: 100%;
}

</style>
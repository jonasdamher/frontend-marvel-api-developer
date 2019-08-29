<template>
  <div id="AllCharacters">
    
    <div id="list-comics">

      <div class="card card-fade" v-for="character in characters" :key="character.id">
        <router-link class="card-content-img" v-if="character" :to="'/characters/' + character.id">
          <div class="bg-fade"></div>
          <img class="img-comics shadow-sm" :src="character.thumbnail.path+'.'+character.thumbnail.extension" alt="character" />
        </router-link>
        <div class="card-body">
          <router-link :to="'/characters/' + character.id">{{character.name}}</router-link>
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
  name: 'AllCharacters',
  components:{
    pagination
  },
  data(){
    return {
      error:'',
      characters: [],
      pageParams: {total:0,page:0,url:'characters'}
    }
  },
  props:{
    params: {type:Object},
    api: {type:Object}
  },
  methods:{
    getcharacters(){
      const url = 'http://gateway.marvel.com/v1/public/characters?ts='+this.api.time+'&apikey='+this.api.publicKey+'&hash='+this.api.hash+'&offset='+this.params.offset+'&limit='+this.params.limit+(this.params.search.length>0?'&title='+this.params.search:'');

      this.axios.get(url)
      .then(res =>{
        let resultado = res.data.data.results;

        this.characters=resultado;
        console.log(resultado);
        this.pageParams.total = Math.ceil(res.data.data.total/this.params.limit);
        this.pageParams.page = this.params.page;
        this.pageParams.url = '/characters';
      })
      .catch(err =>{
        this.error=err;
      });
    }
  },
  watch:{
    '$route'(){
      this.getcharacters();
    },
    'params.search'(){
      this.getcharacters();
    }
  },
  mounted(){
    this.getcharacters();
  }
}

</script>

<style scoped>
#home{
  width: 100%;
}

</style>
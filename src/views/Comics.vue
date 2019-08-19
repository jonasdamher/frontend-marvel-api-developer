<template>
  <div class="home">
    
    <div id="list-comics">

      <div class="card shadow-sm" v-for="comic in comics" :key="comic.id">
        <router-link :to="'/comics/details/' + comic.id">
          <img class="img-comics" :src="comic.thumbnail.path+'.'+comic.thumbnail.extension" alt="comic" />
        </router-link>
        <div class="card-body">
          <router-link :to="'/comics/details/' + comic.id">{{comic.variantDescription?comic.variantDescription:comic.title}}</router-link>
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
      comics: [],
      pageParams: {total:0,page:0}
    }
  },
  props:{
    params: {type:Object,required:true},
    api: {type:Object,required:true}
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
        this.comics=err;
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

#list-comics{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.card{
  margin: .5rem;
  max-width: 300px;
  height: 100%;
  border-radius: .15rem;
  background-color: #ffffff;
}

.img-comics{
  width: 100%;
  border-top-left-radius: .15rem;
  border-top-right-radius: .15rem;
}

.card-body{
  padding: 1rem;
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
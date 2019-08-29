<template>
  <div id="AllCreators">
    
    <div id="list-comics">

      <div class="card card-fade" v-for="creator in creators" :key="creator.id">
        <router-link class="card-content-img" v-if="creator" :to="'/creators/' + creator.id">
          <div class="bg-fade"></div>
          <img class="img-comics shadow-sm" :src="creator.thumbnail.path+'.'+creator.thumbnail.extension" alt="creator" />
        </router-link>
        <div class="card-body">
          <router-link :to="'/creators/' + creator.id">{{creator.fullName}}</router-link>
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
  name: 'AllCreators',
  components:{
    pagination
  },
  data(){
    return {
      error:'',
      creators: [],
      pageParams: {total:0,page:0,url:''}
    }
  },
  props:{
    params: {type:Object},
    api: {type:Object}
  },
  methods:{
    getcreators(){
      const url = 'http://gateway.marvel.com/v1/public/creators?ts='+this.api.time+'&apikey='+this.api.publicKey+'&hash='+this.api.hash+'&offset='+this.params.offset+'&limit='+this.params.limit+(this.params.search.length>0?'&title='+this.params.search:'');

      this.axios.get(url)
      .then(res =>{
        let resultado = res.data.data.results;

        this.creators=resultado;
        console.log(resultado);
        this.pageParams.total = Math.ceil(res.data.data.total/this.params.limit);
        this.pageParams.page = this.params.page;
        this.pageParams.url = '/creators';
      })
      .catch(err =>{
        this.error=err;
      });
    }
  },
  watch:{
    '$route'(){
      this.getcreators();
    },
    'params.search'(){
      this.getcreators();
    }
  },
  mounted(){
    this.getcreators();
  }
}

</script>

<style scoped>
#home{
  width: 100%;
}

</style>
<template>
  <div class="about">
    
    <h1>{{creator.fullName}}</h1>
    <img class="img-comics" :src="creator.thumbnail.path+'.'+creator.thumbnail.extension" alt="creator" />
    
    <h2>Comics</h2>

    <div id="list-comics">
      <div class="card shadow-sm" v-for="comic in creator.comics.items" :key="comic.name">
        <div class="card-body">
          <router-link :to="'/comics/details/' + comic.resourceURI.split('/')[6]">{{comic.name}}</router-link>
        </div>
      </div>
    </div>
    <a :href="creator.urls[0].url" target="blank">Detalles sobre {{creator.fullName}}</a>

  </div>
</template>


<script>
export default {
  name: 'general',
  data(){
    return {
      creator:[]
    }
  },
  props:{
    api: {type:Object}
  },
  mounted(){

    const url = 'http://gateway.marvel.com/v1/public/creators/'+this.$route.params.id+'?ts='+this.api.time+'&apikey='+this.api.publicKey+'&hash='+this.api.hash;
    
    this.axios.get(url)
    .then(res =>{
      this.creator = res.data.data.results[0];
    })
    .catch(err =>{
      this.creator = resultado;
    });
  }
}

</script>

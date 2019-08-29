<template>
  <div id="Creators">
    
    <h1>{{creator.fullName}}</h1>
    <img class="img-comics" :src="creator.image" alt="Creator" />
    <a :href="creator.urlOficial" target="blank">Detalles sobre {{creator.fullName}}</a>
    <h2>Comics</h2>

    <div id="list-comics">
      <div class="card shadow-sm" v-for="comic in comics" :key="comic.resourceURI">
        <div class="card-body">
          <router-link :to="'/comics/details/' + comic.resourceURI.split('/')[6]">{{comic.name}}</router-link>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: 'Creators',
  data(){
    return {
      creator:[],
      comics:[]
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
      this.creator.urlOficial = this.creator.urls[0].url;
      this.creator.image = this.creator.thumbnail.path+'.'+this.creator.thumbnail.extension;
      this.comics = this.creator.comics.items;
   })
    .catch(err =>{
      this.creator = resultado;
    });
  }
}

</script>

<style scoped>
#list-comics{
  height: 528px;
}

#list-comics .card {
  margin: 1%;
  width: 19%;
  background-color:#ffffff;
}
</style>
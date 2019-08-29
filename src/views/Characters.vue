<template>
  <div id="Characters">
    
    <h1>{{character.name}}</h1>
    <img class="img-comics" :src="character.image" alt="Character" />
    <a :href="character.urlOficial" target="blank">Detalles sobre {{character.name}}</a>
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
  name: 'Characters',
  data(){
    return {
      character:[],
      comics:[]
    }
  },
  props:{
    api: {type:Object}
  },
  mounted(){

    const url = 'http://gateway.marvel.com/v1/public/characters/'+this.$route.params.id+'?ts='+this.api.time+'&apikey='+this.api.publicKey+'&hash='+this.api.hash;
    
    this.axios.get(url)
    .then(res =>{
      this.character = res.data.data.results[0];
      console.log(this.character);
      this.character.urlOficial = this.character.urls[0].url;
      this.character.image = this.character.thumbnail.path+'.'+this.character.thumbnail.extension;
      this.comics = this.character.comics.items;
   })
    .catch(err =>{
      this.character = resultado;
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
<template>
  <div class="about">
    <h1>{{comic.variantDescription?comic.variantDescription:comic.title}}</h1>
    <p v-if="comic.issueNumber">Nº {{comic.issueNumber}}</p> 
    <img class="img-comics" :src="comic.thumbnail.path+'.'+comic.thumbnail.extension" alt="comic" />
    <p>{{comic.description}}</p> 

    <a :href="comic.urls[0].url" target="blank">Detalles en la página oficial</a>
    <div v-if="comic.characters.items.length > 0">
      <p>Personajes</p>
      <ul>
        <li v-for="character in comic.characters.items" :key="character.name">
          <router-link :to="'/characters/' +character.resourceURI.split('/')[6]">{{character.name}}</router-link>
        </li>
      </ul>
    </div>
    <p>Creadores</p>
    <ul>
      <li v-for="creator in comic.creators.items" :key="creator.name">
        <router-link :to="'/creators/' +creator.resourceURI.split('/')[6]">{{creator.name}} -- Rol : {{creator.role}}</router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import { scrypt } from 'crypto';
const md5 = require('js-md5');

export default {
  name: 'details',
  data(){
    return {
      comic:[],
    }
  },
  props:{
    params: {type:Object,required:true},
    api: {type:Object,required:true}
  },
  mounted(){
    
    let id = this.$route.params.id;

    const url = 'http://gateway.marvel.com/v1/public/comics?ts='+this.api.time+'&apikey='+this.api.publicKey+'&hash='+this.api.hash+'&id='+id;
    
    this.axios.get(url)
    .then(res =>{
      let resultado = res.data.data.results[0];
      this.comic=resultado;
    })
    .catch(err =>{
      let resultado = err;
    });
  }
}

</script>

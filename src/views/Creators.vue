<template>
  <div class="about">
    
    <h1>{{creator.fullName}}</h1>
    <img class="img-comics" :src="creator.thumbnail.path+'.'+creator.thumbnail.extension" alt="creator" />
    <a :href="creator.urls[0].url" target="blank">Detalles sobre {{creator.fullName}}</a>
    
    <p>Comics</p>

    <div id="list-comics">
      <div class="card" v-for="comic in creator.comics.items" :key="comic.name">
        <div class="card-body">
          <router-link :to="'/comics/' + comic.resourceURI.split('/')[6]">{{comic.name}}</router-link>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { scrypt } from 'crypto';
const md5 = require('js-md5');

export default {
  name: 'general',
  data(){
    return {
      creator:[]
    }
  },
  created(){
    
    let id = this.$route.params.id;

    const api = {
      publicKey: '6f21f91bae9af1c91346291267b2fe79',
      privateKey: '93093ddfbf7a57dc2e5494e46f43a6f0e6de98bd'
    }

    var time = Date.now();

    const hash = md5(time+api.privateKey+api.publicKey);
    const url = 'http://gateway.marvel.com/v1/public/creators/'+id+'?ts='+time+'&apikey='+api.publicKey+'&hash='+hash;
    
    this.axios.get(url)
    .then(res =>{
      let resultado = res.data.data.results[0];
      this.creator=resultado;
      console.log(resultado);
    })
    .catch(err =>{
      console.log(err);
    });
  }
}

</script>

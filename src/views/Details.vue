<template>
  <div class="content">
    <span class="number-comic" v-if="comic.issueNumber">nº {{comic.issueNumber}}</span> 
    <div class="main-content">
      <img class="img-comic" :src="comic.thumbnail.path+'.'+comic.thumbnail.extension" alt="comic" />
      <div class="card content-text shadow-sm">
        <div class="card-body">
          <h1 class="h1">{{comic.variantDescription?comic.variantDescription:comic.title}}</h1>
          <p class="f-start-self">{{comic.description}}</p> 
          <a class="f-start-self" :href="comic.urls[0].url" target="blank">Detalles en la página oficial</a>
          <div class="f-start-self" v-if="comic.characters.items.length > 0">
            <p>Personajes</p>
            <ul>
              <li v-for="character in comic.characters.items" :key="character.name">
                <router-link :to="'/characters/' +character.resourceURI.split('/')[6]">{{character.name}}</router-link>
              </li>
            </ul>
          </div>
          <div class="f-start-self" v-if="comic.creators.items.length > 0">
            <p>Creadores</p>
            <ul>
              <li v-for="creator in comic.creators.items" :key="creator.name">
                <router-link :to="'/creators/' +creator.resourceURI.split('/')[6]">{{creator.name}} -- Rol : {{creator.role}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
     <div class="card shadow-sm" v-if="error">
        <div class="card-body">
          {{error}}
        </div>
      </div>
  </div>
</template>


<script>

export default {
  name: 'details',
  data(){
    return {
      comic:[],
      error:''
    }
  },
  props:{
    api: Object
  },
  mounted(){
    const id = this.$route.params.id;
    const url = 'http://gateway.marvel.com/v1/public/comics?ts='+this.api.time+'&apikey='+this.api.publicKey+'&hash='+this.api.hash+'&id='+id;
    
    this.axios.get(url)
    .then(res =>{
      this.comic = res.data.data.results[0];
    })
    .catch(err =>{
      this.error = err;
    });
  }
}

</script>

<style scoped>
.main-content{
  display: flex;
}

.img-comic{
  width: 300px;
}

.number-comic{
  padding: 0.4rem;
  background-color: brown;
  color:#fff;
  font-weight:400;
}

.content-text{
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

.h1{
  margin-bottom: .5rem;
}

.f-start-self{
  align-self: flex-start;
}

</style>
<template>
  <div id="pagination">
    <ul>
      <li v-for="paginacion in pagination" :key="paginacion.texto">
        <router-link :to="'/?page='+paginacion.numero" class="shadow-sm" :disabled="paginacion.status" :class="{active: paginacion.numero==page && typeof paginacion.texto != 'string'}">{{paginacion.texto}}</router-link>
      </li>
    </ul>
    <p class="text-right">Páginas encontradas: {{pageParams.total}}</p>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  data(){
    return {
      page:0
    }
  },
  props:{
    pageParams: Object
  },
  computed:{
    pagination(){
      this.page = this.pageParams.page;
      let page = --this.pageParams.page;

      var resultados = [];

      if(page==0){
        resultados.push({numero:++page,texto:'<<'});
        resultados.push({numero:page,texto:page});
        
      }else if(page>0){
        resultados.push({numero:page,texto:'<<'});
        resultados.push({numero:page,texto:page});
      }

      for (let i = 0; i < 2; i++) {
        if(i==1 && this.pageParams.total==this.page){
          resultados.push({numero:++page,texto:page,status:true});
        }else{
          resultados.push({numero:++page,texto:page});
        }
      }

      resultados.push({numero:page,texto:'>>',status:false});

      return resultados;
    }
  }
}

</script>

<style scoped>

#pagination ul{
  display: flex;
  justify-content: flex-end;
  list-style: none;
}

#pagination ul li a:disabled {
  background-color: rgb(182, 182, 182);
}

#pagination ul li{
  margin: 0.5rem;
  display: block;
  background-color: #fff;
}

#pagination ul li:hover{
  background-color: #5eddc4;
}

#pagination ul li a{
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: #222;
  font-weight: bold;
  display: block;
  border-radius: .15rem;
}

#pagination ul li .active{
  background-color: #1abc9c;
}

#pagination ul li .active {
  color:#fff;
}

#pagination ul li .active:hover{
  background-color: #16a085;
}

.text-right{
  text-align: right;
}

</style>

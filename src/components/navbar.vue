<template>
  <nav id="navbar" class="shadow">
    <div class="nav-navbar">
      <div class="form">
          <input class="form-ipt" type="text" @keyup.enter="$emit('search', search)" v-model="search" placeholder="Buscar..." />
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name:'navbar',
  data(){
    return{
      search:''
    }
  }
}

</script>

<style scoped>

#navbar {
  background-color: #3f64e0;
}

.nav-navbar{
  padding: 1rem 2rem;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form{
    max-width: 300px;
}

.form-ipt{
  width: 100%;
  padding: .5rem;
  border:0;
  border-radius: 0.15rem;
}

</style>
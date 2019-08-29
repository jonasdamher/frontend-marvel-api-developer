<template>
  <nav id="navbar">
    <div class="nav-navbar">
      <div class="nav-list">
        <div class="brand">
          <router-link :to="'/'"><span>Vira</span>Comics</router-link>
        </div>
        <ul>
          <li>
            <router-link :to="'/'">Comics</router-link>
          </li>
          <li>
            <router-link :to="'/characters'">Personajes</router-link>
          </li>
          <li>
              <router-link :to="'/creators'">Creadores</router-link>
          </li>
        </ul>
      </div>
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
.nav-navbar{
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-list{
  display: flex;
  align-items: center;
}

.nav-list .brand{
  padding-right: 1rem;
}

.nav-list .brand a{
  text-decoration: none;
  color: #222;
  font-size: 1.5rem;
  font-family: VarelaRoundRegular;
  cursor: pointer;
}

.nav-list .brand a:hover{
   color: #303030;
}

.nav-list .brand a span{
  color: #e67e22;
}

.nav-list ul{
  display: flex;
  list-style: none;
}

.nav-list ul li{
  padding: 0 .5rem;
}

.nav-list ul li a{
  text-decoration: none;
  color: #222;
  font-weight: bold;
}

.nav-list ul li a.router-link-exact-active, .nav-list ul li a.router-link-active{
  text-decoration: none;
  color: #e67e22;
  font-weight: bold;
}

.form{
  max-width: 300px;
}

.form-ipt{
  width: 100%;
  padding: .5rem 1rem;
  border:0;
  border-radius: 2rem;
  color: #555555;
  background: transparent;
  border: 1px solid #555555;
  outline: none;
}

.form-ipt:focus{
  border: 1px solid #e67e22;
}

.form-ipt::placeholder{
  color: #555555;
}

</style>
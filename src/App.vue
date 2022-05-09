<template>
  <div id="app">
    
    <div class="container mt-5">
      <form class="d-flex justify-content-center align-items-center" action="">
        <input type="text" v-model="searchText" >
        <button @click.prevent="searchMovie" class="mx-3 p-1">Cerca</button>
      </form>

    </div>
    <!-- /.container -->
   

  </div>
</template>

<script>
//importo axios nel tag script 
import axios from "axios"; 

export default {
  name: 'App',
  components: {
    
  },
  data(){
    return {
      url:'https://api.themoviedb.org/3/search/movie?api_key=a10bb2f450a66787dd09fbc8afd56539&language=it-IT&page=1&include_adult=false&query=matrix',
      movies: null,
      loading: true,
      error: null,
      searchText: ''

    };
  },
  methods:{
    searchMovie(){
      /* console.log('Searching...'); */
      console.log(this.searchText);
    },
    callApi(){
      axios.get(this.url).then(response => {
        console.log(this);
        console.log(response);

        this.movies = response.data.response
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  mounted(){
            this.callApi(); 
        },
}
</script>

<style lang="scss">
/* importo lo stile */
  @import '@/assets/scss/style.scss';
  
  
  form{
    background-color: aquamarine;
    height: 100px;

  }
</style>

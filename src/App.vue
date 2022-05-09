<template>
  <div id="app">
    
    <div class="container mt-5">
      <form class="d-flex justify-content-center align-items-center" action="">
        <input type="text" v-model="searchText" >
        <button @click.prevent="callApi" class="mx-3 p-1">Cerca</button>
      </form>

      <div class="list">
        <ul v-for="movie in movies" :key="movie.id">
          <li class="title">{{movie.title}}</li>
          <li class="original_title">{{movie.original_title}}</li>
          <li class="language">{{movie.original_language}}</li>
          <li class="vote">{{movie.vote_average}}</li>
        </ul>
      </div> 

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
      
      url:'https://api.themoviedb.org/3/search/movie?api_key=a10bb2f450a66787dd09fbc8afd56539&language=it-IT&page=1&include_adult=false&query=',
      searchText: '',
      movies: null,
      error: null  
    };
  },
  methods:{
    /* searchMovie(){
      console.log('Searching...'); 
      console.log(this.searchText);
    }, */
    callApi(){
      axios
        // richiesta
        .get(this.url + this.searchText)
      
        // risposta
        .then(response => {
          console.log(this);
          console.log(response);
          this.movies = response.data.results
          this.searchText = '';
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

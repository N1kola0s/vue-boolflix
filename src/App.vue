<template>
  <div id="app">
    
    <div class="container mt-5">
      <form class="d-flex justify-content-center align-items-center" action="">
        <input type="text" v-model="searchText" >
        <button @click.prevent="callApi" class="mx-3 p-1">Cerca</button>
      </form>

      <!-- film -->
      <div class="list">
        <ul v-for="movie in movies" :key="movie.id">
          <li class="title">{{movie.title}}</li>
          <li class="original_title">{{movie.original_title}}</li>
          <li>{{movie.original_language}} <flag :iso = "countryFilter(movie.original_language)"></flag></li>
          <li class="vote">{{movie.vote_average}}</li>
        </ul>
      </div> 

        <!-- serieTv -->
       <div class="list">
        <ul v-for="serie in series" :key="serie.id">
          <li class="title">{{serie.name}}</li>
          <li class="original_title">{{serie.original_name}}</li>
          <li>{{serie.original_language}} <flag :iso = "countryFilter(serie.original_language)"></flag></li>
          <li class="vote">{{serie.vote_average}}</li>
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
      
      urlFilm:'https://api.themoviedb.org/3/search/movie?api_key=a10bb2f450a66787dd09fbc8afd56539&language=it-IT&page=1&include_adult=false&query=?',
      urlTv:'https://api.themoviedb.org/3/search/tv?api_key=a10bb2f450a66787dd09fbc8afd56539&language=it-IT&page=1&include_adult=false&query=?',
      searchText: '',
      movies: null,
      series:null,
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
        .get(this.urlFilm + this.searchText)
      
        // risposta
        .then(response => {
          console.log(this);
          console.log(response);
          this.movies = response.data.results
          this.searchText = '';
      })
      .catch(error => {
        console.log(error);
      }),
      axios
        // richiesta
        .get(this.urlTv + this.searchText)
      
        // risposta
        .then(response => {
          console.log(this);
          console.log(response);
          this.series = response.data.results
          this.searchText = '';
      })
      .catch(error => {
        console.log(error);
      })
      
    },
    //creo metodo che mi restituisca la bandiera in caso di mancata corrispondenza
    countryFilter(flagLanguage){
      if(flagLanguage == 'en'){
        return flagLanguage = 'gb'
      } else {
        return flagLanguage
      }

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

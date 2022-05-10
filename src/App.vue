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
          <li v-if="movie.poster_path!= null"><img :src=" 'https://image.tmdb.org/t/p/w500/' + movie.poster_path" alt="poster film"></li>
          <li class="no_image" v-else>IMAGE NOT FOUND</li>
          <li class="title">{{movie.title}}</li>
          <li class="original_title">{{movie.original_title}}</li>
          <li>{{movie.original_language}} <flag :iso = "countryFilter(movie.original_language)"></flag></li>
          <li class="vote">{{Math.round((movie.vote_average) / 2)}} <font-awesome-icon class="vote_star" icon="fa-solid fa-star" /></li>
        </ul>
      </div> 

        <!-- serieTv -->
       <div class="list">
        <ul v-for="serie in series" :key="serie.id">
          <li v-if="serie.poster_path!= null"><img :src=" 'https://image.tmdb.org/t/p/w500/' + serie.poster_path" alt="poster film"></li>
          <li class="no_image" v-else>IMAGE NOT FOUND</li>
          <li class="title">{{serie.name}}</li>
          <li class="original_title">{{serie.original_name}}</li>
          <li>{{serie.original_language}} <flag :iso = "countryFilter(serie.original_language)"></flag></li>
          <li class="vote">{{Math.round((serie.vote_average) / 2)}}
            <!-- <font-awesome-icon icon="fa-solid fa-star" :class= "Math.round((serie.vote_average) / 2) >= 1 ? 'd-block' : 'd-none'"/>

            <font-awesome-icon icon="fa-solid fa-star" :class= "Math.round((serie.vote_average) / 2) >= 2 ? 'd-block' : 'd-none'"/>

            <font-awesome-icon icon="fa-solid fa-star" :class= "Math.round((serie.vote_average) / 2) >= 3 ? 'd-block' : 'd-none'"/>

            <font-awesome-icon icon="fa-solid fa-star" :class= "Math.round((serie.vote_average) / 2) >= 4 ? 'd-block' : 'd-none'"/>

            <font-awesome-icon icon="fa-solid fa-star" :class= "Math.round((serie.vote_average) / 2) >= 5 ? 'd-block' : 'd-none'"/> -->

            <font-awesome-icon icon="fa-solid faStarBlack" />
            <font-awesome-icon icon="fa-regular faStarNoBlack" />
            




            <!-- <font-awesome-icon icon="fa-solid fa-star" v-if = "(Math.round((serie.vote_average) / 2) >= 2)"/>
            <font-awesome-icon icon="fa-solid fa-star" v-if = "(Math.round((serie.vote_average) / 2) >= 3)"/>
            <font-awesome-icon icon="fa-solid fa-star" v-if = "(Math.round((serie.vote_average) / 2) >= 4)"/>
            <font-awesome-icon icon="fa-solid fa-star" v-if = "(Math.round((serie.vote_average) / 2) >= 5)"/> -->

            
          </li>
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
      urlImg:'',
      searchText: '',
      movies: null,
      series:null,
      error: null,
      
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

  .no_image{

    background-color: black;
    color:white;
    display:flex;
    justify-content: center;
    align-items: center;
    height:498px;
    width: 500px;
    font-size: 2rem;
    font-weight: bold;

  }

  .vote_star{
    color: yellow;
  }

</style>

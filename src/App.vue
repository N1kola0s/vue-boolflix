<template>
  <div id="app">

    <header id="site_header">
      <nav class="d-flex align-items-center justify-content-between h-100">
        <div class="logo">
          <img src="./assets/logo_nettflaex.png" alt="logo_nettflaex">
        </div>
        <!-- /.logo -->

        <form class="d-flex justify-content-center align-items-center h-25">
          <input type="text" v-model="searchText" class="d-flex align-items-center border-0 px-2" >
          <button @click.prevent="callApi" class=" mx-1 h-75 d-flex align-items-center justify-content-center text-white">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="px-2" /> 
          </button>
        </form>
      </nav>
    </header>
    <!-- /#site_header -->

    <main id="site_header">
      <div class="container my-5">
        <div class="row row-cols-6 g-3">
          <div class="col gap-3" v-for="movie in movies" :key="movie.id">

            <div class="card border-0">
              
                <img class="card-img-top" v-if="movie.poster_path!= null" :src=" 'https://image.tmdb.org/t/p/w342/' + movie.poster_path" alt="poster film">
                <img class="card-img-top" src="https://picsum.photos/id/209/342/500" v-else>
              
      
              <div class="card-body w-100">
                <h5 class="card-title">{{movie.title}}</h5>
                <h6 class="card-subtitle mb-2 text-muted original_title">{{movie.original_title}}</h6>
                <div class="card-text">
                  <div class="info my-3">
                    Lingua: <!-- {{movie.original_language}} --> <flag :iso = "countryFilter(movie.original_language)"></flag> <br>
                    Voto: {{Math.round((movie.vote_average) / 2)}}/5
                    <font-awesome-icon class="vote_star" :icon="['fas', 'star']" v-show="Math.round((movie.vote_average) / 2)>= 1" />
                    <font-awesome-icon class="vote_star" :icon="['fas', 'star']" v-show="Math.round((movie.vote_average) / 2)>= 2" />
                    <font-awesome-icon class="vote_star" :icon="['fas', 'star']" v-show="Math.round((movie.vote_average) / 2)>= 3" />
                    <font-awesome-icon class="vote_star" :icon="['fas', 'star']" v-show="Math.round((movie.vote_average) / 2)>= 4" />
                    <font-awesome-icon class="vote_star" :icon="['fas', 'star']" v-show="Math.round((movie.vote_average) / 2)>= 5" />
                  </div>
                  <!-- /.info -->
                  <div class="card-text overview" v-show="movie.overview != ''" >
                    <h6>Descrizione:</h6>{{movie.overview}}
                  </div>
                  <!-- /.overview --> 
                </div>
                <!-- ./card-text -->
              </div>
              <!-- /.card-body -->
            </div>
            <!-- .card -->
          </div>
          <!-- /.col -->

          <div class="col" v-for="serie in series" :key="serie.id">
            <div class="card border-0">
              
                <img class="card-img-top" v-if="serie.poster_path!= null" :src=" 'https://image.tmdb.org/t/p/w342/' + serie.poster_path" alt="poster film">
                <img class="card-img-top" src="https://picsum.photos/id/209/342/500" v-else>
            

              
              <div class="card-body w-100">
                <h5 class="card-title">{{serie.name}}</h5>
                <h6 class="card-subtitle mb-2 text-muted original_title">{{serie.original_name}}</h6>
                <div class="card-text">
                  <div class="info my-3">
                    Lingua: <!-- {{serie.original_language}} --> <flag :iso = "countryFilter(serie.original_language)"></flag> <br>
                    Voto: {{Math.round((serie.vote_average) / 2)}}/5
                    <font-awesome-icon class="vote_star" :icon="['fas', 'star']" v-show="Math.round((serie.vote_average) / 2)>= 1" />
                    <font-awesome-icon class="vote_star" :icon="['fas', 'star']" v-show="Math.round((serie.vote_average) / 2)>= 2" />
                    <font-awesome-icon class="vote_star" :icon="['fas', 'star']" v-show="Math.round((serie.vote_average) / 2)>= 3" />
                    <font-awesome-icon class="vote_star" :icon="['fas', 'star']" v-show="Math.round((serie.vote_average) / 2)>= 4" />
                    <font-awesome-icon class="vote_star" :icon="['fas', 'star']" v-show="Math.round((serie.vote_average) / 2)>= 5" />
                  </div>
                  <!-- /.info -->
                  <div class="overview" v-show="serie.overview!=''">
                    <h6>Descrizione:</h6>{{serie.overview}}
                  </div>
                  <!-- /.overview -->
                </div>
                <!-- /.card-text -->
               
              </div>
              <!-- /.card-body -->
            </div>
            <!-- .card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </main>
    <!-- /#site_header -->
  </div>
  <!-- /#app -->
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
      activeHover:null
      
    };
  },
  methods:{

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
    },
  },
  mounted(){
            this.callApi(); 
        },
}
</script>

<style lang="scss">
/* importo lo stile */
  @import '@/assets/scss/style.scss';

  header{
    height:70px;
    background-color: #1B1B1B;
    /* background-color: #000000; */
    position: sticky;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
    
    nav{
      .logo{
        height: 36px;
        display:flex;
        margin: 0 1rem;
      }

      form{
        margin: 0 1rem;

        button {
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        background: none;
        }
      }
    }
  }

  main{
    max-height: calc(100vh - 70px);

    .container{
      .row{
        .col{
          .card{
            .card-img-top{
              /* width: 342px; */
              max-height: 298px;
              min-height: 298px;
              
              
            }

            .card-body{
              /* width: 342px; */
              display:none;
              max-height: 298px;
              min-height: 298px;
              background-color:black;
              color:white;
              overflow: auto;
                /* Works on Firefox */
                scrollbar-width: thin;
                scrollbar-color: #1B1B1B #DA181D;
                /* Works on Chrome, Edge, and Safari */
                &::-webkit-scrollbar {
                    width: 8px;
                }
                &::-webkit-scrollbar-track {
                    background: black;
                }
                &::-webkit-scrollbar-thumb {
                    background-color: #DA181D;
                    border-radius: 16px;
                    border: 2px solid black;
                }
                /* background-color: #1B1B1B; */

                .vote_star{
                color: yellow;
                }
            }

            
          }

          .card:hover .card-img-top{
              display:none;
            }

          .card:hover .card-body{
              display:block;
            }
        }
      }
    } 

    
  }
</style>
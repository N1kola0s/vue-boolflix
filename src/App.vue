<template>
  <div id="app">

    <header id="site_header">

      <!-- This is NAVBAR -->
      <nav class="d-flex align-items-center justify-content-between h-100">

        <div class="logo">
          <img src="./assets/logo_nettflaex.png" alt="logo_nettflaex">
        </div>
        <!-- /.logo -->

        <form class="d-flex justify-content-center align-items-center h-25">
          <!-- imposto 'searchText' come v-model in modo che al suo interno mi venga resituito il valore inserito dall'utente nella search-box -->
          <input type="text" v-model="searchText" placeholder="Cerca..." class="d-flex align-items-center border-0 px-2" >
          <!-- imposto un evento al click con il prevent(in modo che non si refreshi la pagina) in modo che scateni la chiamata api -->
          <button @click.prevent="callApi" class=" mx-1 h-75 d-flex align-items-center justify-content-center text-white">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="px-2" /> 
          </button>
          <!-- /button -->
        </form>
        <!-- /form-->
      </nav>
      <!-- /nav -->

    </header>
    <!-- /#site_header -->


    <main id="site_main">

      <!-- This is HERO -->
      <div class="hero">

        <div class="hero_info h-100 pt-4">

        <div class="container">

            <img height="150px" class=" py-4 mt-5 hero_film_logo" src="./assets/img/logo_film_hero.png" alt="hero-film-logo">
            <!-- /.hero_film_logo -->
         
          <p class="hero_text">
            Otto ladri si barricano nell'edificio della Zecca spagnola con alcuni ostaggi, mentre una mente criminale manipola la polizia per mettere in atto il suo piano.
          </p>
          <!-- /.hero_text -->

          <div class="cta d-flex">
            <button type="button" class="btn btn-light btn-lg me-4 mt-2 d-flex align-items-center" href="#"><font-awesome-icon icon="fa-solid fa-play" class="icon_hero_play pe-2" />Riproduci</button>
            <button type="button" class="btn btn-secondary btn-lg me-4 mt-2 align-items-center" href="#"><font-awesome-icon icon="fa-solid fa-circle-info" class="icon_hero_info pe-2" />Altre info</button>
          </div>
        </div>

          
        </div>
        <!-- /.hero_info -->


        <!-- <img src="https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg" alt="hero_image"> -->
      </div>

    <!-- This is a SWIPER JS carousel-->
      <div ref="swiper" class="swiper container-fluid mb-4">

        <div class="swiper-wrapper">

          <div class="swiper-slide"
            v-for="(slide,index) in sliders" :key="index">
            <div class="slide_image">
              <img width="398px" height="398px" :src="'https://image.tmdb.org/t/p/w342/' + slide.poster_path" alt="poster film">
              <font-awesome-icon icon="fa-solid fa-circle-play" class="icon_slide_play"/>
            </div>

          </div>
          <!-- /.swiper-slide -->

        </div>
        <!-- /.swiper-wrapper -->

          <!-- Se hai bisogno della paginazione -->
          <!-- <div class="swiper-pagination"></div> -->

          <!-- Buttons di navigazione -->
          <div class="navigator">
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

          </div>

          <!-- Se hai bisogno della scrollbar -->
          <!-- <div class="swiper-scrollbar"></div> -->

      </div>
      <!-- /.swiper container-->

    <!-- This is SEARCH RESULTS area  -->
      <div class="container search_results my-5">
        <div class="row row-cols-6 g-3">
          <!-- ciclo all'interno degli elementi dell'array dei film presente sul server e restituitotmi attraverso la chiamata api. Utilizzo il valore dell' id univoco contenuto come valore all'interno della proprieta nell'elemento movie -->
          <div class="col gap-3" v-for="movie in movies" :key="movie.id">

            <div class="card border-0">
                <!-- imposto una condizione affinchè venga mostrata un'immagine solo nel caso sia presente come valore nel percorso indicato nella richiesta al server altrimenti verrà restituita un'immagine segnaposto generata con il servizio di picsum -->
                <img class="card-img-top" v-if="movie.poster_path!= null" :src=" 'https://image.tmdb.org/t/p/w342/' + movie.poster_path" alt="poster film">
                <div class="img_not_found" v-else>
                  <img class="card-img-top" src="https://picsum.photos/id/209/342/500" >
                  <div class="txt_not_found text-uppercase text-white">image not found</div>
                </div>
                
              
      
              <div class="card-body w-100">
                <!-- interpolazione del valore contenuto nella proprietà title dell'elemento -->
                <h5 class="card-title">{{movie.title}}</h5>
                <!-- interpolazione del valore contenuto nella proprietà original_title dell'elemento -->
                <h6 class="card-subtitle mb-2 text-muted original_title">{{movie.original_title}}</h6>
                <div class="card-text">
                  <div class="info my-3">
                    <!-- interpolazione del valore contenuto nella proprietà vote_average dell'elemento. Considerato che questa viene resitutita con scala 1:10 dopo aver arrotondato con il metodo il valore lo divido per 2 per ottenere un valore su scala 1:5 -->
                    Lingua: <!-- {{movie.original_language}} --> <flag :iso = "countryFilter(movie.original_language)"></flag> <br>
                    Voto: <!-- {{Math.round((movie.vote_average) / 2)}}/5 -->
                    <!-- dopo aver importato con il servizio di fontawesome le icone stars, imposto una condizione in modo che vengano mostrate su schermo al verificarsi di un operatore matematico legato al valore di vote_average presente nell'elemento movie -->
                    <font-awesome-icon class="star" :icon="['fas', 'star']" v-show="Math.round((movie.vote_average) / 2)>= 1" />
                    <font-awesome-icon class="star" :icon="['fas', 'star']" v-show="Math.round((movie.vote_average) / 2)>= 2" />
                    <font-awesome-icon class="star" :icon="['fas', 'star']" v-show="Math.round((movie.vote_average) / 2)>= 3" />
                    <font-awesome-icon class="star" :icon="['fas', 'star']" v-show="Math.round((movie.vote_average) / 2)>= 4" />
                    <font-awesome-icon class="star" :icon="['fas', 'star']" v-show="Math.round((movie.vote_average) / 2)>= 5" />
                    <font-awesome-icon class="star" :icon="['far', 'star']" v-show="Math.round((movie.vote_average) / 2)< 1" />
                    <font-awesome-icon class="star" :icon="['far', 'star']" v-show="Math.round((movie.vote_average) / 2)< 2" />
                    <font-awesome-icon class="star" :icon="['far', 'star']" v-show="Math.round((movie.vote_average) / 2)< 3" />
                    <font-awesome-icon class="star" :icon="['far', 'star']" v-show="Math.round((movie.vote_average) / 2)< 4" />
                    <font-awesome-icon class="star" :icon="['far', 'star']" v-show="Math.round((movie.vote_average) / 2)< 5" />

                  </div>
                  <!-- /.info -->
                  <!-- imposto la condizione che l'overview venga mostrata su schermo soltanto quando sia presente nell'elemento -->
                  <div class="card-text overview" v-show="movie.overview != ''" >
                    <!-- interpolazione del valore contenuto nella proprietà 'overview' dell'elemento -->
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

          <!-- ciclo all'interno degli elementi dell'array delle serieTv presente sul server e restituitotmi attraverso la chiamata api. Utilizzo il valore dell' id univoco contenuto come valore all'interno della proprieta nell'elemento  -->
          <div class="col" v-for="serie in series" :key="serie.id">
            <div class="card border-0">
              
                <img class="card-img-top" v-if="serie.poster_path!= null" :src=" 'https://image.tmdb.org/t/p/w342/' + serie.poster_path" alt="poster film">
                <div class="img_not_found" v-else>
                  <img class="card-img-top" src="https://picsum.photos/id/209/342/500" >
                  <div class="txt_not_found text-uppercase text-white">image not found</div>
                </div>
            

              
              <div class="card-body w-100">
                <h5 class="card-title">{{serie.name}}</h5>
                <h6 class="card-subtitle mb-2 text-muted original_title">{{serie.original_name}}</h6>
                <div class="card-text">
                  <div class="info my-3">
                    Lingua: <!-- {{serie.original_language}} --> <flag :iso = "countryFilter(serie.original_language)"></flag> <br>
                    Voto: <!-- {{Math.round((serie.vote_average) / 2)}}/5 -->
                    <font-awesome-icon class="star" :icon="['fas', 'star']" v-show="Math.round((serie.vote_average) / 2)>= 1" />
                    <font-awesome-icon class="star" :icon="['fas', 'star']" v-show="Math.round((serie.vote_average) / 2)>= 2" />
                    <font-awesome-icon class="star" :icon="['fas', 'star']" v-show="Math.round((serie.vote_average) / 2)>= 3" />
                    <font-awesome-icon class="star" :icon="['fas', 'star']" v-show="Math.round((serie.vote_average) / 2)>= 4" />
                    <font-awesome-icon class="star" :icon="['fas', 'star']" v-show="Math.round((serie.vote_average) / 2)>= 5" />
                    <font-awesome-icon class="star" :icon="['far', 'star']" v-show="Math.round((serie.vote_average) / 2)< 1" />
                    <font-awesome-icon class="star" :icon="['far', 'star']" v-show="Math.round((serie.vote_average) / 2)< 2" />
                    <font-awesome-icon class="star" :icon="['far', 'star']" v-show="Math.round((serie.vote_average) / 2)< 3" />
                    <font-awesome-icon class="star" :icon="['far', 'star']" v-show="Math.round((serie.vote_average) / 2)< 4" />
                    <font-awesome-icon class="star" :icon="['far', 'star']" v-show="Math.round((serie.vote_average) / 2)< 5" />
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
      <!-- /.search_results -->

    </main>
    <!-- /#site_header -->
  </div>
  <!-- /#app -->
</template>

<script>
//importo axios nel tag script 
import axios from "axios"; 

import Swiper, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default {
  name: 'App',
  components: {
    
  },
  data(){
    return {
      /* imposto variabile con url del server a cui sarà fatta richiesta per ottenere i dati relativi ai film, nell'url è presente api_key ottenuta in seguito alla registrazione del relativo servizio online ma non la query che sarà aggiunta dinamicamente con la chiamata api */
      urlFilm:'https://api.themoviedb.org/3/search/movie?api_key=a10bb2f450a66787dd09fbc8afd56539&language=it-IT&page=1&include_adult=false&query=',
      /* faccio lo stesso per le serieTv */
      urlTv:'https://api.themoviedb.org/3/search/tv?api_key=a10bb2f450a66787dd09fbc8afd56539&language=it-IT&page=1&include_adult=false&query=',

      /* imposto variabili a cui saranno assegnati valori */
      urlImg:'',
      searchText: '',
      movies: null,
      series:null,
      error: null,
      sliders:null,
      activeImage:0

      /* chiusura */
    }
  },
  methods:{
    
   
    //imposto un metodo per le chiamate api
    callApi(){

      //imposto chiamata axios per i film
      axios
        // richiesta
        /* this.urlFilm + this.searchText */
        .get(this.urlFilm + this.searchText) /* richiesta effettuata all'indirizzo ottenuto da 'urlFilm' + 'la query' digitata dall'utente */
      
        // risposta
        .then(response => {
          /* eseguo i console log di verifica per i valori corrispondenti */
          /* console.log(this);
          console.log(response); */

          //assegno i dati ottenuti in risposta dal server
          this.movies = response.data.results
          //pulisco il searchText
          this.searchText = '';
      })
      .catch(error => {
        console.log(error);
      }),

      /* chiamata axios SerieTv */
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
    //creo metodo che mi restituisca la bandiera in caso di mancata corrispondenza assegnando in caso che il valore sia uguale a 'en' la bandiera della gran bretagna
    countryFilter(flagLanguage){
      if(flagLanguage == 'en'){
        return flagLanguage = 'gb'
      } else {
        return flagLanguage
      }
    },
    callBase(){

      //imposto chiamata axios per i film del mio slider
      axios
        // richiesta
        /* this.urlFilm + this.searchText */
        .get(this.urlFilm + 'red') /* richiesta effettuata all'indirizzo ottenuto da 'urlFilm' + 'la query'  */
      
        // risposta
        .then(response => {
          /* eseguo i console log di verifica per i valori corrispondenti */
          /* console.log(this);
          console.log(response); */

          //assegno i dati ottenuti in risposta dal server
          this.sliders = response.data.results
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  /* richiamo la chiamata api in mounted in modo che rimanga nella cache */
  mounted(){
          this.callBase(), 
          new Swiper(this.$refs.swiper, {
      // configure Swiper to use modules
      modules: [Navigation, Pagination],
      // Optional parameters
      loop: true,
      slidesPerView:6,
      spaceBetween:15,
      slidesPerGroup:6,
      loopFillGroupWithBlank:true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable:true
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    })

        }
  
        
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

        input{
          background-color: #00000040;
          color: white;
        }

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
    position:relative;


    .hero{
      background-image: url('./assets/img/casa_di_carta.jpg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      height: 750px;
      
    }

    .hero_info{
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 80%);
      .hero_text{
        margin-top: 0;
        margin-bottom: 1rem;
        color: white;
        font-size: 1.3rem;
        width: 50%;

        button{
          font-size: 1.1rem;
          font-weight: 600;
          .icon_hero_play,
          .icon_hero_info{
            font-size: 1.5rem;
          }  
        }
      }
    }

    .swiper{
      position:absolute;
      top:500px;
    }

    .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
    cursor:pointer;
    .icon_slide_play{
      font-size:3.5rem;
      color:crimson;
      display:none;
    }
    
    }

   .swiper-slide:hover img{
    filter: grayscale(0.85);
   }

   .swiper-slide:hover .icon_slide_play{
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
   }

  
       
      position:relative;
      .navigator{
        position: absolute;
        top: 40%;
        width: 100%;
        padding: 0px 4px;
        .swiper-button-prev,
        .swiper-button-next {
          background-color: rgba(20,20,20,.5);
          padding: 2.2rem;
          cursor: pointer;
          margin: 0 5px;
          width: 45px;
          color: white;
          height:398px;
          cursor:pointer;
        }
        .swiper-button-next {
        right: 5px;
        left: auto;
        position: absolute;
        top: -159px;
        }
        .swiper-button-prev{
          left: -20px;
          position: absolute;
          top: -159px;
        }
      }

    
    
    .container.search_results{
      padding-top:10rem;
      .row{
        .col{
          .card{
            position:relative;
            box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);

            .card-img-top{
              /* width: 342px; */
              max-height: 298px;
              min-height: 298px;
            }

            .card-body{
              /* width: 342px; */
              position:absolute;
              top:0;
              left:0;
              display:none;
              max-height: 298px;
              min-height: 298px;
              aspect-ratio: 1 / 1;
              background-color:rgba(0, 0, 0, 0.900);
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

                .card-subtitle{
                  color: yellow!important;
                }

                .overview h6{
                  color:#DA181D!important;
                  font-weight: bold;
                }

                .star{
                color: yellow;
                }  
            }

            .img_not_found{
              position:relative;
              
              .txt_not_found{
                position:absolute;
                top:82%;
                left:50%;
                transform: translate(-50%, -50%);
                background-color: #da181ea5;
                width: 100%;
                font-weight: bold;
                padding:8px;
                text-align: center;
              }
            }
          }

          .card:hover .card-img-top{
              /* display:none; */
              filter: grayscale(100%); 
            }

          .card:hover .card-body{
              display:block;      
            }

          
        }
      }
    } 

    
  }
</style>
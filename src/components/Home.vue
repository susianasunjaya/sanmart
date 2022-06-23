<template>
  <v-app>
    <div class="home">
      <!-- Bagian Carousel -->
      <v-carousel
      hide-delimiter-background
      show-arrows-on-hover
      >
        <v-carousel-item
          v-for="item in promotion" 
          :key="item.id"
          :src="item.promotion_pict"
        >

        </v-carousel-item>
      </v-carousel>
      <!-- Akhir Carousel -->

      <!-- Awal Category -->
      <v-container>
        <v-card class="pa-4 mt-10 mb-10" elevation="10">
          <v-card-title>Categories</v-card-title>
          <v-row>
            <v-col sm="3" md="2" v-for="item in category" :key="item.id">
              <v-card elevation="5">
                <v-img
                  height="200"
                  :src="item.cat_pict"
                ></v-img>          
                <v-card-title class="justify-center">{{item.cat_name}}</v-card-title>
              </v-card>
            </v-col>
          </v-row>
          
          <!-- akhir isi category -->
        </v-card>
      </v-container>
      <!-- Akhir Category -->


      <!-- SALE PROCDUCT -->
      <v-container>
        <v-card class="pa-4 mt-5 mb-10" elevation="10">
          <v-card-title>SKIN CARE BUY 1 GET 1</v-card-title>
          <!-- Isi promo -->
          <v-row>
            <v-col sm="3" md="3" v-for="item in skincare" :key="item.id">
              <v-card elevation="5">
                <v-img
                  :src="item.product_pict"
                ></v-img>          
                <v-card-title>{{item.product_name}}</v-card-title>
                <v-card-subtitle>{{item.product_merk}}</v-card-subtitle>
                  <v-card-text>
                    <v-row
                      align="center"
                      class="mx-0"
                    >
                      <v-rating
                        :value=item.product_rating
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                        
                      ></v-rating>

                      <div class="grey--text ms-4">{{item.product_rating}}
                      
                      </div>
                    </v-row>
                  </v-card-text>
                  <v-card-text><h3>Rp {{(item.product_price).toLocaleString("id-ID")}}</h3></v-card-text>
                  <v-card-actions>
                    <v-btn class="mt-3" block x-large color="blue" v-on:click="addProductToCart(item,1)">Add to Cart</v-btn>
                  </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          
          <!-- akhir isi promo -->

        </v-card>

      </v-container>
      <!-- SALE PRODUCT -->


    <!-- GROCERY PROCDUCT -->
      <v-container>
        <v-card class="pa-4 mt-5 mb-10" elevation="10">
          <v-card-title>GROCERY</v-card-title>
          <!-- Isi sembako -->
          <v-row>
            <v-col sm="3" md="3" v-for="item in grocery" :key="item.id">
              <v-card elevation="5">
                <v-img
                  :src="item.product_pict"
                ></v-img>          
                <v-card-title>{{item.product_name}}</v-card-title>
                <v-card-subtitle>{{item.product_merk}}</v-card-subtitle>
                  <v-card-text>
                    <v-row
                      align="center"
                      class="mx-0"
                    >
                      <v-rating
                        :value=item.product_rating
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                        
                      ></v-rating>

                      <div class="grey--text ms-4">{{item.product_rating}}
                      
                      </div>
                    </v-row>
                  </v-card-text>
                  <v-card-text><h3>Rp {{(item.product_price).toLocaleString("id-ID")}}</h3></v-card-text>
                  <v-card-actions>
                    <v-btn class="mt-3" block x-large color="blue" v-on:click="addProductToCart(item,1)">Add to Cart</v-btn>
                  </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          
          <!-- akhir isi sembako -->

        </v-card>

      </v-container>
      <!-- GROCERY PRODUCT -->



    </div>
  </v-app>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions } from 'vuex';
import {db} from '../db'

export default {
  name: 'Home',
  // components: {
    
  // },
  data (){
    return {
    model:0,
    colors:[
      'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange'
    ],
    product:[],
    promotion:[],
    category:[],
    skincare:[],
    grocery:[]
    }
  },
  created(){
    db.collection("product")
      .get()
      .then((querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
          this.product = documents;
      }),
    db.collection("promotion")
      .get()
      .then((querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
          this.promotion = documents;
      }),
    db.collection("category")
      .get()
      .then((querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
          this.category = documents;
      }),
      db.collection("product")
      .where("product_cat","==","skincare")
      .get()
      .then((querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
          this.skincare = documents;
      }),
      db.collection("product")
      .where("product_cat","==","grocery")
      .get()
      .then((querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
          this.grocery = documents;
      })
      ;
    },
    methods:{
      ...mapActions(["addProductToCart"]),

  }
}
</script>

<style>

</style>

    
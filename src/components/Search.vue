<template>
  <v-app>
    <div class="search">


      <!-- Hasil Pencarian -->
      <v-container>
        <v-card class="pa-4 mt-5 mb-10" elevation="10">
          <v-card-title>Hasil Pencarian : {{search}}</v-card-title>

          <!-- Isi pencarian -->
          <v-row>
            <v-col sm="3" md="3" v-for="item in filteredProducts" :key="item.id">
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
                  <!-- <v-action> -->
                    <v-btn class="mt-3" block x-large color="blue" v-on:click="addProductToCart(item,1)">Add to Cart</v-btn>
                    
                  <!-- </v-action> -->
              </v-card>
            </v-col>
          </v-row>
          
          <!-- akhir isi pencarian -->

        </v-card>

      </v-container>
      <!-- HASIL PENCARIAN -->

    </div>
  </v-app>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions } from 'vuex';
import {db} from '../db'

export default {
  name: 'Search',
  components: {
    
  },
  data (){
    return {
    model:0,
    product:[],
    search:this.$store.state.search
    }
  },
  created(){
    db.collection("product")
    .get()
    .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        this.product = documents;
        this.$store.commit("setProduct",documents);
      })
      ;
    },
    computed:{
        filteredProducts: function(){
          return this.$store.getters.hasilCari;

            // return this.product.filter((item) => {
            //     if((item.product_cat).toLowerCase().match(this.search.toLowerCase())){
            //         return (item.product_cat).toLowerCase().match(this.search.toLowerCase());
            //     }
            //     if((item.product_merk).toLowerCase().match(this.search.toLowerCase())){
            //         return (item.product_merk).toLowerCase().match(this.search.toLowerCase());
            //     }
            //     if((item.product_name).toLowerCase().match(this.search.toLowerCase())){
            //         return (item.product_name).toLowerCase().match(this.search.toLowerCase());
            //     }
            //     // return item.product_cat.match(this.search);
            // })
        }
    },
    methods:{
      ...mapActions(["addProductToCart"]),

    }
}
</script>

<style>

</style>

    
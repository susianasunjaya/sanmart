<template>
  <v-app>
    <div class="checkout">
        <v-container>
            <h3 class="mt-3">SHIPPING ADDRESS</h3>
        </v-container>
        <v-container>
            <v-card>
                <v-form class="pa-3">
                    <v-text-field class="ml-5 mr-5" label="Nama Penerima" v-model="penerima" ></v-text-field>
                    <v-text-field class="ml-5 mr-5" label="Alamat"  v-model="alamat"></v-text-field>
                    <!-- <v-btn class="btn mt-3" v-on:click="login()">Login</v-btn> -->
                </v-form>
            </v-card>
        </v-container>
        <br>
        <v-container>
            <h3>ORDER SUMMARY</h3>
        </v-container>

        <v-container>
            <v-card class="mx-auto">  
                <v-list>
                <!-- <v-subheader>Recent chat</v-subheader> -->

                <v-list-item
                    v-for="item in cart" :key="item.id"
                >
                    <v-list-item-avatar class="ml-10 mt-5" size="150" tile>
                    <v-img
                        :src="item.product_pict"
                    ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content class="ml-15">
                    <v-list-item-title>{{item.product_name}}</v-list-item-title>
                    <v-list-item-title>{{item.product_merk}}</v-list-item-title>
                    <v-list-item-title >Rp {{(item.product_price).toLocaleString("id-ID")}}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-content>
                        <v-list-item-icon>
                            <v-text class="mt-2 ml-4">x{{item.quantity}}</v-text>
                        </v-list-item-icon>
                    </v-list-item-content>

                    <v-list-item-content class="ml-3">
                    <v-list-item-title><b>Rp {{(item.product_price*item.quantity).toLocaleString("id-ID")}}</b></v-list-item-title>
                    </v-list-item-content>
                    
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item>
                    <v-list-item-content>
                    <v-list-item-title></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content>
                    <v-list-item-title></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content>
                    <v-list-item-title><b>Total</b></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content >
                    <v-list-item-title><b>Rp {{(total).toLocaleString("id-ID")}}</b></v-list-item-title>
                    
                    </v-list-item-content>
                </v-list-item>

                </v-list>
                <v-btn
                    outlined
                    x-large
                    text
                    block

                    v-on:click="ordernow(cart)"
                >
                        ORDER NOW
                </v-btn>
                
            </v-card>
        </v-container>


    </div>
  </v-app>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters, mapActions } from 'vuex';
import {db} from '../db'
import firebase from 'firebase';

export default {
  name: 'Cart',
  components: {
    
  },
  data (){
    return {
    model:0,
    product:[],
    penerima:'',
    alamat:'',
    }
  },
  created(){
    db.collection("product")
    .get()
    .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => doc.data());
        this.product = documents;
      })
      ;
    },
    computed:{
        ...mapGetters(["cart"]),
        total(){
          return this.cart.reduce((a, b) => a+b.quantity * b.product_price, 0);
        }
        // cart(){
        //     return this.$store.this.cart
        // }
    },
    methods:{
        ...mapActions([
            "addProductToCart",
            ]),
        ordernow(cart){
            // console.log(cart);

            // start sini
            if(this.penerima=="" || this.alamat==""){
                alert('Please Fill Out The Shipping Address Form')
            }else{
                var docData = {
                    pengirim: localStorage.getItem("email"),
                    penerima: this.penerima,
                    alamat: this.alamat,
                    date: firebase.firestore.Timestamp.now(),
                    cart: cart,
                    total:this.total
                };
                db.collection("invoice").doc().set(docData).then(() => {
                    console.log("Document successfully written!");
                });

                alert('Thank You For Ordering :D')
                this.$router.push('/')
                location.reload()

            }

            
            // sampe sini
        }
    }

}
</script>

<style>

</style>

    
<template>
    <div>
        <div id="nav">
            <router-link to="/">Home</router-link> 
            <router-link to="/authorization">About</router-link>
            <span v-if="isLoggedIn">
                <a v-on:click="logout">Logout</a>
            </span>
            <p>{{ authStatus }}</p>
        </div>
    </div>
</template>

<script>
  export default {
    computed : {
      isLoggedIn(){
         return this.$store.getters.isLoggedIn
        },
      authStatus(){
        return this.$store.getters.authStatus
      }

      
      
    
    },
    methods: {
      logout() {
        this.$store.dispatch('logout').then(() => {this.$router.push('/authorization')})
      },

      fetchData(){
        this.$store.dispatch('fetchData')
      }
    },

    async created(){
      this.fetchData();
    }
  }
</script>
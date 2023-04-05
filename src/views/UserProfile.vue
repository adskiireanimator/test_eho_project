<template>
    <div>
        <div id="nav">
            <p>{{ getName }}</p>
            <p>{{ getSurname }}</p>
            <p>{{accesToken}}</p>
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
         return this.$store.getters.isLoggedIn;
        },
      authStatus(){
        return this.$store.getters.authStatus;
      },
      accesToken(){
        return this.$store.getters.accesToken;
      },
      getName(){
        return this.$store.getters.getName;
      },
      getPhone(){
        return this.$store.getters.getPhone;
      },
      getSurname(){
        return this.$store.getters.getSurname;
      }
      
      
    
    },
    methods: {
      logout() {
        this.$store.dispatch('logout').then(() => {this.$router.push('/authorization')})
      },

      fetchData(){
        this.$store.dispatch('fetchData',this.accesToken)
      }
    },

    async created(){
      this.fetchData();
    }
  }
</script>
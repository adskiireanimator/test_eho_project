<template>
    <div>
        <div id="nav">
          <div class="">
            <div v-if="isLoggedIn" class="message_single_container">
                <p class="message_text">{{ getName }} {{ getSurname }}, добро пожаловать</p>
                <div class="spacer"></div>
                <button v-on:click="logout" class="message_button">Выйти из аккаунта</button>
                <div class="spacer"></div>
            </div>
            <div v-else>
              <div class="message_single_container">
                <p class="message_text">
                  Пожалуйста, войдите в аккаунт
                </p>
                <div class="spacer"></div>
                <router-link to="/authorization">
                  <p class="message_link">Авторизоваться</p>
                </router-link>
                <div class="spacer"></div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  export default {
    data(){
      return{
        accesToken:localStorage.getItem('token')||''
      }
    },
    computed : {
      isLoggedIn(){
         return this.$store.getters.isLoggedIn;
        },
      authStatus(){
        return this.$store.getters.authStatus;
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
    },

  }
</script>
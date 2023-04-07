<template>
  <div class="modal_container">
    <div class="modal_wrapper" v-on:click="$emit('stillOpen')">
        <form class="modal_form">
            <div class="spacer"></div>
            <h1 class="modal_form_caption">Подтверждение номера телефона</h1>
            <p class="modal_form_text">Мы отправили на ваш номер телефона смс с кодом:</p>
            <div class="spacer"></div>
            <input type="text" placeholder="Введите код" class="modal_form_input" v-model="code"> 
            <div class="spacer"></div>
            <button v-on:click="$emit('close')" class="modal_form_canselbutton">отмена</button>
            <div class="spacer"></div>
            <div class="spacer"></div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhoneCodeChecker",
  props: {
    newPassword: String
  },
  data(){
    return{
        code:''
    }
  },
  methods:{
    codeReview(){
        let code=this.code;
        let newPassword=this.newPassword;
        let password=localStorage.getItem('phone_number');
        this.$store.dispatch('endRecovery', {code,newPassword,password}).then(() => this.$router.push('/user_profile')).catch(err => console.log(err))
    }
  },

  watch:{
    code(newCode){
        if (newCode.length==4){
            this.codeReview();
        }if (newCode.length>4){
            this.code=`${newCode[0]}${newCode[1]}${newCode[2]}${newCode[3]}`
        }
    }
  }
}
</script>



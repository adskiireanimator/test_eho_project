<template>
  <div class="modal_container">
    <div class="modal_wrapper">
        <form class="modal_form">
            <div class="spacer"></div>

            <h1 class="modal_form_caption">Подтверждение номера телефона</h1>

            <p class="modal_form_text">Мы отправили на ваш номер телефона смс с кодом:</p>

            <div class="spacer"></div>

            <input type="text" placeholder="Введите код" class="modal_form_input" v-model="code">

            <div class="spacer"></div>

            <p class="modal_form_text_active" v-if="refreshCodeState" v-on:click="sendNewCode">Отправить повторный текст</p>
            <p class="modal_form_text" v-else>{{refreshCodeText}}</p> 

            <div class="spacer"></div>

            <button v-on:click="cancelCodeRecovering" class="modal_form_canselbutton">отмена</button>

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
        code:'',
        currentTime:20,
        refreshCodeState:false,
        timer:null
    }
  },
  computed:{
    refreshCodeText(){
        return `Отправить повторный код через ${this.currentTime}`
    }
  },
  methods:{
    codeReview(){
        let code=this.code;
        let newPassword=this.newPassword;
        let password=localStorage.getItem('phone_number');
        this.$store.dispatch('endRecovery', {code,newPassword,password}).then(() => this.$router.push('/user_profile')).catch(err => console.log(err))
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--
      }, 1000)
    },
    cancelCodeRecovering(){
        this.$store.dispatch('cancelCodeReceipt')
    },
    sendNewCode(){
        this.refreshCodeState=false;
        this.startTimer();
        this.$store.dispatch('sendNewCode')
    }

  },

  watch:{
    code(newCode){
        if (newCode.length==4){
            this.codeReview();
        }if (newCode.length>4){
            this.code=`${newCode[0]}${newCode[1]}${newCode[2]}${newCode[3]}`
        }
    },
    currentTime(time){
        if(time==0){
            this.refreshCodeState=true;
            clearTimeout(this.timer);
            this.currentTime=20;
        }
    }
  },
  created(){
    this.startTimer();
  }
}
</script>



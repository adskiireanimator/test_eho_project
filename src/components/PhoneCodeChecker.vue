<template>
  <div class="modal_container">
    <div class="modal_wrapper" v-on:click="$emit('stillOpen')">
        <form class="modal_form">
            <div class="spacer"></div>
            <h1 class="modal_caption">Подтверждение номера телефона</h1>
            <p class="modal_text">Мы отправили на ваш номер телефона смс с кодом:</p>
            <div class="spacer"></div>
            <input type="text" placeholder="Введите код" class="modal_input"> 
            <div class="spacer"></div>
            <button v-on:click="$emit('close')" class="modal_button">отмена</button>
            <div class="spacer"></div>
            <div class="spacer"></div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhoneCodeChecker",
  
  data(){
    return{
        
    }
  },
}
</script>



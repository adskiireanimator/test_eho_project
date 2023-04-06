<template>
    <form class="form" v-on:submit.prevent="recovery_handler">
        <p class="form_text">Востановление пароля</p>
        <div class="spacer"></div>
        <input type="text" name="" id="" class="form_input" v-model="phoneNumber">
        <div class="spacer"></div>
        <button class="form_submit_button" v-on:click="recovery_handler">отправить код</button>
        <div class="spacer"></div>
        <router-link to="/authorization">
            <p class="form_link">Вспомнил пароль!</p>
        </router-link>

         <router-link to="/registration">
            <p class="form_link">Регистрация</p>
        </router-link>

        <div class="spacer"></div>
        <div class="spacer"></div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            phoneNumber: localStorage.getItem('phone_number')||'',
        }
    },
    methods: {
        recovery_handler(){

        }
    },
    watch: {
        phoneNumber(newPhone,oldPhone) {
            if (newPhone[0]=='+' && newPhone[1]=='7') {
                newPhone='8';
            }            
            const x = newPhone.replace(/\D/g, "").match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);

            if(x[1]!='') {
                this.phoneNumber=`${x[1]}`;
            }
            if(x[2]!='') {
                this.phoneNumber=`${x[1]} ${x[2]}`;
            }
            if(x[3]!='') {
                this.phoneNumber=`${x[1]} ${x[2]}-${x[3]}`;
            }
            if(x[4]!='') {
                this.phoneNumber=`${x[1]} ${x[2]}-${x[3]}-${x[4]}`;
            }
            localStorage.setItem("phone_number", this.phoneNumber)
            
        },
    }
}
</script>
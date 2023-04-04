<template>
    <form class="form" v-on:submit.prevent="authorization_handler">
        <p class="form_text">Авторизация</p>
        <div class="spacer"></div>
        <input type="text" class="form_input" placeholder="8 XXX-xxx-xxxx" v-model="phone_number">
        <input class="form_input" placeholder="Пароль" v-model="password" v-bind:type="passwordFieldType" >
        <div href="#" class="passwordControl" v-bind:class="{passwordControlView:passwordIcon}" v-on:click="change_pass_icon"></div>
        <div>
            <label for="savetoken">Сохранить пароль</label>
            <input type="checkbox" id="savetoken" v-model="saveToken">
        </div>
        <div class="spacer"></div>
        <button type="submit"  class="form_submit_button">Авторизоваться</button>
        <div class="spacer"></div>
        <router-link to="/registration">
            <p class="form_link">Ещё нет аккаунта?</p>
        </router-link>
        <div class="spacer"></div>
        <router-link to="/password_recovery">
            <p class="form_link">Забыли пароль?</p>
        </router-link>
        <div class="spacer"></div>
        <div class="spacer"></div>

        
    </form>
</template>

<script>


export default {
    data(){
        return{
            password:"",
            phone_number:localStorage.getItem("phone_number") || "",
            passwordFieldType:'password',
            passwordIcon:false,
            saveToken:true
        }
    },
    methods:{
        authorization_handler(){
            let phone_number = this.phone_number
            let password = this.password
            this.$store.dispatch('login', { phone_number, password },this.saveToken).then(() => this.$router.push('/user_profile')).catch(err => console.log(err))
        },
        change_pass_icon(){
            this.passwordIcon=!this.passwordIcon;
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
        },
        update_phone_mask(){
            console.log(25)
            const x = this.phone_number.replace(/\D/g, "").match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);

            if (!x[2] && x[1] !== "") {
                this.phone_number = x[1] === "8" ? x[1] : "8" + x[1];
            } else {
                this.phone_number = !x[3]? x[1] + x[2]: x[1] + "(" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
            }
        }
    },
    watch:{
        phone_number(newphone,oldphone){
            
            const x = newphone.replace(/\D/g, "").match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);

            if(x[1]!=''){
                this.phone_number=`${x[1]}`;
            }
            if(x[2]!=''){
                this.phone_number=`${x[1]} ${x[2]}`;
            }
            if(x[3]!=''){
                this.phone_number=`${x[1]} ${x[2]}-${x[3]}`;
            }
            if(x[4]!=''){
                this.phone_number=`${x[1]} ${x[2]}-${x[3]}-${x[4]}`;
            }

            localStorage.setItem("phone_number",this.phone_number)
            
        },

        password(newPassword,oldPassword){
            /* 
            в целях безопасности я решил не добавлять пароль
            если нужно будет добавить пароль, то вписать сюда:

            localStorage.setItem("password",newPassword)

            но я не советую это делать
            */
        }
    }
    
}
</script>
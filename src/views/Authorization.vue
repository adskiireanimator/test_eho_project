<template>
    <form class="form" v-on:submit.prevent="authorization_handler">
        <p class="form_text">Авторизация</p>

        <div class="spacer"></div>

        <input type="text" class="form_input" placeholder="8 XXX-xxx-xxxx" name="phone" v-model="phone_number">

        <input class="form_input" placeholder="Пароль" v-model="password" v-bind:type="passwordFieldType" >
        <div href="#" class="passwordControl" v-bind:class="{passwordControl_View:passwordIcon}" v-on:click="change_pass_icon"></div>

        <label class="form_checkbox_label">
            <input type="checkbox" v-model="saveToken">
            <div class="form_checkbox_checkmark"></div>
            <div class="form_checkbox_body">Не выходить из системы</div>
        </label>


        <div class="spacer"></div>

        <button type="submit"  class="form_submit_button">Авторизоваться</button>
        
        <div class="spacer"></div>

        <router-link to="/registration">
            <p class="form_link">Ещё нет аккаунта?</p>
        </router-link>

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
            console.log(this.phone_number);
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
        phone_number(newPhone,oldPhone){
            console.log(newPhone,"new")
            if(newPhone[0]=='+' && newPhone[1]=='7'){
                newPhone='8';
            }
            
            let x = newPhone.replace(/\D/g, "").match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);
            
            

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
            console.log(this.phone_number,"super new")
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
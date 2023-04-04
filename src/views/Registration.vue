<template>

    <form class="form" v-on:submit.prevent="register_handler">
        <p class="form_text">Регистрация</p>
<div class="spacer"></div>

        <input type="text" class="form_input" placeholder="Имя" name="name" v-model="name">

        <input type="text" class="form_input" placeholder="Фамилия" name="surname" v-model="surname">

        <input type="text" class="form_input" placeholder="8 XXX-xxx-xxxx" name="phone" v-model="phone_number">
        
        <input class="form_input" placeholder="Пароль" v-model="password" v-bind:type="passwordFieldType">
        <div href="#" class="passwordControl" v-bind:class="{passwordControl_View:passwordIcon}" v-on:click="change_pass_icon"></div>
        
        <div class="spacer"></div>

        <uploader/>
        
        

        <button type="submit"  class="form_submit_button">Регистрация</button>
        <div class="spacer"></div>
        <router-link to="/authorization">
            <p class="form_link">Уже есть аккаунт? Авторизуйтесь!</p>
        </router-link>


        <div class="spacer"></div>
        <div class="spacer"></div>

        
    </form>
</template>

<script>
import Uploader from '@/components/Uploader.vue'

export default {
    data(){
        return{
            name:localStorage.getItem("name") || "",
            surname:localStorage.getItem("surname") || "",
            phone_number:localStorage.getItem("phone_number") || "",
            password:'',
            passwordFieldType:'password',
            passwordIcon:false,
            passwordPhrase:'Показать пароль'
        }
    },
    methods:{
        change_pass_icon(){
            this.passwordIcon=!this.passwordIcon;
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
        },
        register_handler(){
            let data = {
                name: this.name,
                phone_number: this.phone_number,
                password: this.password,
            };
            
            this.$store.dispatch('register', data).then(() => this.$router.push('/')).catch(err => console.log(err))
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
            
            const x = newPhone.replace(/\D/g, "").match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);

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

        name(newName,oldName){
            localStorage.setItem("name",newName);
        },

        surname(newSurname,oldSurname){
            localStorage.setItem("surname",newSurname);
        },
        password(newPassword,oldPassword){
            /* 
            в целях безопасности я решил не добавлять пароль 
            если нужно будет добавить пароль, то вписать сюда:

            localStorage.setItem("password",newPassword)

            но я не советую это делать
            */
        }
    },
    components:{
        Uploader
    }
}
</script>
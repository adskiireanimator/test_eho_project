<template>
    <form class="form" v-on:submit.prevent="recovery_handler">
        <p class="form_text">Востановление пароля</p>

        <div class="spacer"></div>

        <input type="text" class="form_input" placeholder="8 XXX-xxx-xxxx" name="phone" v-model="phoneNumber" v-bind:class="{invalid_input:phoneError.incorrectPhone}">
        <label v-if="phoneError.incorrectPhone" class="form_label">{{phoneError.phoneLabel}}</label>

        <input class="form_input" placeholder="Пароль" v-model="password" v-bind:type="passwordFieldType" v-bind:class="{invalid_input:passwordError.incorrectPassword}">
        <label v-if="passwordError.incorrectPassword" class="form_label">{{passwordError.passwordLabel}}</label>
        <div href="#" class="passwordControl" v-bind:class="{passwordControl_View:passwordIcon}" v-on:click="changePassIcon"></div>

        <div class="spacer"></div>

        <button class="form_submit_button" v-on:click="recovery_handler">Изменить пароль</button>

        <div class="spacer"></div>


        <CodeChecker v-if="codeState" v-on:close="codeState=false" v-bind:newPassword="password"/>

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

import CodeChecker from '@/components/PhoneCodeChecker'
import {required,minLength} from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            phoneNumber: localStorage.getItem('phone_number')||'',
            password: '',
            passwordFieldType: 'password',
            passwordIcon: false,
            passwordError:{
                incorrectPassword:false,
                passwordLabel:'',
            },
            phoneError:{
                incorrectPhone:false,
                phoneLabel:''
            },

        }
    },
    computed:{
        codeState(){
            return this.$store.getters.codeState;
        },
        getRecoveryErrors(){
            return this.$store.getters.getRecoveryErrors;
        }
    },
    validations: {
        password: {
            required,
            },
    },
    methods: {
        changePassIcon() {
            this.passwordIcon=!this.passwordIcon;
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
        },

        recovery_handler(){
            this.passwordError.incorrectPassword=!this.password;
            this.passwordError.passwordLabel="Поле пароль должно быть заполнено"

            this.phoneError.incorrectPhone=!this.phoneNumber;
            this.phoneError.phoneLabel="Поле телефона должно быть заполнено";
            
            if(this.passwordError.incorrectPassword || this.phoneError.incorrectPhone || this.authStatus=='loading'){

            }else{
                this.$store.dispatch('startRecovery', this.phoneNumber);
            }
        }
    },
    watch: {
        phoneNumber(newPhone) {
            const correctsym=['+','1','2','3','4','5','6','7','8','9','0'];
            if (newPhone.length==15) this.phoneNumber=oldPhone;

            if (newPhone[newPhone.length-1] in correctsym){
                    if (newPhone[0]=='+' && newPhone[1]=='7') {
                        let correctPhone='8';
                            if (newPhone.length>2){
                                for(let i=2;i<newPhone.length;i++){
                                    correctPhone=correctPhone+newPhone[i]
                                }
                            }
                            newPhone=correctPhone;
                    }  
                
                let x = newPhone.replace(/\D/g, "").match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);
                
                if(x[1]!=''){
                    this.phoneNumber=`${x[1]}`;
                }
                if(x[2]!=''){
                    this.phoneNumber=`${x[1]} ${x[2]}`;
                }
                if(x[3]!=''){
                    this.phoneNumber=`${x[1]} ${x[2]}-${x[3]}`;
                }
                if(x[4]!=''){
                    this.phoneNumber=`${x[1]} ${x[2]}-${x[3]}-${x[4]}`;
                }
                localStorage.setItem("phone_number",this.phoneNumber);


                if(this.phoneNumber.length<14){
                    this.phoneError.incorrectPhone=true;
                    this.phoneError.phoneLabel="Введите корректный телефон";
                }else{
                    this.phoneError.incorrectPhone=false;
                }
            }else{
                this.phoneError.incorrectPhone=true;
                this.phoneError.phoneLabel="Вводите числа";
            }
        },
        password(newPassword,oldPassword){
            this.passwordError.incorrectPassword=false;
        },
        getRecoveryErrors(errors){
            if(errors.length!=0){
                for(let error of errors){
                    if (error=="for example password error"){
                        this.passwordError.incorrectPassword=true;
                        this.passwordError.passwordLabel=error;
                    }
                }
            }
        }
    },
    components:{
        CodeChecker
    }
}
</script>
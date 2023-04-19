<template>
    <form class="form" v-on:submit.prevent="registerHandler">
        <p class="form_text">Регистрация</p>

        <div class="spacer"></div>

        <input type="text" class="form_input" placeholder="Имя" name="name" v-model="name" v-bind:class="{invalid_input:nameError.incorrectName}">
        <label v-if="nameError.incorrectName" class="form_label">Поле дожно быть заполнено</label>

        <input type="text" class="form_input" placeholder="Фамилия" name="surname" v-model="surname" v-bind:class="{invalid_input:nameError.incorrectSurname}">
        <label v-if="nameError.incorrectSurname" class="form_label">Поле должно быть заполнено</label>

        <input type="text" class="form_input" placeholder="8 XXX-xxx-xxxx" name="phone" v-model="phoneNumber"  v-bind:class="{invalid_input:phoneError.incorrectPhone}">
        <label v-if="phoneError.incorrectPhone" class="form_label">{{phoneError.phoneLabel}}</label>
        
        <input class="form_input" placeholder="Пароль" v-model="password" v-bind:type="passwordFieldType"  v-bind:class="{invalid_input:passwordError.incorrectPassword}">
        <label v-if="passwordError.incorrectPassword" class="form_label">{{passwordError.passwordLabel}}</label>
        <div href="#" class="passwordControl" v-bind:class="{passwordControl_View:passwordIcon}" v-on:click="changePassIcon"></div>
        
        <div class="spacer"></div>

        <uploader/>
        
        <button type="submit"  class="form_submit_button">Регистрация</button>

        <div class="spacer"></div>

        <div style="width:80%;">
            <label class="form_checkbox_label">
                <input type="checkbox">
                <div class="form_checkbox_checkmark"></div>
                <div class="form_checkbox_body">Вы соглашаетесь с <a href="/" target="_blank" class="form_checkbox_label_link">условиями конфиденциальности</a></div>
            </label>
        </div>

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
    data() {
        return{
            name: localStorage.getItem("name") || "",
            surname: localStorage.getItem("surname") || "",
            phoneNumber: localStorage.getItem("phone_number") || "",
            password: '',
            passwordFieldType: 'password',
            passwordIcon: false,
            passwordError:{
                incorrectPassword:false,
                passwordLabel:"Поле дожно быть заполнено",
            },
            phoneError:{
                incorrectPhone:false,
                phoneLabel:"Поле дожно быть заполнено"
            },
            nameError:{
                incorrectName:false,
                incorrectSurname:false
            }
        }
    },
    computed:{
        registrationErrors(){
            return this.$store.getters.getAutorizationErrors;
        },
        authStatus(){
            return this.$store.getters.authStatus;
        }
    },
    methods: {
        changePassIcon() {
            this.passwordIcon=!this.passwordIcon;
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
        },
        registerHandler() {
            let first_name= this.name;
            let last_name=this.surname;
            let phone= this.phoneNumber;
            let password= this.password;

            this.nameError.incorrectName=!first_name;
            this.nameError.incorrectSurname=!last_name;
            this.phoneError.incorrectPhone=!phone;
            this.passwordError.incorrectPassword=!password;

            this.phoneError.phoneLabel="Поле телефона должно быть заполнено";
            this.passwordError.passwordLabel="Поле пароль должно быть заполнено"

            if(!this.nameError.incorrectName || !this.nameError.incorrectSurname || !this.phoneError.incorrectPhone || !this.passwordError.incorrectPassword || this.authStatus=='loading' ){
                this.$store.dispatch('register', {first_name,last_name,phone,password}).catch(err => console.log(err))
            }
        },
        
    },
    watch:{
        phoneNumber(newPhone,oldPhone){
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

        name(newName,oldName){
            this.nameError.incorrectName=false;
            localStorage.setItem("name",newName);
        },

        surname(newSurname,oldSurname){
            this.nameError.incorrectSurname=false;
            localStorage.setItem("surname",newSurname);
        },
        password(newPassword,oldPassword){
            this.passwordError.incorrectPassword=false;
            /* 
            в целях безопасности я решил не добавлять пароль 
            если нужно будет добавить пароль, то вписать сюда:

            localStorage.setItem("password",newPassword)

            но я не советую это делать
            */
        },

        authStatus(status){
            if(status=="success"){
                this.$router.push('/user_profile');
            }else if(status=="loading"){
            /*
                Здесь добавлю disabled кнопки для доп задания

                без vuelidate глупо пока что лезть в disabled 
            */
            }else if(status=="error"){
                for(let error of this.authorizationErrors){
                    if (error=="for example password error"){
                        this.passwordError.incorrectPassword=true;
                        this.passwordError.passwordLabel=error;
                    }
                }
            }
        }
    },
    components:{
        Uploader
    }
}
</script>

<template>
    <form class="form" v-on:submit.prevent="authorizationHandler">
        <p class="form_text">Авторизация</p>

        <div class="spacer"></div>

        <input type="text" class="form_input" placeholder="8 XXX-xxx-xxxx" name="phone" v-model="phoneNumber" v-bind:class="{invalid_input:phoneError.incorrectPhone}">
        <label v-if="phoneError.incorrectPhone" class="form_label">{{phoneError.phoneLabel}}</label>

        <input class="form_input" placeholder="Пароль" v-model="password" v-bind:type="passwordFieldType" v-bind:class="{invalid_input:passwordError.incorrectPassword}">
        <label v-if="passwordError.incorrectPassword" class="form_label">{{passwordError.passwordLabel}}</label>
        <div href="#" class="passwordControl" v-bind:class="{passwordControl_View:passwordIcon}" v-on:click="changePassIcon"></div>
        
        <div class="spacer"></div>

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
    data() {
        return {
            password: "",
            phoneNumber: localStorage.getItem("phone_number") || "",
            passwordFieldType: 'password',
            passwordIcon: false,
            saveToken: true,
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
        authStatus(){
            return this.$store.getters.authStatus;
        },
        authorizationErrors(){
            return this.$store.getters.getAutorizationErrors;
        }
    },
    methods: {
        authorizationHandler() {
            this.passwordError.incorrectPassword=!this.password;
            this.passwordError.passwordLabel="Поле пароль должно быть заполнено"

            this.phoneError.incorrectPhone=!this.phoneNumber;
            this.phoneError.phoneLabel="Поле телефона должно быть заполнено";
            
            if(this.passwordError.incorrectPassword || this.phoneError.incorrectPhone || this.authStatus=='loading'){

            }else{
                let phoneNumber = this.phoneNumber;
                let password = this.password;
                let save_token=this.saveToken;
                this.$store.dispatch('login', { phoneNumber, password,save_token }).catch(err => console.log(err));
            }
        },
        changePassIcon(){
            this.passwordIcon=!this.passwordIcon;
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
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
    created(){
        this.$store.dispatch('hidePhoto');
    }
    
}
</script>
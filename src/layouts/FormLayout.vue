<template>
    <div class="form_layout">
        <div class="form_container">
            <div class="form_wrapper">
                <div class="form_logo_container">
                    <img src="@/assets/logo.svg" alt="" class="form_logo">
                </div>
            <img v-bind:src="photoUrl" alt="" v-if="photoShow" class="uploader_file_preview">
            </div>
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        photoUrl(){
            return this.$store.getters.currentPhoto;
        },
        photoShow(){
            return this.$store.getters.refreshPhoto && this.$router.currentRoute._value.path=="/registration";
        }
    },
}
</script>


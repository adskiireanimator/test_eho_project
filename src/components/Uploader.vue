<template>
    <div class="uploader_wrapper">
        <input name="file" type="file" id="uploader_file" class="uploader_file" v-on:change="updatePhoto" multiple>
        <img v-bind:src="photosrc" alt="" v-if="photocheck" class="uploader_file_preview">
        <label for="uploader_file" class="uploader_file_button">
            <span class="uploader_file_icon_wrapper">
                <img class="uploader_file_icon" src="@/assets/uploader.svg" alt="Выбрать файл" width="25">
            </span>
            <span class="uploader_file_button_text">{{button_name}}</span>
        </label>
    </div>
</template>

<script>
export default {
  name: 'Uploader',
  data() {
    return {
        button_name:"Выберите файл",
    }
  },
  methods:{
    async updatePhoto(e) {
        if (this.button_name=="Выберите файл") {
            this.button_name="Фото выбрано"
            console.log(this.button_name)
        } else {
            this.button_name="Фото обновлено"
        }
        console.log(this.button_name)
        this.$store.dispatch('newPhoto',e);
    }
  } 
}
</script>
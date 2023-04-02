<template>
    <div class="uploader_wrapper">
        <input name="file" type="file" id="uploader_file" class="uploader_file" v-on:change="updatePhoto" multiple>
        <img v-bind:src="photosrc" alt="" v-if="photocheck" class="uploader_file_preview">
        <label for="uploader_file" class="uploader_file_button">
            <span class="uploader_file_icon_wrapper">
                <img class="uploader_file_icon" src="@/assets/uploader.svg" alt="Выбрать файл" width="25">
            </span>
            <span class="uploader_file_button_text">Выберите файл</span>
        </label>
    </div>
</template>

<script>
export default {
  name: 'Uploader',
  methods:{
    async updatePhoto(e){
        console.log(25);
        this.$store.dispatch('newPhoto',e);
    }

  }
  
}
</script>
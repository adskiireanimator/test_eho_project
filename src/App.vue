<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import FormLayout from '@/layouts/FormLayout.vue' 
import MainLayout from '@/layouts/MainLayout.vue' 
export default {
  computed:{
    layout(){
      console.log(this.$route.meta);
      return(this.$route.meta.layout||'Main')+'-layout';
    }
  },
  components:{
    FormLayout,
    MainLayout
  }
}
</script>


<style lang="scss">
@import 'assets/index.scss';

</style>

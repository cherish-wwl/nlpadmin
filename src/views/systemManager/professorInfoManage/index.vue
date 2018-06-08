<template>
 <div>
   
    <add-panel v-if="mode == 'add' || mode == 'edit'"></add-panel>
    
    <list-panel v-else></list-panel>
  </div>
</template>
<script>

import { AddPanel, ListPanel } from '@/views/systemManager/professorInfoManage/components'
export default {
  data () {
    return {
      
    }
  },
  components:{
    AddPanel,
    ListPanel
  },
  computed: {
    mode() {
      return this.$store.state.professor.professorPageState
    }
  },
  mounted () {
  },
  watch: {
    $route (){
      // console.log(this.$route)
      if(this.$route.name == "professorInfoManage"){
         this.$store.dispatch('ClearProfessorInfo')
      }
    }
  }
}
</script>

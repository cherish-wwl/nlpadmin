<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll" >
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const  delta= 50

export default {
  name: 'scrollBar',
  data() {
    return {
      top: 0
    }
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3 + 48
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight
      // console.log(eventDelta)
      // console.log($container)
      // console.log($containerHeight)
      // console.log($wrapper)
      // console.log($wrapperHeight)
          
      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta)
      } else{
        this.top = 0
      }
      // else {
        
        //  if ($containerHeight +delta < $wrapperHeight) {
          console.log($containerHeight +delta )
          console.log( $wrapperHeight)
          if (this.top < -($wrapperHeight - $containerHeight + delta)) {
            this.top = this.top
          } else {
            this.top = Math.max(this.top + eventDelta- delta-delta, $containerHeight - $wrapperHeight - delta -delta)
          }
        // } else {
        //   this.top = 0
        // }
      // }
      
      if(this.top >= 80){
        this.top = 0
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $menuBg;
  .scroll-wrapper {
    position: absolute;
     width: 100%!important;
  }
}
</style>

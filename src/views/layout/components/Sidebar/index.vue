<template>
  <scroll-bar>
      <div style='flex:1' class="siderbar">
        <div v-if='ztreeDataSourceSync.length>0'>
           <vue-ztree :list.sync='ztreeDataSourceSync' :func='nodeClick' :expand='expandClick'  :is-open='false' :is-check='false'></vue-ztree>
        </div>
      </div> 
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import ScrollBar from '@/components/ScrollBar'
import vueZtree from '@/components/Ztree/vue-ztree.vue'
import { getList as getServiceList} from '@/api/table'
export default {
  components: { vueZtree, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      'serviceId'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data () {
    return {
      ztreeDataSourceSync:[],
    }
  },
  methods:{
    // 点击展开
    expandClick(node){
      console.log(node)
         
    },
    // 点击节点事情
    nodeClick (node){
      console.log(node)
      if(node.children.length == 0){
        if(node.type == "service"){
          // 跳转到服务页面
          this.$store.dispatch('SetServiceName',node.name)
          this.$store.dispatch('SetServiceId',node.id)
          this.$router.push({path:"/service/serviceManager/"+node.id})
          return
        }else{
          this.$router.push({name:node.id})
        }
      }else{
        if(node.type == "service"){
          this.$store.dispatch('SetServiceName',node.name)
          this.$store.dispatch('SetServiceId',node.id)
          this.$router.push({path:"/service/serviceManager/"+node.id})
        }
      }
    },
    // 初始化数据
    init(){
      var newData = []
      // 判断是否是服务管理页面 获取serviceID
      var serviceId = this.$route.params.servicerId
      var currentRouteName = this.$route.name
      console.log(currentRouteName)
      console.log(serviceId)
      // 获取菜单根目录
      this.routes.forEach((item)=>{     
        if(!item.hidden || item.hidden != true){
          var subNewData = {}
          item.id = item.name  
          item.name = item.meta.title 
          item.open = true     
          if(item.children){                
            item.children.forEach((child)=>{
                child.id = child.name
                child.name = child.meta.title 
                child.open = true 
                if(child.id == currentRouteName){
                  child.clickNode = true
                }  
                if(child.meta.hasChildren){
                  if(child.id =="serviceManager"){
                    child.children = [{}]
                    getServiceList().then(response => {
                      if(serviceId && serviceId.length == 9){
                        this.defaultExpand(response.data,serviceId)
                      }
                      
                      child.children = response.data
                    }) 
                  }
                }
            })
          } 
          subNewData = item
          newData.push(subNewData)               
        }
      })
      console.log(newData)
      this.ztreeDataSourceSync = newData
    },
    // 递归查找
    defaultExpand(data,id){
      data.forEach((item)=>{
        if(item.children && item.children.length !=0){
          if(item.id == id.substring(0,3)){
            console.log(item)
            item.open = true
          }
          if(item.id == id.substring(0,6)){
            console.log(item)
            item.open = true
          }
          this.defaultExpand(item.children,id)
        }else{   
          if(item.id == id){
            item.clickNode = true
            this.$store.dispatch('SetServiceName',item.name)
            this.$store.dispatch('SetServiceId',item.id)
            console.log(item)
            return 
          }
        }
      })
      
    }

  },
  mounted(){
    this.init()
  }
}
</script>
<style lang="scss" scoped>
 
</style>


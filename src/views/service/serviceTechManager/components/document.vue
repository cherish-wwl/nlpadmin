<template>
  <el-row>
    <el-col>
      <h4>简介</h4>
      <el-button type="text" >编辑</el-button>
    </el-col>
    <el-col>
      <article>
        <p><span>Hi，您好，欢迎您使用智慧语义理解开发创新平台。</span></p>
        <p><span>本文档主要服务于NLP开发者，描述本平台提供的基础服务、应用服务的使用方法。</span></p>
        <p><span><br></span></p>
        <p><span>如果您对文档内容有任何疑问，可以通过以下几种方式联系我们：</span></p>
        <p><span>客服QQ：5555588888</span></p>
        <p><span>联系邮箱：aicamp@cnlp.com</span></p>
      </article>
    </el-col>
    <el-col>
      <h4>接口描述</h4>
      <el-button type="text" >编辑</el-button>
    </el-col>
    <el-col>
      <article>
        <p><span>从输入文本中，识别出人名地名机构名及时间词。实际上是对输入文本分词并标注词性后，词性筛选的过程。默认筛选词性为命名实体类型(“nt”, “ns”, “nr”, “te”)时，输出即为命名实体。当然也可以指定输出名词、动词等。</span></p>
      </article>
    </el-col>
    <el-col>
      <h4>请求说明</h4>
      <el-button type="text" >编辑</el-button>
    </el-col>
    <el-col>
      <el-row>
        <el-col :span='4' class="text_right">
          <span>HTTP方法：</span>
        </el-col>
          <el-col :span='20'>
            <span>POST</span>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span='4' class="text_right">
          <span>请求URL：</span>
        </el-col>
          <el-col :span='20'>
            <span>http://60.247.77.164:80/nlpfront/basic_algorithm/segment_cn</span>
        </el-col>
      </el-row>
        <br />
      <el-row>
        <el-col :span='4' class="text_right">
          <span>Body请求示例：</span>
        </el-col>
          <el-col :span='20'>
            <pre class="JSONhtmlStyle" v-html="treeData"></pre>
        </el-col>
      </el-row>
      
    </el-col>
  </el-row>
</template>
<script>
export default {
  filters:{
    fomttorJson:function (value){
      return  ''
    }
  },
  
  data() {
    return {
      treeData: [
        {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>
<style scoped>

.treePanel {
    /* position: absolute;
    right: 150px; */
    border: 1px solid #ddd;
    width: 200px;
    max-height: 450px;
    overflow: auto;
}
</style>


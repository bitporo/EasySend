<script>
  export default {
    onLaunch: function() {
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style>
  #app {
/*    background-color: #f2f2f2; */
    /*uniapp默认不能选择文本，此处重置 */
    user-select: text;
    background-color: var(--p-app-background);
  }
  
  ::selection {
    background-color: var(--p-surface-200);
    /* 背景颜色 */
    color: var(--p-surface-950);
    /* 文字颜色 */
  }
  /*每个页面公共css */
</style>
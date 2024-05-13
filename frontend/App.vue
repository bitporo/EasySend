<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
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
    background-color: #f2f2f2;
    /*uniapp默认不能选择文本，此处重置 */
    user-select: text;
  }

  /*每个页面公共css */
</style>
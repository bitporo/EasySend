<script>
  export default {
    onLaunch: function() {
      // uni.addInterceptor('request', {
      //   invoke(args) {
      //     // request 触发前拼接 url 
      //     args.url = `http://${window.location.hostname}:7071/api` + args.url
      //   },
      //   success(args) {
      //     // 请求成功后，修改code值为1
      //   },
      //   fail(err) {
      //     console.log('interceptor-fail', err)
      //   },
      //   complete(res) {
      //     console.log('interceptor-complete', res)
      //   }
      // })
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
  }

  ::selection {
    background-color: var(--p-surface-200);
    /* 背景颜色 */
    color: var(--p-surface-950);
    /* 文字颜色 */
  }

  /*每个页面公共css */
</style>
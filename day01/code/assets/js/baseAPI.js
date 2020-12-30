//拦截器
$.ajaxPrefilter(function (options) {
  //在ajax发起请求之前,统一拼接根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
})

$(function () {
  // 去注册
  $('#link_reg').on('click', function () {
    // 隐藏登录框
    $('.login-box').hide()
    // 显示注册框
    $('.reg-box').show()
  })
  $('#link_login').on('click', function () {
    // 隐藏注册框
    $('.reg-box').hide()
    // 显示登录框
    $('.login-box').show()
  })
  //定义layui弹出层提示信息
  var layer = layui.layer
  //layui表单验证
  const form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不包含空格'],

    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则 return 一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name="userName"]').val(),
        password: $('#form_reg [name="password"]').val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功')
        $('#link_login').click()
      }
    })
  })

  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: {
        username: $('#form_login [name="userName"]').val(),
        password: $('#form_login [name="password"]').val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        //否则,登录成功,将token值存到本地存储
        localStorage.setItem('token', res.token)
        //然后跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})

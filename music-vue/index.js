var app=new Vue({
    el:'#app',
    data:{
        message:'hello vue',
        note:'<span>world</span>'
    }
})
var app2 = new Vue({
    el: '#app-2',
    data: {
      message: '页面加载于 ' + new Date().toLocaleString()
    }
  })
  var app3=new Vue({
      el:'#app-3',
      data:{
          seen:true
      }
  })
  var app4 = new Vue({
    el: '#app-4',
    data: {
      todos: [
        { text: '学习 JavaScript' },
        { text: '学习 Vue' },
        { text: '整个牛项目' }
      ]
    }
  })
  var app5=new Vue({
      el:'#app-5',
      data:{
          message:'hello js'
      },
      methods:{
          reverseString:function(){
              this.message=this.message.split('').reverse().join('')
                      }
      }
  })

  var app6=new Vue({
      el:'#app-6',
      data:{
          message:'hello vue'
      }
  })
  Vue.component('todo-item',{
      props:['todo'],
      template:'<li>{{todo.text}}</li>'
  })
  var app7=new Vue({
      el:'#app-7',
      data:{
          todos:[
            { id: 0, text: '蔬菜' },
            { id: 1, text: '奶酪' },
            { id: 2, text: '随便其它什么人吃的东西' }
          ]
      }
  })
  console.log(app7.$data);
  
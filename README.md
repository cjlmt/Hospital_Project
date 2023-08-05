## 静态搭建

### 思路分析

- 整个界面分为上、中、下三段。上下两个部分可以拆解为两个全局组件
- 中间的区域用来展示不同的组件，采用路由来实现
- 分析版心宽度 - 1200px
- ![image-20230701195059428](assets/image-20230701195059428.png) 

### 准备工作

- ##### 清除默认样式（reset.scss）

  - 作用：为了消除不同浏览器默认样式的不一致性
  - 使用方法：直接复制粘贴该文件到style文件夹下，main.ts中引入该文件
  - 问题：脚手架无法识别scss文件
    - 解决：安装sass插件，将scss文件转换为css文件
  - 在后面设置样式的时候，也可以采用scss预处理语言来写样式
    - lang=”scss“

- ##### 定义全局组件

  - 作用：全局组件在任意位置都可以直接用，不需要引入

  - ```tsx
    //main.ts文件下定义全局组件
    //引入全局组件
    import HostpitalTop from 'src'
    //定义为全局组件
    app.component('HospitalTop',HospitalTop)
    ```

  - 可以在App.vue中直接使用该组件

## 制作top组件

在component文件夹下新建hospital_bottom和hospital_top文件夹，各自创建一个index.vue 

最外层top盒子宽度百分百，再把内容放在content盒子中，并设置真正的样式

图片不能使用margin 0 auto

盒子居中 - magin0 老师使用的是flex，解决水平和垂直两个方向的问题，字体也不用设置linehighet了（遇到居中多用flex就对了）

记得语义化使用标签，标题就应该使用p/h

及时使用注释，划分不同的区域，显得更加整洁

logo的大小设置准确的宽高

不要担心使用某些方法过于频繁，只要可以准确地达到目的，就可以使用，比如层层使用弹性盒布局

注意top组件是固定在顶部的，要添加一个固定定位（介绍固定定位，设置层级z-index）记得使用该组件的页面都要空出一段头部距离

阴影的制作

根节点temple的要求

透明颜色最好也设置白色底色

顶部塌陷（flex可以解决）

display开启后，元素都会脱离（也不算脱离标准流，就是全到一行上了）flex-direction：column（元素排列方向，修改主轴方向？）

初始组件尺寸设置，可以设置最小高度min-height：700，不要写死，不然后面正式写相应组件的时候修改不了。可以大于700，不能小于700

## 展示路由组件

### 项目路由搭建/配置

要么展示a路由，要么展示b路由

首页

医院详情页  至少两个一级路由

- #### 核心插件vue-router

  - 安装：`npm i vue-router`

- src下新建router文件夹，新建index.ts

- 路由组件放到pages文件夹中。还是和之前一样，一个组件放在一个对应的文件夹中

- #### router的配置

  - rouer3版本和4版本差距还是很大的
  - 引入插件中的createRouter方法，用于创建路由器实例，可以管理多个路由
  - 要在入口文件中安装/引入配置好的路由，就要先在路由文件index.ts中默认暴露配置好的路由器
  - 路由模式设置：采用history模式而非哈希模式
  - 采用路由懒加载
  - <img src="assets/image-20230701211849320.png" alt="image-20230701211849320" style="zoom:67%;" /> 
    - 当访问根的时候，会立马重定向到home首页。这也是我们要设置的
    - ![image-20230701212035260](assets/image-20230701212035260.png) 

- #### 入口文件中引入并安装vue-router核心插件

  - import router from ’@/router‘    index.ts可以省略（貌似也只有ts文件可以这样省略）
  - 实例化应用实例app之后，app.use（router）来安装路由器
  - vue2中是vue.use（），vue3中没有vue构造函数，没有vm，而是使用应用实例。使用实例的use方法来安装

- 路由已经配好了，但是页面不显示

  - 因为没有在模板（应用实例）中进行展示
  - 在对应的位置加一个<router-view></router-view>，即指定了路由组件将要展示的位置

- 每次路由切换跳转后的滚动行为，使滚动条跑到最顶上（常用的）

  - ![image-20230701213304471](assets/image-20230701213304471.png) 
  - vue2也有，但是返回的不是x和y而是left和top

### 首页静态搭建

有轮播图，有表单元素，采用组件库都会方便很多，这里采用element-plus

- #### 使用element-plus

  - npm i element-plus	
  - 不会不要紧，跟着文档慢慢来就好了

- 引入

  - 入口文件main.ts，引入插件和其样式，再使用应用实例app的use方法来安装插件
  - ![image-20230701220350157](assets/image-20230701220350157.png) 
  - 在官网中搜索carousel走马灯也就是轮播图
  - 入口文件中引入了插件后，所有组件都可以使用里面的组件

- #### 使用轮播图组件

  - el-carousel组件要结合子组件el-carousel-item（放置每个轮播图需要展示的内容）一起使用
  - 可以在使用文档中查找对应的API（属性）对应的作用
  - el-carousel-item的渲染可以使用for循环渲染（循环渲染的时候一定不要少了key属性）
  - 可以把做好的轮播图拆成另外一个小的组件，不拆也可以（如果拆了结构会更加清晰，方法还是创建文件夹）

- 组件引入子组件

  - import后就可以在temple中使用了

- 使用autocomplete组件自动补全输入框
  - 使用el-atocomplete标签，输入北京，展示相关建议，其实是发送了请求
  - ![image-20230701222239905](assets/image-20230701222239905.png) 
  - 还是拆成一个组件好，便于管理（search）哪个组件用到的子组件，就拆在哪个组件的文件夹中，这样更加简洁，也是组件要用一个文件夹单独封装的原因
  - 先只考虑静态，但是给el-autocomplete一个类，设置其其宽高根本不好使，因为这是一个组件，不是一个标签
  - scoped（防止不同组件之间的样式相互影响）样式只是局部样式，只针对当前组件生效，如果要修改第三方组件库中组件的样式，就要采用深度选择器。可以先在页面中审查这个第三方组件的元素，要修改的元素的类名是什么
    - 要对这个类名对应元素（不是组件的类名）使用深度选择器来修改样式，有三种（可以网上多了解一下这个深度选择器）
    - 原生css深度选择器    >>>
    - less中的深度选择器     /deep/
    - sass中的深度选择器     ::v-deep   或者:deep(类名选择器)
    - ![image-20230701224505552](assets/image-20230701224505552.png) 
- 按钮组件
  - 比较常用，使用el-button组件即可
  - 安装Element Plus Helper会有element-plus组件相关代码提示

- search组件的样式设计（autocomplete组件和button组件）
  - 外层盒子，开启flex布局，使其居中
- 使用element-plus的icon图标组件**库**
  - 安装图标组件 npm i @element-plus/icons-vue
  - 在**一个组件中引入图标组件** import {Check,Delete} from '@element-plus/icons-vue'（按需引入）
  - 图标组件的使用，在要使用的标签中加上**:icon=”Search“**属性，要加冒号，因为Search是一个数据/组件

#### 主体布局

左侧是医院列表，右侧是平台公告

可以使用flex布局，也可以使用element-plus的layout布局，基于栅格系统（分为24栏）

- element-plus

  - 一行row分为24栏，一列col表示页面纵向只有一个模块

  - ```vue
    <el-row>
        <el-col :span="20"></el-col>
        <el-col></el-col>
    </el-row>
    ```

  - 使用:span划分一行上的份数

  - row标签上的 gutter属性，设置列之间的距离

- 善于拆分组件，将医院等级拆为一个组件，等级子组件，地区子组件region

- 有排比关系的则使用ul li

  - ul li默认独占一行，除了使用浮动一行排列，也可以使用flex默认一行排列
  - scss语法中的li{&active}表示带有active类名的li标签
  - flex-wrap可以让flex布局的子元素放不下的情况下换行显示
  - 列表中的内容到时候会拿到数据循环渲染

##### 医院列表分页展示【10】

思路，将每个代表一个医院的卡片封装为一个组件card（其实卡片组件也是用到element-plus里面的组件），**方便复用**，使用v-for循环渲染，然后可以采用flex换行布局或者使用layout里的栅格系统，或者直接采用element-plus提供的分页器组件

- 饿了么card组件有shadowAPI，鼠标移入的时候有阴影样式，可选：always，hove..

- 适当的时候可以使用百分比布局

- #### 使用iconfont

  - 可以直接复制svg代码，不用下载资源 16px
  - 图片和文字居中对齐，也可以直接使用flex

- 使用分页器组件

  - 写在列表展示的后面， 设置一下pagesize等相关的属性

  - ![image-20230703104853254](assets/image-20230703104853254.png) 

  - 组件默认使用英语，无法自己修改，如果想要使用其他语言，需要在引入element-plus组件库的时候一起引入中文包，并且在要用element-plus插件的时候进行配置，第二个参数传入一个对象
  
  - ```tsx
    app.use(ElementPlus,{
        locale:zhCn,
    })
    ```

  - 中文包是一个mjs文件，无法被识别，需要忽略ts校验`//@ts-ignore`
  
  - ```tsx
    v-model:current-page=""   //显示第几页，需要采用响应式数据
    
    //js
    //引入响应式数据声明关键字
    import {ref} from 'vue'
    
    ```

  - ![image-20230702103401661](assets/image-20230702103401661.png) 因为下拉菜单可以修改一页显示多少条数据，所以也需要将pageSize声明为响应式数据
  
    - 指明数据类型这是用的另外一种方式
    - ：small是否采用小分页器，引号内使用布尔值，省去该属性则默认大小
    - ：disabled是否禁用分页器，当然不禁用，如果有特定情况禁用分页器的场景再开启该属性
    - ：background页码按钮是否需要背景颜色，也是布尔值
    - ：total，显示总共有多少条数据
    - 分页器组件里面分为几个子组件，可以通过layout属性来调整它们之间的位置
      - ->右侧的子组件顶到最右侧![image-20230702104454290](assets/image-20230702104454290.png) 
    - ![image-20230702104256498](assets/image-20230702104256498.png) 

  - 为display:*flex*的父元素不会将该属性*继承*给div子元素

  - #### 发送请求准备工作：二次封装axios并代理跨域
  
    - 向服务器发送请求，获取服务器的数据
    - 使用axios发送请求并对axios进行二次封装
    - `npm i axios`
    - src中新建utils文件夹（实用性工具）封装的axios，封装的其他文件也都可以放到这里
    - 新建request.ts 对于axios函数库进行二次封装
    - ***<u>为什么要二次封装axios（面试常问）</u>***
      - 我封装过axios，目的是
      - 1最重要的是利用axios自带的请求、响应拦截器的功能。在请求拦截器中携带公共参数比如token，响应拦截器中可以把服务器返回的数据进行简化，统一处理http网络错误
      - 2请求拦截器，一般可以在请求头中携带公共的参数：token。如果有100个接口，要发100次请求，每次请求都要携带token此时就可以通过请求拦截器来处理。只要有请求，请求拦截器就会触发
      - 3响应拦截器，可以简化服务器返回的数据。返回一个json，里面有100个key，只取出我们需要的那个。处理http网络错误（404 500进行提示）
    - ***<u>如何封装</u>***
      - 引入axios `import axios from 'axios'`
      - swagger有两个选项-后台管理系统接口+前台接口
      - ![image-20230702125225349](assets/image-20230702125225349.png) 
      - 请求地址的公共部分可以提取为基础路径。**使用该二次封装好的axios实例发送请求，每次请求的地址都会携带这个基础路径，请求路径前后是和谁进行拼接？**
      - 现在其实有两个axios，一个是axios（axios插件提供的axios对象，没有设置基础路径超时，拦截器），一个是request，只不过后者配置了超时时间和基础路径
      - 给axios实例request添加请求拦截器和响应拦截器
      - 请求拦截器中注入一个回调，在回调中一定要返回配置对象，不然发送不了请求
      - ![image-20230702125857811](assets/image-20230702125857811.png) 
        - 配置对象config中有当前请求的基础路径，请求类型，请求头等信息。可以通过这个请求头headers，给服务器携带公共的参数比如经典的token
        - 可以发送自定义请求头属性（为什么？）![image-20230702134947876](assets/image-20230702134947876.png) 
        - 
      - 响应拦截器有两个回调：成功的回调（用于简化数据）+失败的回调（处理http网络错误，要返回一个失败的Promise对象）
        - 成功的回调return的数据会注入到请求发送的then方法中的res参数
      - <img src="assets/image-20230702130435450.png" alt="image-20230702130435450" style="zoom:67%;" /> response就是服务器返回的数据，但是data属性才是我们需要的，所以可以返回response.data（这里要有一个伏笔：axios返回的是Promise对象）
      - error是失败对象，这个对象中有error.message，error.response.status状态码等此次错误相关的信息
        - 根据错误信息进行处理，比如状态码为404时使用element-plus提供的el-message方法，不是组件，所以要引入
        - ![image-20230702135956253](assets/image-20230702135956253.png) 
        - ![image-20230702140133885](assets/image-20230702140133885.png) 
        - 根据状态码，去展示相应的错误提示信息。或者自己写（message就是弹出信息框的内容，type属性决定了弹窗的样式）
        - **<u>状态码也是面试经常会问到的</u>**，还有其他的情况（200，302，304，400语义问题或者、请求参数有误，403没有权限访问，404请求失败，500+服务器挂了）
        - ![image-20230702140644911](assets/image-20230702140644911.png) 可以采用逻辑或
      - 要暴露配置好的axios实例，以在组件中能够使用
    - **<u>*使用封装好的axios对象发送请求*</u>**
      - 发生请求之前要设置跨域，在vite配置文件中配置代理跨域![image-20230702131211434](assets/image-20230702131211434.png) 
      - 请求基本路径要写/api，否则代理服务器不工作。替换请求地址，不需要路径重写，不需要把/api替换为空串，因为请求地址里面有/api![image-20230703124038774](assets/image-20230703124038774.png) 
      - <img src="assets/image-20230702132128087.png" alt="image-20230702132128087" style="zoom:67%;" /> 配置好代理跨域
      - 现在就可以使用axios发送请求了
      - 在要发送的组件中引入axios组件， import request from '@/utils/request.ts'
      - **测试**：组件挂载完毕就发送请求，需要在语法糖中使用onMounted生命周期钩子，从vue中引入这个组合式API
      - ![image-20230702133201506](assets/image-20230702133201506.png) 
      - 请求要带两个参数，当前第几页，一页几条数据
      - baseURL已经有/api了就不需要了
      - ![image-20230702133707416](assets/image-20230702133707416.png) url参数可以直接写在url上
      - 可以显示数据，证明axios的封装是没有问题 的
    - 回头继续配置二次封装的axios对象的请求拦截器

  - #### 获取数据，动态展示卡片【11】

    - 问题：如果在组件中直接axios.get('/hosp/...')，假如服务器接口地址发生变化，就要在众多的组件中找到axios.get并对请求路径进行修改就太麻烦了。

    - 所以在项目中，对于项目中的请求一般都要统一管理

    - ##### 统一管理项目中的请求（便于管理请求，如果接口路径改变，找到对应文件修改即可 ）

      - src新建api文件夹管理所有的请求。因为每个模块/每个页面都有几个接口，所以每个模块再新建文件夹存放当前模块的请求，比如api-home/hospital。再新建index.ts用于封装首页相关的所有请求

      - index.ts中引入二次封装的axios

      - 可以在api页面查看该接口可接收的参数（返回第几页的数据，每页有多少条数据）有些参数要通过路径传入，有些参数通过（**请求头参数传入？**）

      - ![image-20230702144335966](assets/image-20230702144335966.png) 

      - ![image-20230702145936282](assets/image-20230702145936282.png) 
  
      - ![image-20230703132909222](assets/image-20230703132909222.png)不可以这样写，其实可以，但是忘记了中间有个斜杠
  
      - ```tsx
        //将接口对外暴露
        export const reqHospital = (page:number,limit:number) => request.get(API.HOSPITAL_URL+`${page}/${limli}`)
        //其实这就相当于返回了一个函数出去 错错错 这是将发送请求后响应回来的数据返回给了reqHospital 错错错 就是返回了这个发送请求的函数原型*****
        const reqHospital = function(page:number,limit:number){
            **return** request.get(API.HOSPITAL_URL+`${page}/${limli}`)
        }
        //然后再将这个函数返回了出去
        export default reqHospital
        //老师写法只是将两者合在一起，并且采用了箭头函数
        
        //但export const 变量 这是分别暴露，引入时需要加大括号
        ```

        - 但是不可以使用默认暴露，因为这个api文件里面汇集了所有首页需要发送请求的接口，所以要分别暴露

      - ![image-20230702145515817](assets/image-20230702145515817.png) 响应体包含了这些信息，根据参数的不同返回的内容也不同，所需的内容都在response.data.content中
  
    - 发送请求的时机，点击页码的时候分页器页码变化，初始加载页面（页码默认为1，组件挂载完毕）的时候
  
      - <img src="assets/image-20230702150212416.png" alt="image-20230702150212416" style="zoom:50%;" /> 
      - 要引入onmounted（vue3中封装为了一个组合式API）
      - ![image-20230702151859742](assets/image-20230702151859742.png) 
      - 因为axios返回的是Promise对象，需要拿到它成功的结果，要在其前面加上await，对应的函数修饰符使用async
      - 为什么封装为一个函数，因为发送请求的流程不只是写一个reqHospital就完事，还要写发送请求后成功响应进行的操作，而且还要传入实参，但因为实参都是一样的，把这些操作都封装在一个函数中，不同事件发送请求都只用调用这个函数即可
      - 因为组件会根据当前返回的数据，响应式的更新页面上循环渲染的医院卡片，所以获取到响应的数据后要存储为响应式数据![image-20230702152148551](assets/image-20230702152148551.png) 
      - ![image-20230702152405665](assets/image-20230702152405665.png) 
      - ![image-20230702152508126](assets/image-20230702152508126.png) 返回的result数据的data属性包含对数据的一些描述，比如元素的总个数，总页数，都是我们需要呈现到页面上的，所以可以存为响应式数据。total.value = totalElements
        - 注意ref定义的响应式数据内容在value属性当中！
      - 医院数据存储好后，需要循环渲染并且传递数据到card子组件中。使用props进行父子组件通信
      - ![image-20230702161449883](assets/image-20230702161449883.png) 
      - 子组件要接收父组件传递过来的props->也就是医院数据![image-20230702153429547](assets/image-20230702153429547.png) 有了医院数据后，要做的就是使用插值语法将需要的数据从存储的响应式对象中取过来
      - 图片数据进行了加密，使用base64，以ivb开头，不能直接访问![image-20230702155934251](assets/image-20230702155934251.png) 要将这一串代码于前面这串进行拼接就可以展示了，记得img的src要采取：因为是动态数据
      - ![image-20230703142543879](assets/image-20230703142543879.png) 
      - ![image-20230703142531357](assets/image-20230703142531357.png)
  
  - #### 点击分页器发送请求响应医院列表【11】
  
    - 分页器有很多属性和事件，我们可以利用分页器的事件，在**当前页面和页面大小改变**时重新发送请求<img src="assets/image-20230702161247648.png" alt="image-20230702161247648" style="zoom:67%;" />（因为当前页面变量和分页器是使用v-model进行绑定了的，如果修改分页器的页码，那么当前页面变量的值也会发生改变)直接发送请求就好了
    - ![image-20230702160803225](assets/image-20230702160803225.png) 
    - ![image-20230702161534946](assets/image-20230702161534946.png) 
    - ps函数都要这样使用函数表达式声明吗，不可以使用具名函数声明吗。**好像不可以写普通函数**![image-20230702162955420](assets/image-20230702162955420.png)
    - <img src="assets/image-20230702162028308.png" alt="image-20230702162028308" style="zoom:67%;" /> 
    - 问题：如果获取的数据中有些数据的某些字段是没有的，但是循环渲染的时候又用到了这些数据，则需要对获取不到的数据进行处理
      - ![image-20230702162524260](assets/image-20230702162524260.png) 
      - 意思就是如果有bookingRule这个对象的时候，才会取后面的属性，是ts中的语法
      - 用逻辑运算符应该也可以？
  
  - #### 将数据和分页器结合，可以实现切换【11】
  
    - below

##### 已有医院数据的ts类型定义

比如api文件夹下home模块的api，对其返回的数据的ts类型没有定义

- 怎么定义？
  - home文件夹下再新建一个type.ts
  - 所有的接口返回的响应体都包含code，message和ok，可以看到失败的时候响应体data为null，所以只把前面三个定义为一个接口，data就算了。定义好频繁的复用即可，只有实现了这个接口才满足规范
  - ![image-20230702172425158](assets/image-20230702172425158.png) 
  - data中content属性是个数组，每个对象是个医院，对医院的数据声明其ts类型，一个医院对象会包含哪些数据
  - <img src="assets/image-20230702173211346.png" alt="image-20230702173211346" style="zoom:50%;" /> <img src="assets/image-20230702173155075.png" alt="image-20230702173155075" style="zoom:50%;" /> 已有医院数据ts类型（即使很多字段都没有用到也放到接口中，比较严谨，应该可以省略。老师建议没用的也定义ts类型，如果觉得这样麻烦直接设置为any也可以）
  - **原则**：组件开发用过哪些字段，就给哪些字段定义ts类型（也就是interface接口）。
  - 所以content也要声明ts类型
  - ![image-20230702173506508](assets/image-20230702173506508.png) 
  - 定义接口返回数据的类型~~（响应体中的数据）~~和responseData的区别是什么 
  - <img src="assets/image-20230702173931170.png" alt="image-20230702173931170" style="zoom:50%;" /> <img src="assets/image-20230702174133686.png" alt="image-20230702174133686" style="zoom:50%;" />
    - 为什么要继承，因为有内容的医院数据要有code、ok那三个字段，除此之外才是真正的数据data
    - responsedata是所有接口返回的内容需要满足的规范，而hospitalresponsedata是医院数据接口返回的内容需要满足的规范
  - api使用定义好的ts类型，设置接口返回数据的ts类型（给接口**返回值**设置ts类型）。
  - ![image-20230702175742425](assets/image-20230702175742425.png) 
  - ![image-20230702174448651](assets/image-20230702174448651.png) 为什么还要指定any？？？
  - 组件中用到了这些数据的地方也要进行约束
  - ![image-20230702175456195](assets/image-20230702175456195.png) 已经通过泛型约束好了
  - ![image-20230702175437451](assets/image-20230702175437451.png) 
  - ![image-20230702175551322](assets/image-20230702175551322.png) 
  - ![image-20230702175613157](assets/image-20230702175613157.png) 
  - 这样用到接口的ts类型以及用到的数据它们的类型就补写好了
  - axios超时的回调
    - <img src="assets/image-20230703152220887.png" alt="image-20230703152220887" style="zoom:50%;" /> 
    - ![image-20230703152229634](assets/image-20230703152229634.png) 
    - ![image-20230703152236774](assets/image-20230703152236774.png) 
    - ![image-20230703153617862](assets/image-20230703153617862.png) 必须要在response后面加一个问好，我们的本意是如果status属性取不到（response对象不存在)就进行else语句，但是如果不加问号，就会在获取status属性的时候报错，不进入else中

##### 首页医院等级与地区数据展示

这一节要做的就是发送请求获取医院有哪些等级和区域进行展示，而不是写死

<img src="assets/image-20230702180425850.png" alt="image-20230702180425850" style="zoom:67%;" />

使用公共数据接口，如果要获取医院等级，则传递Hostype。如果要获取北京的区域，则输入Beijin

因为还是首页要获取这个接口的数据，所以把发送这个接口地址的请求写在api-home里

<img src="assets/image-20230702183746431.png" alt="image-20230702183746431" style="zoom:50%;" /> 

<img src="assets/image-20230702183951585.png" alt="image-20230702183951585" style="zoom:67%;" /> 字符串拼接

ts类型：因为这个接口返回的数据会在组件中使用，所以还是要给返回的数据定义一个类型

- data数组中某一个等级或者某一个医院的数据
  - 数据中的value非常有用，可以进行后续的过滤
  - <img src="assets/image-20230702184701190.png" alt="image-20230702184701190" style="zoom:67%;" /> 
- 组件中会使用data这个数组，用来遍历循环渲染
  - ![image-20230702185142671](assets/image-20230702185142671.png) 
  - 注意用的是type，interface是针对对象的
- 获取等级或医院地区时，接口返回的数据的类型（响应体的类型）
  - <img src="assets/image-20230702185343054.png" alt="image-20230702185343054" style="zoom:67%;" /> 
- 先在首页的api文件中中引入接口返回数据的ts类型，然后给请求函数的返回值指定ts类型
  - ![image-20230702185914804](assets/image-20230702185914804.png) 
  - any是不是因为request.get返回的本应该是一个promise对象？
- 组件进行获取等级的数据
  - 在**等级组件**中引入接口请求函数
  - 引入接口返回数据的类型
  - 一挂载完毕的时候（引入钩子组合式API），就获取医院等级的数据
    - 还是把发请求封装成一个函数
    - <img src="assets/image-20230702190821455.png" alt="image-20230702190821455" style="zoom:67%;" /> 
    - 组合式API都是这么写吗onmounted( ()=>{} )
  - 声明变量存储医院的等级数据，使用**泛型约束**一下这个变量的类型（感觉好像没有必要响应式吧？又不会发生变动）
    - ![image-20230702191022533](assets/image-20230702191022533.png) 
    - <img src="assets/image-20230702191222587.png" alt="image-20230702191222587" style="zoom:67%;" /> 这个状态码的判断还是很重要的
  - 给组件起名字
    - 要使用vue2的写法
    - 所以要多写一个script标签，因为不可以将vue2语法写在setup语法塘里
    - ![image-20230702191413272](assets/image-20230702191413272.png) 
    - ![image-20230702202920257](assets/image-20230702202920257.png) 
  - 高亮效果切换
    - **我的思路：**
    - 点击某个等级后，全部的高亮效果转移到点击的等级上
    - 要给所有的li绑定一个点击事件，点击后将active元素的active样式去除，然后再给点击的元素添加这个类
    - **因为等级是首页组件的子组件，所以点击后还要把点击的等级元素的value值传递给父组件。父组件拿着这个value发送请求进行筛选**（这个是正确的）
    - **正确思路：**
    - 将当前选中的等级存储为一个响应式的值，值是多少，对应value的li元素就添加active类
    - ![image-20230702203746434](assets/image-20230702203746434.png) 默认是空串
    - ![image-20230702204007123](assets/image-20230702204007123.png) 为什么可以这样写，是对象吗
      - 其实这里使用了动态class方法，采用的是对象形式
    - ![image-20230702204931112](assets/image-20230702204931112.png) 使用vue的方法给标签定义点击事件，在这之前定义一个changeLevel函数
      - ![image-20230702205209033](assets/image-20230702205209033.png) 
      - ![image-20230702205242341](assets/image-20230702205242341.png) 
      - 全部对应的li也要有一个点击事件
      - ![image-20230702205405603](assets/image-20230702205405603.png) 
  - 区域组件的方法和等级组件的方法是一样的
    - 和等级组件一样，引入请求方法，还是把获取区域数据的请求封装为一个函数
    - <img src="assets/image-20230702210353484.png" alt="image-20230702210353484" style="zoom:67%;" /> 
    - 也是为了区分组件，也用vue2的方法给该组件进行重命名
      - ![image-20230702210457953](assets/image-20230702210457953.png) 
    - 高亮切换
      - ![image-20230702210627872](assets/image-20230702210627872.png) 
      - ![image-20230702210928167](assets/image-20230702210928167.png) 
      - ![image-20230702211008032](assets/image-20230702211008032.png) 
      - ![image-20230702210907691](assets/image-20230702210907691.png) 

#### 【4】根据等级和地区筛选符合条件的医院（14）

```markdown
我的思路：点击某个等级或者某个地区后，会触发事件重新发送请求获取医院列表，根据新的医院列表循环渲染
```

- #### 思路分析：

  - 原本获取每页医院数据的接口，不仅可以接收page和limit参数，还可以接收其他参数比如我们需要的`hostype和districtCode`参数，所以~~重新封装~~修改发送请求的函数，**多**传递这两个参数。等级或医院组件里把当前点击的值传给父组件home，父组件收到参数再发送请求，获取新的医院列表

- #### 修改原先home-api下管理的请求

  - ```tsx
    //api-home-index
    export const reqHospital = (page: number, limit: number, hostype='', districtCode='') => request.get<any, HospitalResponseData>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
    ```

  - 给hostype、districtCode这两个参数默认值''，如果发送请求时没有传入等级和地区参数，空字符串意味着这两个参数没有接收到值，没有带搜索条件

- #### 父组件home接收子组件的值发送请求：等级

  - ##### 声明存储接收过来的等级和地区变量（都是响应式的）

    - ```tsx
      //存储医院的等级相应数据
      let hostype = ref<string>('')
      //存储医院的地区相应数据
      let districtCode = ref<string>('')
      ```

    - 默认值是空串，并且在函数调用时记得指定泛型（定义函数时，不预先指定具体的类型，具体什么类型是调用这个方法的时候决定的，比如参数和返回值的类型）

  - ##### 修改封装的请求函数

    - ```tsx
      let result: HospitalResponseData = await reqHospital(pageNo.value, pageSize.value, hostype.value, districtCode.value)
      ```

  - ##### 子组件向父组件通信发送数据，使用【自定义事件】

    - 子组件标签定义自定义事件

      - ```tsx
        <Level @getLevel="getLevel" />
        ```

    - 父组件定义自定义事件触发后的回调

      - ```tsx
        const getLevel = (level: string) => {
            hostype.value = level
            //发送请求,不用传递参数，请求函数内部自己会取数据
            getHospitalInfo()
        }
        ```

      - 触发后将子组件传过来的值保存到父组件自己的等级变量中，并发送请求重新获取医院列表

    - 子组件按钮点击回调函数的修改(触发自定义事件)

      - ```tsx
        //level-index
        cnost changeLevel = (level:string)=>{
            activeFlag.value = level
            //触发自定义事件：将医院等级参数回传给父组件保存起来
            $emit('getLevel',level)
        }
        //接收该组件被绑定的自定义事件
        let $emit = defineEmits(['getLevel'])
        ```

    - 等级的筛选至此结束了，地区的筛选同理

- #### 父组件home接收子组件的值发送请求：地区

  - 给地区子组件标签绑定自定义事件和对应的回调函数
    - ![image-20230703205438460](assets/image-20230703205438460.png) 
  - home里面写好回调函数的内容
    - ![image-20230703205749511](assets/image-20230703205749511.png) 
  - 子组件接收和触发自定义事件
    - ![image-20230703205525836](assets/image-20230703205525836.png) 

- #### 空状态组件

  - 当列表数据为空时，需要有一个组件占位

    - ```tsx
      <el-empty discription="discription" v-if="!hasHospitalArr.length" />
      //或者使用v-if和v-else搭配
      <div class="card-container" v-if="hasHospitalArr.length > 0">
          <Card /*略*/></Card>
      </div>
      <el-empty discription="没有医院的信息" v-else />
      ```

    - 放在卡片组件的下面

- #### [*]path参数/query参数

  - query貌似才是我们平时说的url参数

- #### [*]响应式数据使用注意

  - ref定义的响应式数据取值的时候记得加.value

- #### [*]分清楚两个封装的请求函数间的关系

- #### [*]v-if与v-else

#### 【5】根据关键字搜索医院（15）

- #### 思路分析

  - 将输入的关键字存储在搜索子组件中，不用传递给父组件home因为需要数据列表的也是autocomplete组件，绑定输入框事件(fetch-suggestions)，向服务器发送请求获取医院列表（有可以直接使用的接口地址），使用输入事件的回调的参数callback。并且点击后要进入该医院的详情页面

- #### 管理新的接口地址（API）和封装新的请求发送函数

  - ```tsx
    //api-home-index
    //根据关键字医院的名字获取数据
    HOSPITALINFO_URL-'/hosp/hospital/findByHosname/'
    
    //根据关键字获取医院的数据进行展示
    export const reqHospitalInfo = (hosname: string) => request.get(API.HOSPITALINFO_URL + hosname)
    ```

- #### 定义上述方法返回的响应数据的ts类型

  - ```tsx
    export interface HospitalInfo extends ResponseData{
        data: Content
    } 
    ```

  - 定义好后在api管理文件中引入并补充类型

  - ```tsx
    import {HospitalInfo} from './type.ts'
    
    export const reqHospitalInfo = (hosname: string) => request.get<any, HospitalInfo>(API.HOSPITALINFO_URL + hosname)
    ```

- #### el-autocomplete触发事件执行回调

  - ##### 定义变量收集搜索的关键字（医院的名字）

    - el-autocomplete有一个属性用于收集表单的数据

    - ```tsx
      <el-autocomplete ... v-model="hosname"/>
      
      import {ref} from 'vue'
      //收集搜索的关键字,约束为string
      let hosname = ref<string>('') 
      ```

  - ##### 自动补全组件的fetch-suggestions属性+trigger-on-focus属性

    - ```markdown
      fetch-suggestions的回调会在聚焦时和输入完一段文字后都会触发（实现了防抖节流）,但是我们不需要一聚焦就触发回调函数，因为这个时候收集的关键字为空。
      ```

    - ##### trigger-on-focus

      - 聚焦的时候是否触发回调函数，默认值为true，设置为false取消

    - ##### fetch-suggestions回调函数的参数注入

      - 触发时自动向回调传入了两个参数：queryString，callback。前者其实就是此时输入框中的关键字（等价于hosname）后者是一个函数

    - ##### 参数callback的作用

      - callback用于将发送请求获取的数据数组返回给autocomplete组件，让其帮你展示。
      - 但是注意，callback函数接收的数据是有**一定格式的**，要展示的每一项数据项的值必须来自于对象中的**value属性**

    - ```tsx
      <el-autocomplete ... :fetch-suggestions="fetchData"/>
      
      const fetchData = (queryString: string,cb: any)=>{
          //console.log(123)
      }
      ```

  - ##### fetch-suggestions回调函数中发送请求获取数据

    - **引入请求方法和ts类型响应数据的类型**，并使用awiait配合promise对象

    - 这个fetchData回调里面**不用再封装一个请求方法**了，因为也只有fetch-suggestions需要这个回调函数，直接在这个回调里发请求

    - 传递给el-autocomplete组件的showData数据**不能只有value这一个字段**，因为后续还需要点击该条advice进入医院的详情页，所以对象中**还需要医院编码字段**，用于发送请求获取对应的医院数据：hoscode

    - ```tsx
      import {reqHospitalInfo} from'@/api/home/index'
      import type {HospitalInfo} from '@/api/home/type'
      
      const fetchData = async (keyword: string,cb: any)=>{
          //当用户输入完关键字此函数会执行一次，发请求获取需要展示的数据
          let result: HospitalInfo = await reqHospitalInfo(keyword)
          //给组件提供展示的数据
          //cb(result.data)
          //但是这么写根本没有展示出来
          //整理数据，变成该组件需要的数据格式。
          let showData = result.data.map(item => {
          return {
              value:item.hosname,//展示医院的名字
              hoscode:item.hoscode //存储医院的编码
          	}
      	})
      	//然后再用callback传递给组件展示
      	cb(showData)
      }
      ```

- #### 选中医院advice跳转路由

  - ```markdown
    至此，auto-complete组件输入文字后会触发相应的回调函数发送请求获取数据显示在建议提示框中，我们需要点击某个建议项**执行相应的回调，跳转路由**至医院详情页
    ```

  - ##### 点击事件属性：@select

    - autocomplete组件自带的一个属性，点击某个建议项后则会执行属性对应的回调函数
    - 调用对应回调函数时会把选中的建议项作为参数注入进来，所以定义回调的时候可以接收参数

  - ```tsx
    <el-autocomplete ... @select="goDetail"/>
    //点击某一个建议项的回调
    const goDetail = (item: any)=>{
        //点击建议项跳转到医院详情页，将来要携带query参数
    }
    ```

  - ##### 使用路由插件的useRouter方法【路由跳转核心代码】

    - ```tsx
      //引入路由器创建方法
      import {useRouter} from 'vue-router'
      
      //创建路由器对象
      let $router = useRouter()
      
      const goDetail = (item: any)=>{
          $router.push({path:'/hospital'})
      }
      ```

- #### 点击卡片跳转路由至医院详情页

  - ##### `可以给组件标签绑定点击事件，也可以在组件内给最大盒子绑定点击事件，但是因为回调函数跳转路由还要把当前医院的编码传递过去，如果是在组件外点击，则无法获得组件内医院的详细数据。所以应该在组件内点击事件跳转路由`

  - ```tsx
    <el-card shadow="hover" @click="goDetail">
    //和建议项跳转路由方法相同
        
    import {useRouter} from 'vue-router'
    
    //创建路由器对象
    let $router = useRouter()
    
    const goDetail = (item: any)=>{
        $router.push({path:'/hospital'})
    }
    ```
    
  - ##### 跳转路由携带的参数

    - 每个card组件接收了来自home父组件通过**props传递的数据**，从这个数据中取即可

    - 但是props声明接收的数据只可以在模板中的插值语法里使用，**脚本里使用，需要用变量接收**
    
    - ```tsx
      const goDetail = (item: any)=>{
          //console.log(props.hosspitalInfo)
          $router.push({path:'/hospital'})
      }
      let props = defineProps(["hospitalInfo"])
      ```

- #### 点击hospital_top的logo区域，跳转路由回到home

  - ```tsx
    <div class="left" @click="goHome">
    
    import {useRouter} from 'vue-router'
    //创建路由器对象
    let $router = useRouter()
    
    const goHome = ()=>{
        //编程式导航跳转到首页
        $router.push({path:'/home'})
    }
    ```

- ##### 路由跳转时传递参数

  - 跳转路由到医院详情页必须要带参，因为只有这样才知道医院详情页展示哪一家医院的数据，发送对应的请求

- #### [*]如果想在vue开发者工具中快速找到该组件可以起一个名字


#### 【6】常见科室静态搭建（16）

`没有接口，硬搭`

- 善用display:flex
- 图标包括箭头图标可使用iconfont

- #### [*]列表元素处理

  - ##### 单行显示

    - ```tsx
      //溢出隐藏
      overflow: hidden;
      //超出部分显示形式
      text-overflow: ellipsis;
      //不换行
      white-space: nowrap
      ```

  - ##### list-style

    - 理想效果：<img src="assets/image-20230704141324963.png" alt="image-20230704141324963" style="zoom:67%;" /> 

    - 无法使用list-style属性，设置了单行显示后，list-style失效了。而且也设置不了其颜色

    - ##### 方法1： 

      - ```tsx
        <li>
            <div class="point"></div>
            关于延长北京大学国际医院更新通知
        </li>
        ```

      - 可以单独创建一个盒子模拟小圆点

    - ##### 方法2：before伪元素

      - ```vue
        //不需要给li一个左padding
        <ul class="content">
            <li>关于延长北京大学国际医院更新通知</li>
            <li>北京中医药大学东方医院部门更新通知</li>
            <li>武警总医院号源暂停更新通知通知</li>
        </ul>
        //css
        li::before {
            content: "";
            border-radius: 50%;
            margin-bottom: 2px;
            margin-right: 5px;
            width: 4px;
            height: 4px;
            background-color: skyblue;
            display: inline-block;
        }
        ```

### 医院详情页静态搭建

#### 医院详情菜单与子路由配置

```markdown
home页面和hospital医院详情页都属于一级路由，而在医院详情页中又有**导航区和路由组件展示区**，所以还需要**二级路由**，hospital组件中**包含五个子路由组件**
```

- ##### 医院详情页静态搭建

  - 整体的布局分为左侧和右侧，可以使用elment-plus的栅格系统，也可以直接采用flex布局平分份数

  - ```scss
    .hospital {
        display: flex;
        .menu {
            flex: 2;
        }
        .display {
            flex: 8;
        }
    }
    ```

  - ##### 导航区静态搭建

    - 菜单可以自己用ul>li，也可以使用**element-plus提供的menu组件**

    - ```tsx
      <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item index="1">
              <el-icon><icon-menu /></el-icon>
              <span>Navigator One</span>
          </el-menu-item>
          <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>Navigator Two</span>
          </el-menu-item>
      </el-menu>
      //多级菜单项使用<el-sub-menu>标签
      
      //default-active表示页面加载时默认激活菜单项的index
      ```

    - 图标的引入

    - ```tsx
      //可以导入element-plus提供的图标，在官网把图标组件名字复制过来即可
      import {
        Document,
        Menu as IconMenu,
        Location,
        Setting,
      } from '@element-plus/icons-vue'
      //然后在<el-icon>标签中使用，要使用ele的图标，外面必须套一个el-icon标签
      <el-icon> <Document /> </el-icon>
      ```

- ##### 新建二级路由组件并配置路由

  - ```markdown
    还是在pages-hospital文件夹下新建5个文件夹和对应的index.ts。简单写一下二级组件的内容
    ```

  - ##### 【1】配置路由

  - ```tsx
    {
        path: '/hospital',
            component: () => import('@/pages/hospital/index.vue'),
                children: [
                    {
                        path: 'register',
                        component: () => import('@/pages/hospital/register/index.vue')
                    },
                    {
                        path: 'detail',
                        component: () => import('@/pages/hospital/detail/index.vue')
                    },
                    {
                        path: 'notice',
                        component: () => import('@/pages/hospital/notice/index.vue')
                    },
                    {
                        path: 'close',
                        component: () => import('@/pages/hospital/close/index.vue')
                    },
                    {
                        path: 'search',
                        component: () => import('@/pages/hospital/search/index.vue')
                    }
                ]
    },
        //path不要斜杠吗？
    ```

  - ##### 【2】路由切换

  - ```tsx
    //为了方便，将导航栏的唯一标识改为对应组件的路由地址(其实可做可不做 | 错，后面有用，根据路由地址选择高亮的是哪一个)
    <el-menu default-active="/hospital/register" class="el-menu-vertical-demo">
        <el-menu-item index="/hospital/register">
            <el-icon>
                <Document />
            </el-icon>
            <span>预约挂号</span>
        </el-menu-item>
    ```

    - element的menu组件每个导航项有一个**@click属性**，可以绑定点击事件下的回调函数，进行路由的跳转

  - ```tsx
    //指定回调函数，传入要跳转的地址
    <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
        <el-icon>
            <Document />
        </el-icon>
        <span>预约挂号</span>
    </el-menu-item>
    
    // 引入路由器创建函数
    import { useRouter } from 'vue-router'
    //创建路由器对象                           //不要引入错成createRouter了
    let $router = useRouter()
    //回调函数中跳转
    const changeActive = (path: string) => {
      $router.push({ path: path })
    }
    ```

  - ##### 【3】可以成功跳转路由，如何实现进入医院详情页默认切换至预约挂号路由组件

    - 修改所有进入医院详情页的路由切换函数，**将/hospital加上二级路由**

    - **注意，二级路由跳转路由传递的路径要包含一级路由的路径**

    - ```tsx
      //自动补全组件的goDetail回调
      <el-autocomplete clearable class="inline-input w-50" placeholder="请输入医院名称" v-model="hosname"
          :fetch-suggestions="fetchData" trigger-on-focus="false" @select="goDetail" />
      //卡片组件的goDetail回调
      <el-card shadow="hover" @click="goDetail">
          
      $router.push({ path: '/hospital/register' })
      //不要想的那么复杂
      ```

    - ##### 可不可以采用onMounted的方法使得进入医院详情页的时候路由跳转至预约挂号路由组件

      - ```tsx
        onMounted(() => {
          $router.push({ path: '/hospital/register' })
        })
        //不可以，因为处于医院详情页的其他组件时，刷新会重新挂载重置到预约挂号路由组件
        ```

    - ##### 可不可以采用声明变量保存当前路由地址，每一次刷新挂载时跳转的时刚才的路由地址

      - 不可以，因为不管声明普通变量还是响应式数据，**当前页面刷新后，所有的代码重新执行，变量里的数据恢复默认值**，无法保留之前修改的路由地址
      - 此外，**刷新当前路由页面，路由路径不会改变，所以刷新后还是处于该路由组件内**

    - ##### 刷新后路由组件不变，那菜单menu组件的默认高亮怎么同步而不是默认预约挂号路由组件？

      - 修改menu组件的**default-active**属性，将其动态指定为当前组件的导航项的唯一标识。**获取当前路由地址**就相当于获取了当前组件的导航项的唯一标识，动态和**default-active**属性绑定在一起即可（**怎么获取当前路由的信息？**）

      - ```tsx
        import {useRoute} from 'vue-Router'
        //获取当前路由的信息
        let $route = useRoute()
        
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        ```

#### Pinia仓库存储医院详情数据

- #### 思路分析

  - 点击医院卡片切换路由进入到医院详情页时，要**携带参数**：医院的编码，发送请求从接口获取指定医院的数据

- #### 路由传参

  - ```tsx
    const goDetail = () => {
        $router.push({ path: '/hospital/register', query: { hoscode: props.hospitalInfo.hoscode } })
    }
    //auto-complete
    const goDetail = (item: any) => {
      $router.push({ path: '/hospital/register', query: { hoscode: item.hoscode } })
      console.log(item);
    }
    ```

  - query参数会出现在地址后面

- #### 管理新的接口和封装请求方法

  - 获取医院预约挂号详情数据的接口，需要传递医院编码（其实五个二级路由组件用到的数据都来自这一个接口）

  - ```tsx
    //api-hospital-index.ts  换文件了注意
    //引入二次封装的axios对象，使用它来发送请求
    import request from '@/utils/request'
    //枚举请求地址
    enum API {
        HOSPITALDETAIL_URL = '/hosp/hospital/'
    }
    //获取医院详情的接口
    export const reqHospitalDetail = (hoscode: string) => request.get(API.HOSPITALDETAIL_URL + hoscode)
    ```

- #### 定义上述请求获取的数据的ts类型

  - ```tsx
    export interface ResponseData {
        code: number,
        message: string,
        ok: boolean
    }
    //医院详细数据ts类型
    export interface HospitalDetail {
        ....
        "intro": null,
        "route": string,
        "status": number,
        "bookingRule": null  //null直接写null
        ...
    }
    //医院详情返回数据
    export interface HospitalDetailResponseData extends ResponseData {
        data: HospitalDetail
    }
    ```

  - ```tsx
    export const reqHospitalDetail = (hoscode: string) => request.get<any, HospitalDetailResponseData>(API.HOSPITALDETAIL_URL + hoscode)     //通过指定泛型来定义接口返回数据的ts类型
    ```

- #### 发送请求-1

  - 因为这个接口返回的数据是五个子组件公用的，所以应该**在hospital组件中发送请求获取数据存储数据，然后再传给子组件**，否则就要每个接口发一次总共发五次了。*<u>经过优化，现在不再是跳转到hospital路由组件，而是默认跳到hospital里面的二级路由，但hospital组件仍然可以获取当前路由的地址里的参数，从而指知道现在应该显示哪个医院，请求哪个医院的数据</u>*。但是这五个组件是**路由组件（router-view）而不是死的组件，要传很复杂**

  - ##### 最优解决办法：

    - **将接口中获取的数据存储在仓库中，只要是组件就可以从仓库中要数据**。使用Pinia仓库

- #### Pinia仓库的使用

  - ##### 安装

    - `npm i pinia`

  - ##### 新建仓库

    - src-新建store文件夹-新建index.ts文件（创建大仓库和小仓库的方法不一样）

    - ```tsx
      // 引入创建仓库方法
      import {createPinia} from 'pinia'
      
      // 创建仓库对象，并对外暴露
      export default createPinia()
      ```

  - ##### 入口文件安装Pinia插件

    - ```tsx
      //main.ts
      // 引入Pinia仓库插件
      import pinia from '@/store/index'
      // 安装Pinia插件
      app.use(pinia)
      ```

  - pinia仓库也可以模块式开发，如果以后模块很多都要用到仓库，则可以建小仓库

    - 原来的index.ts是大仓库

    - 新建modules文件夹，目前医院详情页需要小仓库，所以新建hospitalDetail.ts

    - pinia仓库的写法有两种：组合式API和选择式API

    - ```tsx
      //定义小仓库的方法
      import { defineStore } from 'pinia'
      //获取仓库的方法                      仓库名字
      const useDetailStore = defineStore('Detail', {
          state: () => {  //存储数据的地方state
              return {}   //和vuex的区别：1.pinia中state是箭头函数，返回的数据要是一个对象，作为仓库里面的数据
          },                          //2.pinia中没有mutations和modules
          actions: {
      
          },
          getters: {
      
          }
      });
      //获取仓库的方法对外暴露。组件才能拿到仓库用里面的数据
      export default useDetailStore;
      ```

- #### 发送请求-2

  - ##### 在哪发请求

    - 在hospital或者register应该都可以发，只要能通过route拿到hoscode即可

    - ```tsx
      $route.query
      ```

    - 进入hospital组件的时候因为路由切换的时候带上了hoscode，所以可以获取hoscode，一挂载的时候就可以**通知pinia发送请求拿到医院数据**，谁要用直接去取即可

    - ```tsx
      //获取生命周期钩子和仓库
      import {onMounted} from 'vue';
      import useDetailStore from '@/store/modules/hospitalDetail'
      //只是引入进来了仓库，没有获取仓库对象
      //useDetailStore是一个方法
      let detailStore = useDetailStore() 
      
      //具体使用pinia因为没学过这里看看
      //组件挂载完毕：通知pinia仓库发请求获取医院详情的数据，存储在仓库当中
      onMounted(()=>{
          // pinia发送请求将数据存在仓库中 ******
          detailStore.getHospital($route.query.hoscode);
      })
      ```
      
    - ```tsx
      //store-hospitalData
      import {reqHospitalaDetaail} from '@/api/hospital'
      //引入详情数据的ts类型
      import type {HospitalDetail} from '@/api/hospital/type'
      const useDetailStore = defineStore('Detail', {
          state: () => {
              return {
                  //医院详情的数据
                  hospitalInfo:{}
              }
          },
          actions: {
      		//获取医院详情的方法
              async getHospital(hoscode: string){
                  let result:HospitalDetail = await reqHospitalDetail(hoscode)
                  if(result.code ==200){
                      this.hospitalInfo = result.data
                  }
              }
          },
          getters: {
      
          }
      });
      //hospotalInfo起始值是一个空对象
      //如果数据获取到，则存入这个对象
      ```
    
      - 接下来就是组件存数据，组件拿数据，展示数据

#### 完成预约挂号业务

- #### 思路分析：

  - 数据已经存储到仓库中，接下来搭建二级路由组件的静态

- #### pinia仓库state中返回的数据的ts类型还没定义

  - store-modules中定义interface文件夹index.ts用于定义仓库当中数据的ts类型

  - ```tsx
    import type { HospitalDetail } from "@/api/hospital/type";
    //定义仓库内部存储数据的state的ts类型
    export interface DetailState {
        hospitalInfo: HospitalDetail
    }
    ```

  - 将新的ts类型应用在小仓库hospitalDetail.ts中,因为初始值没有数据，所以需要类型断言

  - ```tsx
    import type { HospitalDetailResponseData, HospitalDetail } from '@/api/hospital/type'
    import { DetailState } from './interface/index'
    export const useDetailStore = defineStore('Detail', {
        state: (): DetailState => {
            return {
                //医院详情的数据
                hospitalInfo: {} as HospitalDetail
            }
        },
    ```

- #### 预约挂号静态结构

  - 左侧图片给个宽度，右侧**flex为1**
  - 可以用ul也可以用div.address，但是这里不是明显的列表语义

- #### 从仓库取数据

  - 通过小仓库里的**useDetailStore方法可以获取到仓库对象**，拿到数据

  - ```tsx
    //引入医院详情仓库的数据
    import useDetailStore from '@/store/modules/hospitalDetail'
    //获取仓库对象，也就是存储数据的state
    let hospitalStore = useDetailStore()
    ```

  - vue开发者工具中可以看到仓库的结构，找到数据的位置

  - ```tsx
    {{hospitalStore.hospitalInfo.hospital.hosname}}名字
    {{hospitalStore.hospitalInfo.hospital.param.hostypeString}}等级 
    {{hospitalStore.hospitalInfo.hospital.logoData}}图片
    data:image/jpeg;base64,拼接
    {{hospitalStore.hospitalInfo.bookingRule.releaseTime}}放号时间
    {{hospitalStore.hospitalInfo.bookingRule.stopTime}}结束时间
    {{hospitalStore.hospitalInfo.hospital?.param.fullAddress}}具体位置
    {{hospitalStore.hospitalInfo.hospital?.route}}具体路线
    {{hospitalStore.hospitalInfo.bookingRule?.quitTime}}退号时间
    hospitalStore.hospitalInfo.bookingRule?.rule预约挂号规则 循环遍历
    ```

  - 数据能够展示但是控制台会报错，因为刚开始state中的hospitalInfo是个空对象，所以取不到hosname属性

  - ```tsx
    在仓库中将数据计算一下，解决假报错
    或者在hospital加个问号，如果取不到就不取，显示空白（js的语法）
    ```

- #### 医院科室选择

  - 有的医院有科室数据，一会做

#### 医院详情模块【20】

直接复制就好了，记得注释分隔

绝对定位脱离标准流，相对定位保留当前位置

取仓库的步骤都是一样的

#### 预约通知模块【21】

重回hopital组件，首先知道的是刷新页面不会丢失路径的query参数，但是从默认路由切换到其他路由的时候，如果不加query参数，这个时候仓库里面存储了刚才进入hospital/register时请求获取的医院详情数据，但是在别的路由刷新时，**Pinia或vuex仓库都会重置**，重新执行hospital的代码，hospital需要重新发送请求，但是路径没有query参数， 所以取不到指定医院的数据（**hospital发送请求获取医院数据依赖于切换路由时传递的hoscode**），所以在默认路由切换到其他路由的时候别忘了也要把当前显示医院的hoscode也路由携参，**hospital重新挂载重新发送请求**

```tsx
//hospital的menu组件的回调函数，即切换路由
const changeActive = (path: string) => {
  //参数！！！
  $router.push({ path: path , query: { hoscode: $route.query.hoscode } })
}
```

#### 停诊信息模块



#### 查询/取消模块



#### 预约挂号模块下的医院科室业务

- #### 思路分析：

  - 原来的接口无法提供科室数据，需要向另外的接口发送请求

- #### 封装api+请求函数和ts类型定义和使用

  - ```tsx
    //获取某一个医院的科室的数据
    HOSPITALDEPARTMENT_URL = 'hosp/hospital/department'
    
    // 获取医院科室的接口
    export const reqHospitalDepartment = (hoscode: string) => request.get<any,DepartmentResponseData>(API.HOSPITALDEPARTMENT_URL + hoscode)
    ```

  - 

  - 获取的数据类型中data属性数组包含所有大科室，是一个对象，每个对象里面又有若干小科室

  - ts类型：大科室和小科室的结构是一样的，所以只用定义科室类型，此外还需要定义data和获取响应数据（返回数据）的类型

  - ```tsx
    //不过大科室的children是数组,包着小科室，小科室的children值为空，所以定义类型的时候要写可有可无
    //代表医院科室的数据
    export interface Department {
        "depcode": string,
        "depname": string,
        "children"?: Department[]
    }
    //大科室列表数组类型，用于循环渲染
    // 代表存储科室数组类型
    export type DepartmentArr = Department[]
    
    //获取科室接口返回的数据类型
    export interface DepartmentResponseData extends ResponseData {
        data: DepartmentArr
    }
    ```

  - 

- #### 发送请求

  - 发送请求的时机地点？其实很多地方都可以发，比如预约挂号组件自身挂载的时候发送请求存储在仓库中。但是去了别的组件又回去预约挂号组件则又会发一次请求，重新获取相同的数据。所以**最好在hospital一起发送**

  - ```tsx
    //存储在仓库中，使用pinia发送请求
    onMounted(() => {
      // 原来获取医院详情数据的请求
      detailStore.getHospital($route.query.hoscode as string)
      //调用pinia中获取医院科室信息的方法，但是还没定义现在定义
      detailStore.getDepartment($route.query.hoscode as string)
    })
    ```

  - pinia-actions补充对应发送请求的方法

  - ```tsx
    //获取医院科室数据的方法
    async getDepartment(hoscode: string) {
        let result: DepartmentResponseData = await reqHospitalDepartment(hoscode)
        if (result.code == 200) {
            this.department = result.data
        }
    },
    ```

  - pinia-state补充字段，更新state的ts类型

  - ```tsx
    state: (): DetailState => {
        return {
            //医院详情的数据
            hospitalInfo: {} as HospitalDetail,
            //存储医院科室的数据
            department: []
        }
    },
        //但是DetailState没有department这个字段，传入这个没有的字段会报错，所以要去修改定义好的ts类型
        export interface DetailState {
            hospitalInfo: HospitalDetail,
            department: DepartmentArr
        }
    ```

  - 现在仓库中已经有这个数据了，可以去搭静态了

- #### 部门静态搭建

  - ul>li{flex}每个占一份

  - 大致框架：<!-- 直接使用大小科室的编码depcode作为当前渲染项的key值 -->

  - ```tsx
    <!-- 医院科室模块 -->
    <div class="department">
        <!-- 左侧大科室导航 -->
        <div class="leftNav">
        	<ul>
                <li v-for="item in hospitalStore.department" :key="item.depcode">{{ item.depname }}</li>
            </ul>
        </div>
        <!-- 右侧所有的小科室数据 -->
        <div class="departmentInfos">
            <!-- 每一个小科室数据，根据大科室的data循环渲染 -->
            <div class="departmentInfo" v-for="item in hospitalStore.department" :key="item.depcode">
                <!-- 大科室标题 -->
                <h1>{{ item.depname }}</h1>
                <!-- 每一个大科室下的小科室，列表循环渲染 -->
                <ul>
                    <li v-for="department in item.children" :key="department.depcode">
                        {{ department.depname }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
    ```

  - ![image-20230705141813586](assets/image-20230705141813586.png)盒子一定要继承父盒子，ul本身没有宽高

  - 动态控制导航项的高亮效果(这个套路要记住)

  - ```tsx
    import { ref } from 'vue'
    // 控制科室高亮的响应式数据
    let currentIndex = ref<number>(0)
    // 点击导航项的回调函数
    const changeIndex = (index: number) => {
        currentIndex.value = index
    }
    
    //对应导航项循环渲染
    <li v-for="(item, index) in hospitalStore.department" :key="item.depcode"
        :class="{ active: currentIndex === index }" @click="changeIndex(index)">{{ item.depname }}       </li>
    //这里引入index，因为index可以方便高亮切换，如果currentIndex是当前导航项的索引值，则该导航项显示高亮
    //动态class
    //导航项点击事件的回调函数，传入当前项的索引值
    ```

  - ##### 设置高度，内部滚动

    - 给父盒子设置一下属性

    - ```tsx
      .departmentInfos {
          flex: 1;
          height: 100%;
          overflow: auto;
          
          //隐藏滚动条
          &::-webkit-scrollbar {
              display: none;
          }
      }
      ```

  - ##### 点击导航项，对应科室跑到顶层

    - 可以使用关于scroll的插件

    - scrollintoview原生js方法（听常用的），将调用它的元素滚动到浏览器窗口的可见区域（滚动元素的父容器，使被调用的元素可以被看见）。还有动画效果可以设置

    - 全部代码写在导航项的点击事件，和高亮切换写在一起即可

    - ```tsx
      // 点击导航项的回调函数
      const changeIndex = (index: number) => {
          currentIndex.value = index
          // 点击导航获取右侧对应的大科室的H1标题
          let allH1 = document.querySelectorAll('.cur')
          // 滚动到对应科室的位置
          allH1[index].scrollIntoView({
              // 可以配置其他属性
              // 过渡动画效果
              behavior: 'smooth',
              // 滚动到位置，默认起始位置
              block: 'start'
          })
      }
      ```

#### 登录组件对话框的显示/隐藏

- #### 思路分析：

  - 点击科室表格，如果没有登录，会跳出登录的提示框。也可以手动点击右上角的登录按钮进行登录。保持登录状态后，点击预约不再提示。会有两个地方触发登录模块的出现，我们需要把登录封装为一个组件，控制这个组件的显示/隐藏

- #### 登录组件封装

  - 因为不是单单属于hospital的子组件，home也用得到，所以放在component里面。只能在app.vue中使用这个组件

  - ##### 定义为全局组件

  - ```tsx
    //main.ts
    import Login from '@/component/login/index'
    app.component('Login',Login)
    ```

  - 这个组件并不是路由组件，只能写死在页面中，但是平时又看不见，所以是固定定位+隐藏了。所以挂在后这个组件就一直在，只是控制显示和隐藏而已。使用v-show动态绑定响应式数据即可，点击按钮则修改响应式数据

  - 登录组件中要用到element对话框组件，将官网中带有表单的dialog组件复制过来

  - ```tsx
    <el-dialog v-model="dialogFormVisible" title="用户登录">
    
    </el-dialog>
    //v-model : 是否显示dialog,默认是false
    //title是对话框左上方（可以居中）的标题
    ```

  - 声明响应式变量，点击特定位置将该变量设置为真。这个响应式变量应该声明在哪？如果是login组件自身，那么hospital/register组件和top组件都要进行兄弟组件甚至爷孙组件间通信，很麻烦

  - 可以把这个响应式数据直接定义到仓库中，那么任意组件都可以获取数据并控制

  - 定义一个小仓库，新建store-modules-user.ts，存放用户相关的数据

  - ```tsx
    //定义用户相关的仓库
    import { defineStore } from 'pinia'
    
    const useUserStore = defineStore('User', {
        state: () => {
            return {
                // 用于控制登录组件的dialog显示与隐藏
                visiable: false,
            }
        },
        actions: {
    
        },
        getters: {
    
        }
    });
    
    export default useUserStore
    ```

  - 

  - **思路理清楚**：不控制Login组件的显示和隐藏，login组件里面只有dialog这一个外来组件，控制这个dialog组件的显示和隐藏，login一直挂载在页面上，默认隐藏dialog

  - ##### 获取仓库的数据

  - ```tsx
    //login组件
    <el-dialog v-model="userStore.visiable" title="用户登录"></el-dialog>
    
    //获取user仓库的数据visiable，可以控制login组件的对话框显示与隐藏
    import useUserStore from '../../store/modules/user'
    //获取仓库对象，也就是存储数据的state
    let userStore = useUserStore()
    ```

  - ##### 修改仓库中visible的值，弹出对话框

  - ```tsx
    //给登录两个字绑定点击事件
    <div @click="login" class="login">登录注册</div>
    //点击事件的回调中修改仓库的值，但是要先引入仓库，还是刚才login从仓库取值的语句一样（同样的语句既可以修改也可以取数据）
    /*  引入用户数据仓库  省略  */ 
    注意，引入的语法唯一可能不一样的是资源引入的路径！！！！
    // 点击登录与注册按钮的时候弹出对话框
    const login = () => {
      userStore.visiable = true
    }
    ```

  - 关掉的时候自动修改为了false

  - ##### hospital/register组件中点击小科室名字，修改响应式数据的值，弹出对话框

  - ```tsx
    //还是@click绑定事件
    // 点击科室按钮回调
    const showLogin = () => {
        userStore.visiable = true
    }
    ```

#### 登录组件静态搭建+场景切换

- #### 修改组件内部结构的样式

  - 深度选择器(因为scoped是局部样式)

  - ```tsx
    .login_container {
        :deep(.el-dialog__body) {
            border-top: 1px solid gray;
            border-bottom: 1px solid gray;
        }
    }
    //简写形式:deep，也可以使用::v-deep
    //括号里面里面写类名，记得加.并且不要加引号
    ```

  - dialog组件里面最好再套一个盒子，不然不好调整里面的样式还有宽高。

  - 可以使用栅格系统，或者flex份数

  - ##### 表单可以使用element提供表单的组件

  - ```tsx
    <el-form>
        <el-form-item>
            <el-input placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input placeholder="请输入手机验证码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button>获取验证码</el-button>
        </el-form-item>
    </el-form>
    ```

  - ##### 表单元素图标

  - ```tsx
    //图标引入
    prfix-icon是前缀图标
    <el-form-item>
        <el-input placeholder="请输入手机号码" :prefix-icon="User"></el-input>
    </el-form-item>
    
    import { User, Lock } from '@element-plus/icons-vue'
    ```

  - 三者flex

  - 点击图标跳转场景

  - ##### 底部插槽footer

  - ```tsx
    <el-dialog>
        <template #footer>  //写上具名插槽名字
            <el-button></el-button>
        </template>    
    </el-dialog>
    ```

  - ##### left盒子左侧内容不可以写死，是两部分内容二选一

  - ```tsx
    //使用v-if配合v-else？用响应式数据 用v-show也可以
    ```

  - 切换手机号登录和二维码登录：定义一个响应式数据，点击按钮后的回调改变这个响应式数据的值，两个场景根据响应式数据的值交叉显示

#### 登录组件获取验证码

- ##### 验证码登录流程

  - 输入手机号，点击获取验证码，前端页面会携带输入的手机号，向服务器发送请求。后端接收到手机号，则通过一些技术手段向手机发送验证码（运营商要收钱）
  - 而在该项目中，直接将验证码作为响应数据返回，自动填充到了验证码输入框。发送请求获取验证码用到了专门的短信验证码接口

- ##### 验证码请求接口封装

- ```tsx
  //老师直接在hospital api中封装
  // 获取验证码接口
      GETUSERCODE_URL = '/sms/send/'
  
  // 获取验证码接口
  export const reqCode = (phone: string) => request.get(API.GETUSERCODE_URL + phone)
  ```

- ##### 类型定义

- 因为获取的响应数据中的data只是简单的一个string，所以不对该接口获取的数据进行ts类型定义，老师直接写any

- ```tsx
  export const reqCode = (phone: string) => request.get<any, any>(API.GETUSERCODE_URL + phone)
  ```

- ##### 获取表单中的手机号

- 都是在获取验证码的点击事件回调函数中进行

  - ##### 如何获取表单中的手机号？声明一个响应式变量和表单元素动态双向绑定

- 应该声明一个响应式变量存储输入框中的电话号码，双向绑定时时变化，这样非常方便。如果在点击事件的回调中获取DOM元素的innerHTML会很麻烦，而且没有存到本地每次使用都要重新获取。最重要的是el-input本来就要和v-model搭配使用

- 声明为reactive的响应式数据是因为是一个对象，要存储不止电话号码一个数据，还有另一个表单元素el-input要和响应式数据搭配使用

- ```tsx
  //在login组件获取手机号
  <el-input placeholder="请输入手机号码" :prefix-icon="User" id="phoneNumber" v-model="loginParam.phone"></el-input>
  
  // 获取输入框中的电话号码和验证码等表单数据
  let loginParam = reactive({
      phone: '',
      message: ''
  })
  ```

- ##### 只有电话号码满足格式才允许获取验证码

- ```tsx
   <el-button @click="getSMS" :disabled="loginParam.phone.length !== 11">获取验证码</el-button>
  diabled属性
  正确的做法应该是与手机正则表达式匹配才满足
  如果是手机号码则设置属性为false，不是则设置属性为true。 使用计算属性
  //因为正则匹配比较复杂，不是我们这样相不相等就可以判断的，所以需要匹配后返回是否匹配成功的结果
  //可以使用函数吗？不可以，因为我们需要这个结果根据我们输入的电话号码实时判断得出实时结果
  //只有计算属性可以完成这个功能
  // 计算出当前表单元素手机的内容是否手机号码格式
  let isPhone = computed(() => {
      //手机号码正则表达式,用两个斜杠包裹
      const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
      // 返回布尔值：真代表手机号码、假代表的即为不是手机号码
      // 正则表达式对象
      return reg.test(loginParam.phone)
  })
  ```

- 

- ##### 发送请求

- //在login组件中发送请求，错，应该在给用户数据专门准备的小仓库（user.ts）中发送请求并存储数据，毕竟后面还要用到数据

- 好像用这个组件发请求也可以?????

- ```tsx
  <el-button :disabled="!isPhone" @click="getCode">获取验证码</el-button>
  
  //我的方法
  // 获取验证码的方法
  async getCode(phone: string) {
      // 在向服务器携带手机号码，获取验证码
      let result: any = await reqCode(phone)
      console.log(result.data);
  
      return result.data
  }
  //但是不知道为什么返回的是一个Promise对象，所以使用老师的方法
  ****将验证码存到仓库里，然后组件将其显示在验证码输入框中****
      将验证码存储在本地仓库
  ```
  
- ##### 仓库配置请求方法

- ```tsx
  actions: {
      // 获取验证码的方法
      async getCode(phone: string) {
          // 在向服务器携带手机号码，获取验证码
          let result: any = await reqCode(phone)
          if (result.code == 200) {
              /成功了才进行操作
              this.code = result.data
          }
      }
  },
  ```
  
- 需要告诉组件请求发送成功还是失败，获取验证码失败要有相应提示信息

- getCode**返回的是一个promise对象**，因为**前面加了个async**

- awiat async promise 最迷惑的一集

- ps：接口设置，发送第一次后，再点验证码就为null

- ##### 点击回调函数，通知发送请求

- ```tsx
   import useUserStore from '../../store/modules/user'
   //获取仓库对象，也就是存储数据的state
   let userStore = useUserStore()
   const getCode = () => {
       //发送请求
       userStore.getCode(loginParam.phone)
   }
   ```

- ##### 验证码输入框获取验证码

- ```tsx
   <el-input placeholder="请输入手机验证码" :prefix-icon="Lock" v-model="userStore.code"></el-input>
   ```

- 但是老师好像不是仓库获取验证码成功后，组件就来仓库拿数据

- 老师说如果验证码获取失败，应该有相应的错误提示信息

- 所以仓库中发送请求的异步语句` let result: any = await reqCode(phone)`要告诉登录组件请求成功还是失败，如果失败就提示

- 组件调用了仓库的getCode方法，它返回的是一个promise对象（前面加了async）

- ```tsx
   //按钮回调
   const getCode = () => {
       //发送请求
      let result = userStore.getCode(loginParam.phone)
      console.log(result) //Promise
   }
   //promise有三种状态：：pending 成功 失败，async函数返回的promise成功还是失败取决于返回的结果（awiait获取的result？）
   ```

- ##### 成功的时候返回成功的promise，失败的时候返回失败的promise（给组件login，因为它调用了仓库的这个async函数，能接收返回值）

- ```tsx
   actions: {
       // 获取验证码的方法
       async getCode(phone: string) {
           // 在向服务器携带手机号码，获取验证码
           let result: any = await reqCode(phone)
           if (result.code == 200) {
               /成功了才进行操作
               this.code = result.data
               /如果获取到数据，则返回一个成功的promise
               return 'ok'
           }else{
               return Promise.reject(new ERROR(result.message))
               //返回一个失败的promise
           }
       }
       //这样对应函数调用的地方就可以对成功和失败两种情况进行处理
   },
   ```

- ##### login组件中对于其返回的promise，可以在成功或失败的时候执行对应的回调进行对应的操作

- ```tsx
   //1.可以使用.then()处理成功和失败的promise。有成功的回调和失败的回调
   //2.也可以使用try-catch处理
   
   //组件也要收集表单数据，写到响应式对象中
   <el-input placeholder="请输入手机验证码" :prefix-icon="Lock" v-model="loginParam.code"></el-input>
   // 获取输入框中的电话号码和验证码等表单数据
   let loginParam = reactive({
       phone: '', //收集手机号码
       code: '' //收集验证码
   })
   
   // 定义点击获取验证码的回调函数
   const getCode = async () => {
       //通知pinia仓库发送请求存储验证码
       try {
           // 获取验证码成功
           await userStore.getCode(loginParam.phone)
           // 组件响应式数据获取到验证码
           loginParam.code = userStore.code
       } catch (error) {
           // 获取验证码失败
           ElMessage('获取验证码失败')
           //或者
           alert((error as Error).message)
           //
           ElMessage({
           	type:'errpr',
               message:(error as Error).message
           })
       }
   }
   ```

- 如果不希望可以直接修改仓库里的数据的话，当然不应该直接和仓库里的数据双向绑定。所以这里在loginParma中取数据展示出来

#### 登录组件获取验证码倒计时业务

- #### 思路分析：

  - 点击按钮后，开启定时器（并禁用按钮），声明一个响应式数据，减小这个响应式数据的值，将其展示在插值语法中。定时器结束，重置响应式数据为空，并且重新启用该按钮
  - 老师认为，按钮也是两个场景交叉显示，一个是正常“获取验证码”，一个是倒计时。二选一
  - 因为倒计时中有一些逻辑要写，所以单独写为一个组件比较清晰

- 封装组件，引入

- ##### 响应式数据控制二选一

- ```tsx
  <el-button :disabled="!isPhone" >
      <CountDown v-if="flag" />
      <span v-else @click="getCode">获取验证码</span>
  </el-button>
  
  // 控制倒计时组件交叉显示
  let countdown = ref<boolean>(false) //如果true，则显示倒计时
  
  // 定义点击获取验证码的回调函数
  const getCode = async () => {
      flag.value = true
  ```

- ##### countdown组件，倒计时逻辑

- ```tsx
  <CountDown v-if="flag" :flag="flag" />
  
  //countdown
  //接收父组件传递过来的props->flag:用于控制倒计时的显示与隐藏
  let props = defineProps(['flag'])
  //监听父组件传递过来的flag是否符合条件
  要使用监听属性，监听的属性发生变化才执行回调函数
  可是一点击进去，countdown才有flag这个值，不会触发监听事件，因为flag的值没有发生改变
  假如配置项immediate：true，页面刚进入就要以初始值执行handler函数
  //监听父组件传递过来props数据变化
  watch(
      () => props.flag,
      () => {
          console.log(123);
      },
      {
          immediate: true
      }
  )
  ```

- 不可以组件一挂载就倒计时吗

- ```tsx
  //明明和监听属性是一样的效果！！！
  onMounted(() => {
      let timer = setInterval(() => {
          count.value--
          if (count.value <= 0) {
              // 清除定时器
              clearInterval(timer)
              //通知父组件不要再展示倒计时组件了,记得传入值
              $emit('getFlag', false)
          }
      }, 1000)
  })
  ```

- 

- 老师的方法是监听父组件中flag值的变化，如果该组件显示则开启倒计时

- !获取验证码的回调不要给大盒子，只给获取验证码的span

- ##### 定时器到0之后，清除定时器，并且通知父亲不再展示倒计时组件，可以采用自定义事件

- 如果是切换场景并且由父组件的响应式变量控制，就只能通过子组件向父组件通信修改数据来切回场景

- ```tsx
  //login
  <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
  // 自定义事件，获取子组件修改的flag值
  const getFlag = (newFlag: boolean) => {
      flag.value = newFlag
  }
  
  //countdown
  //通知父组件不要再展示倒计时组件了,记得传入值
  $emit('getFlag', false)
  
  // 接收自定义事件
  let $emit = defineEmits(['getFlag'])
  ```

- 记得倒计时的时候，countdown文字组件外面的按钮要禁用

- ```tsx
  <el-button :disabled="!isPhone || flag">
  ```

- v-if是销毁，相对于v-show消耗性能更大，后者只是显示和隐藏

- ##### ps：用我自己的方法也是可以的

- ```tsx
  <el-button :disabled="!isPhone || flag">
      <span @click="getCode">获取验证码{{ time }}</span>
  </el-button>
  
  // 定义点击获取验证码的回调函数
  const getCode = async () => {
      flag.value = true  //禁用按钮
  
      //通知pinia仓库发送请求存储验证码
      try {
          // 获取验证码成功
          await userStore.getCode(loginParam.phone)
          // 组件响应式数据获取到验证码
          loginParam.code = userStore.code
      } catch (error) {
          // 获取验证码失败
          ElMessage('获取验证码失败')
      }
  
      let num: number = 5
      time.value = '(5s)'
      let timer = setInterval(() => {
          num--
          time.value = `(${num}s)`
          if (num <= 0) {
              clearInterval(timer)
              flag.value = false //不禁用按钮
              time.value = ''
          }
      }, 1000)
  }
  ```

#### 完成登录业务

- #### 思路分析

  - 要携带手机号和验证码发送登录请求，返回的数据包含用户信息和token。如果登录成功，则登录对话框消失，并且右上角展示用户信息

- element-plus的bug，按钮被禁用后还是可以发送请求，自己手动做判断，如果被禁用，点击的回调就不执行,

- ```tsx
  //其实判断也很简单，就是把不禁用的条件作为回调函数语句执行的条件
  // 解决element-plus按钮禁用还能点击的问题
  if(!isPhone.value || flag.value) return
  ```

- ##### 请求API和函数封装

- 直接写在api-hospital里了

- ```tsx
  //api
  // 用户登录接口
  USERLOGIN_URL = '/user/login'
  //请求方法
  是一个post请求，因为参数是一个对象，不能通过路径参数传递，只能通过请求体传递参数
  // 用户登录接口
  export const reqUserLogin = (data: any) => request.post<any, any>(API.USERLOGIN_URL, data)
  ```

- ts类型定义并使用

- ```tsx
  //请求传入参数的ts类型
  // 用户登录接口需要的参数类型
  export interface LoginData {
      phone: string,
      code: string
  }
  
  // 登录接口返回的用户信息数据
  export interface UserInfo {
      name: string,
      token: string
  }
  
  // 登录接口返回的数据的ts类型
  export interface UserLoginResponseData extends ResponseData {
      data: UserInfo
  }
  
  (data: LoginData) => request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data)
  ```

- ##### 登录按钮禁用(电话号码和验证码要满足条件)

- ```tsx
  //电话号码的条件不是位数，是正则匹配
  <el-button :disabled="!isPhone || loginParam.code.length !== 6">用户登录</el-button>
  ```

- ##### 点击登录按钮，发送请求

- ```tsx
  //测试了一下登录接口的逻辑，好像只要验证码是6位的就可以登录成功
  点击事件
  <el-button type="primary" size="default" style="width: 90%;":disabled="!isPhone || loginParam.code.length !== 6" @click="login">用户登录</el-button>
  
  //发送请求还是写在仓库中
  
  ***根据以往的校验，登录/注册 和 显示用户名 还是两个场景之间的切换，至于控制切换的变量就要声明一个响应式数据标识现在是否登录成功*** 不用控制变量
  接口返回的name要存在仓库中，因为top组件要显示。token也要存储作为公共参数，是用户的唯一标识。登录成功后发送的请求都要携带该用户的token，返回该用户的数据
  state对象的ts类型也要定义，userInfo初始为空对象不满足interface规范，可以将UserInfo断言为对应的ts类型，或者再ts类型中给特定字段加上?代表可有可无
  // 用户仓库相关state数据的ts类型定义
  export interface UserState {
      // 用于控制登录组件的dialog显示于隐藏
      visiable: boolean,
      // 存储用户的验证码
      code: string,
      userInfo: UserInfo
  }
  
  /*       我的方法：直接在回调中发送请求，不存储返回的用户数据name和token，成功的话直接修改登录对话框的可见性          */
  // 登录按钮
  const login = async () => {
      let result: UserLoginResponseData = await reqUserLogin(loginParam)
      // 发送成功进行对数据进行操作
      if (result.code === 200) {
          console.log(result);
          console.log(result.data);
          // 关闭登录对话框
          userStore.visiable = false
      }
  }
  
  /* 正确方法：因为到时候右上角组件要显示用户名，由登录接口返回，所以应该把获取的用户名存在仓库中，这样所有组件都可以方便获取，另外返回的另一个数据token也需要存储作为公共数据，因为登录成功后发送的请求都要携带用户的个人标识也就是token来获取他们个人的数据。因此既然要将这个请求返回的数据保存在仓库中，所以不如直接在仓库中封装这个请求方法。顺便修改登录组件可见属性visibale */
  // 用户手机号码登录方法
  //actions：
  async userLogin(LoginData: LoginData) {
      let result: UserLoginResponseData = await reqUserLogin(LoginData)
      if (result.code === 200) {
          this.userInfo = result.data
          // 返回一个成功的Promise
          return 'ok'
      } else {
          // 返回一个失败的Promise
          return Promise.reject(new Error(result.message))
      }
  }
  ```

- ##### 回调函数执行仓库内请求方法并关闭对话框

- 组件要知道登录成功还是失败，进而控制对话框显示和隐藏。但是我们已经有仓库的visable属性了啊

- 可以通过请求返回的promise对象来确定是成功还是失败，在then（async函数返回的就是promise可以用then处理）或者try-cathch中处理对应的回调

- 加await：必须等待其登录成功，后面就写登录成功的语句

- ```tsx
  // 点击用户登录按钮回调
  const login = async () => {
      // 发起登录请求
      // 登录请求成功：顶部组件需要展示用户名字、对话框关闭
      // 登录请求失败：弹出对应登录失败的错误消息
      try {
          // 用户登录成功
          userStore.userLogin(loginParam)
          // 关闭对话框
          userStore.visiable = false
      } catch (error) {
          ElMessage({
              type: 'error',
              message: (error as Error).message
          })
      }
  }
  ```

- ##### top右上角展示用户信息

- 如果登录成功，仓库会有用户名，直接将用户名的存在作为控制变量

- ```tsx
  <div @click="login" class="login" v-if="!userStore.userInfo.name">登录注册</div>
  <div class="me" v-else>{{ userStore.userInfo.name }}</div>
  ```

- ##### 展示下拉菜单

- ```tsx
  //使用element-plus自带的dropdown下拉菜单组件
  <el-dropdown v-else class="me">
      <span class="el-dropdown-link">
          {{ userStore.userInfo.name }}
          <el-icon class="el-icon--right">
              <arrow-down />
          </el-icon>
      </span>
      <template #dropdown>
          <el-dropdown-menu>
              <el-dropdown-item>实名认证</el-dropdown-item>
              <el-dropdown-item>挂号订单</el-dropdown-item>
              <el-dropdown-item>就诊人管理</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
      </template>
  </el-dropdown>
  ```

- ##### 刷新后登录状态消失

- 因为刷新后pinia仓库内容消失，需要实现数据持久化，而登录信息又都保存在仓库的state中

- 前端实现数据持久化：本地存储 / cookie

- ```tsx
  //仓库发送登录请求
  //本地存储持久化存储用户信息
  localStorage.setItem('USERINFO',JSONO.stringify(this.userInfo))   //userInfo是一个对象，需要转换为JSON字符串
  ```

- 但是只完成了存的步骤，还需要取

- ```tsx
  仓库userInfo默认值就从仓库中取数据
  不知道你本地存储有没有值，也可能是null，所以使用JSON.parse会报错
  还有如果确实没有的话， null结果JSON.parse后还是null，在v-if="!userStore.userInfo.name"的时候，取null的属性会报错，因为这个对象都取不到，所以根本不能取身上的属性。但是空对象可以取，只是取不到name属性返回false，取空对象即可*********
  userInfo: JSON.parse(localStorage.getItem('USERINFO') as string) || {} as UserInfo
  ```

- 封装本地存储持久化文件

- 新建utils-user.ts

- ```tsx
  // 本地存储操作用户信息的方法
  export const SET_TOKEN = (userInfo: string) => {
      localStorage.setItem('USERINFO', userInfo)
  }
  
  // 本地存储中取数据
  export const GET_TOKEN = () => {
      return localStorage.getItem('USERINFO')
  }
  
   userInfo: JSON.parse(GET_TOKEN() as string) || {} as UserInfo
   SET_TOKEN(JSON.stringify(this.userInfo))
  ```

#### 表单校验

- 表单校验常用、易用（封装好的组件）

- ```tsx
  //给el-form的:rules属性传入验证规则,也是对象，有书写格式
  //el-form-item的prop指定表单数据对象中要校验字段的名字
  //给el-form添加:model属性,哪个数据要进行校验（表单数据对象/校验数据对象）
  //因为表单项的数据都收集到了loginParams对象上，所以这个对象就是表单数据对象
  
  <el-form :model="loginParam" :rules="rules">
      <el-form-item prop="phone"></el-form-item>
      <el-form-item prop="phone"></el-form-item>
  </el-form>
  对象的属性是校验字段的名字，值是一个数组，里面可以写多个校验规则(对象)
  //required务必校验
  //message表单校验错误提示消息
  //trigger：校验触发的时机 change文本变化 blur失去交点
  //min max 约束文本长度
  // 校验规则
  const rules = {
      // 手机号码校验规则
      phone: [
          { required: true, message: '手机号码输入有误', trigger: 'change', min: 11, max: 11 }
      ],
      // 验证码校验规则
      code: [
          { required: true, message: '验证码输入有误', trigger: 'blur', min: 6, max: 6 }
      ]
  }
  这种表单校验一般用到比较少，因为无法利用正则判断是不是手机号，只能约束文本的长度。
  所以还提供了另一种校验规则
  ```

- ##### 自定义校验规则（用的多）

- ```tsx
  //还是:model 数据来自哪个对象
  //表单项prop校验字段
  //表单:rules校验规则
  //rules的书写形式还是一样的，但是每个规则的组成为{validator：规则函数，trigger：触发形式}
  调用函数的时候就是被trigger触发的时候
  
  phone: [ { validator: validatorPhone, trigger: 'change' } ],
  code: [ { validator: validatorCode, trigger: 'change' } ]
  
  自定义校验规则的回调函数会注入三个参数，即调用时会给你传入三个实参，所以定义的时候记得接收
  //rule规则对象（一般用不着）   value表单元素的文本内容  
  callback回调函数，符合规则时调用，相当于放行，没有校验提示。失败时调用，传入错误提示信息
  
  // 自定义校验规则:手机号
  const validatorPhone = (_: any, value: any, callback: any) => {
      const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
      if (reg.test(value)) {
          callback()
      } else {
          callback(new Error('请输入正确的手机号码'))
      }
  }
  // 自定义校验规则：验证码
  const validatorCode = (_: any, value: any, callback: any) => {
      if (/^\d{6}$/.test(value)) {
          callback()
      } else {
          callback(new Error('请输入正确的验证码'))
      }
  }
  ```

- ##### 大问题：验证码不符合规则也可以登录成功

- <img src="assets/image-20230706164425859.png" alt="image-20230706164425859" style="zoom:67%;" />之前说el-button有bug，禁用了也可以点击，调用回调函数，实际上是我们在按钮里面放了个盒子，回调是给它绑定的。所以**<u>给按钮本身禁用确实是点击不了按钮标签的事件的</u>**

- 验证码不符合规则，后台还可以发送成功的消息，返回用户名和token，说明这是后端的问题

- <u>前端能做的就是：在发送请求之间再次校验表单数据是否满足条件，**是非常有必要的，必备**</u>（不过按理来说光是禁用按钮就行了）

- ```tsx
  //写法一
  if (!isPhone.value || loginParam.code.length < 6 || loginParam.code.length > 6) return 
  
  //写法二：使用form组件的方法进行最终校验：validate：对整个表单的内容进行验证，返回一个promise对象
  <el-form :model="loginParam" :rules="rules" ref="form"></el-form>
  // 获取form组件实例/DOM元素
  let form = ref<any>()
  
  
  // 保证表单校验两项都符合条件
  await form.value.validate()
  //加了await的意思是，如果这两个表单项的校验都通过了，才执行下面的代码（等待接收成功的promise，接收到了成功的promise才向下执行）。否则一直返回一个失败的promise对象，后面的语句都不执行******************************************
  //返回的promise对象对还是错取决于校验的结果，可以根据返回的promise是成功还是失败来决定是否发送请求，不用判断，自己不会执行
  //如果不加await，那么不管返回什么promise，都会继续往后执行
  
  ```

#### 登录模块清空数据和表单校验结果

- 需求：关闭登录对话框，重新打开，收集的表单数据要清空

- **简单思路1：**关闭按钮的点击事件，清空收集表单数据的响应式数据（缺点，要写两次）

- ```tsx
  //dialog有一个事件close，就是dialog右上角关闭按钮的回调
  <el-form :model="loginParam" :rules="rules" ref="form" @close="close"></el-form> 错错错！！！
  <el-dialog v-model="userStore.visiable" title="用户登录" @close="close"></el-dialog>
  是dialog的事件！！！不是表单的事件！！！
  // 点击dialog右上角关闭按钮的回调
  const close = () => {
      // 清空收集的数据
      Object.assign(loginParam, { phone: '', code: '' })
      // 简单方法
      // loginParam.phone = ''
      // loginParam.code = ''
      // 清除上一次校验的结果
      form.value.resetFields()     //resetFields是表单身上的一个方法，重置该表单项，将其值重置为初始值，并移除校验结果
  }
  
  //右下角关闭按钮回调
  <el-button type="primary" @click="closeDialog">关闭窗口</el-button>
  
  const closeDialog = () => {
      // 首先要关闭窗口
      userStore.visiable = false
      // 清空数据和表单校验结果
      close()
  }
  ```

  - 注意：其实**只调用resetFields**就可以了，因为它作用**写了可以将表单项的值重置为起始值**
  - 注意：Object.assign方法重置对象和将对象属性一个个赋值结果是一样的
  - 注意：不光是点击右上角叉叉才执行@close，点击空白处也会执行
  - 注意：结果检测，点击用户登录后，修改了控制dialog显示的变量导致dialog关闭，可能因此触发了点击关闭按钮触发的close函数。为了验证该猜测，点击右下角的关闭按钮，只修改dialog的显示变量visiable也会触发close函数：果然，closeDialog函数中没有执行close函数，只修改了控制变量，却自动执行了close对话框关闭函数！**所以关闭函数close和控制dialog显示的双向绑定的响应式数据都很重要！！！**

- **写法2：简单粗暴**（**更加简单就一句话**）

- login最开始在app.vue中挂载了，所以里面的数据就一直保留着，但是只要刷新，重新挂载，所有数据都消失，表单数据和校验结果就自动没了（但是我就是要不刷新，重新点开对话框可以清空表单数据和校验结果）

- 每一次对话框隐藏，就销毁login组件，那么所有数据就没了，简单粗暴（v-if）

- ```tsx
  //app.vue
  <Login v-if="userStore.visiable" />
  
  import useUserStore from '@/store/modules/user'
  //获取仓库对象，也就是存储数据的state
  let userStore = useUserStore()
  ```

- 其实我开始想到了这个方法，但是我把if用在dialog的标签上。。那么login这个组件不会销毁，数据不会丢失，只是login里的东西包括表单校验等东西会丢失

#### 退出登录

- ##### 退出登录后，页面还要跳转到home路由

- 什么是编程式导航？

- ```tsx
  // 点击退出登录的按钮回调
  const signOut = () => {
    // userStore.userInfo = {} as UserInfo
    // // 清空本地存储，防止刷新又获取登录用户数据
    // SET_TOKEN("{}")
  
    // 通知pinia仓库清除用户相关的信息
    userStore.logout()
    // 编程式导航路由跳转到首页
    $router.push({ path: '/home' })
  }
  ```

- 一定要两者都写，虽然userStore是来自于本地存储，但是仓库中的数据毕竟不是响应式数据，只有挂载的时候，页面中使用到仓库数据的地方会去仓库中取第一次。但是后续不会去取值。**才能达到退出登录，立马修改值的效果**因为是变量，使用插值语法放在页面中，**v-if动态绑定的会同步改变，有点类似响应式数据**

- ##### 仓库方法

- 为什么要把操作写在仓库的函数里：<u>修改仓库里的数据，最好就在仓库里执行相关代码操作，封装性好，便于理解</u>

- ```tsx
  // 退出登录方法
  logout() {
      this.userInfo = { name: '', token: '' }
      // 写成{} as UserInfo应该也可以，反正都取不到userInfo.name，也不会报错
      // 清空本地存储的数据
      REMOVE_TOKEN()
  }
  ```

- ##### 与TOKEN相关的操作：移除本地存储的用户数据

- 为什么清除本地存储也要封装：老师：token相关的操作都封装到一个文件里

- 可以采用removeItem移除这一整个属性，像我原来的方法调用SET_TOKEN('{}')把值设置为空对象其实也可以

- ```tsx
  // 清除本地存储用户相关的数据
  export const REMOVE_TOKEN = () => {
      localStorage.removeItem('USERINFO')
  }
  ```

#### 微信扫码-注册应用

- 优点：方便

- #### 流程

  - 微信开放平台注册账号
  - 点击网站应用平台，创建应用
  - 验证管理员身份资质（花钱）
  - 管理中心-创建网站应用
  - AppID-项目的唯一标识，AppSecret应用密钥
  - 设置授权回调域（code用户授权登录成功的重要参数）

- #### 扫码登录完整流程（微信公众平台查看文档）

  - 微信官方文档--开放平台--网站应用--微信登录功能
  - 【1：请求code】第三方发起微信授权登录请求，用户授权登录第三方应用，微信重定向到第三方网站，并且带上授权临时票据code参数
    - 和后端才有关系，<u>code是用户授权成功的唯一标识</u>
    - 点击微信登录，发送请求，通过获取到的代码文件生成一个页面，将其通过iframe嵌套在盒子中
      - js将code返回给后台
      - **获取二维码页面的请求是WxLogin对象向微信服务器发送的，请求携带的参数由后台提供给WxLogin对象**
      - **微信服务器识别应用授权，参数正确，则返回二维码页面**
    - 有网页授权作用域则可以获取二维码（参数填写正确）
      - **微信服务器每隔一段时间向前端页面发送请求？，询问用户是否授权**（前端页面怎么知道用户授权没有？他也只是存放二维码图片而已）
      - **微信知道用户有没有授权成功，如果授权成功，则向项目后台服务器发送code**
    - 允许授权则重定向到项目后端服务器，并且携带code（用户授权了没）和state参数，后台就能知道用户已经授权，可以进行登录
  - 【2：获取acess token】第三方通过code、AppID、AppSectet从API获取用户的接口调用凭证acess token
    - 后台向微信的接口携带三个参数发送请求，微信服务器返回access token
  - 【3：获取用户信息】通过acess token可以进行微信开发平台授权关系接口调用，获取微信用户开放信息
    - 发送请求携带access token从微信服务器获取用户信息
    - 后台js重定向到前端页面，通过query参数将用户信息传给前端进行显示
  - ![image-20230708134609175](assets/image-20230708134609175.png) 

#### 二维码嵌套在login组件内部

生成二维码的代码应该在**点击微信登录按钮的回调中**执行  

- ##### 引入wxlogin插件

- ```tsx
  //index.html
  <!-- 引入微信扫码登录需要核心插件wxlogin.js -->
  <script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
  ```

- ##### 实例化对象

- ```tsx
  //作用就是发送一个请求，然后服务器返回一个二维码页面
  //并且自动通过iframe嵌套进了id选择器的盒子中
  ```

- ##### wxlogin对象参数设置，设置好了才能返回二维码界面

  - self-redirect：true：手机点击确认后在iframe内跳转到redirect_url，false：在top window跳转到redirect_url
  - id：第三方页面显示二维码的容器
  - appid：应用的唯一标识（向服务器发请求获取）
  - scope：应用授权作用域snsapi_login，表明当前微信扫码登录页面已经授权了
  - redirect_uri：重定向地址（后台提供，用户授权后，微信服务器携带授权成功唯一标识code重定向到后台地址）
    - 就是授权回调域
  - state，后台已经获取到用户信息，前端页面需要重定向的地址。而这个地址会携带后端传来的用户信息(重定向到前端的哪个页面往前端哪个页面注入用户信息)**state就是学校服务器重定向的地址携带用户信息**
  - style：文字描述颜色
  - href：自定义样式，修改二维码的外观

- ##### wxlogin参数服务器获取

- getLoginParam接口，得到微信扫码参数

- ##### api封装+请求方法封装

- ```tsx
  //hospital-index
  // 获取微信扫码登录需要参数
  WXLOGIN_URL = '/user/weixin/getLoginParam/'
  
  // 获取微信扫码登录生成二维码需要的参数接口请求方法
  export const reqWxLogin = (wxRedirectUri: string) => request.get<any, WXLoginResponseData>(API.WXLOGIN_URL + '?wxRedirectUri=' + wxRedirectUri)
  ```

- 重定向的地址（获取用户信息后需要跳转到的前端页面，并且注入用户信息参数）告诉后台？接口需要参数

- 后台需要**经过编码的网址**

- ```tsx
  //当前项目所在服务器的域名
  
  
  //好奇怪，state和传入的这个参数是一样的，所以是请求参数的时候传入重定向地址，然后返回的参数中重定向的地址就是我们传入的重定向地址，最后wxlogin对象就使用这个state就好了（那我为什么不直接把重定向地址给wxlogin参数？？？state接收请求参数时传入的参数的内容
  //redirect-url就是传code的服务器地址，就是授权回调域。
  //发送请求时，传递的参数告诉学校服务器拿到用户数据后往哪重定向
  <div id="login_containser"></div>
      //注意使用id选择器！！！
  
  // 引入wx扫码登录参数请求
  import { reqWxLogin } from '@/api/hospital'
  
  // 定义切换左侧盒子内容的回调函数
  const toggle = async () => {
      loginToggle.value = loginToggle.value ? false : true
      // 发请求获取微信扫码二维码需要参数
      // 向尚硅谷的服务器发送请求，获取微信扫码登录页面的参数
      // 需要携带一个参数，告诉学校服务器用户授权成功以后重定向项目到某一个页面
      let redirect_URL = encodeURIComponent(window.location.origin + '/wxlogin')
      let result: WXLoginResponseData = await reqWxLogin(redirect_URL)
      // 生成微信扫码登录二维码页面
      // @ts-ignore
      new WxLogin({
          self_redirect: true,
          id: "login-containser",
          appid: result.data.appid,
          scope: "snsapi_login",
          redirect_uri: result.data.redirectUri,
          state: result.data.state,
          style: "black",
          href: ""
      })
  }
  
  ///!!!!!这样子的话不要使用给切换场景的两个事件给相同的回调，否则切换回手机号验证还是要发请求获取二维码
  ```

- ##### ts类型定义

- ```tsx
  //定义微信扫码登录返回的数据的ts类型
  export interface WXLogin {
      "redirectUri": string,
      "appid": string,
      "scope": string,
      "state": string
  }
  // 定义微信扫码参数接口返回数据的ts类型
  export interface WXLoginResponseData extends ResponseData {
      data: WXLogin
  }
  ```

- 长轮询的作用到底是什么？难道微信服务器不知道用户扫了码吗，要页面来告诉他？要wxlogin对象来告诉他？（为什么会是wxlogin做的事？他不是负责发送请求获得页面吗）

- **因为获取wxlogin对象参数的接口是向尚硅谷的服务器发送请求的，所以传入的重定向地址很有可能是在服务器中保存了起来，返回参数数据的时候一起将state返回是告知服务器后台已经接收到了前端页面重定向地址，等到用户数据获取后，则向该页面进行跳转**（需要携带一个参数，告诉学校服务器用户授权成功以后重定向项目到某一个页面）

- #### 思路总结：

  - 先发送请求，获取wxlogin对象所需要的参数，然后wxlogin对象中再携带配置对象中的参数发送请求到微信服务器，微信服务器返回一个二维码页面，展示在配置对象中id选择器所指定的位置。

#### 微信扫码登录业务完成

- ##### 思路

  - 允许登录后，微信服务器向后台服务器发送了code授权成功标识符，这个时候后台要再发送一个请求获取用户的access token，然后再发送一个请求才能获取到用户的信息。所以没猜错的话，最后这一节还需要再封装两个请求和API，然后在授权成功的回调中进行这两个请求的发送

  - ##### 这两个请求都是授权成功后wxlogin自动执行的

- 扫码成功后，~~重定向到授权回调域~~。但是页面中iframe显示了index首页

- 授权后，微信服务器向学校服务器发送请求，携带code授权成功标识符，还携带了state参数 ，告诉后台服务器到时候重定向。最后后台执行重定向，并携带用户信息（前提是有state中的路由）

- ##### 新建路由组件wxlogin

  - ```tsx
    //一级路由
    
    // 该组件由于路由传参有了用户数据，现在要持久化存储
    import { SET_TOKEN } from '../../utils/user'
    // 获取用户信息
    import { useRoute } from 'vue-router'
    // 获取路由对象
    let $route = useRoute()
    
    // 持久化存储用户信息
    SET_TOKEN(JSON.stringify($route.query))
    // 获取用户信息，iframe重定向到该路由组件，可是不需要它出现
    let html: any = document.querySelector('html')
    html.style.display = 'none'
    ```

  - 为什么还要跳到一个新的路由？

  - 怎么获取路由参数？使用路由对象

  - 持久化存储，否则刷新用户信息就没了

  - dialog对话框自动关闭

  - pinia存储用户信息，公共数据存仓库里，使用比较方便

    - 最重要的原因其实不是这个，是因为登陆注册两个场景的切换就取决于仓库中UserInfo对象有没有name这个字段

  - （我猜你想实现的效果是，**登录后**自动关闭dialog并展示数据？）只要变为场景《微信扫码登录》，就执行该方法。看本地存储有没有数据（好奇怪，登陆过了本地有数据不是没有登录注册的按钮吗，如果退出登录本地的数据也会一起清除啊）

    - 监听场景的值是1还是0，
    - 查询用户信息有没有应该每隔一秒查询一下用户信息有没有，因为你不知道什么时候扫码，不知道什么时候关闭dialog（和我所说的授权成功的回调相同，只不过没有专门的授权成功的回调函数属性）
    - 如果有用户信息则关闭对话框，仓库存数据展示
    - 记得清除定时器（大概功能都完成了）

  - ##### 细节

    - 授权后还在iframe里展示重定向后的wxlogin路由组件。（所以这个路由没有实际的用处，***只是利用了它接收到的用户数据***，只要访问到这个路由组件就是扫码成功了）
    - 扫码成功后直接将iframe里的页面隐藏掉

- ##### 路由配置

  - ```tsx
    {
        path:'/wxlogin',
            component:()=>import('@/pages/wxlogin/index.vue')
    },
    ```

- ##### 仓库方法配置

- 因为涉及到仓库数据的改变,**还有其他原因上面有写**

- ```tsx
  // 在微信扫码登录场景中，查询本地存储是否有数据
  queryState() {
      // 开启定时器每隔一段时间问：本地存储是否有用户数据
      let timer = setInterval(() => {
          // 本地存储已有数据（扫码成功）
          if (GET_TOKEN()) {
              // 关闭对话框
              this.visiable = false
              // 拷贝数据
              this.userInfo = JSON.parse(GET_TOKEN() as string)
              clearInterval(timer)
          }
      }, 1000)
      }
  ```

- ##### 看是不是微信登录场景，如果是则一直看有没有登录成功（可以当作授权成功回调）

- ```tsx
  // 监听场景的数据
  watch(() => loginToggle.value, (val: boolean) => {
      if (val) {
          userStore.queryState()
      }
  })
  ```

- 

- wxlogin对象实例化后，发送请求获取二维码页面，并将其嵌套在id中，微信服务器轮询是否扫码成功（），如果授权成功，则发code（告诉后台往哪重定向）发access token发用户信息，后端在iframe中重定向到路由并传参，组件中获取参数存储

- #### 注意：在login组件对话框中，因为左侧表单登录和微信登录是v-if/else控制，但是表单元素的获取只获取了一次`let form = ref<any>()`,所以如果进入微信登录场景后关闭dialog，此时因为场景一被销毁，所以无法form.value.resetFields，重新打开对话框会发现表单的内容还在。（可以加上把本地表单收集数据的对象清空，也可以直接把v-if改为v-show，不销毁，form元素一直存在）

#### 医院某科室挂号业务

- 如果没登录，点击科室时弹出login。只有登录了有(token)才能访问详情页（路由鉴权）

- 登录成功路由跳转到挂号详情页（~~三级路由~~仍然是二级路由）并带参

- 分页器

- #### 配置二级路由

- ```tsx
  {
      path: 'register_step1',
      component: () => import('@/pages/hospital/register/register_step1.vue')
  }
  ```

- #### 路由跳转+带参

- ```tsx
  <li v-for="department in item.children" :key="department.depcode" @click="showLogin(department)">
      {{ department.depname }}
  </li>
  //传入这个小科室的数据作为回调的参数
  
  // 引入路由器和路由函数
  import { useRouter, useRoute } from 'vue-router';
  // 创建路由器对象
  let $router = useRouter()
  // 创建路由对象
  let $route = useRoute()
  
  // 点击科室按钮回调
  const showLogin = (item: any) => {
      // userStore.visiable = true
      // 点击某一个医院科室按钮，进入到相应的预约挂号详情页面
      // 跳转到预约挂号详情页面
      $router.push({ path: '/hospital/register_step1', query: { hoscode: $route.query.hoscode, depcode: item.depcode } })
  }
  ```

- #### 搭建二级路由组件

- ##### 静态搭建

  - item的类名要变为动态

  - ```tsx
    //register -- register_step1
    //竖线和圆点可以用盒子做
    //scss下，不管层级怎样，都不能有重名的类
    ```

  - 分页器（还要和item绑定在一起）

  - ```tsx
    <el-pagination layout="prev, pager, next" :total="50" />
    ```

- #### 展示预约挂号的世俗据

- ##### API封装+接口函数封装

  - 获取可预约排班数据（page limit hoscode depcode）这一个接口几乎就包含了这一个预约详情页所需要的全部数据。所以可以将数据保存在仓库里。**错错错**

  - ```tsx
    //api - hospital
    // 获取某一个医院的某一个科室预约挂号数据
    HOSPITALWORK_URL = '/hosp/hospital/auth/getBookingScheduleRule/'
    
    // 获取预约挂号的数据
    export const reqHospitalWork = (page: number, limit: number, hoscode: string, depcode: string) => request.get<any, any>(API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`)
    ```

- ##### ts类型定义

- 单个预约时间项：status：-1(停止挂号) 0(有号) 1(即将放号)   availableNumber：-1(没号了)

- ```tsx
  export interface WorkData
  export type BookingScheduleList = WorkData[]
  export interface BaseMap
  export interface HospitalWorkData extends ResponseData
  ```

- ##### 发送请求

  - 时机：step1页面挂载的时候，点击分页器按钮的时候（所以请求应该封装在一个函数里多次使用）

  - 存储数据用于显示一般都是直接用响应式变量

  - ~~所以稍后发送请求的操作应该也是写在仓库的actions中~~**仓库和响应式数据一样，刷新重新挂载之后会清空。并不能做到数据的持久化。和变量最大的区别就是，存储在仓库中的数据可以被任何组件使用**

  - ```tsx
    //声明默认数据，请求所需要的参数
    
    ```

  - ##### 请求封装 + 获取路由参数

  - ```tsx
    //请求的封装
    // 因为多个场景要发送请求，所以封装为一个函数
    const fetchWorkData = async () => {
        let result = await reqHospitalWork(pageNo.value, limit.value, $route.query.hoscode as string, $route.query.depcode as string) //善用类型断言
        console.log(result);  //ref数据记得value
    
    }
    onMounted(() => {
        fetchWorkData()
    })
    ```

  - ##### 未登录？

  - 因为没有携带token，这个请求（页面）要登录了才可以发，而token又是登录的唯一标识 

  - 要通过请求头带给服务器。我们的token存储于公共的仓库当中

    - ##### 请求拦截器携带token

    - ```tsx
      //utils - request.ts
      // 引入用户相关的仓库
      import useUserStore from '@/store/modules/user'
      
      // 配置请求拦截器，传入一个回调函数
      request.interceptors.request.use((config) => {
          // 获取用户仓库
          let userStore = useUserStore()
          // token：公共参数，如果用户登录了需要携带
          if (userStore.userInfo.token) {
              config.headers.token = userStore.userInfo.token
          }
          return config
      })
      ```

    - 记得先登录才有token

    - 请求头携带了token则该请求<u>可以拿到数据</u>

  - ##### 展示数据

  - ```tsx
    //存储数据
    
    // 声明响应式变量，用于存储请求获得的预约详情数据(里面包含了所有我们需要的数据),记得初始值是一个空对象
    let workData = ref<any>({})//不然其实workData也为空
    
    if (result.code == 200) {
        workData.value = result.data
    }
    ```

  - **有可能报错，因为起始值那一瞬间还没获取到值，而插值语法中已经使用了用于存储返回数据的属性，所以要加?号**

  - ```tsx
    <div class="SmaDepname">{{ workData.baseMap?.depname }}</div>
    
    <div class="item" v-for="(item, index) in workData.bookingScheduleList" :key="index">
        <!-- <div class="up">{{ workData.baseMap?.bookingScheduleList[Number(item)].workDate }}</div> -->
        <div class="up">{{ item.workDate }}</div>
        <div class="down">{{}}</div>
    </div>
    ```

  - 像这种遍历数据数组，就直接写在in后面，别再用什么下标取数据了！！！！！

  - 还有看清楚字段之间的关系，不要把字段搞错对象！

  - ##### 关于三种情况之间的判断，可以直接写三个盒子，然后配合v-if在不同条件下显示！！！！！

  - ```tsx
    //文字
    <div v-if="item.status == 0">
        {{ item.availableNumber == -1 ? '约满' : `有号(${item.availableNumber})` }}
    </div>
    
    //样式
    <div class="item" v-for="(item, index) in workData.bookingScheduleList" :key="index"
        :class="{ active: item.status == -1 || item.availableNumber == -1 }"></div>
    
    &.active {
        border: 1px solid #ccc;
        color: gray;
    
        .up {
            background: #ccc
        }
    }
    ```

  - ##### 分页器页码点击时间

    - 收集页码:不用自己收集，有一个属性     **v-model:current-page = 当前页数**（v-model:current-page="pageNo"）

    - 发送请求：也是预设的一个事件       **@current-change = 回调函数名**

    - 条目总个数： **:total**

    - ```tsx
      <el-pagination layout="prev, pager, next" :total="workData.total" v-model:current-page="pageNo" @current-change="fetchWorkData" />
      ```

    - 因为当前页数已经通过v-model修改获取了，<u>*所以页面更改回调只用发送请求即可，所以回调直接写请求名*</u>

#### 预约挂号底部上下午医生

- 思路分析：响应式数据存储当前选中workData盒子的号源，在插值语法中展示

- ##### 结构搭建：

  - 大盒子两种情况：即将放号，已经放号显示上午下午

  - ```tsx
    //切换展示
    
    ```

  - 相同且深层次的结构没必要都写在不同的类中，不然样式又要重新写

#### 预约挂号底部医生排班业务

- 获取预约当天的医生信息还是要发送一个新的请求，并不是以为不用发了

- ##### api封装和接口封装

- 请求所需参数：医院变化，科室编号（都可在route中获得）和挂号日期（点击事件发送请求之前存储在本地响应式遍历workItemData中）

- 获取的数据：worktime 0上午 1下午

- ```tsx
  //获取排班数据
  // 获取医院某一个科室某一天相应医生排班的数据
  HOSPITALDOCTOR_URL = 'hosp/hospital/auth/findScheduleList/'
  
  // 获取医生排班的数据
  export const reqHospitalDoctor = (hoscode: string, depcode: string, workDate: string) => request.get<any, any>(API.HOSPITALDOCTOR_URL + `${hoscode}/${depcode}/${workDate}`)
  ```

- ##### 对新接口返回的数据进行ts类型定义

- 返回数据的data是一个数组，里面每一个对象是一个医生。要定义三个类型或接口

- 在定义的时候，顺便看看有哪些数据是自己所需要的

- ```tsx
  // 代表的是一个医生的数据
  export interface Doctor{...}
  // 医生信息数组包含全部医生
  export type DoctorArr = Doctor[]
  //获取医生排班接口返回的数据
  export interface DoctorRessponseData extends ResponseData {
      data: DoctorArr
  }
  ```

- ##### 发送请求

- 时机：点击小盒子时 + 挂载时

- 点击item后，可以看到item携带的参数有workDate、status这两个对后续有用的数据。

- 老师和我们想法差不多，**声明一个初始响应式变量存某个挂号日期的数据。只不过在挂载时默认将列表中的第一个挂号日期数据存储在了该响应式变量中（bookinglist[0]）。需要将这个请求也封装为一个方法，因为<u>*挂载的时候*</u>需要获取默认第一个挂号日期的数据，后面<u>*点击其他挂号日期的时候也要*</u>重新发送请求获取医生数据（切换的点击事件中，要改变响应式变量的值为当前点击项的数据）**

- <u>只不过我们没想到初始赋值，直接想着点击卡片，存储item整个对象。而且响应式数据名字不一样</u>

- ##### 声明响应式变量，存储当前时间段的数据，用于发送请求获取其号源医生数据

- ```tsx
  //存储某一个挂号日期数据，用于发送请求
  // 定义单个时间段预约数据,挂载时初始化为第一个时间段
  let workTime = ref<any>({})
  let workTime: any = ref({}) 区别是什么？
  
  if (result.code == 200) {
      workData.value = result.data
      // 设置默认值，存储第一天日期的数据
      workTime.value = workData.value.bookingScheduleList[0]
  }
  //但是点击分页器的时候也会执行这个函数，而上下午号源模块则仍显示第一个时间段的信息
  ```

- ##### 发送时机

- ```tsx
  <div class="item ... "@click="changeTime(item)"></div>
  
  onMounted(() => {
      fetchWorkData()
      getDoctorWorkData()
  })
  
  // 点击Item项，保存此项数据
  const changeTime = (item: any) => {
      // 存储用户选择那一天的数据
      workTime.value = item      //将发送前数据保存为当前时间段
      // 再发一次获取医生排班的数据
      getDoctorWorkData()
  }
  ```

- ##### 场景切换（即将放号，已经放号）

- ```tsx
  ```

- 

- ##### 获取到数据之后，将医生数据存储在响应式变量中

- ```tsx
  // 获取到数据后，存储排班医生的数据
  let docArr = ref<DoctorArr>([])
  
  // 获取排班医生的数据
  let result: DoctorResponseData = await reqHospitalDoctor(hoscode, depcode, workDate)
  if (result.code === 200) {
      docArr.value = result.data
  }
  ```

- ##### 存储好数据，需要进行展示

- 分为上午医生和下午医生

- 使用计算属性，将上午排班医生数据和下午排班医生数据分别存储在两个响应式变量当中

- ```tsx
  // 计算出下午排班的医生的数据
  // 计算属性用到的响应式数据发生改变，实时更新返回的值
  let afterArr = computed(() => {
      return docArr.value.filter((doc: Doctor) => {
          return doc.workTime == 1
      })
  })
  
  // 计算出上午排班的医生数据
  let moringArr = computed(() => {
      return docArr.value.filter((doc: Doctor) => {
          return doc.workTime === 0
      })
  })
  ```

- ```tsx
  <li v-for="(item, index) in afterArr" :key="index">   //可以不用index，反正item有自己的id
      <!-- 医生名字技能 -->
      <div class="left">
          <div class="docName">
              {{ item.title }}
              <div class="line"></div>
              {{ item.docname }}
          </div>
          <div class="respon">
              {{ item.skill }}
          </div>
      </div>
      <!-- 价格和剩余 -->
      <div class="right">
          <div class="price">
              ￥{{ item.amount }}
          </div>
          <el-button type="primary" size="default" class="leftNum">剩余{{ item.availableNumber }}</el-button>
      </div>
  </li>
  ```

#### 预约挂号就诊人

- ##### 思路分析

  - 点击号码剩余按钮，路由跳转进入就诊人选择页面，并且携带参数(携带医生id)。应该不需要发送请求，但是需要本地存储

- ##### 路由配置

- ```tsx
  {
      path: 'register_step2',
          component: () => import('@/pages/hospital/register/register_step2.vue')
  }
  
  //回调函数
  <el-button type="primary" size="default" class="leftNum" @click="goStep2(item)">剩余{{ item.availableNumber }}</el-button>
  
  // 点击进入挂号，选择就诊人路由
  const goStep2 = (item: Doctor) => {
      // 编程式导航进入路由跳转并携带医生的ID
      $router.push({ path: '/hospital/register_step2', query: { docId: item.id } })
  }
  ```

- ##### 静态搭建

- ```tsx
  //element组件添加图标
  <el-button type="primary" size="default" @click="" :icon="User">添加就诊人</el-button>
  
  import { User } from "@element-plus/icons-vue"
  
  <el-button type="primary" size="default" :icon="Edit" circle></el-button>
  //编辑圆角按钮
  ```

- 使用card组件

- ```tsx
  //具名插槽，卡片头部
  <el-card class="box-card"></el-card>
  ```

- ##### 每一个就诊人的信息封装为一个组件

- ```tsx
  //register - Visitor
  //老师是自己搭组件，但是这个就诊人我觉得也可以使用card组件
  
  ```

- ##### 表格效果

- 不用自己写table，用element提供的descriptions组件

- ```tsx
  <el-descriptions :column="2" border>
      <el-descriptions-item>
          <template #label>
              <div class="cell-item">  //写在这个盒子里面
                  Remarks
              </div>
          </template>
          2023-06-06 周二 下午
      </el-descriptions-item>
  </el-descriptions>
  ```

-  `<span style="color:red">100</span>`行内样式，适合简单少量

- 没有选中就诊人，不可以点击确认挂号按钮

#### 发送请求（拿数据）获取当前账号下就诊人信息

- ##### 思路分析

  - ~~这里应该不用发送请求？因为数据都是原来获得的~~
  - 就诊人的信息不是保存在本地存储的，而是保存在服务器，所以要发送请求，获取当前账号下就诊人的信息

- ##### api封装+接口函数封装

- 不是没有参数，<u>*请求头要携带token，请求拦截器启动帮我们携带了*</u>

- ```tsx
  // 获取某一个账号下就诊人的信息
  GETUSER_URL = '/user/patient/auth/findAll/'
  
  // 获取某一个账号下就诊人信息
  export const reqGetUser = () => request.get<any, UserResponseData>(API.GETUSER_URL)
  ```

- ##### ts类型定义

- data里的每个对象是一个就诊人

- ```tsx
  // 代表的是一个就诊人数据ts类型
  export interface User{...}
  export type UserArr = User[]
  export interface UserResponseData extends ResponseData {
      data: UserArr
  }
  ```

- ##### 发送时机：在regiset_step2挂载的时候获取，并且根据数组循环渲染，并向子组件props传递数据

- ##### 挂载时发送请求并声明响应式数据进行存储

- ```tsx
  import ...
  
  // 声明响应式数据存储接口返回的就诊人信息列表
  let UserArr = ref<UserArr>([])
  
  onMounted(()=>{
      fetchUserData()
  })
  
  //获取信息封装到函数中，因为直接在onMounted进行await操作不太好，这样封装起来比较清晰
  // 将获取就诊人信息的请求封装起来
  const fetchUserData = async () => {
      // 获取就诊人信息：当前老师这个账号下已经有四个就诊人信息
      // 新账号需要先在 ***写好的项目中*** 注册几个就诊人信息才会收到数据
      let result: UserResponseData = await reqGetUser()
      if (result.code === 200) {
          userArr.value = result.data
      }
  }
  ```

- ##### 循环渲染并父子组件传递数据

- ```tsx
  <Visitor v-for="user in userArr" :key="user.id" class="item" :user="user"></Visitor>
  //循环渲染，并传递当前数据user给子组件
  
  //子组件-visitor
  // 接收父组件传递过来的就诊人信息展示
  defineProps(['user'])
  ```

#### 展示数据

- ```tsx
  <div class="secure">{{ user.isInsure == 1 ? '医保' : '自费' }}</div>
  <div class="name">{{ user.name }}</div>
  
  <li>证件类型:
      <span>{{ user.param.certificatesTypeString }}</span>
  </li>
  <li>证件号码:
      <span>{{ user.certificatesNo }}</span>
  </li>
  <li>用户性别:
      <span>{{ user.sex === 0 ? '女生' : '男生' }}</span>
  </li>
  <li>出生日期:
      <span>{{ user.birthdate }}</span>
  </li>
  <li>手机号码:
      <span>{{ user.phone }}</span>
  </li>
  <li>婚姻状况:
      <span>{{ user.isMarry === 0 ? '未婚' : '已婚' }}</span>
  </li>
  <li>当前住址:
      <span>{{ user.param.cityString }}</span>
  </li>
  <li>详细住址:
      <span>{{ user.param.fullAddress }}</span>
  </li>
  ```

- 善用三元表达式

- ##### 预约挂号详情

- 预约时间段和对应医生的数据要么重新发送请求获取数据，要么从register_step1兄弟组件中获得

- 正确做法：根据医生的ID，获取医生看诊的数据

- ##### api封装和请求接口封装

- 根据**排班id**获取排班数据

- ```tsx
  // 获取挂号医生的信息
  GETDOCTOR_URL = '/hosp/hospital/getSchedule/'
  
  //获取医生排班数据
  export const reqDoctorInfo = (scheduleId: string) => request.get<any, DoctorInfoData>(API.GETDOCTOR_URL + scheduleId) 
  
  //ts类型定义
  // 获取某一个挂号医生接口返回的数据ts类型
  export interface DoctorInfoData extends ResponseData {
      data: Doctor
  }
  ```

- 发送时机：还是和就诊人接口一样，在进入register_step2挂载的时候就发送

- 因为携带的参数：排班id来自于step1传过来的参数，所以需要路由对象取到当前路由地址的参数

- ```tsx
  //声明响应式数据存储当前排班从接口获取的排班医生数据
  let doctorInfo = ref<Doctor>({} as Doctor)
  
  // 获取排班数据
  const fetchDoctorInfo = async () => {
      let result: DoctorInfoData = await reqDoctorInfo($route.query.docId as string)
      if (result.code === 200) {
          doctorInfo.value = result.data
      }
  }
  
  // 组件挂载完毕获取数据
  onMounted(() => {
      // 获取就诊人信息
      fetchUserData()
      // 获取医生信息
      fetchDoctorInfo()
  })
  ```

- ##### 关于取数据报错，常常出现无法读取undefined上的属性xxx的解释

- ```tsx
  {{ doctorInfo.workDate }}
  {{ doctorInfo.param?.hosname }}
  ```

- 在最开始发送请求后，一般服务器响应比较慢，doctorInfo数据还没返回往响应式变量里存的时候，一般就会出现这种问题(**或者说本来就会出现这种问题？起始值是空对象，一开始就要从里面取数据。当服务器的数据一回来立马就有了**)

  - 但是上述第一种情况是不会报错的，因为doctorInfo响应式数据初始值是空对象，里面没有workDate，那么取出来的是一个undefine，因为它认为**这个对象只是没有这个属性而已**
  - 但是第二种情况截然不同，类似第一种情况，doctorInfo还没有数据，取出了值为undefined的param，到这里还没有问题，但是再往下要从param(undefined)里取数据，此时就会报错了，**因为不能向undefined变量取数据**
  - 所以以后遇到A.B是不用加？的，但是遇到A.B.C一般就要给B加一个?,确保B可以取到的时候，我们才去B身上取C

- 就算一开始那几毫秒取不到数据，页面不显示数据。但随着服务器响应的数据终于返回保存在作用域里的变量后，相当于响应式数据发生改变，那么此时页面中用到这个响应式变量的地方/模板都会重新解析。**这也是为什么存储从服务器接口返回的数据一定要保存在响应式的变量中**（所以判断if(result.code===200){}这个判断有些时候还是很有必要的，防止脚本里在数据获取前对数据进行了引用）

#### 确定就诊人业务

- 要点击选择了就诊人才可以点击挂号，之后才能进入支付页面

- ##### 已选择圆圈

- ```tsx
  //透明度，可以直接给字体和边框的颜色设置rgba颜色
  border: 5px dashed rgba(255, 0, 0, 0.341);
  color: rgba(255, 0, 0, 0.341);
  //也可以给盒子设置透明度opacity
  opacity: 0.5;
  ```

- ##### 选择圈排斥出现

- 不可以在组件内声明响应式变量，这样就无法起到互斥效果

- ```tsx
  // 声明响应式变量，控制就诊人选择的样式
  let patientNow = ref<number>(0)  //但是这样子每个子组件里面都有一个响应式变量了，不行
  
  //register_step2
  <Visitor v-for="user in userArr" :key="user.id" class="item" :user="user" @click="choose(user)"
  :selected="patientNow"></Visitor>
  
  // 声明响应式变量，控制就诊人选择的样式
  let patientNow = ref<number>(0)
  const choose = (user: any) => {
      patientNow.value = user.id
  }
  
  //但是样式的判断只能在vistor内部判断
  <div class="confirm" v-if="user.id === selected">已选择</div>
  defineProps(['user', 'selected'])
  ```

- 老师和我们思路是一样的（传数据到子组件进行判断），但是他判断vistor的索引值，所以他要传入两个props参数index和响应式变量selected给子组件，如果像我这样，user的id已经事先传过一次了

- ##### 过渡动画

- 分为enter和leave

- ```tsx
  <transition name="confirmMove">
      <div class="confirm" v-if="user.id === selected">已选择</div>
  </transition>
  
  .confirmMove-enter-from {
      transform: translate(-50%, -50%) rotate(45deg) scale(1);
  }
  .confirmMove-enter-active {
      transition: all .3s;
  }
  .confirmMove-enter-to {
      transform: translate(-50%, -50%) rotate(45deg) scale(1.2);
  }
  ```

- ##### 确定按钮的解封

- ```tsx
  <el-button :disabled="patientNow === 0">确认挂号</el-button>
  ```

#### 完成会员中心路由

- #### 思路分析

  - 点击确认挂号之后，进入了一个新的以及路由组件--会员中心（只是长得和hospital组件一样，但是是一级路由组件）而且这个组件又包含二级路由组件。点头像也可以进入会员中心组件

- ##### 新建组件：pages-user-index

  - user-certification/order/patient/profile/feedback

- 结构搭建：和hospital一样

  - 还是使用el-menu组件，可以直接从hospital组件文件中复制

  - ```tsx
    :default-active="$route.path"  //根据当前地址进行高亮显示，防止其他路由刷新后高亮重置（先获取路由对象）
    
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
    	<el-menu-item index="/user/certification" @click="changeActive('/user/certification')">
       	 	<el-icon>
            	<Document />
        	</el-icon>
        <span>实名认证</span>
    	</el-menu-item>
    </el-menu>
    ```

  - 导航栏点击切换高亮是el-menu组件内置的效果

- ##### 配置路由：一级+二级

  - ```json
    {
        path: '/user',
        component: () => import('@/pages/user/index.vue'),
        children: [
            {
                path: 'certification',
                component: () => import('@/pages/user/certification/index.vue')
            }
    }
    ```

- ##### 点击菜单路由跳转

- ```tsx
  // 点击导航项的回调函数
  const changeActive = () => {
  	$router.push({ path: path })
      //这里应该也要和hospital组件一样，二级路由跳到兄弟路由之后，仍然保留参数的传递，否则兄弟组件无法发送请求
  }
  ```

- 修改唯一标识符index

  - 修改为对应组件的路由地址是为了default-active可以与其动态匹配。否则刷新后还处于当前组件，可高亮效果已经被重置为了第一个

- 点击个人信息下拉框的实名认证等按钮，路由跳转到会员中心相应的路由组件

#### 确定挂号/提交订单业务

- 思路分析：点击确认挂号后，跳转到会员中心的订单管理组件，但是携带了订单参数，所以显示的是挂号订单组件的另一个页面（挂号订单分为两个部分）所以确定挂号的时候要传订单id，而这个id要发送请求获得（订单接口）

- ##### api和接口封装

- 这个接口需要三个参数：医院id，时间段id，就诊人id

  - **而register_step2中发送了请求获取医生排班数据和就诊人数据，这三个可以在响应式数据中拿到**
  - 返回数据的data的ts类型就是简单的number

- 新建接口和类型封装文件：user-

- ```tsx
  //创建订单接口，可以生成订单id
  // 引入二次封装的axios
  import request from "@/utils/request";
  // 引入ts类型
  import { SubmitOrder } from './type.ts'
  // 枚举地址
  enum API {
      // 获取订单号码接口，有了订单号码才能提交订单
      SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/'
  }
  // 提交订单
  export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: number) => request.post<any, SubmitOrder>(API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`)
  
  //type
  export interface ResponseData {
      "code": number,
      "message": string,
      "ok": boolean
  }
  // 提交订单接口返回的数据的ts类型
  export interface SubmitOrder extends ResponseData {
      data: number
  }
  ```

- ##### 发送时机

- 点击按钮跳转到订单管理组件的时候**路由携参id**，挂载时判断是否有订单参数~~，有则发送该请求~~**点击按钮的时候就应该获取订单号，不然拿什么路由传参**，**<u>*获取数据成功，则进行路由跳转order。否则弹出错误信息*</u>**

- ```tsx
  // 点击按钮，获取订单序号并提交订单
  const submitOrder = async () => {
      // 医院编号
      let hoscode = doctorInfo.value.hoscode
      // 医生编号
      let scheduleId = doctorInfo.value.id
      // 就诊人编号
      let patientId = patientNow.value
      // 提交订单
      let result: SubmitOrder = await reqSubmitOrder(hoscode, scheduleId, patientId)
      // 提交订单成功
      if (result.code === 200) {
          $router.push({ path: '/user/order', query: { id: result.data } }) //这个参数名字无所谓，orderId也可以
      } else {
          ElMessage({
              type: 'error',
              message: result.message
          })
      }
  }
  ```

- ##### 挂号订单二级路由组件，交叉显示两个场景（v-if）

- 也可以拆分为两个组件

- ```tsx
  <div v-if="$route.query.id">       //但是这里一定！！要和前面传入的参数名字一致
      <Detail></Detail>
  </div>
  <div v-else>
      <AllOrder></AllOrder>
  </div>
  
  // 创建路由对象
  import { useRoute } from 'vue-router';
  let $route = useRoute()
  // 引入代表两个场景的子组件
  import Detail from './detail/index.vue'
  import AllOrder from './allOrder/index.vue'
  ```

#### 订单详情detail静态搭建

- 盒子包文字可以用padding撑开

#### 订单详情detail数据获取并展示

- #### 思路分析：

  - 接口需要传入**<u>*当前订单id作为参数*</u>**返回**<u>订单详情的数据</u>**，data是一个对象，里面包含了订单所有详情数据

- ##### 封装

- ```tsx
  // 获取订单详情的数据
  GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/'
  
  // 获取订单详情的方法
  export const reqOrderInfo = (id: string) => request.get<any,OrderResponseData>(API.GETORDERINFO_URL + id)
  		//后面挂载时是从路径获取参数id的，$route.query获取的数据是string类型
  
  // 订单数据的ts类型
  export interface OrderInfo {..}
  
  // 接口返回数据的ts类型
  export interface OrderResponseData extends ResponseData {
      data: OrderInfo
  }
  ```

- ##### 发送时机：order的detail子组件挂载时

- 因为参数要从路径获得，所以实例化路由对象

- ```tsx
  // 声明响应式数据存储接收到的订单详情数据<OrderInfo>
  let orderInfo = ref<OrderInfo>({} as OrderInfo)
  
  // 挂载的时候获取当前路由的订单id参数，发送请求获取其详情数据
  onMounted(() => {
      getOrderInfo()
  })
  
  // 封装发送请求函数
  const getOrderInfo = async () => {
      let result: OrderResponseData = await reqOrderInfo($route.query.id as string) //类型断言
      if (result.code === 200) {
          orderInfo.value = result.data
      }
  }

- ##### 展示数据

- ```tsx
  <el-button>{{orderInfo.param?.orderStatusString}}</el-button>
  ```

- 还是以前那个问题，记得加？

#### 取消预约业务

- 订单状态status：1成功 0待支付 -1取消。点击的时候跳出气泡确认框确认是否要取消预约，通知服务器该订单状态改为取消状态

- ##### 气泡确认框

- 注意是用<u>气泡确认框组件包裹按钮</u>

- 确认按钮，取消按钮的文字等属性，可以查看官方文档自定义

- ```tsx
  <el-popconfirm title="确定取消预约吗?">
      <template #reference>
          <el-button>取消预约</el-button>
      </template>
  </el-popconfirm>
  ```

- **发送时机**：点击气泡确认框的确定按钮时。接口返回的数据是布尔值表示是否预约成功，但请求的作用主要是进行取消操作

- ##### api和接口封装

- ```tsx
  // 取消订单接口
  ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/'
  
  // 取消订单接口
  export const reqCancelOrder = (id: string) => request.get<any, any>(API.ORDERCANCEL_URL + id)
  ```

- 因为返回的数据data就算一个布尔值，不需要额外定义

- ##### 发送请求

- 气泡确认框对应的事件：confirm cancel

- ```tsx
  <el-popconfirm title="确定取消预约?" @confirm="cancel">
  ```

- ##### 取消预约后再获取一次订单详情？

- 因为取消后订单的一些数据会发生变化，需要实时更改

- ```tsx
  // 确认取消请求的回调
  const cancel = async () => {
      try {
          // 取消预约成功
          await reqCancelOrder($route.query.id as string)
          // 再次获取订单详情的数据
          getOrderInfo()
      } catch (error) {
          ElMessage({
              type: 'error',
              message: '取消预约失败'
          })
      }
  }
  ```

- 假定请求发送成功，即状态码为200的时候，预约一定会被取消。请求发送失败，则返回一个错误的promise（**可以理解为服务器成功收到请求就可以将订单取消，不会出现其他情况**）

- ##### 取消预约成功之后，取消预约和支付按钮消失

- v-if -- orderInfo.orderStatus状态码为-1的时候隐藏按钮（取消预约按钮待支付和预约成功都要显示，支付按钮只有待支付状态显示）

- ```tsx
  //v-if直接写给外面的气泡确认框
  <el-popconfirm title="确定取消预约?" @confirm="cancel" v-if="orderInfo.orderStatus !== -1"></el-popconfirm>
  
  <el-button type="primary" size="default" v-if="orderInfo.orderStatus === 0">支付</el-button>
  ```

#### 支付对话框静态

- 点击支付按钮，跳出支付对话框（和login组件一样，用到dialog），点击关闭或者支付成功都会关闭窗口，并且重新发送请求获取支付后订单的详细数据

- 布尔值通过v-model控制对话框的显示和隐藏，需要响应式数据~~+v-if~~

- 对话框的宽度可以调整，看官方文档

- 底部的关闭按钮使用插槽

- 上下有两条边框，使用深度选择器给中间的结果设置上下border(工作原理？)

  - ```tsx
    ::v-deep(.el-dialog__body) {
        margin: 0 15px;
        border-top: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
    }
    //好像不管写到哪里都可以，老师直接写到最外层
    ```

- center属性可以让header和footer部分居中

- ```tsx
  <el-dialog title="微信支付" v-model="dialogVisible" width="450px"></el-dialog>

- ##### 控制dialog的显示和隐藏

- ```tsx
  // 定义控制对话框显示隐藏的响应式变量
  let dialogVisible = ref<boolean>(false)
  
  //支付按钮，点击打开对话框
  <el-button @click="openDialog">支付</el-button>
  
  // 点击支付按钮的回调
  const openDialog = () => {
      dialogVisible.value = true
  }
  ```

- ##### 右下角footer插槽关闭按钮和关闭事件

- <el-dialog>标签的close属性绑定的是关闭对话框窗口时的回调。<u>#footer标签里面写希望出现再底部的内容</u>

- ```tsx
  <template #footer>
      <el-button @click="closeDialog">关闭窗口</el-button>
  </template>
  
  // 点击关闭窗口按钮的回调
  const closeDialog = () => {
      dialogVisible.value = false
  }
  ```

- ##### dialog结构

- ```tsx
  <div classs="detail">
  	//详情卡片
      ...
      <!-- 展示支付二维码的结构 - 脱离标准流 -->
          <el-dialog title="微信支付" v-model="dialogVisible" width="400px">
              <!-- 支付需要使用的二维码图片 -->
              <div class="qrCode">
                  <img src="@/assets/images/code_app.png">
                  <p>请使用微信扫一扫</p>
                  <p>扫描二维码支付</p>
              </div>
              <!-- 对话框底部插槽传递结构 -->
              <template #footer>
                  <el-button @click="closeDialog">关闭窗口</el-button>
              </template>
          </el-dialog>
  </div>
  ```

#### Qrcode插件获取二维码

- 需要发请求获取用于支付的二维码

- **<u>*使用接口根据传入的订单号插件获取用于生成二维码的信息*</u>**

- ##### api和接口封装

- ```tsx
  // 获取支付订单二维码接口
  QRCODE_URL = '/order/weixin/createNative/'
  // 获取支付二维码接口
  export const reqQrcode = (orderId: string) => request.get<any, QrcodeResponseData>(API.QRCODE_URL + orderId)
  ```

- ##### ts类型定义

- ```tsx
  // 二维码接口返回的data的ts类型
  export interface PayInfo {
      "codeUrl": string,
      "orderId": number,
      "totalFee": number,
      "resultCode": string
  }
  // 接口返回数据的ts类型
  export interface QrcodeResponseData extends ResponseData {
      data: PayInfo
  }
  ```

- ##### 二维码地址生成二维码

- `npm i qrcode`记得重新启动项目

- 使用ES6/7写法引入该插件

- 有很多方法：比如**把字符串转换为url路径（转为图片路径然后引入）**。toCanvas/toString，**使用这些方法返回的是Promise对象（所以使用await？？？，只要返回promise对象就使用await）**

- 使用toDataURL方法，根据字符串生成一段url 

- ### （**<u>注意是QRCode.toDataURL()!!!!不要写成toDataUrl！！！</u>**）

- ```tsx
  // 生成二维码插件qrcode
  // @ts-ignore
  import QRCode from 'qrcode'
  ```

- ##### 响应式数据

- ```tsx
  <img :src="imgUrl">   //动态二维码路径
  
  // 声明响应式数据存储生成的二维码url路径
  let imgUrl = ref<string>('')
  ```

- ##### 发送时机：什么时候获取二维码？当然是点击支付按钮的时候

- ~~封装请求函数~~这里老师又不封装了，感觉封不封装关系不大

- ```tsx
  // 点击支付按钮的回调
  const openDialog = async () => {
      // 显示对话框
      dialogVisible.value = true
      // 获取支付需要使用的生成二维码的数据
      let result: QrcodeResponseData = await reqQrcode($route.query.id as string)
      //根据上面获取到的二维码数据通过QRCode插件生成二维码图片的url路径
      let imgResult = await QRCode.toDataUrl(result.data.codeUrl)
      // 将二维码的路径赋值给响应式数据
      imgUrl.value = imgResult
  }
  ```


#### 完成微信支付业务

- 支付成功，支付对话框消失。并且弹出相应的提示信息

- ##### （要点）如何知道是否支付成功？

- 向服务器发请求，查询支付状态。

- ##### 封装API和接口

- ```tsx
  // 查询订单支付的结果
  PAYRESULT_URL = '/order/weixin/queryPayStatus/'
  // 查询订单支付的结果
  export const reqQueryPayState = (orderId: string) => request.get<any, PayResult>(API.PAYRESULT_URL + orderId)
  
  // 支付状态查询接口返回数据ts类型
  export interface PayResult extends ResponseData {
      data: boolean
  }
  ```

- ##### 发送时机

- 二维码出现之后，每隔一段时间发送请求。

- 如果返回数据的data为true代表支付成功，则停止发送请求。并且对话框关闭；弹出支付成功提示信息；停止长轮询请求；再发送一次请求获取订单状态

- ```tsx
  // 声明全局定时器
  let timer = ref<any>()
  
  imgUrl.value = imgResult
  // 询问服务器当前这笔交易的支付结果
  // 二维码获取到后，开启定时器，开启长轮询
  timer.value = setInterval(async () => {   //记得加value！！！
      let result: PayResult = await reqQueryPayState($route.query.id as string)
      // 如果返回的数据为true
      if (result.data) {
          // 关闭对话框
          dialogVisible.value = false
          // 关闭定时器
          clearInterval(timer.value)
          // 弹出提示数据
          ElMessage({
              type: 'success',
              message: '支付成功'
          })
          // 重新获取订单状态数据
          getOrderInfo()
      }
  }, 2000)
  ```

- 注意，响应式数据timer**记得加value**

- ##### 需要考虑到的另外一种情况

- 点击关闭（上下两个按钮），清除定时器

- ```tsx
  <el-dialog title="微信支付" v-model="dialogVisible" width="400px" @close="close"></el-dialog>
      
  // 点击对话框原生关闭按钮的回调
  const close = () => {
      // 不打算支付，关闭定时器
      clearInterval(timer.value)
  }
  // 点击关闭窗口按钮的回调
  const closeDialog = () => {
      // 关闭对话框，对话框隐藏
      dialogVisible.value = false
      // 不打算支付，关闭定时器
      clearInterval(timer.value)
  }
  ```

#### 实名认证模块静态搭建

- 思路分析：还是有两个场景，一个场景是没有用户的认证信息显示认证页面，另一个场景有用户的认证信息，则显示认证的用户信息

- ##### 设置表格descriptions的列宽

- 列标签文字对齐方式：label-align

- **列宽：`:width="50"  width="50px"`**

- ```tsx
  <el-descriptions :column="1" border>
      <el-descriptions-item label-align="center" :width="20">
          <template #label>
              <div class="cell-item">
                  用户姓名
              </div>
          </template>
          黄晓琪
      </el-descriptions-item>
  </el-descriptions>
  ```

- ##### v-if切换显示

- ##### 表单form

- **label-width="80px"列标签的宽度,这个是表单的属性，descriptions用不了**

- ```tsx
  <el-form ref="form" label-width="80px" :inline="false" size="normal">
      <el-form-item label="用户姓名">
          <el-input v-model="name" placeholder="请输入用户姓名"></el-input>
      </el-form-item>
  </el-form>
  ```

- 下拉框

- ```tsx
  <el-form-item label="证件类型">
      <el-select v-model="type" placeholder="请选择证件类型" style="width: 100%;">
          <el-option label="身份证"></el-option>
          <el-option label="户口本"></el-option>
      </el-select>
  </el-form-item>
  ```

- 上传照片

- 照片墙，可以上传多张图片

- ```tsx
  <el-form-item label="上传组件">
      <el-upload list-type="picture-card">
          <img src="@/assets/images/auth_example.png" alt="">
      </el-upload>
  </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="">提交</el-button>
      <el-button @click="overWrite">重写</el-button>
  </el-form-item>
  ```

#### 实名认证模块获取用户信息

- 静态搭建好了，~~如果已经实名认证过~~(**发送了请求才知道有没有实名认证过**)需要发送请求获取实名认证数据进行展示（**会员接口，获取会员信息。要携带token）**

- ##### 封装

- data是一个对象，里面存着用户信息

- ```tsx
  // 获取当前账号用户信息
  USERINFO_URL = '/user/auth/getUserInfo/'
  // 获取当前用户信息的接口
  export const reqUserInfo = () => request.get<any, UserInfoResponseData>(API.USERINFO_URL)
  // 代表一个用户信息的数据类型
  export interface UserInfo {}
  // 获取用户信息接口返回的数据的ts类型
  export interface UserInfoResponseData extends ResponseData {
      data: UserInfo
  }
  ```

- ##### 发送时机：已挂载就要获取实名认证信息，如果没有则显示表单场景，有则展示数据

- 因为可能多个位置发送请求，所以封装为方法

- ```tsx
  // 获取返回的用户信息
  let userInfo: any = ref<any>({})
  
  // 实名认证模块挂载时就发送请求获取会员信息
  onMounted(() => {
      getUserInfo()
  })
  // 请求封装为一个方法
  const getUserInfo = async () => {
      let result: UserInfoResponseData = await reqUserInfo()
      if (result.code === 200) {
          userInfo.value = result.data
      }
  }
  ```

- ##### 展示数据

- ```tsx
  <div class="info" v-if="userInfo.authStatus === 1"></div>
  <el-descriptions-item label-align="center" :width="10">
      <template #label>
          <div class="cell-item">
              证件类型
          </div>
      </template>
      {{ userInfo.certificatesType === '10' ? '身份证' : '户口本' }}
  </el-descriptions-item>
  ```

#### 获取实名认证的证件类型的数据

- 没有实名认证过的账号，进行实名认证。**认证成功之后要获取用户信息，这样子就会跳到展示数据的场景**

- 实名认证业务中，证件类型不是写死的，要从服务器获取证件都有哪些类型（公共数据接口）

- ##### 封装

- data是数组，里面每个对象代表一个证件类型的数据

- ```tsx
  // 获取证件的类型的接口地址
  CERTIFICATIONTYPE_URL = '/cmn/dict/findByDictCode/'
  // 获取证件类型的方法
  export const reqCertificationType = (dictCode: string = 'CertificatesType') => request.get<any,CertificationTypeResponseData>(API.CERTIFICATIONTYPE_URL + dictCode)
  // 证件类型的数据类型
  export interface CertificationType {...}
  // 存储证件类型的数组
  export type CertificationArr = CertificationType[]
  // 接口返回数据的ts类型
  export interface CertificationTypeResponseData extends ResponseData {
      data: CertificationArr
  }
  ```

- ##### 发送时机：要在实名认证页面挂载的时候就发送请求获取证件有哪些类型

- ```tsx
  <el-option :label="item.name" v-for="item in certificationArr" :key="item.id"></el-option>
  
  // 获取返回的证件类型列表
  let certificationArr = ref<CertificationArr>([])
  
  onMounted(() => {
      // 获取用户信息的方法
      getUserInfo()
                                // 如果有实名认证的信息就不需要填写表单了
      if (userInfo.value.authStatus !== 1) {
          getCertificationType()
      }
  })
  // 获取证件类型数据的方法
  const getCertificationType = async () => {
      let result: CertificationTypeResponseData = await reqCertificationType()
      if (result.code === 200) {
          certificationArr.value = result.data
      }
  }
  ```

- 但是表单元素都需要收集数据，下拉框收集数据也需要使用**`:value="item.value"`**

#### 收集表单数据完成实名认证业务

- ##### 接口封装

- post请求，**需要请求体携带四个参数（安全）怎么携带？**：**`request.post(地址,请求体参数)`**

- ```tsx
  // 实名认证的接口
  USERCERTIFICATION_URL = '/user/auth/userAuah/'
  // 实名认证接口方法
  export const reqUserCertification = (data: UserParams) => request.post<any, any>(API.USERCERTIFICATION_URL, data)
  
  // 实名认证请求体携带的参数的ts类型
  export interface UserParams {
      "certificatesNo": string,
      "certificatesType": string,
      "certificatesUrl": string,
      "name": string
  }
  // 实名认证接口返回数据中data没有数据
  ```

- ##### 收集表单数据

- 表单元素需要用于认证

- **但是因为封装的接口方法中有对形参类型进行了限制，所以实参（响应式对象）的字段要和ts类型一致**

- ```tsx
  // 收集表单数据的响应式对象
  let UserParams = reactive<UserParams>({     //通过泛型约束对象
      "name": '',
      "certificatesType": '',
      "certificatesNo": '',
      "certificatesUrl": ''
  })
  
  <el-input v-model="UserParams.name" placeholder="请输入用户姓名"></el-input>
  <el-input v-model="UserParams.certificatesNo" placeholder="请输入证件号码"></el-input>
  <el-select v-model="UserParams.certificatesType" placeholder="请选择证件类型" style="width: 100%;">
  	<el-option :label="item.name" :value="item.value"></el-option>   //收集的值为:value
  </el-select>
  <el-upload list-type="picture-card" v-model="UserParams.certificatesUrl">
      <img src="@/assets/images/auth_example.png" alt="">
  </el-upload>
  ```

- ##### 不可以使用v-model收集图片，因为el-button是个组件，不是简单的表单元素（查文档）

  - 照片墙最多只能上传一张图片

    - 组件有一个属性**limit：允许上传图片的最大数量**

    - 超出limit的提示：**on-exceed：超出限制执行的钩子函数**

    - 不一定要用加冒号，比如:limit

    - **像on-exceed和limit都是Attributes属性，写在标签中，对于不需要解析为js代码的自然不用加:比如limit，只需要一个number，但是像on-exceed需要传入一个回调函数而不是简单的字符串，所以需要加:号**

      - 错错错，limit也需要的是number类型，如果不加:，那么收到的值就是string类型的了
      - 经常看到一些黄色的警告，一般就是某个el组件标签的某些属性没有加冒号

    - ```tsx
      <el-upload list-type="picture-card" v-model="UserParams.certificatesUrl"
      action="/api/oss/file/fileUpload?fileHost=userAuah" limit="1" :on-exceed="exceedhandler">
      // 超出数量的钩子
      const exceedhandler = () => {
          ElMessage({
              type: 'error',
              message: '图片只能上传一张图片'
          })
      }
      ```

  - **<u>action</u>**:upload组件向服务器提交图片的路径，这样子上传后服务器才能收到我们的图片（文件上传接口）并且上传成功后，服务器会返回这个图片的路径。<u>*通过写这个属性相当于上传后会自动向这个接口发送请求*</u>

    - 如何接收这个路径？

    - **on-success：图片上传成功时的钩子**，<u>回调函数会自动注入一些参数</u>

      - **response：上传请求服务器返回的数据，里面的data就是图片的服务器地址**

      - uploadFile:上传的文件对象的信息，比如大小

      - uploadFiles:上传文件对象的列表

      - ```tsx
        :on-success="successHandler">
        // 图片上传成功的回调，可以获取我们所需要的图片地址
        const successHandler = (response: any) => {     //后面的参数没有用
            UserParams.certificatesUrl = response.data  
        }
        ```

  - ##### 上传成功后，可以预览；并且撤回删除图片后，已收集地址的变量要清空

    - :on-preview，回调函数注入的参数没什么用

      - 要配合el-upload组件下的el-dialog结构

      - 并且需要响应式数据控制这个预览dialog的显示和隐藏

      - ```tsx
        <el-upload ... :on-preview="handlePictureCardPreview"></el-upload>
        <el-dialog v-model="dialogVisable">
            <img :src="UserParams.certificatesUrl" alt="Preview Image" w-full style="width: 100%;">
                //设置一下图片的样式，防止超出对话框
                //通过:src动态展示服务器返回的图片地址（on-success中把地址存到本地响应式数据中了）
        </el-dialog>
            
        // 控制预览对话框的显示和隐藏
        let dialogVisable = ref<boolean>(false)
            
        // 点击图片预览按钮的回调
        const handlePictureCardPreview = () => {
            dialogVisable.value = true
        }
        ```

      - plus：上传还没有成功，是看不到这个图的

      - 就是只有上传成功，取到图片地址时，才显示这个图片（有的时候会直接显示缓存的图片）

      - ```tsx
        <img v-if="UserParams.certificatesUrl" ...>
        ```

    - :on-remove，点击删除已上传图片的钩子

      - 点击删除按钮后，响应式数据仍然保存此前图片的服务器地址，需要删除

      - ```tsx
        <el-upload :on-remove="handleRemove"></el-upload>
        // 点击删除图片按钮的回调，简单地将该字段重置即可
        const handleRemove = () => {
            UserParams.certificatesUrl = ''
        }
        ```

    - 还有很多其他的钩子，比如before-upload，可以用来约束上传图片的后缀

- ##### 发送请求进行认证（会员认证接口）

- 认证成功没有返回的数据

- **发送时机**：点击提交按钮的时候

- ```tsx
  // 点击提交按钮进行实名认证
  const submit = async () => {
      let result: any = await reqUserCertification(UserParams)
      if (result.code === 200) {
          ElMessage({
              type: 'success',
              message: '认证成功'
          })
          getUserInfo()
      } else {
          ElMessage({
              type: 'error',
              message: '认证失败'
          })
      }
  }
  //老师写的是下面这种，两者应该是一样的？
  // 点击提交按钮进行实名认证
  const submit = async () => {
      try {
          // 认证成功
          await reqUserCertification(UserParams)
          // 提示消息
          ElMessage({
              type: 'success',
              message: '认证成功'
          })
          // 认证成功以后再次获取用户信息
          getUserInfo()
      } catch (error) {
          ElMessage({
              type: 'error',
              message: '认证失败'
          })
      }
  }
  ```

- 认证成功进行特定操作 ，要使用try-catch，不过应该也可以像我们一样判断result的code？

- ##### 重写

- 不知道为什么resetFields不可以（是不是其实本来就不可以用来清空表单元素，只是用来清除表单校验的？）

  - 可以通过.语法将收集表单数据的响应式对象中的字段一个个清空
  - 或者使用ES6的**Object.assign方法清空，将params对象和第二个参数对象进行合并**

- ```tsx
  // 重写按钮的回调函数
  const overWrite = () => {
      // form.value.resetFields()
      // ES6语法合并对象
      // Object.assign(UserParams, {
      //     "name": '',
      //     "certificatesType": '',
      //     "certificatesNo": '',
      //     "certificatesUrl": ''
      // })
      UserParams.name = ''
      UserParams.certificatesType = ''
      UserParams.certificatesNo = ''
      UserParams.certificatesUrl = ''            //为什么图片清除不了！！！！！？？？？？
  }

- 但是上传号的图片好像无法清空！！！！！

  - **要使用外部方法（要通过组件实例来调用，但是记得加value）：clearFiles：清空已上传的文件列表**

  - ```tsx
    <el-upload ref="upload"></el-upload>
    // 获取上传组件实例
    let upload = ref<any>()
    
    // 清除文件上传列表
    upload.value.clearFiles()
    ```

#### 实名认证表单校验

- form提供了表单校验功能，使用其中的自定义校验规则

- 要表单校验，就要给el-form标签加上一个`:model`属性，表示有哪些数据需要进行表单校验，一般是一整个对象(里面字段收集表单元素数据)

- ```tsx
  //1.el-form标签加上:model="UserParams"属性
  <el-form label-width="80px" :inline="false" ref="form" :model="UserParams"></el-form>
  //2.每一个el-form-item都加上prop属性指定校验的字段的名字
  <el-form-item label="证件类型" prop="certificatesType"></el-form-item>
  //3.el-form添加:rules="rules"属性指定校验依据的规则
  <el-form ... :rules="rules"></el-form>
  //4.写相应的规则对象
  // 自定义校验规则
  const rules = {
      name: [{ required: true, validator: validatorName }],
      certificatesType: [{ required: true, validator: validatorType }],
      certificatesNo: [{ required: true, validator: validatorNo }],
      certificatesUrl: [{ required: true, validator: validatorUrl }]
  }
  // name字段自定义规则
  const validatorName = (_: any, value: any, callBack: any) => {
      const reg = /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/                 //定义正则表达式
      if (reg.test(value)) {                                             //test()方法返回布尔值，表示是否匹配
          callBack()
      } else {
          callBack(new Error('请输入正确的中文名字'))
      }
  }
  
  // 证件类型自定义规则
  const validatorType = (_: any, value: any, callBack: any) => {
      if (value === '10' || value === '20') {
          callBack()
      } else {
          callBack(new Error('请选择证件的类型'))                             //别忘了什么都不选的情况
      }
  }
  
  // 组件号码正则
  const validatorNo = (_: any, value: any, callBack: any) => {
      const sfz = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/
      const hkb = /^\d{9}$/
      if (sfz.test(value) || hkb.test(value)) {
          callBack()                                                 //名字大小写无所谓，只要和形参一样即可
      } else {
          callBack(new Error('请输入正确的身份证或者户口本的号码'))
      }
  }
  
  // 上传图片地址自定义规则
  const validatorUrl = (_: any, value: any, callBack: any) => {
      if (value.length) {
          // 不写length也可以
          callBack()
      } else {
          callBack(new Error('请上传证件照图片'))
      }
  }
  ```

- required:true的效果：在label的前面加上一个*

- validator：自定义校验的函数

  - 指定的函数会自动注入三个参数
  - rule：当前字段的规则对象
  - value：当前表单的值
  - callback：放行函数，成功就callback()，错误就callback(new Error('123456'))

- trigger：触发校验的时机

- ##### 关于图片上传组件的表单校验!!!!!

- #### 【1】**<u>*图片上传不是form表单，不能主动进行校验自定义规则，必须手动触发比如使用外部方法validate（在点击提交按钮的时候*</u>）**

  - **validate**：对整个表单的内容进行验证，包括upload组件
  - **自定义规则判断逻辑：value就是upload组件的图片服务器地址，判断图片地址有没有**

- **【2】即使校验不通过也会进行后面代码的执行，我们需要手动拦截代码的执行**。!!!!!

  - validate返回一个promise（用处大）。判断promise的真假，如果**所有表单项都通过则返回布尔值true**，否则返回失败的promise。

  - **不过也可以不进行判断，在该校验语句前加上await**，表示返回成功的promise才向下执行。那么失败的时候就不往下执行

  - ```tsx
    // 点击提交按钮进行实名认证
    const submit = async () => {
        // 全部的表单校验通过返回一个成功的promise
        // 如果有一个表单校验失败，返回的是一个失败的promise对象，后面的语句就不再执行了
        await form.value.validate()
        ...发送认证请求
    }
    ```

- ##### 【3】upload校验后，已经上传图片无法消除原先校验结果（还是老问题，不能主动校验）!!!!

  - 使用form的外部方法**clearValidate()：清除某个字段的表单验证信息**

  - 方法执行的时机：**上传图片成功时的回调:on-success**

  - ```tsx
    // 图片上传成功的回调，可以获取我们所需要的图片地址
    const successHandler = (response: any) => {
        // 如果图片上传成功则校验结果清除
        form.value.clearValidate('certificatesUrl')    //***
        // 收集上传成功图片地址
        UserParams.certificatesUrl = response.data
    }
    ```

  - ##### resetFields破案！！！

    - 完成了表单项和表单的绑定(:model和prop)也就是自定义校验要做的准备工作后，就可以使用resetField进行表单的清除

#### 挂号订单模块静态搭建

- 展示当前账号给所有就诊人的所有挂号订单，可以根据就诊人和订单状态进行筛选
- ~~dialog默认不展示~~我们要用的是card！！还dialog
- 根据筛选框筛选条件展示数据，应该还是要发送请求，没有封装好的组件，就是form表单加循环渲染加分页器罢了

- ##### 行内表单

- ```tsx
  <el-form :inline="true">
      <el-form-item label="就诊人">
          <el-select placeholder="请选择就诊人">
              <el-option>123</el-option>
              <el-option>456</el-option>
              <el-option>798</el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
          <el-select placeholder="请选择订单状态">
              <el-option>123</el-option>
              <el-option>456</el-option>
              <el-option>798</el-option>
          </el-select>
      </el-form-item>
  </el-form>
  ```

  - placeholder是写给el-input/el-select的，不要写给el-form-item
  - 行内表单只用在`<el-form>`中加上`:inline="true"`即可

- ##### 表格展示数据

- ```tsx
  <!-- 表格展示订单的数据 -->
  <el-table border>
      <el-table-column label="就诊时间"></el-table-column>
      <el-table-column label="医院"></el-table-column>
      <el-table-column label="科室"></el-table-column>
      <el-table-column label="医生"></el-table-column>
      <el-table-column label="医事服务费"></el-table-column>
      <el-table-column label="就诊人"></el-table-column>
      <el-table-column label="订单状态"></el-table-column>
      <el-table-column label="操作"></el-table-column>
  </el-table>
  ```

- 在标签加`border`即可设置表格的外边框

- ##### 分页器(下拉菜单)

- ```tsx
  <!-- 分页器 -->
  <el-pagination 
      v-model:current-page="pageNo" 
      v-model:page-size="pageSize" 
      :page-sizes="[10, 20, 30, 40]"
      :background="true" 
      layout="prev, pager, next, jumper,->, sizes,total" 
      :total="40" 
      class="pagination" />
  
  // 分页器当前页数
  let pageNo = ref<number>(1)
  // 分页器尺寸
  let pageSize = ref<number>(10)
  ```

- 分页器的`v-model:current-page="pageNo" v-model:page-size="pageSize"`这两个属性非常重要，需要声明响应式数据来控制

- `:background="true"`设置页码是否有背景颜色

#### 挂号订单api、接口封装和类型定义

- 列表能展示这么多数据，点击按钮可以进行切换，点击下拉框可以进行筛选，就是因为发送请求携带参数从服务器获取到了对应数据（订单接口-获取分页列表）

- ```tsx
  // 获取用户订单号的数据
  USERORDERINFO_URL = '/order/orderInfo/auth/'
  // 订单分页数据接口
  export const reqUserOrderInfo = (page: number, limit: number, patientId: string, orderStatus: string) => request.get<any, UserOrderInfoResponseData>(API.USERORDERINFO_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
  ```

- data里面包含列表的信息(total)和列表里订单的数组records，records里面的每个对象是一个订单

- ```tsx
  // 一个订单的ts类型,之前定义过了
  // 存储订单数据的列表类型
  export type Records = OrderInfo[]
  // 获取订单接口数据的ts类型
  export interface UserOrderInfoResponseData extends ResponseData {
      data: {
          "records": Records,
          "total": number,
          "size": number,
          "current": number,
          "orders": [],
          "hitCount": boolean,
          "searchCount": boolean,
          "pages": number
      }
  }
  ```

- 泛型<>限定接口返回值的类型

#### 获取挂号订单的数据

发送时机：order组件中的子组件allOrder组件挂载时，还有切换页面选择筛选条件的时候，所以要把请求封装为一个函数

```tsx
// 挂载时获取订单分页数据
onMounted(() => {
    getRecords()
})
// 分页数据肯定会多次发请求获取，封装为一个函数
const getRecords = async () => {
    let result: UserOrderInfoResponseData = await reqUserOrderInfo(pageNo.value, pageSize.value, patientId.value, orderStatus.value)                             //记得响应式数据加value
    if (result.code === 200) {
        records.value = result.data.records
        total.value = result.data.total
    }
}
```

- 不用把接口封装为函数后，还向这个封装函数传递参数，因为所有参数都来自于响应式数据，只用在封装的函数里传入这些响应式数据即可

- ##### 响应式变量收集数据

  - ```tsx
    // 分页器当前页数
    let pageNo = ref<number>(1)
    // 分页器尺寸
    let pageSize = ref<number>(10)
    // 存储获取的分页数据，用于循环渲染
    let records = ref<Records>([])
    // 存储就诊人id的值
    let patientId = ref<string>('')
    // 存储订单状态的值
    let orderStatus = ref<string>('')
    // 存储数据总数
    let total = ref<number>()                 //动态展示数据条数
    ```

  - 

- ##### 表单下拉框的值收集

  - ```tsx
    <el-form-item label="订单状态">
        <el-select placeholder="请选择订单状态" v-model="orderStatus">
            <el-option value="123">123</el-option>
            <el-option value="456">456</el-option>
            <el-option value="789">798</el-option>
        </el-select>
    </el-form-item>
    ```

  - el-select标签写收集值的变量v-model，el-option写选项的值value

  - ```tsx
    <el-select placeholder="请选择订单状态" v-model="orderStatus">
        <el-option value="">全部状态</el-option>
    </el-select>
    <el-select placeholder="请选择就诊人" v-model="patientId">
        <el-option value="">全部就诊人</el-option>
    </el-select>
    ```

  - 注意要能够清除筛选条件，所以要增加一个value为空的选项

  - ##### 获取就诊人和订单状态数据(就诊人接口，订单接口)

  - 携带token，获取指定账号下所有的就诊人。获取订单所有状态

  - ```tsx
    // 获取就诊人数据的接口
    ALLUSER_URL = '/user/patient/auth/findAll/',
    // 获取订单状态的接口地址
    ORDERSTATE_URL = '/order/orderInfo/auth/getStatusList/',
        
    // 获取就诊人数据的接口
    export const reqAllUser = () => request.get<any, AllUserResponseData>(API.ALLUSER_URL)
    // 获取订单状态的接口
    export const reqOrderState = () => request.get<any, AllOrderStateResponseData>(API.ORDERSTATE_URL)
    ```

  - ts类型，hospital-type中写过，可以在user-type中再写一遍

  - ```tsx
    //就诊人，data是一个数组，里面每一个对象是一个就诊人
    // 代表的是一个就诊人数据ts类型
    export interface User {...}
    export type UserArr = User[]
    // 全部就诊人数据接口返回的数据类型
    export interface AllUserResponseData extends ResponseData {
        data: UserArr
    }
    // 一个订单状态数据的类型
    export interface OrderState {
        "comment": string,
        "status": number
    }
    export type AllOrderState = OrderState[]
    // 全部订单状态码接口返回的数据ts类型
    export interface AllOrderStateResponseData extends ResponseData {
        data: AllOrderState
    }
    ```

#### 发送请求 并 将获取的就诊人+订单状态数据展示在下拉框中

- 将两个请求封装在一个方法中

- ```tsx
  // 获取就诊人和订单状态的函数
  const getData = async () => {
      let userResult: AllUserResponseData = await reqAllUser()
      if (userResult.code === 200) {
          userArr.value = userResult.data
      }
      let stateResult: AllOrderStateResponseData = await reqOrderState()
      if (stateResult.code === 200) {
          stateArr.value = stateResult.data
      }
  }
  
  //老师的getData()   ---      当数据一回来立马存储，收到了数据才往下执行，不用result.code的判断？
  const getData = async () => {
      // 获取全部的就诊人信息
      const result: AllUserResponseData = await reqAllUser()
      // 获取全部的订单状态
      const result1: AllOrderStateResponseData = await reqOrderState()
      userArr.value = result.data
      stateArr.value = result1.data
  }
  
  // 存储就诊人列表
  let userArr = ref<UserArr>([])
  // 存储订单状态列表
  let stateArr = ref<AllOrderState>([])
  //展示数据
  <el-option :value="item.id" v-for="item in userArr" :key="item.id">{{ item.name }}</el-option>
  <el-option :value="item.status" v-for="item in stateArr" :key="item.status">
      {{ item.comment }}
  </el-option>
  ```

- `:value里的值应该和下拉框中展示的文字一样，:value="item.name"，:value="item.comment"`因为:value中的数据就是要进行展示的双向绑定的响应式数据

- ##### el-table中数据的展示

  - el-table展示数据也很简单，保留原来的标签el-table-column，只用添加一些属性即可

  - ```tsx
    <el-table border :data="records">
        <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
        <el-table-column label="医院" prop="hosname"></el-table-column>
    </el-table>
    ```

  - el-tabel标签加`:data="对应数组"`,el-table-colume添加属性`prop="每一个对象中的对应字段"`

  - 操作列要有一个按钮

  - ```tsx
    <el-table-column label="操作">
        <template #="{ row }">
            <el-button type="text">详情</el-button>
        </template>
    </el-table-column>
    ```

  - 要使用插槽，`#="{row}"`代表插槽位置是当前行的当前列

- ##### 表格展示信息的样式

  - ```tsx
    
    ```

- ##### 修改页码和每页尺寸的回调

  - ```tsx
    <el-pagination size-change="sizeChange" @current-change="currentChange" />
    // 修改页面尺寸的回调
    const sizeChange = () => {
        getRecords()
    }
    // 切换页码的回调
    const currentChange = () => {              //会有一个注入的参数pager:number，但是没什么用
        getRecords()
    }
    ```

  - 可以直接把发送请求的回调写为size-change和current-change事件的回调

  - 没必要在回调里面修改响应式数据的值吧，因为**pagination都用v-model绑定过页码和size**了。要不然才手动在回调中修改pageNo

- ##### 修改下拉框筛选信息的回调

  - ##### 直接给`el-option`绑定点击事件就好啦！！！

    - #### 错错错，

    - 只要下拉菜单的value发生改变就发送请求重新回去列表数据，**el-select自身有change这个事件--选中值发生变化时触发**

    - ```tsx
      ```

    - 

  - ```tsx
    // 存储当前就诊人名字和id
    let patientId = ref<string>('')
    let patientName = ref<string>('')
    // 存储订单状态文字和编码的值
    let orderStatus = ref<string>('')
    let orderMessage = ref<string>('')
    
    <el-select placeholder="请选择就诊人" v-model="patientName">
        <el-option value="" @click="changeUser('')">全部就诊人</el-option>
    	<el-option :value="item.name" v-for="item in userArr" :key="item.id" @click="changeUser(item)">{{
            	item.name }}</el-option>
    	</el-select>
    <el-select placeholder="请选择订单状态" v-model="orderMessage">
        <el-option value="" @click="changeState('')">全部状态</el-option>
    	<el-option :value="item.comment" v-for="item in stateArr" :key="item.status"  //用status做key没问题
        	@click="changeState(item)">
       	 	{{ item.comment }}
    	</el-option>
    </el-select>
    
    // 下拉框确定就诊人的回调
    const changeUser = (item: any) => {
        if (item === '') {
            patientId.value = ''
        } else {
            patientId.value = item.id
        }
        getRecords()
    }
    // 下拉框确认订单状态的回调
    const changeState = (item: any) => {
        if (item === '') {
            orderStatus.value = ''
        } else {
            orderStatus.value = item.status          //这么写太麻烦了，应该直接在传入参数的时候传入需要的字段！！！
        }
        getRecords()
    }
    
    //修改后的回调
    <el-option @click="changeUser('' + item.id)">
    <el-option @click="changeState('' + item.status)">
    // 下拉框确定就诊人的回调
    const changeUser = (userId: string) => {
        patientId.value = userId
        getRecords()
    }
    // 下拉框确认订单状态的回调
    const changeState = (status: string) => {
        orderStatus.value = status
        getRecords()
    }
    ```

  - 关于病人的响应式数据，我们需要一个响应式数据来和el-select绑定，接收选择的值，注意必须要是病人的姓名，因为双向绑定的值会直接显示在下拉框中

    - 还需要一个响应式数据存储病人的id，用于发送请求传递所需要的参数

    - 或者直接声明为一个对象？

    - #### 错错错错错！！！

    - 对el-select这个组件还有el-option标签使用不熟练。**选项选中展示出来文字是使用:label属性而不是写在标签的中间**

    - 所以其实**并不需要两个响应式变量**

    - ```tsx
      <el-select placeholder="请选择就诊人" v-model="patientId" @change="changeUser">
          <el-option value="" label="全部就诊人"></el-option>
          <el-option :value="item.id" v-for="item in userArr" :key="item.id" :label="item.name">
          </el-option>
      </el-select>
      <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="changeState">
          <el-option value="" laber="全部状态"></el-option>
          <el-option :value="item.status" v-for="item in stateArr" :key="item.status" :label="item.comment">
          </el-option>
      </el-select>
      
      // 下拉框确定就诊人的回调
      const changeUser = () => {
          // 根据就诊人的ID再次获取挂号订单的数据
          getRecords()
      }
      // 下拉框确认订单状态的回调
      const changeState = () => {
          getRecords()
      }
      ```

    - #### 总结：el-option的内容要写在label属性中(必要时加冒号)，点击哪个option，select文本框就会显示哪个optionlabel中的文字，这个是自动底层实现的，不需要管。因为每一个option都有另一个属性value(必要时加冒号),表示选中这个option时select要接收的值，因为el-select标签也有一个v-model属性指定接收option的值的响应式变量。反正显示的文字和传递的值没有关系，互不影响

  - 别忘了也给value=“”的默认option绑定按钮`@click="changeUser('')"`

- ##### 点击详情按钮进行路由跳转进入订单详情页

  - ```tsx
    <el-table-column label="操作">
        <template #="{ row }">
            <el-button type="text" @click="goDetail(row)">详情</el-button>
        </template>
    </el-table-column>
    //详情按钮的点击回调，传入的row是当前数据项的整个对象对应的数据
    // 点击详情按钮，进入订单详情页
    const goDetail = (row: any) => {
        $router.push({ path: '/user/order/', query: { id: row.id } })   //我们用的是id
    }
    ```

- ##### 关于按钮的type.text报错

  - ```tsx
    <el-button type="text" @click="goDetail(row)">详情</el-button>
    ```

  - 以上写法报错，提示type的text属性将被删除

  - ```tsx
    <el-button :link="true" @click="goDetail(row)">详情</el-button>
    ```

  - 建议使用以上link属性，并且它的值是一个布尔值，所以要加冒号：

#### 就诊人管理模块---展示全部就诊人信息

- **分析**：和当初预约挂号step2的一样，只不过比之前多了一个删除按钮（点击后弹出气泡确认框）。并且头部插槽还有可以增加就诊人的按钮，可以编辑已有的就诊人信息（增删改业务）

- ##### 复用visitor组件

  - ~~把预约登记使用的vistor组件复制过来稍加修改即可~~，但是老师好像说是要把**它封装为全局组件（复用性）**，至于删除按钮是否出现就使用**v-if+路由参数**来判断

  - ```tsx
    //components文件夹下新建vistor文件夹，把相应的组件放到该文件夹下，然后在入口文件main.ts中将其注册为全局组件
    // 引入visitor组件
    import Visitor from '@/components/visitor/visitor.vue'
    app.component('Visitor', Visitor)
    
    //删除按钮
    <div class="right">
        <el-button type="primary" size="default" :icon="Edit" circle></el-button>
    	<el-button type="danger" size="default" :icon="Delete" circle v-if="$route.path === '/user/patient'"></el-button>
    </div>
    ```

- ##### 获取就诊人数据发送时机：

  - 发送请求获取就诊人信息不止发一次，**添加完就诊人还要发一次请求**（不对啊你跳转到就诊人管理不就是重新挂载不久发送请求了吗？错错错，添加就诊人，展示就诊人，都是**<u>*在patient这一个路由下的不同场景，没有重新挂载，所以不会发送*</u>**）

#### 就诊人管理模块 -- 添加/修改业务的静态搭建

- ##### 思路分析：

  - 点击添加按钮和修改按钮，~~会路由跳转(到本路由)并携带参数~~，card的body部分展示另一个场景。需要有v-if结合路由地址的参申诉来判断指定的盒子是否出现（不可以通过响应式变量来控制吗？是不是这样子可以复用场景）

    - ##### 就是通过响应式变量来切换场景，根据路由参数那是判断另一个页面进入当前页可能展示的不同情况

  - 注意，老师不是拆成了三个场景：展示、修改、新增（我的想法），而是拆成了两个场景，将添加和修改划分为同一个场景，因为两个都是通过表单填写数据，静态其实是一样的

  - ```tsx
    //添加就诊人 | 修改就诊人 的结构
    <!-- 展示添加场景 或者 修改场景 -->
    <div class="form">
        添加一个就诊人
    </div>
    ```

- ##### 点击添加按钮和编辑按钮，实现场景的切换

  - 响应式数据

    - ```tsx
      // 声明响应式数据，控制body结果中场景的切换
      let scene = ref<number>(0)
      
      <!-- 身体展示就诊人信息 -->
      <div class="user" v-if="scene === 0"></div>
      <!-- 展示添加场景 或者 修改场景 -->
      <div class="form" v-else>
          添加一个就诊人
      </div>
      ```

  - 按钮回调(点击修改和添加都要切换到form场景)

    - ```tsx
      <el-button type="success" size="default" :icon="User" @click="addPatient">添加就诊人</el-button>
      // 点击添加按钮的回调含食宿
      const addPatient = () => {
          scene.value = 1
      }
      ```

    - ##### 点击子组件visitor的按钮，通知父组件修改数据（子给父传参 -- 自定义事件）

    - ```tsx
      //patient/index.ts
      <Visitor ... @changeScene="changeScene"></Visitor>
      // 自定义事件被触发后执行的回调
      const changeScene = () => {
          scene.value = 1
      }
      
      //visitor
      // 接收自定义事件
      let $emit = defineEmits(['changeScene']),
      <el-button ... @click="$emit('changeScene')"></el-button> //直接触发自定义事件
      ```

  - ##### 静态结构搭建

    - 分割线

    - ```tsx
      <el-divider content-position="left">就诊人信息</el-divider>
      ```

    - 因为有多个分割线分隔多种数据，加上一个对象也不好一下过多数据，并且调整表单样式时也不方便，所以就声明多个响应式对象来存储多个表单里的数据

    - ```tsx
      let patientInfo = reactive({
          name: '',
          type: '',
          num: '',
          gender: '',
          birth: '',
          phone: ''
      })
      // 收集建档信息的表单数据
      let userInfo = reactive({
          isMarried: '',
          isInsure: '',
          address: '',
          extract: ''
      })
      // 收集联系人信息的表单数据
      let contact = reactive({
          name: '',
          type: '',
          num: '',
          phone: ''
      })
      ```

    - 文字颜色无法设置，可能官网有相关接口

  - ##### 表格

    - ##### 身份证下拉菜单

    - 要发送请求，获取并展示

    - ```tsx
      <el-form-item label="证件类型" prop="certificatesType">
          <el-select v-model="patientInfo.type" placeholder="请选择证件类型" style="width: 100%;">
              <el-option :label="item.name" :value="item.value" v-for="item in certificationArr"
                  :key="item.id"></el-option>
          </el-select>
      </el-form-item>
      
      //引入请求接口，引入用到的ts类型
      // 存储证件类型
      let certificationArr = ref<CertificationArr>([])
      // 获取证件类型数据的方法                  ----  挂载的时候直接发送请求**********
      const getCertificationType = async () => {
          let result: CertificationTypeResponseData = await reqCertificationType()
          if (result.code === 200) {
              certificationArr.value = result.data
          }
      }
      ```

    - ##### 日期

    - ```tsx
      <!-- 出生日期 -->
      <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="patientInfo.birth" type="date" placeholder="选择日期时间">
          </el-date-picker>
      </el-form-item>
      ```

    - ##### 单选框

    - ```tsx
      <!-- 用户性别 -->
      <el-form-item label="用户性别" prop="gender">
          <el-radio-group v-model="patientInfo.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
          </el-radio-group>
      </el-form-item>
      ```

      - 和其他表单项不同，**表单标签中的值是显示出来的值，:label是传给v-model的值**

    - ##### 地址

    - ```tsx
      <!-- 当前住址 -->
      <el-form-item label="当前地址" prop="address">
          <el-select v-model="userInfo.address" placeholder="请选择住址">
              <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
          </el-select>
      </el-form-item>
      ```

    - 需要发送请求，选择某个省，就发送请求获得这个省下有哪些市

    - 并没有特定的一个地址组件，~~仍然是下拉框el-select组件~~，并且要进行远程搜索

    - 用的其实是层级选择器cascader中的远程搜索：<u>当选中某一级时动态加载该级下的选项</u>

    - ```tsx
      <el-cascader v-model="userInfo.address" :props="props" />       //标签的使用很简单，主要是props怎么定义
      ```

      - :props属性表示下拉菜单组件需要用到的数据

    - ##### 获取地址数据

    - 使用接口传入path参数86可以得到省份的数据，再传入省份参数获取市数据，以此类推得到区数据（参数为number类型，为什么老师用string）

      - ##### 封装

      - ts类型直接定义为any

      - ```tsx
        // 获取省市的数据接口地址
        CITY_URL = '/cmn/dict/findByParentId/'
        // 获取省市的数据
        export const reqCity = (parentId: number) => request.get<any, any>(API.CITY_URL + parentId)
        ```

      - ##### props（级联选择器数据获取）

      - ```tsx
        // 获取级联选择器所需props的数据类型
        import type { CascaderProps } from 'element-plus'
        // 级联选择器数据
        const props: CascaderProps = {
            lazy: true,//懒加载数据
            // 加载级联选择器数据方法
            async lazyLoad(node: any, resolve: any) {
                console.log(node);
                let result: any = await reqCity(node.data.id || 86)  
                //都是number类型的，不知道老师为什么用字符串
                // 整理数据       
                let showData = result.data.map((item: any) => {
                    return {
                        id: item.id,           //这样点击一级节点才能收到它的id，才能获得其对应的二级节点进行展示
                        label: item.name,
                        value: item.value,
                        leaf: !item.hasChildren          //判断是否有下一级节点
                    }
                })
                // 注入组件需要展示的数据
                resolve(showData)
            }
        }
        ```
        
      - lazy：懒加载（需要才发请求，不需要不发）
      
      - lazyLoad：加载/**<u>*整理*</u>**来自服务器的数据
      
      - 写在lazyLoad写了请求函数后已挂载自动会发请求？
      
        - 应该不需要封装为一个函数，等到挂载时再执行，**该表单元素出现时自动执行这里面的请求**
        - 获取的数组数据里，它需要的每个数据项**必须包含指定字段value和label**所以要通过数组的map方法返回一个符合要求的数据作为props（label就是展示在级联选择器中的内容，value是传递/保存/收集的数据）
        - 数据有了之后，通过调用reslove方法把数据传到对应的层级选择器cascader组件中，就可以展示这些数据了
        - 但其实另一个字段level也很重要，有的数据比如直辖市，没有箭头继续往下一层（值为布尔值，true则没有下一级）haschild
        - 这只是搞定了一级的数据，后面还需要发请求，**下一级的请求会在鼠标放到第一级的选项的时候发送（这就是懒加载）**。注意此时参数要改变（不能还是86），所以map处理的每一个数组项还应该包含id字段，这样下次请求才有机会获取
        - **lazyLoad的另一个参数node就代表此次发送请求时当前选中节点**，初始的那一下请求node是一个默认节点
        - 判断node.data有没有id，如果有则拿该id去发送请求
        - 至此就完成了层级选择器

  - ##### ps
  
    - 直接给el提供的组件写标签选择器是没有用的
  
    - ```tsx
      .el-divider {
           color: gray;
      }
      ```
  
    - 表单样式的设置：
  
      - 关于表格的居中问题：可以**通过flex来控制元素的对齐方式**，或者给个**类名或使用行内选择器添加样式**
  
      - ```tsx
        style="width:60%;margin:10px auto;"
        ```
  
      - **表单左侧label所占长度设置：**`<el-form label-width="80px"></el-form>`，这样设置以后，里面所有的表单项都有80px的距离留给label

#### 更新就诊人和添加就诊人

- ##### api封装

  - 新增就诊人需要携带请求体参数，不需要携带id（因为id是服务器给你的）

  - ```tsx
    // 新增就诊人接口
    ADDUSER_URL = '/user/patient/auth/save/',
    // 更新已有的就诊人接口
    UPDATEUSER_URL = '/user/patient/auth/update/'
    ```

  - 发送请求的函数可以写为一个方法，因为传入的参数都是一样的。如果传入的对象有id字段，则更新操作，否则访问添加接口。**实现两个功能**

  - 这两个接口都不返回实质性数据，只是成功时返回true，失败返回null，所以接口请求函数中，**使用泛型约束返回值类型可以直接写any**

  - ```tsx
    // 新增与修改已有就诊人接口方法
    export const reqAddOrUpdateUser = (data: any) => {
        if (data.id) {
            return request.put<any, any>(API.UPDATEUSER_URL, data)
        } else {
            return request.post<any, any>(API.ADDUSER_URL, data)
        }
    }
    ```

- ##### ts类型定义

  - id字段一定要加?，表示可有可无

  - 收集地址的字段是addressSelected，值为数组，存储所选择的地址字符串（swagger上没有）

  - ```tsx
    // 新增与修改已有的就诊人参数的ts类型
    export interface AddOrUpdateUser {
        id?: string,
        name: string,
        certificatesType: string,
        certificatesNo: string,
        sex: number,
        birthdate: string,
        phone: string,
        isMarry: number,
        isInsure: number,
        addressSelected: string[],
        address: string,
        contactsName: string,
        contactsCertificatesType: string,
        contactsCertificatesNo: string,
        contactsPhone: string
    }
    ```

#### 完成添加就诊人业务

- **思路分析**：更新就诊人要将数据先在表单中进行展示，点击提交按钮后发送更新请求；添加就诊人在表单中填写完后，将表单数据作为参数发送添加请求。添加成功后弹出提示信息，并且切换为展示就诊人的场景，并且重新获取就诊人数据

- ##### 声明响应式数据收集表单数据

- 不需要拆分为几个变量来收集啊，就算是不同的表单也可以被同一个对象收集数据

- 并且约束一下这个数据的ts类型

- ```tsx
  //新增就诊人用于收集表单数据的变量，不需要有id字段
  let userParams = reactive<AddOrUpdateUser>({
      name: '',
      certificatesType: '',
      certificatesNo: '',
      sex: 0,
      birthdate: '',
      phone: '',
      isMarry: 0,
      isInsure: 0,
      addressSelected: [],
      address: '',
      contactsName: '',
      contactsCertificatesType: '',
      contactsCertificatesNo: '',
      contactsPhone: ''
  })
  
  <!-- 用户姓名 -->
  <el-form-item label=" 用户姓名">
      <el-input v-model="userParams.name" placeholder="请输入用户姓名"></el-input>
  </el-form-item>
  ```

- ##### 日期收集的数据

- ```tsx
  <!-- 出生日期 -->
  <el-form-item label="出生日期">
      <el-date-picker v-model="userParams.birthdate" type="date" size="normal" placeholder="选择日期时间" value-format="YYYY-MM-DD">
      </el-date-picker>
  </el-form-item>
  ```

- birthdate收集到的string格式为：MON JUNE 05 2023 ...

- 可以使用el-date-picker的一个属性：value-format，默认收集的是date对象。`value-format="YYYY-MM-DD"`

- ##### 点击按钮发送请求

- 因为是更新就诊人和添加就诊人共用一个按钮，所以这个按钮的回调函数要考虑到这两个业务的请求发送

- 为什么又要使用try-catch包裹：捕获请求返回的promise对象是成功的还是错误的

- ```tsx
  // 点击提交按钮，发送请求新增或更新就诊人
  const submit = async () => {
      // 要么新增就诊人|更新一个已有的就诊人
      try {
          // 要么新增用户成功|更新已有的用户成功
          //因为不管是哪一个，成功了都是返回成功的promise对象，然后往下执行
          await reqAddOrUpdateUser(userParams)
          // 提示文字
          ElMessage({
              type: 'success',
              message: userParams.id ? '更新成功' : '新增成功'
          })
          // 场景切换为0
          scene.value = 0
          // 再获取全部的就诊人信息
          fetchUserData()
      } catch (error) {
          // 提示文字
          ElMessage({
              type: 'error',
              message: userParams.id ? '更新失败' : '新增失败'
          })
      }
  }
  ```

- ##### 清空表单域

- 和之前一样把响应式数据清空或者点语法一个个清空，或者表单校验使用resetFields清空

- 点击添加就诊人按钮的时候就应该清空，最好封装为一个方法，因为点击重写按钮的时候也可以使用它用来清空表单域

- ```tsx
  <el-button type="primary" @click="submit">提交</el-button>
  <el-button @click="reset">重写</el-button>
  
  // 点击添加按钮的回调含食宿
  const addPatient = () => {
      // 清空上一次的数据
      reset()
      // 切换场景为1
      scene.value = 1
  }
  const reset = () => {
      Object.assign(userParams, {
          name: '',
          certificatesType: '',
          certificatesNo: '',
          sex: 0,
          birthdate: '',
          phone: '',
          isMarry: 0,
          isInsure: 0,
          addressSelected: [],
          address: '',
          contactsName: '',
          contactsCertificatesType: '',
          contactsCertificatesNo: '',
          contactsPhone: ''
      })
  }
  ```

- ##### register_step2添加就诊人

- 路由跳转到就诊人管理模块的添加就诊人场景，但是就诊人管理模块的场景切换取决于响应式数据，那要怎么默认切换到就诊人添加场景呢

  - 预约挂号跳转过去的时候带一个query参数：add，**这样就可以根据query参数决定展示哪个场景（因为别的模块跳转过来无法直接控制响应式数据**）

  - 但是预约挂号模块过来，添加完就诊人点击提交按钮之后，还要回到预约挂号：所以提交按钮的回调还要优化，判断路径有没有type参数，如果有则跳回去，并且也没必要再获取就诊人数据

  - ```tsx
    <el-button type="primary" size="default" @click="goUser" :icon="User">添加就诊人</el-button>
    // 点击添加就诊人按钮的回调：需要跳转路由到就诊人管理的添加就诊人场景
    const goUser = () => {
        // 路由跳转
        $router.push({ path: '/user/patient/', query: { type: 'add' } })
    }
    ```

  - 就诊人管理模块根据query参数判断是否要展示添加场景(挂载的时候判断)

  - ```tsx
    // 组件挂载完毕获取数据
    onMounted(() => {
        // 获取就诊人信息
        fetchUserData()
        // 获取身份证类型，这个直接存着就好了，做一个判断倒也没什么问题
        getCertificationType()
        // 判断：当前这个路由组件是不是从挂号组件来的（路径携带query参数type=add）
        if ($route.query.type === 'add') {
            scene.value = 1
        }
    })
    ```

  - 但是提交完应该返回当register_step2的路由组件,是否返回仍然是根据路径中的query参数来判断

  - ```tsx
    await reqAddOrUpdateUser(userParams)
    // 提示文字
    ElMessage({
        type: 'success',
        message: userParams.id ? '更新成功' : '新增成功'
    })
    // 判断是否要跳去预约模块
    if ($route.query.type) {
        $router.back()
    } else {
        // 场景切换为0
        scene.value = 0
        // 再获取全部的就诊人信息
        fetchUserData()    
    }     
    ```

    - 关于fetchUserData()到底要写在外面还是里面。 //~~如果要跳回去，也要重新获取就诊人的信息，因为register_step2也要就诊人信息~~，**进入register_step2组件会重新挂载，重新获取就诊人数据的**

#### 更新就诊人

- 还需不需要声明一个响应式数据来收集更新就诊人时候的表单数据？但是表单已经和userParams对象绑定了，里面没有id这个属性。

  - 我觉得应该不会再声明一个响应式数据，比较表单已经绑定过了，id应该是从路径中获取参数。

- ##### 将已有的用户数据展示在表单上

- 用户点击编辑按钮之后，会更改scene.value展示另一个场景。希望用户数据展示在表单中，就应该修改响应式对象userParams，就需要考虑到进行这个操作的时机和数据的来源。编辑按钮在子组件visitor中，我们已经实现通过自定义事件，点击子组件的按钮，改变父组件中scene的值，那么同样我们也可以通过自定义事件，传入当前visitor使用props接收到的user参数，在自定义事件中将传入的user赋值给userParams，就可以展示出数据了

- ```tsx
  //visitor
  // 接收父组件传递过来的就诊人信息展示
  let props = defineProps(['user', 'selected'])
  // 接收自定义事件
  let $emit = defineEmits(['changeScene'])
  // 相应就诊人组件修改按钮的回调
  const handler = () => {
      $emit('changeScene', props.user)
  }
  //patient
  // 自定义事件被触发后执行的回调
  const changeScene = (user: AddOrUpdateUser) => {
      scene.value = 1
      // 收集已有的就诊人信息
      Object.assign(userParams, user)
  }
  ```

- ##### 确定更新

- 和原来添加业务一样直接将收集的userParams作为参数发送请求，根据封装的接口函数，因为有id自动发送更新接口，服务器自己会替换掉相应的数据

- ##### 预约挂号register_step2也有更新就诊人的业务

- 思路：按照patient中的思路，registerstep2中也给visitor绑定自定义事件，点击vistor里的编辑按钮，会触发自定义事件，但此时不是修改scene切换场景，而是跳转路由到就诊人管理的添加(更新)就诊人场景。并且跳转完挂载了又userParams，再传入点击vistior的user信息。可是这个user信息传给了其父组件registerstep2，怎么直接传给另一个路由组件？跳转路由的时候传入数据？但是不可能把整个user数据作为query参数传递进来，是不是要传入一个就诊人id给patient自己请求获取数据

  - 注意：自定义事件适用于父子组件间通信，如果当前的一个组件触发了一个自定义事件，而定义这个自定义事件的回调所处的组件未被挂载，则不会执行（很好理解，和点击事件一样）

  - 所以应该给register_step2和visitor这对父子定义另一个自定义事件，这个事件的回调中会路由跳转到patient，并且携带参数就诊人id，挂载时根据参数获取选中就诊人的信息，并赋值给userParams（不一定要另一个自定义事件，可以再register_step2上定义单独的一个回调函数）

  - **所以在visitor的修改按钮回调中，应该分情况来触发，如果是patient组件里点击的该按钮，则触发changeScene修改scene。如果是register组件里点击的该按钮，则触发另一个自定义事件跳转路由并传入就诊人id**

    - 但是跳转路由应该展示表单场景，怎么知道patient已挂载就要展示表单场景？**和之前添加就诊人一样，根据query里的type参数来判断**
    - 总而言之就是就诊人模块点击按钮来到表单场景，都已一个组件下的场景，数据是通用的。而register_step2和就诊人模块是不同的组件，数据不通用

  - 跳转到patient的form场景后，怎么获取传入就诊人id对应的用户信息？

    - 因为挂载时已经发送了请求获取所有就诊人数据，能不能根据用户id找到对应的就诊人数据

    - 不行，**因为发请求是异步语句，先执行后面的语句，**

    - 还是**使用await，将发请求这个函数调用变成同步语句，**前面的执行完再执行后面的

    - 但是这样有缺点，因为获取数据需要一定的时间，要等待获取到了数据才切换场景（把场景判断放到请求前面不可以吗）

    - 所以不要使用await

    - ```tsx
      // 组件挂载完毕获取数据
      onMounted(async () => {
          // 获取就诊人信息
          await fetchUserData()
          // 获取身份证类型，这个直接存着就好了，做一个判断倒也没什么问题
          await getCertificationType()
          // 判断：当前这个路由组件是不是从挂号组件来的（路径携带query参数type=add）
          if ($route.query.type === 'add') {
              scene.value = 1
          }
          if ($route.query.type === 'edit') {
              scene.value = 1
              // 从得到的所有数据中筛选就诊人，注意前面需要是同步语句
              let user = userArr.value.find((item: any) => {
                  return item.id == $route.query.id      
          !!!!!!!!//注意不是全等！！！就诊人信息里的id是number类型，但是路由获取的路径参数是string类型!!!!!!!!
              })
              // 合并数据，进行展示
              Object.assign(userParams, user)
          }
      })
      
      // 组件挂载完毕获取数据                         -----针对抖动我的想法（保留await）
      onMounted(async () => {
          if ($route.query.type === 'add' || $route.query.type === 'edit') {
              scene.value = 1
          }
          // 获取就诊人信息
          await fetchUserData()
          // 获取身份证类型，这个直接存着就好了，做一个判断倒也没什么问题
          await getCertificationType()
          // 判断：当前这个路由组件是不是从挂号组件来的（路径携带query参数type=add）
          if ($route.query.type === 'edit') {
              ·······
          }
      })
      ```

    - 使用监听属性，先修改场景。当userArr获取数据，发生改变的时候执行：找到对应的user数据并赋值userParams（这样和我把判断场景的if放到await前有什么区别）

    - ```tsx
      // 监听全部就诊人的数据
      watch(() => userArr.value, () => {
          // 只有从预约挂号模块过来的时候，才从就诊人列表中找指定的就诊人
          if ($route.query.type === 'edit') {
              let user = userArr.value.find((item: any) => {
                  return item.id == $route.query.id
                  //注意不是全等！！！就诊人信息里的id是number类型，但是路由获取的路径参数是string类型
              })
              // 合并数据，进行展示
              Object.assign(userParams, user)
          }
      })
      ```

    - 更新后点击添加按钮要添加一个就诊人，还是更新刚才更新过的就诊人

    - 因为刚才更新获取的就诊人数据包含id字段，点击添加就诊人按钮进入form场景，点击提交后，提交按钮里发送请求函数根据userParams中是否包含id字段来判断是走更新请求还是添加请求。所以**点击添加就诊人按钮时，应该去除掉userParams对象里的id字段(或者不使用Object.assign)**

    - ```tsx
      const reset = () => {
          Object.assign(userParams, {
              id: null,                     //只要置为null就可以了，对id的判断就为false******************
              name: '',
              certificatesType: '',
              certificatesNo: '',
          }
      }
      ```

- ```tsx
  //visitor
  // 相应就诊人组件修改按钮的回调
  const handler = () => {
      // 要么是就诊人管理模块点击修改按钮
      // 要么预约挂号点击修改按钮
      if ($route.path === '/user/patient') {
          $emit('changeScene', props.user)
      } else {
          // 路由跳转携带参数
          $router.push({ path: '/user/patient', query: { type: 'edit', id: props.user.id } })
      }
  }
  
  //patient
  上面都写了
  ```

#### 完成删除就诊人业务

- 思路分析：点击删除按钮，弹出气泡确认框，确定删除的回调中，向服务器发送删除请求，并携带query参数（user.id），因为是就诊人管理模块中才能删除，而挂载时又获取了所有的就诊人信息(更新添加后也重新获取过了)所以~~直接从子组件使用自定义事件取id即可~~直接在visitor中删除，比较删除按钮都是在visitor中。别忘了删除成功后再次获取就诊人信息。接口没有返回实质性的数据

  - **其实父组件中删除还是子组件visitor中删除都可以，前者需要子组件触发自定义事件传递id，后者也需要自定义事件，告诉父组件及时获取所有就诊人数据信息**

- ##### 气泡确认框

- 记得用气泡确认框标签包裹el-button

- ```tsx
  //patient
  <Visitor ··· @changeScene="changeScene" @removeUser="removeUser"></Visitor>
  // 删除用户自定义事件的回调
  const removeUser = () => {
      // 重新获取全部就诊人的信息
      fetchUserData()
  }
  
  //visitor
  <el-popconfirm :title="`你确定要删除${user.name}吗?`" width="200px" @confirm="removeUser">
      <template #reference>
          <el-button type="danger" size="default" :icon="Delete" circle 
              v-if="$route.path === '/user/patient'" @click="">
          </el-button>
      </template>
  </el-popconfirm>
  
  let $emit = defineEmits(['changeScene', 'removeUser'])
  // 点击气泡确认框确认删除的回调函数
  const removeUser = async () => {
      try {
          // 发送删除请求
          await reqRemoveUser(props.user.id)
          // 提示信息
          ElMessage({
              type: 'success',
              message: '删除成功'
          })
          // 重新获取就诊人信息列表，需要绑定自定义事件并触发
          $emit('removeUser')              ----------------------*****************
      } catch (error) {
          // 提示信息
          ElMessage({
              type: 'error',
              message: '删除失败'
          })
      }
  }
  ```

  - width:可以设置气泡确认框的宽度，最小宽度150px
  - confirm事件：点击确认按钮时触发
  - cancel：点击取消按钮时触发

- ##### 封装

- ```tsx
  // 删除已有的就诊人
  DELETEUSER_URL = '/user/patient/auth/remove/'
  // 删除一个就诊人的信息
  export const reqRemoveUser = (id: number) => request.delete<any, any>(API.DELETEUSER_URL + id)
  ```

#### 路由鉴权

- 路由组件在什么情况下可以访问，什么情况下不能访问的判断。使用技术：**路由守卫**

  - 全局守卫，路由独享守卫，组件内守卫。显然我们要采用的是全局守卫

- 项目包含wxlogin有四个一级路由，并且很多都有二级路由。

- 游客只能访问home首页还有hospital下的五个基本模块

- ##### 路由鉴权准备工作

  - src下新建permission.ts文件

  - 利用路由器对象/实例router（不是useRouter创建的$router，而是createRouter创建的router）的beforeEach和afterEach方法来实现的

  - 全局守卫又分为前置守卫（所有的路由组件访问之前会触发该钩子）和后置守卫

  - 参数to：要跳转到哪个路由；from：从哪个路由过来；（to和from都是**路由对象**）放行函数next

  - ```tsx
    //main.ts                          ----1.入口文件中引入路由鉴权文件-------
    // 引入路由鉴权文件
    import './permission'
    
    //permission.ts
    // 路由鉴权：就是路由能不能被访问的权限设置 -> 全局守卫完成
    // 引入路由器实例,配置路由的地方
    import router from './router'
    
    // 添加相应的全局守卫
    // 1.前置守卫
    router.beforeEach((to, from, next) => {
        next()                   //全部放行
    })
    // 2.后置守卫
    router.afterEach((to, form) => {
    })
    ```

- ##### 进度条

  - `npm i nprogress `

  - 全局的路由组件访问之前进度条移动，访问成功则结束进度条

  - 两个方法：`NProgress.start()进度条开始动，NProgress.done()进度条结束`

  - 在前置守卫和后置守卫中使用了这两个方法后还是无法看见效果，是因为没有引入进度条的样式

  - 可以使用configure方法配置效果，比如去除加载小圆球showSpinner

  - ```tsx
    在路由鉴权文件中引入以下语句
    // 引入进度条
    // @ts-ignore
    import Nprogress from "nprogress"
    // 引入进度条的样式
    import "nprogress/nprogress.css"
    
    // 去除进度条的加载小圆球
    Nprogress.configure({ showSpinner: false })
    ```

  - ##### 前置守卫使用如下代码

    - `Nprogress.start()`    访问路由组件之前，进度条开始动

  - ##### 后置守卫使用如下代码

    - `Nprogress.done()`      访问路由组件成功，进度条消失

- ##### 页签标题

  - 我们的title是在静态页面中写死的，而我们需要动态的标题，随着进入不同路由组件进行变化

  - 配置路由的时候给所有的路由组件(路由对象)加meta路由源信息，这样才能设置动态标题

  - ##### 配置路由源信息(route/index.ts)

  - ```tsx
    {
        path: '/home',
            component: () => import('@/pages/home/index.vue'),
                meta: {
                    title: '首页'
                }
    }, 
    ....
    ```

  - ##### 在前置守卫中使用如下代码

  - ```tsx
    // 动态设置网页左上角的标题
    document.title = `商医通-${to.meta.title}`
    ```

- ##### 根据token判断是否登录，进而判断能否放行（套路常用）

  - 已经把token存到了仓库中

  - 未登录的情况下，如果目标路径在白名单中，则放行。否则弹出login对话框，并且路由跳转到home首页。此时如果在对话框中登录成功，则跳转到你原本要去但没有去成的路由组件（可以把这个路由的地址作为home路由组件路径的query参数）

  - 至于跳回去的业务就交给login组件来做，使用路由器和路由对象

  - ##### 获取token并控制登录对话框的显示与隐藏

  - 引入大仓库有什么用？

  - ```tsx
    import useUserStore from '@/store/modules/user'
    // 引入大仓库
    import pinia from '@/store'
    let userStore = useUserStore(pinia)
    ```

  - ##### 声明白名单

  - ```tsx
    // 存储用户未登录就可以访问路由的路径
    let whiteList = ['/home', '/hospital/register', 'hospital/detail', 'hospital/notice', 'hospital/close', 'hospital/search']
    ```

  - ##### 前置守卫完整判断是否放行

  - ```tsx
    // 判断用户是否登录-token
    let token = userStore.userInfo.token
    // 用户登录了
    if (token) {
        // 如果登录了那么所有的路由都可以访问
        next()
    } else {
        // 用户未登录
        if (whiteList.includes(to.path)) {
            // 如果在白名单中，可以放行
            next()
        } else {
            // 登录组件显示出来
            userStore.visiable = true
            // 跳转到主页
            next({ path: '/home', query: { redirect: to.fullPath } })
        }
    }
    ```

    - path和fullpath的区别是后者携带了query参数
    - **为了实现登录之后，页面可以跳转到原先要访问的路由，跳转到home时要携带原本目标路由的fullPath**

  - ##### 并且在登录组件中判断要不要重定向

  - ```tsx
    try {
        // 用户登录成功
        await userStore.userLogin(loginParam)
        // 关闭对话框
        userStore.visiable = false
        // 获取url的query参数
        let redirect = $route.query.redirect
        if (redirect) {
            // 如果有重定向，则重定向
            $router.push(redirect as string)
        } else {
            // 如果没有重定向，则登录后跳转到home
            $router.push('/home')
        }
    }
    ```

  - ps:$router.push( )跳转不一定要`{path:'/..'}`的形式，也可以直接传一个地址字符串





##### 制作bottom组

父子组件不可以使用同名类名选择器？

宁愿多套盒子，也不要少套盒子

注意：

- 文字不要随便写在盒子中，最好使用文本标签包裹
- 常用类名：content、container
- 要是不知道怎么划分结构，可以分为top/bottom或者left/right 
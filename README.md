#kit_admin
基于Layui 2.*实现的一个后台管理模板
演示地址：http://kit.zhengjinfan.cn/
QQ交流群：248049395 

9月1日(v1.0.3)

#添加两个主题(欢迎你们去配很好看的色彩，反馈给我，然后我分享给大家/xyx)
点击我(灰色)
点击我(蓝色)
模板的另一种加载方式(page)
更新到 layui 2.1.1 #更新文档

8月31日(v1.0.2)

#添加onelevel组件（加载头部菜单）
详见说明文档
#Tab组件
添加选项卡加载进度条
#其他更新
优化顶部菜单的样式

8月30日(v1.0.1)

#Navbar组件
添加远程加载和本地加载的方式（设置方式详见说明文档）
#Tab组件
添加 mainUrl 属性 默认：main.html

8月29日

更新navbar组件和tab组件的说明文档
新增左侧菜单可缩进.
调整头部导航栏的高度，让她看起来更协调.

8月25日

添加message组件
Example:
var message = layui.message;
//示例，监听某点击事件后触发
$(selector).on('click',function(){
    message.show({
        skin:'cyan',//皮肤  支持:red,orange,cyan,blue,black,default
        msg:'提示信息'//提示信息
    });
});
点击我测试message组件
tab组件添加两个属性：closeBefore[关闭选项卡之前发生]、onSwitch[选项卡切换时发生](具体请查看文档[好像文档还没加进去~~~])

8月24日

BeginnerAdmin 改名为kit_admin
项目重构，基于layui2.0
添加navbar模块 navbar文档
添加tab模块 tab文档
还有不想写了....

2017年

更新日志
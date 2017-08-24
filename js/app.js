layui.define(['element', 'nprogress', 'form', 'table', 'loader', 'tab', 'navbar'], function(exports) {
    var $ = layui.jquery,
        element = layui.element,
        layer = layui.layer,
        _win = $(window),
        _doc = $(document),
        _body = $('.kit-body'),
        form = layui.form,
        table = layui.table,
        loader = layui.loader,
        tab = layui.tab,
        navbar = layui.navbar,
        _componentPath = 'components/';
    var app = {
        hello: function(str) {
            layer.alert('Hello ' + (str || 'test'));
        },
        config: {
            type: 'iframe'
        },
        set: function(options) {
            var that = this;
            $.extend(true, that.config, options);
            return that;
        },
        init: function() {
            var that = this,
                _config = that.config;
            if (_config.type === 'page') {
                $('a[kit-target]').on('click', function() {
                    var url = $(this).data('url'),
                        name = $(this).data('name'),
                        id = $(this).data('id');
                    loader.load({
                        url: url,
                        name: name,
                        id: id === undefined ? new Date().getTime() : id,
                        onSuccess: success
                    });

                    function success(data) {
                        switch (data.name) {
                            case 'table':
                                loader.getScript(_componentPath + 'table/table.js', function() {
                                    var tableIns = table.render(moduleTable.config);
                                    moduleTable.extend({
                                        currTable: tableIns,
                                        table: table,
                                        layer: layer,
                                        form: form,
                                        jquery: $
                                    });
                                });
                                break;
                            case 'form':
                                form.render();
                                break;
                            default:
                                break;
                        }
                    };
                });
            }
            if (_config.type === 'iframe') {
                tab.set({ elem: '#container' }).render();
                //navbar加载方式一，直接绑定已有的dom元素事件
                navbar.bind(function(data) {
                    tab.tabAdd(data);
                });
            }

            return that;
        }
    };
    // app.hello();
    //app.init();

    //输出test接口
    exports('app', app);
});
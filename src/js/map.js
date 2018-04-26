layui.define(['form', 'jquery'], function (exports) {
    //do something
    let $ = layui.jquery;
    const form = layui.form;

    let PV = {
        wait: function (s) {
            while (s.s <= 0) {
            }
            s.s = s.s - 1;
        },
        signal: function (s) {
            s.s = s.s + 1;
        }
    };





    let bmap = {
        map: null,
        zoomLevel:6,
        markers: [],
        provinceGroup: new Map(),
        positionData: [],
        showMarker:false,
        setPositionData: function () {
            this.positionData = [
                {lng: 116.404, lat: 39.915},
                {lng: 116.404, lat: 39.925},
                {lng: 116.404, lat: 39.905},
                {lng: 116, lat: 39.905},
                {lng: 117, lat: 39.905},
                {lng: 118.790611, lat: 32.148034},
                {lng: 118.690611, lat: 32.248034},
                {lng: 118.590611, lat: 32.348034},
                {lng: 118.490611, lat: 32.448034}
            ];
        },
        init: function () {
            this.map = new BMap.Map("map");// 创建Map实例
            var map = this.map;
            // map.setCurrentCity("南京");          // 设置地图显示的城市 此项是必须设置的

            map.centerAndZoom(new BMap.Point(118.790611, 32.148034), this.zoomLevel);  // 初始化地图,设置中心点坐标和地图级别
            var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
            var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
            //添加控件和比例尺
            map.addControl(top_left_control);
            map.addControl(top_left_navigation);
            //添加地图类型控件
            map.addControl(new BMap.MapTypeControl({
                mapTypes: [
                    BMAP_NORMAL_MAP,
                    BMAP_HYBRID_MAP
                ]
            }));
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        },
        getMap: function () {
            return this.map;
        },
        initProvinceGroup: function () {
            this.provinceGroup = new Map();
            this.provinceGroup.set('江苏省', {count: 0});
            this.provinceGroup.set('河北省', {count: 0});
            this.provinceGroup.set('山西省', {count: 0});
            this.provinceGroup.set('内蒙古自治区', {count: 0});
            this.provinceGroup.set('黑龙江省', {count: 0});
            this.provinceGroup.set('吉林省', {count: 0});
            this.provinceGroup.set('辽宁省', {count: 0});
            this.provinceGroup.set('陕西省', {count: 0});
            this.provinceGroup.set('甘肃省', {count: 0});
            this.provinceGroup.set('青海省', {count: 0});
            this.provinceGroup.set('新疆维吾尔自治区', {count: 0});
            this.provinceGroup.set('宁夏回族自治区', {count: 0});
            this.provinceGroup.set('山东省', {count: 0});
            this.provinceGroup.set('河南省', {count: 0});
            this.provinceGroup.set('浙江省', {count: 0});
            this.provinceGroup.set('安徽省', {count: 0});
            this.provinceGroup.set('江西省', {count: 0});
            this.provinceGroup.set('福建省', {count: 0});
            this.provinceGroup.set('台湾省', {count: 0});
            this.provinceGroup.set('湖北省', {count: 0});
            this.provinceGroup.set('湖南省', {count: 0});
            this.provinceGroup.set('广东省', {count: 0});
            this.provinceGroup.set('广西壮族自治区', {count: 0});
            this.provinceGroup.set('海南省', {count: 0});
            this.provinceGroup.set('四川省', {count: 0});
            this.provinceGroup.set('云南省', {count: 0});
            this.provinceGroup.set('贵州省', {count: 0});
            this.provinceGroup.set('西藏自治区', {count: 0});
            this.provinceGroup.set('北京市', {count: 0});
            this.provinceGroup.set('上海市', {count: 0});
            this.provinceGroup.set('天津市', {count: 0});
            this.provinceGroup.set('重庆市', {count: 0});
        },
        showMarkers: function () {
            this.showMarker=true;
            try {
                this.map.clearOverlays();
            } catch (e) {
            }
            this.setPositionData();
            if (this.map.getZoom() > 10) {
                let markers = this.createMarkers();
                markers.forEach(function (value) {
                    this.map.addOverlay(value);
                }, this);
            } else {
                this.groupByProvince();
            }

        },
        removeMarkers: function () {
            this.map.clearOverlays();
        },

        createMarkers: function () {
            let markers = [];
            this.positionData.forEach(function (value) {
                markers.push(new BMap.Marker(new BMap.Point(value.lng, value.lat)));
            });
            return markers;

        },
        groupByProvince: function () {
            let data = this.positionData;
            let geoc = new BMap.Geocoder();
            this.initProvinceGroup();
            let group = this.provinceGroup;
            let map = this.map;
            let flag = {s: 1};//互斥操作标记
            for (let i = 0; i < data.length; i++) {
                geoc.getLocation(new BMap.Point(data[i].lng, data[i].lat), function (rs) {
                    let addComp = rs.addressComponents;
                    let province = addComp.province;
                    let d = group.get(province);
                    PV.wait(flag);
                    if (d.count === 0) {
                        d.count = 1;
                        let opts = {
                            position: rs.point,    // 指定文本标注所在的地理位置
                            offset: new BMap.Size(-30, -30)    //设置文本偏移量
                        };
                        d.label = new BMap.Label(province+':1', opts);  // 创建文本标注对象
                        d.label.setStyle({
                            color: "red",
                            fontSize: "12px",
                            height: "20px",
                            lineHeight: "20px",
                            fontFamily: "微软雅黑"
                        });
                        map.addOverlay(d.label);
                    }
                    group.set(province, {count: d.count + 1, label: d.label});
                    d.label.setContent(province+':'+d.count);
                    PV.signal(flag);
                })
            }
        }
    };
    bmap.init();

    bmap.map.addEventListener('zoomstart', function(){
        $('#zoomText').val(bmap.map.getZoom());

        console.log(bmap.zoomLevel);
        console.log(bmap.map.getZoom());
        if(bmap.showMarker){
            if(bmap.zoomLevel>10&&bmap.map.getZoom()>10)    {
                bmap.zoomLevel = bmap.map.getZoom();
                return;
            }
            if(bmap.zoomLevel<=10&&bmap.map.getZoom()<=10)  {
                bmap.zoomLevel = bmap.map.getZoom();
                return;
            }
            bmap.showMarkers();
            bmap.zoomLevel = bmap.map.getZoom();
        }

    });



    exports('map', bmap);
});
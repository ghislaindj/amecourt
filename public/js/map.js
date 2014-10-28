// Google Maps
function initialize(){
    //    var pos = 2.3576 + (document.getElementById('container').clientWidth / 140000)
    mapOptions={
        zoom:8,
        //        center:new google.maps.LatLng(48.8724, pos),
        center:new google.maps.LatLng(49.379931, 1.734293),
        //        disableDefaultUI:true,
        zoomControl:true,
        scrollwheel:false,
        draggable:true,
        disableDoubleClickZoom:true,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map=new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
    google.maps.visualRefresh=true;
    function j(m,l){
        var marker =new google.maps.Marker({
            map:map,
            position:new google.maps.LatLng(m,l),
            icon:"img/marker.png",
        });

        var infoWindow = new google.maps.InfoWindow({
            content: "Château d'Amécourt<br />27140 Amecourt"
        });

        google.maps.event.addListener(marker,"click",function(){
            infoWindow.open(map, marker);
        });
    }
    j(49.379931, 1.734293);
    var h=[
        {
            featureType:"road",
            stylers:[{color:"#ffffff"}]
        },
        {
            stylers:[{saturation:-40}, { lightness: 20 }]
        },
        {
            elementType:"labels.text",
            stylers:[
                {color:"#9fa5ac"},
                {weight:0.3}
            ]
        },
        {
            elementType:"labels.icon",
            stylers:[{visibility:"off"}]
        },
        {
            featureType: "administrative",
            elementType: "labels",
            stylers:[{visibility:"on"}]
        }
    ];

    var g=new google.maps.StyledMapType(h,{name:"Styled Map"});
    map.mapTypes.set("map_style",g);
    map.setMapTypeId("map_style");
}
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
        'callback=initialize';
    document.body.appendChild(script);
}
window.onload = loadScript;
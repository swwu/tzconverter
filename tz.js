(function() { var geocoder; var searchtimeout; var offsetVals = [null, null];

    var getLatLng = function(addr1, addr2) {
        if (!addr1 || !addr2) return;

        geocoder.geocode( { 'address': addr1 }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var lat = results[0].geometry.location.lat()
                    var lng = results[0].geometry.location.lng()
                    $("#loca").text(results[0].formatted_address);
                    getTZ(lat,lng,0);
                } else
                    {}//TODO: addr 1 fail
            } );

        geocoder.geocode( { 'address': addr2 }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var lat = results[0].geometry.location.lat()
                    var lng = results[0].geometry.location.lng()
                    $("#locb").text(results[0].formatted_address);
                    getTZ(lat,lng,1);
                } else
                    {}//TODO: addr 2 fail
            } );
    };

    var getTZ = function(lat, lng, index) {
        $.getJSON("http://api.geonames.org/timezoneJSON?lat="+lat+"&lng="+lng+"&username=demo",
        function(data) {
            offsetVals[index] = data.dstOffset;
            if (offsetVals[0] !== null && offsetVals[1] !== null)
                $('#tztext').text(offsetVals)
        });
    };

    $(document).ready(function() {
        geocoder = new google.maps.Geocoder();
        $('#pointa').keyup(function() {
            window.clearTimeout(searchtimeout);
            searchtimeout = window.setTimeout(function() {
                atxt = $('#pointa').val();
                btxt = $('#pointb').val();
                getLatLng(atxt, btxt);
            }, 200);
        });

        $('#pointb').keyup(function() {
            window.clearTimeout(searchtimeout);
            searchtimeout = window.setTimeout(function() {
                atxt = $('#pointa').val();
                btxt = $('#pointb').val();
                getLatLng(atxt, btxt);
            }, 200);
        });
    });

})();

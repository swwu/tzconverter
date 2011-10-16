(function() { var geocoder; var searchtimeout; var setTime; var offsetVals = [null, null];
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
            if (offsetVals[0] !== null && offsetVals[1] !== null) {
              offset = offsetVals[1] - offsetVals[0]
              now = new Date()
              setTime(now, $(".time-container:first .time"))
              now.setHours((now.getHours() + 24 + offset) % 24)
              setTime(now, $(".time-container:last .time"))
              if (offset > 0) {
                offset = "+" + offset
              }
              $('#tztext').text(offset + " hours");
            }
        });
    };

    var setTime = function(time, elem) {
      meridiem = time.getHours() <= 12 ? "AM" : "PM";
      hour = time.getHours() % 12;
      minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
      $(elem).text(hour + ":" + minute + " " + meridiem);
    }

    $(document).ready(function() {
        setTime(new Date(), $(".time"));

        geocoder = new google.maps.Geocoder();
        $('#pointa').keyup(function() {
            window.clearTimeout(searchtimeout);
            searchtimeout = window.setTimeout(function() {
                atxt = $('#pointa').val();
                btxt = $('#pointb').val();
                getLatLng(atxt, btxt);
            }, 500);
        });

        $('#pointb').keyup(function() {
            window.clearTimeout(searchtimeout);
            searchtimeout = window.setTimeout(function() {
                atxt = $('#pointa').val();
                btxt = $('#pointb').val();
                getLatLng(atxt, btxt);
            }, 500);
        });
    });

})();

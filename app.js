
    all_data = []
    d3.csv("SlateGunDeaths.csv", function(data) {
      all_data = data;
    })

    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text("a simple tooltip");

    var map = L.map('map').setView([39.50, -98.35], 3);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer.grayscale(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
        }).addTo(map);

	/* Initialize the SVG layer */
	map._initPathRoot()

	/* We simply pick up the SVG from the map object */
	var svg = d3.select("#map").select("svg"),
	g = svg.append("g");

function myFunction(criteria){
	d3.csv("SlateGunDeaths.csv", function(collection) {
		/* Add a LatLng object to each item in the dataset */
		collection.forEach(function(d) {
			/*d.LatLng = new L.LatLng(d.circle.coordinates[0],
									d.circle.coordinates[1])*/
                if (!isNaN(d.lat) && !isNaN(d.lng)){
                    d.LatLng = new L.LatLng(parseFloat(d.lat),
                                            parseFloat(d.lng));
                } else{
                    d.LatLng = new L.LatLng(0, 0);
                }


		})

		var feature = g.selectAll("circle")
			.data(collection)
			.enter().append("circle")
			.style("stroke", "white")
			.style("opacity", .5)
			.style("fill", "blue")
			.attr("r", 5)


		map.on("viewreset", update);
		update();

		function update() {
			feature.attr("transform",
			function(d) {
			    console.log("print")
				return "translate("+
					map.latLngToLayerPoint(d.LatLng).x +","+
					map.latLngToLayerPoint(d.LatLng).y +")";
				}
			)
		}
	})
	}

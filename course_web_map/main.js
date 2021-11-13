const init = () => {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 2,
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        zIndex: 0,
        visible: true,
      }),
    ],
    target: "js_map",
  });
  // Layer Group
  const layerGroup = new ol.layer.Group({
    layers: [
      // Humanitarian layer
      new ol.layer.Tile({
        source: new ol.source.OSM({
          url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        }),
        zIndex: 1,
        visible: true,
        opacity: 0.5,
      }),
      // BingMaps Base map layer
      new ol.layer.Tile({
        source: new ol.source.BingMaps({
          key: "AmN9lEwJOUA7IWWh5Oka0_Bu5JjQxo9MXb4LbvjK58NNOgtmWQ_qOEgyXfntYiHW",
          imagerySet: "Aerial", // Road, CanvasDark, CanvasGray, OrdnanceSurvey
        }),
        zIndex: 2,
        visible: true,
      }),
      // TileArcGIS
      new ol.layer.Tile({
        source: new ol.source.TileArcGISRest({
          url: "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer",
        }),
        zIndex: 3,
        visible: true,
      }),
      // WMS
      new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: "https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WMSServer?",
          params: {
            LAYERS: 1, // image layer id
            FORMAT: "image/png",
            TRANSPARENT: true,
          },
        }),
        zIndex: 4,
        visible: true,
      }),
    ],
  });
  // Add layer group to map
  map.addLayer(layerGroup);
};

window.onload = init();

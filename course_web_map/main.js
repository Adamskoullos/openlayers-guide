const init = () => {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 2,
    }),
    target: "js_map",
  });
  // Base Layers >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // OSM Standard
  const opentreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    title: "OSMStandard",
  });

  // Humanitarian
  const openstreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    }),
    visible: false,
    title: "OSMHumanitarian",
  });

  // BingMaps
  const bingMaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
      key: "AmN9lEwJOUA7IWWh5Oka0_Bu5JjQxo9MXb4LbvjK58NNOgtmWQ_qOEgyXfntYiHW",
      imagerySet: "Aerial", // Road, CanvasDark, CanvasGray, OrdnanceSurvey, Aerial
    }),
    visible: false,
    title: "BingMaps",
  });

  const baseLayerGroup = new ol.layer.Group({
    layers: [opentreetMapStandard, openstreetMapHumanitarian, bingMaps],
  });

  map.addLayer(baseLayerGroup);

  // Base layer switcher logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Grab base layer elements
  const baseLayerElements = document.querySelectorAll(
    ".sidebar > input[type=radio]"
  );
  // Add event listener to radios
  baseLayerElements.forEach((el) => {
    el.addEventListener("change", () => {
      // The below methods are built in OpenLayers methods
      // Toggle between base layers depending on which radio button is checked
      baseLayerGroup.getLayers().forEach((element, index, array) => {
        if (element.get("title") === el.value) {
          element.set("visible", true);
        } else {
          element.set("visible", false);
        }
      });
    });
  });

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // Tile Layers >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // TileArgGIS
  const tileArgGISLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url: "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer",
    }),
    visible: false,
    title: "TileArcGISRest",
  });
  // WMS
  const WMSLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WMSServer?",
      params: {
        LAYERS: 1, // image layer id
        FORMAT: "image/png",
        TRANSPARENT: true,
      },
    }),
    visible: false,
    title: "WMS",
  });
  // Raster Tile Layer Group
  const rasterTileLayerGroup = new ol.layer.Group({
    layers: [tileArgGISLayer, WMSLayer],
  });
  map.addLayer(rasterTileLayerGroup);
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
};

window.onload = init();

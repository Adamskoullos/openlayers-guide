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

  // UK Vector Tile Layer (Added to the base map layer group) ++++++++++++++++
  const ukOpenstreetMapVectorTile = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      url: "https://api.maptiler.com/tiles/uk-openzoomstack/{z}/{x}/{y}.pbf?key=U8jXzU9f0Kk9LQKKqm0R",
      format: new ol.format.MVT(),
      attributions:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>, Contains OS data © Crown copyright and database right 2019',
    }),
    visible: false,
    title: "UKVectorTileLayer",
  });

  // Open Map tiles Vector Tile Layer (Added to the base map layer group) ++++++++++++++++
  const worldOpenstreetMapVectorTile = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      url: "https://api.maptiler.com/tiles/v3-openmaptiles/{z}/{x}/{y}.pbf?key=U8jXzU9f0Kk9LQKKqm0R",
      format: new ol.format.MVT(),
      attributions:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }),
    visible: false,
    title: "wolrdOpenMapTiles",
  });

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const baseLayerGroup = new ol.layer.Group({
    layers: [
      opentreetMapStandard,
      openstreetMapHumanitarian,
      bingMaps,
      ukOpenstreetMapVectorTile,
      worldOpenstreetMapVectorTile,
    ],
  });

  map.addLayer(baseLayerGroup);

  // Base layer switcher logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Grab base layer radio elements
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

  // Tile Overlay Layers >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

  // Tile layer switcher logic ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // Raster Tile layer checkbox elements
  const rasterLayerCheckboxElements = document.querySelectorAll(
    ".sidebar > input[type=checkbox]"
  );
  // Add event listener to checkboxes
  rasterLayerCheckboxElements.forEach((el) => {
    el.addEventListener("change", (e) => {
      // Independently overlay tile layers on top of each other and the base layer

      rasterTileLayerGroup.getLayers().forEach((element, index, array) => {
        if (e.target.checked && element.get("title") === el.value) {
          element.set("visible", true);
        }
        if (!e.target.checked && element.get("title") === el.value) {
          element.set("visible", false);
        }
      });
    });
  });
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
};

window.onload = init();

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
    ],
  });
  // Add layer group to map
  map.addLayer(layerGroup);
};

window.onload = init();

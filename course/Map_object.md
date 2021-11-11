# Map

The `Map` object has three core properties:

1. `view` > The area where the map will be displayed, this includes an object with its own properties
2. `layer` > The map image, an array of map image types
3. `target` > The HTML element where the map will be housed

Basic example:

```js
const map = new ol.Map({
  view: new ol.View({
    center: [`x-axis`, `y-axis`], // Set the default display position
    zoom: 6, // default zoom
    maxZoom: 10,
    minZoom: 3,
  }),
  // layers: [new ol.layer.Tile({})],
  target: `element_id`,
});
```

Create and save each layer to a const before adding them to a `baseLayerGroup` and then adding the group as the value of the `layer` property within the `Map` object (above):

```js
// Individual layers
const openStreetMapStandard = new ol.layer.Tile({
  source: new ol.source.OSM(),
  visible: true,
  title: "OSMstandard",
});

const openStreetMapHumanitarian = new ol.layer.Title({
  source: new ol.source.OSM({
    url: "url",
  }),
  visible: false,
  title: "OSMHumanitarian",
});

// Layer Group
const baseLayerGroup = new ol.layer.Group({
  layers: [openStreetMapStandard, openStreetMapHumanitarian],
});

// Add layer group to map object

map.addLayer(baseLayerGroup);
```

How to get coordinates on click:

```js
map.on("click", (e) => {
  console.log(e.coordinate);
});
```

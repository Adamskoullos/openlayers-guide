## Raster Layers

ToC:

- [BaseLayer]()
- [Tiled Raster Layers]()
- [Stamen Raster Sources]()
- [Tiled ArgGISRest Layer]()
- [TileWMS Layer]()
- [Setter and Getter methods in OpenLayers]()
- [Managing Multi-Layers]()
- [Static Raster Images]()

---

Raster Layers are images `PNG` or `JPG`, they are not styled, we just consume them in the browser.
Below is an overview of the layer classes, starting with the core layer class `BaseLayer`:

## BaseLayer:

- ### Layer:
  - #### BaseImageLayer
  - #### BaseTileLayer
  - #### BaseVectorLayer
- ### LayerGroup:

---

## Tiled Raster Layers

`Tiled Raster Layers` (**BaseTileLayer**) are dynamic images that are made up of many smaller tiles. this allows more detail to be shown as the user zooms in on specific areas.

- Faster initial load as data is loaded as it is needed
- Able to show more granular details on zoom
- Not as smooth zooming in and out as more data is being loaded each time

`Non Tiled Raster Layers` (**BaseImageLayer**) are a single static image, these do not dynamically change as the user zooms in and out of the map.

- Slower initial loading time as all the data has to be loaded up front
- Smoother zoom in and out as all the data is already loaded
- Less granular details when zoomed in

#### Layer Group

**Note**: Layers are layered in the order they are defined, however we can control the order by adding the `zIndex` or showing and hiding specific layers by using the `visible` property.

Example using an `OpenStreetMap` source when creating layers within a group:

```js
const init = () => {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 2,
    }),
    layers: [
      new ol.layer.Tile({
        // Standard layer
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
        // extent: [min-x, min-y, max-x, max-y],
        opacity: 0.5,
      }),
    ],
  });
  // Add layer group to map
  map.addLayer(layerGroup);
};

window.onload = init();
```

Both the `view` and `layers` property have an `extent` property that is an array and can set coordinates to cover an area:

1. min x
2. Min y
3. max x
4. max y

**extent**:
When used with a `layer` it restricts the layer coverage, when used with a view it restricts the ability to pan areas of the map outside the extent coverage.

**opacity**:
`opacity` is also a property that can be used to effectively work with data from multiple layers

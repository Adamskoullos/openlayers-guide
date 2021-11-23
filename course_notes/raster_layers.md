## Raster Layers

ToC:

- [BaseLayer](#BaseLayer)
- [Tiled Raster Layers](#Tiled-Raster-Layers)
- [Raster Sources](#Raster-Sources)
- [Tiled ArgGISRest Layer](#Tiled-ArgGISRest-Layer)
- [TileWMS Layer](#TileWMS-Layer)
- [Setter and Getter methods in OpenLayers](#Setter-and-Getter-methods-in-OpenLayers)
- [Managing Multi-Layers](#Managing-Multi-Layers)

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

---

## Raster Sources

There are three source layer sub-classes each with their own sub-classes, the focus here is on `TileImage` sources. The `XYZ` sub-class is able to integrate with multiple sources using a `url`, the other items at this level are independent sources each with their own sub-class:

1. **`TileSource`**: > Abstract Base Class
   - `UrlTile` > HTTP request is used to get data
     - `TileImage`
       - `BingMaps`
       - **`XYZ`** > Can be used with multiple sources when using the `url`
         - CartoDB
         - OSM
         - Stamen
         - TileDebug
       - `TileArc GISRest`
       - `TileWMS`
       - `WMTS`
       - `Zoomify`
       - `IIIF`
     - `VectorTile`
   - `UTFGrid` > `TileJSON` Format is used from MapBox
2. **`ImageSource`**:
3. **`VectorSource`**:

Example adding a `BingMaps` layer to the layer group. Note: `BingMaps` require to use the `key` property within the options object to assign an api key:

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
        opacity: 0.5,
      }),
      // BingMaps layer
      new ol.layer.Tile({
        source: new ol.source.BingMaps({
          key: "api-key",
          imagerySet: "Aerial", // Road, CanvasDark, CanvasGray, OrdnanceSurvey
        }),
        visible: true,
      }),
    ],
  });
  // Add layer group to map
  map.addLayer(layerGroup);
};

window.onload = init();
```

---

## Tiled ArgGISRest Layer

Can use `MapServices` from the link below:

[Docs](https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer)

```js
const tileArcGISLayer = new ol.layer.Tile({
  source: new ol.source.TileArcGISRest({
    url: "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer",
  }),
});
```

---

## TileWMS Layer

- Web Map Service > WMS

TileWMS is the standard protocol of the `Open Geospatial Consortium`

[Main standard list page](https://www.ogc.org/docs/is)
[Web Map Service](https://www.ogc.org/standards/wms)

To get `url` and `name` for specific layers we can use the `nowcoast.noaa.gov` website and search through the available list:

[list](https://nowcoast.noaa.gov/help/#!section=wms-layer-ids)

```js
const NOAAWMSLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WMSServer?",
    params: {
      LAYERS: 1, // image layer id
      FORMAT: "image/png",
      TRANSPARENT: true,
    },
  }),
});
```

---

## Setter and Getter methods in OpenLayers

There are setters and getters in the `TileLayer` class that enable us to grab and set properties. we also have setters and getters for source class and sub-classes.

Taking the `NOAAWMSLayer` from above we either add an attribute directly within the layer or use getters and setters to programmatically achieve this:

```js
const NOAAWMSLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_qpe_time/MapServer/WMSServer?",
    params: {
      LAYERS: 1, // image layer id
      FORMAT: "image/png",
      TRANSPARENT: true,
    },
    // Add directly
    attributions: '<a href="http://nowcoast.noaa.gov/">NOAA</a>',
  }),
});
map.addLayer(NOAAWMSLayer);

// Use getters and setters
// 1. Use dot notation on the layer to get access to the source
// 2. Then set the attribute to the source by the use of chaining
NOAAWSMLayer.getSource().setAttributions(
  '<a href="http://nowcoast.noaa.gov/">NOAA</a>'
);

// set(key, value, silent) // silent is a boolean to state if the event should be emitted
NOAAWSMLayer.set("maxZoom", 5);
```

---

## Managing Multi-Layers

The UI now has a side bar with radio buttons that will control which layer is visible.
Layers are to be split up into two groups, base map layers and tile layers. The base amp layers to be controlled by the radio buttons
and the tile layers each to have their own check box that can be added on top of the base map layer.

- Section 1 > Adding base layers:

1. remove the `layer` property from the `Map` object
2. Create Base Map layers and add them to the base map layer group
3. Add baseMapLayerGroup to map object

```js
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
```

- Section 2 > Wire up the side nav radio buttons to toggle between base layers

```js
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
```

- Section 3 > Wire up the tiled layers with checkboxes so they can be added as overlays on top of the base layer and also stacked on top of each other:

```js
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
```

---

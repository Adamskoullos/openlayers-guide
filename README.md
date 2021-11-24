# OpenLayers Reference Guide

[Docs](https://openlayers.org/en/latest/apidoc/)

## Top down overview of layers in OpenLayers

- **`BaseLayer`**
  - **`Layer`**
    - **`BaseImageLayer`** > Un-Tiled Raster Layers > Static Raster Images
    - **`BaseTileLayer`** > Tiled Raster Layers
    - **`BaseVectorLayer`** > Points, Lines and Polygons
      - **`VectorTileLayer`**
      - **`VectorImageLayer`** > Un-Tiled Vector Layers (faster but less accurate)
      - **`VectorLayer`** > Un-Tiled Vector Layers (slower but more accurate)
  - **`LayerGroup`**

---

## Top down overview of Sources in OpenLayers

- **`Sources`**
  - **`TileSource`**: > Abstract Base Class
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
  - **`ImageSource`**:
    - **`ImageArcGISRest`**
    - **`ImageCanvasSource`**
    - **`ImageMapGuide`**
    - **`ImageStatic`**
    - **`ImageWMS`**
    - **`RasterSource`**
  - **`VectorSource`**:

---

ToC:

### Core Nuts and Bolts of OpenLayers:

- [Key Concepts](https://github.com/Adamskoullos/openlayers-guide/blob/main/course_notes/key_concepts.md)
- [Raster Layers](https://github.com/Adamskoullos/openlayers-guide/blob/main/course_notes/raster_layers.md)
- [Vector Layers](https://github.com/Adamskoullos/openlayers-guide/blob/main/course_notes/vector_layers.md)
- [Styling Vector Layers]()
- [Projections]()
- [Map Interactions]()
- [Map Controls]()
- [Geolocation API]()

### Maps and Nuxt

- [Nuxt and 3rd Party Code]()
- [Install and Set-Up]()

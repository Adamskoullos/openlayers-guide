# Vector layers

This section covers the `BaseVectorLayer`:

- `VectorTileLayer` > Points, lines and Polygons
- `VectorImageLayer` > > Un-Tiled Vector Layers (faster but less accurate)
- `VectorLayer` > Un-Tiled Vector Layers (slower but more accurate)

---

## Vector Tile Layers

The example uses `Vector tile Layers` as `Base Map Layers` and they are added to the Base Map layer group so they can be toggled by the Base Map radio buttons.

We will be using the Open Map Tiles `Map Tiler` cloud hosting service to source and style vector tile layers to be used.

Go to [OpenMapTiles](https://cloud.maptiler.com/maps/) to get sources

1. OpenMapTiles uses `MVT format`
2. Grab the `xyz` url endpoint

Here is the pattern used when creating a Vector Layer:

```js
const openstreetMapVectorTile = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    url: "",
    format: new ol.format.MVT(),
    attributions: "",
  }),
  visible: false,
  title: "",
});
```

3. Add the new vector tile layer to the group:

```js
const baseLayerGroup = new ol.layer.Group({
  layers: [
    opentreetMapStandard,
    openstreetMapHumanitarian,
    bingMaps,
    openstreetMapVectorTile,
  ],
});
```

4. Add the HTML and use the `title` as the `value`:

```js
 <input type="radio" name="baseLayerRadio" value="UKVectorTileLayer" />UK Vector Tile Layer<br />
```

Styling the layer using `Map Tiler`:

```js

```

## vector Image Layer

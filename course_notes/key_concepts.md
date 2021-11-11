# Key Concepts

- [Map Object Overview](#Map-Object-Overview)
- [Overlays](#Overlays)
- [Map Interactions](#Map-Interactions)
- [Map Controls](#Map-Controls)

---

## Map Object Overview

The `Map` object has some core properties:

1. `view` > The area where the map will be displayed, this includes an object with its own properties
2. `layer` > The map image, an array of map image types
3. `overlay` > Informational pop ups that appear when an area is clicked on
4. `target` > The HTML element where the map will be housed

Basic example of the `map` object:

```js
const init = () => {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 2,
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    target: "js_map",
  });
};

window.onload = init();
```

---

Same example but adding properties to `view` and adding a `Layer Group` instead of directly adding a `layers` property:

```js
const map = new ol.Map({
  view: new ol.View({
    center: [`x-axis`, `y-axis`], // Set the default display position
    zoom: 6, // default zoom
    maxZoom: 10,
    minZoom: 3,
  }),
  // layers: [new ol.layer.Tile({source: new ol.source.OSM()})],
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

---

## Overlays

Overlays are informational data that shows over the top of a clicked upon area.

1. Add the html elements for the `popup` overlay data. Below we will show the clicked upon coordinates:

```html
<body>
  <div id="popup_container"></div>
  <div id="js_map" class="map"></div>
  <script src="./libs/v6.9.0-dist/ol.js"></script>
  <script src="./main.js"></script>
</body>
```

2. Add the overlay logic to the `init()` function, outside of the `map` object:

```js
const init = () => {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 2,
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    target: "js_map",
  });

  // Overlay: create overlay and attach the container element
  const popupContainerEl = document.getElementById("popup_container");
  const popup = new ol.Overlay({
    element: popupContainerEl,
  });
  // Add overlay to map object
  map.addOverlay(popup);
  // Add click event listener to the map to grab and show coordinates
  map.on("click", (e) => {
    const clickedCoordinate = e.coordinate; // Grab coordinates (can grab individually)
    popup.setPosition(undefined); // Unset any previous
    popup.setPosition(clickedCoordinate); // Set new
    popupContainerEl.innerText = clickedCoordinate; // Add coordinates as text to html element
  });
};

window.onload = init();
```

Below is a snap shot from the console of the click event on the map and what is available when a user clicks the map:

```js
> n {type: "click", target: n, map: n, frameState: {…}, originalEvent: {…}, …}
    Sn: null
    dragging: false
>   frameState: {animate: false, coordinateToPixelTransform: Array(6), declutterTree: null, extent: Array(4), index: 20, …}
>   map: n {disposed: false, t: undefined, _: {…}, S: {…}, T: {…}, …}
>   originalEvent: {isTrusted: true, pointerId: 2, width: 23, height: 23, pressure: 1, …}
>   target: n {disposed: false, t: undefined, _: {…}, S: {…}, T: {…}, …}
    type: "click"
    _n: null
>   coordinate: Array(2)
    0: 3153603.0079450347
    1: 6452756.92394908
    length: 2
    __proto__: Array(0)
>   pixel: Array(2)
    __proto__: n

```

---

## Map Interactions

Map interactions are how the user interacts with the map through their keyboard, mouse or touch screen.

The first example can be implemented directly within the map object, as a top level property:

```js
keyboardEventTarget: document, // Allows the user to navigate the map using the keyboard

```

This next interaction is created the added to the map class:

```js
// Create interaction
const dragRotateInteraction = new ol.interaction.DragRotate({
  condition: ol.events.condition.altKeyOnly,
});

// Add interaction to map
map.addInteraction(dragRotateInteraction);
```

This next example allows the user to draw on the map.

```js
const drawInteraction = new ol.interaction.Draw({
  type: "Polygon",
});

map.addInteraction(drawInteraction);
```

---

## Map Controls

`Controls` have a UI where as `Interactions` do not. There are three default controls included as standard and further built in controls that can be accessed by extending the controls.

Default controls:

1. Zoom
2. Map Attribute
3. Rotate

By extending the default options we can add further controls to the UI. We can add the top level property `controls` to the map object:

```js
// outside of map object but within init()
const overViewMapControl = new ol.control.OverviewMap({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
});

// Inside the map object add the `control` property and extend by adding further controls
controls: ol.control.defaults().extend([overViewMapControl]);
```

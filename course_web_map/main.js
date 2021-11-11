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
    keyboardEventTarget: document, // Allows the user to navigate the map using the keyboard
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
    const clickedCoordinate = e.coordinate;
    popup.setPosition(undefined);
    popup.setPosition(clickedCoordinate);
    popupContainerEl.innerText = clickedCoordinate;
  });

  // Create interaction
  const dragRotateInteraction = new ol.interaction.DragRotate({
    condition: ol.events.condition.altKeyOnly,
  });
  // Add interaction to map
  map.addInteraction(dragRotateInteraction);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // Drag Interaction
  const drawInteraction = new ol.interaction.Draw({
    type: "Polygon",
  });
  map.addInteraction(drawInteraction);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
};

window.onload = init();

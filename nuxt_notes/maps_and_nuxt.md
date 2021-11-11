# Maps and Nuxt

### Working with 3rd party code

This sections covers a clean pattern when working with 3rd party code and building a plugin interface for the 3rd party code. The advantages to this are:

1. Ability to swap 3rd party providers without effecting the codebase and only making the changes in one place
2. Able to have a clean separation between the app code and any 3rd party code
3. Able to simplify page/component code so it is easier to reason about and maintain
4. Able to quickly find and maintain code from 3rd parties

The overview for this pattern includes:

1. Map out the interface to set up and run the 3rd party code
2. Extract and wrap the interface within a plugin
3. Use the plugin where required in components

Simplified generic plugin example:

- Create `maps.client.js` within plugins ensuring the code only runs on the client
- Add to `plugins` within `nuxt.config.js`:

```js
plugins: ["~/plugins/maps.client"];
```

- maps.client.js:

```js
export default (context, inject) => {

    const init = (element) => {
        // Set up and initialize 3rd party code
    }

    const updateSelected = (map) => {
        // Update the currently selected map
    }

    inject('map', {
        init(),
        updateSelected()
    })
}

```

- In a component:

```js

mounted(){
    const mapContainer = document.getElementById('map');
    this.$map.init(mapContainer);
},

```

```html
<v-btn @click="$map.updateSelected('one')">Map one</v-btn>
```

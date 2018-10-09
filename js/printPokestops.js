
// -Tooltip: will be displayed to the side, permanently
// -Popup: this will only be displayed if the user clicks the pindrop

// -If there is a task available for that pokestop, make the pin red:
//   otherwise, make it blue
// -If searchBool is true, only display active pokestops that match the query
// -If newPokestopBool is true, directly add pokestop to map, instead of layerGroup
'use strict';
export function printPokestops(pokestopsArray, mapPropertiesObject, searchBool, newPokestopBool) {
  pokestopsArray.forEach(pokestop => {
    if (pokestop.active === 'true') {
      L.marker([pokestop.latitude, pokestop.longitude],
        { icon: mapPropertiesObject.redPin})
        .bindPopup(`
      <span><b>${pokestop.name}</b></span><br>
      <span>Task: ${pokestop.requirements}</span><br>
      <span>Reward: ${pokestop.reward}</span><br>
      `)
        .bindTooltip(`
        <span>${pokestop.reward}</span>
        `, { permanent: true })
        .addTo(searchBool ? mapPropertiesObject.SearchResults : mapPropertiesObject.Active);
    } else if ((pokestop.active === 'false' && !searchBool) || newPokestopBool) {
      L.marker([pokestop.latitude, pokestop.longitude],
        { icon: mapPropertiesObject.bluePin, opacity: 0.6, title: pokestop.id })
        .bindPopup(`
        <br>
        <div class="addTask">
          <p><b>${pokestop.name}</b><span id="">x</span></p>
          <input id="${pokestop.id}task" class="input is-small" type="text" placeholder="task" required>
          <input id="${pokestop.id}reward" class="input is-small" type="text" placeholder="reward" required>
          <input class="addTaskButton button is-small is-info" id="${pokestop.id}" type="button" value="add task">
          <a class="report-pokestop " href="" alt="report this pokestop"> report pokestop </a>
        </div>
      `)
        .addTo(mapPropertiesObject.Regular);
    }
  });
  // <input class="report-pokestop button is-small is-danger is-outlined" id="${pokestop.id}" type="button" value="report stop">

}

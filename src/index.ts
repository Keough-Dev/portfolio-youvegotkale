import {
  E_CAMERA_EVENT,
  getVenue,
  showVenue,
  TGetVenueOptions
} from "@mappedin/mappedin-js";
import "@mappedin/mappedin-js/lib/mappedin.css";

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options: TGetVenueOptions = {
  venue: "mappedin-demo-airport",
  clientId: "5eab30aa91b055001a68e996",
  clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1"
};

async function init() {
  const venue = await getVenue(options);

  console.log(venue);

  const mapView = await showVenue(document.getElementById("app")!, venue, {
    multiBufferRendering: true,
    outdoorView: {
      enabled: true
    },

    dynamicFocus: {
      // baseMap: venue.maps.find((m) => m.name === "Mappedin Airport"),
      baseMap: venue.maps[0],
      indoorsFullyVisibleZoomLevel: 16,
      buildingFullyVisibleZoomLevel: 15.7
    }
  });

  mapView.FloatingLabels.labelAllLocations();

  mapView.Camera.on(E_CAMERA_EVENT.CHANGED, (payload) => {
    console.log(
      "mercator zoom level",
      mapView.Camera.convertAltitudeToZoomLevel(payload.zoom)
    );
  });
}

init();

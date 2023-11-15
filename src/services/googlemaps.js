import { ENV } from "@/stores/config";
// singleton pattern because not make multi request to api google maps
let googleMaps = null;
export default async function() {
  if (googleMaps) return googleMaps;
  googleMaps = await import(`https://maps.googleapis.com/maps/api/js?key=${ENV.GOOGLE_API_KEY}&libraries=places,geometry,drawing`);
  return googleMaps;
}


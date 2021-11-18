interface IPlaceDetails {
  lat: number;
  lng: number;
  street: string;
  postal_code?: string;
  country?: string;
  areas: string[];
}

export const getPlaceDetailsByCoords = async (lat: number, lng: number): Promise<IPlaceDetails> => {
  const geocoder = new google.maps.Geocoder();
  const latlng = new google.maps.LatLng(lat, lng);
  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        let street = '';
        let country = '';
        let postalCode = '';
        const areas = [];
        results[0].address_components.forEach((address, i) => {
          if (i === 0) {
            street = address.short_name;
          }
          if (address.types.includes('country')) {
            country = address.long_name;
          }

          if (address.types.includes('postal_code')) {
            postalCode = address.long_name;
          }

          if (address.types.includes('administrative_area_level_1') || address.types.includes('administrative_area_level_2')) {
            areas.push(address.short_name);
          }
        });
        resolve({
          lat, lng, street, country, areas, postal_code: postalCode,
        });
      } else {
        alert(`Geocoder failed due to: ${status}`);
        reject(new Error(`Geocoder failed due to: ${status}`));
      }
    });
  });
};

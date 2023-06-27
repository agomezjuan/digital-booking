export async function getReverseGeocodingData(lngLat) {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const geocodingApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${accessToken}`;

  try {
    const response = await fetch(geocodingApiUrl);
    const data = await response.json();

    const features = data.features;

    console.log('features', features);

    if (features.length > 0) {
      // Obtener el primer lugar y extraer información de ubicación
      const place = features[0];
      const country = place?.context.find((c) => c.id.startsWith('country'));
      const state = place?.context.find((c) => c.id.startsWith('region'));
      const postalCode = place?.context.find((c) =>
        c.id.startsWith('postcode'),
      );

      console.log('postalcode', postalCode);
      const city = place?.context.find((c) => c.id.startsWith('place'));
      const street = place?.text || '';
      const number =
        place.address && place.address.match(/\d+/)
          ? place.address.match(/\d+/)[0]
          : '';

      return {
        country: country?.text ?? '',
        state: state?.text ?? city?.text ?? '',
        postalCode: postalCode?.text ?? '',
        city: city?.text ?? '',
        street: street?.replace(number, '').trim(),
        number,
      };
    } else {
      return {
        country: '',
        state: '',
        postalCode: '',
        city: '',
        street: '',
        number: '',
      };
    }
  } catch (error) {
    console.log('Error al obtener datos de geocodificación inversa', error);
    return {
      country: '',
      city: '',
      street: '',
      number: '',
    };
  }
}

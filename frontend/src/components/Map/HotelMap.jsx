import { Map, Marker, Popup } from 'mapbox-gl';
import React, { useEffect, useLayoutEffect } from 'react';
import './HotelMap.scss';
import { useSelector } from 'react-redux';

const HotelMap = () => {
  const mapDiv = React.useRef(null);
  const [coordinates, setCoordinates] = React.useState([-58.3816, -34.6037]); // Buenos Aires
  const hotel = useSelector((state) => state.hotel.currentHotel);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCoordinates([hotel?.location.longitude, hotel?.location.latitude]);
  }, [hotel]);

  useLayoutEffect(() => {
    // Mapbox. Creacion del mapa
    const map = new Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coordinates,
      zoom: 10,
    });

    // Creación del popup. Mostrará el nombre del hotel
    const myPopup = new Popup({ offset: 25 }).setHTML(
      `<h3>${hotel?.name}</h3><a style="color: #0084b8" href="https://www.google.com/maps?q=${hotel?.location?.latitude},${hotel?.location?.longitude}&label=${hotel?.name}" target="_blank">Ver en Google Maps</a>`,
    );

    const marker = new Marker({ color: '#41add8' })
      .setLngLat([
        parseFloat(coordinates[0] || 0),
        parseFloat(coordinates[1] || 0),
      ])
      .setPopup(myPopup)
      .addTo(map);

    marker.togglePopup();

    myPopup.on('click', () => {
      map.flyTo({
        center: marker.getLngLat(),
        zoom: 15,
      });
    });

    // Limpieza del mapa
    return () => {
      marker.remove();
      map.remove();
    };
  }, [coordinates, hotel]);
  return (
    <div className='hotel-map-container'>
      <div ref={mapDiv}></div>
    </div>
  );
};

export default HotelMap;

import { Map, Marker, Popup } from 'mapbox-gl';
import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import './HotelMap.scss';

const HotelMap = ({ location, name }) => {
  const mapDiv = React.useRef(null);

  useLayoutEffect(() => {
    // Mapbox. Creacion del mapa
    const map = new Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: location,
      zoom: 10,
      navigationControl: true,
    });

    // Creación del popup. Mostrará el nombre del hotel
    const myPopup = new Popup({ offset: 25 }).setHTML(`<h4>${name}</h4>`);

    const marker = new Marker({ color: '#41add8' })
      .setLngLat([-57.98310726304649, -34.80738384249134])
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
  }, []);
  return (
    <div className='hotel-map-container'>
      <div ref={mapDiv}></div>
    </div>
  );
};

HotelMap.propTypes = {
  location: PropTypes.arrayOf(PropTypes.number),
  name: PropTypes.string,
};

export default HotelMap;

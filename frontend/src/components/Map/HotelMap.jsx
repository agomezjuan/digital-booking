import { Map, Marker, Popup } from 'mapbox-gl';
import React, { useEffect } from 'react';
import './HotelMap.scss';
import { useSelector } from 'react-redux';

const HotelMap = () => {
  const mapDiv = React.useRef(null);
  const hotel = useSelector((state) => state.hotel.currentHotel);

  useEffect(() => {
    // Mapbox. Creacion del mapa
    const map = new Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [hotel?.location?.longitude, hotel?.location?.latitude],
      zoom: 10,
      navigationControl: true,
    });

    // Creación del popup. Mostrará el nombre del hotel
    const myPopup = new Popup({ offset: 25 }).setHTML(
      `<h3>${hotel?.name}</h3><a style="color: #0084b8" href="https://www.google.com/maps?q=${hotel?.location?.latitude},${hotel?.location?.longitude}&label=${hotel?.name}" target="_blank">Ver en Google Maps</a>`,
    );

    const marker = new Marker({ color: '#41add8' })
      .setLngLat([
        parseFloat(hotel?.location?.longitude ?? 0),
        parseFloat(hotel?.location?.latitude ?? 0),
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
  }, []);
  return (
    <div className='hotel-map-container'>
      <div ref={mapDiv}></div>
    </div>
  );
};

export default HotelMap;

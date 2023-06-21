import { useEffect, useRef, useState } from 'react';
import './HotelDetails.scss';

import foto1 from '../assets/images/foto-1.jpg';
import foto2 from '../assets/images/foto-2.jpg';
import foto3 from '../assets/images/foto-3.jpg';
import foto4 from '../assets/images/foto-4.jpg';
import foto5 from '../assets/images/foto-5.jpg';
import foto6 from '../assets/images/foto-6.jpg';
import Header from '../components/Header/Header';
import TopSection from '../components/TopSection/TopSection';
import Stars from '../components/HotelCard/Stars/Stars';
import HotelFeatures from '../components/HotelFeatures/HotelFeatures';
import AvailableProductDates from '../components/AvailableProductDates/AvailableProductDates';
import Footer from '../components/Footer/Footer';
import { hotels } from '../mocks/hotels';
import { useParams } from 'react-router-dom';
import { HotelMap } from '../components';

const HotelDetails = () => {
  const imagenes = [foto1, foto2, foto3, foto4, foto5, foto6];
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const mapRef = useRef(null);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hotel = hotels.find((hotel) => hotel.id == id);
  const { city, country } = hotel.location;

  const openLightbox = (index) => {
    setShowLightbox(true);
    setCurrentSlide(index);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  const changeSlide = (slide) => {
    setCurrentSlide(slide);
  };

  const handleBackdropClick = (event) => {
    if (event.target.classList.contains('hotel-imagen-lightbox')) {
      closeLightbox();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'ArrowRight') {
      setCurrentSlide((prevSlide) => prevSlide + 1);
    } else if (event.key === 'ArrowLeft') {
      setCurrentSlide((prevSlide) => prevSlide - 1);
    }
  };

  const scrollToMap = () => {
    const mapPosition = mapRef.current.offsetTop;

    window.scrollTo({
      top: mapPosition - 100,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Header />
      <TopSection hotelName={hotel.name} />
      <div className='hotel'>
        <div className='hotel-location'>
          <div className='container'>
            <div className='address' onClick={scrollToMap}>
              <p>
                <span
                  style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <ion-icon name='location'></ion-icon>
                  {city}, {country}
                </span>
              </p>
              <p>Distancia desde el centro</p>
            </div>
            <div>
              {/* <Rating rating={4} />
               */}
              <div className='hotel-score'>
                <div className='hotel-score-text'>
                  <p>TextoScore</p>
                  <Stars rating={4} />
                </div>
                <div className='hotel-rating'>
                  <span>7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='share'>
          <span className='icon'>
            <ion-icon name='share-social-outline'></ion-icon>
          </span>
          <span className='icon'>
            <ion-icon name='heart-outline'></ion-icon>
          </span>
        </div>
        <section className='hotel-gallery' id='hotel-portafolio'>
          <div className='hotel-container'>
            <div className='hotel-galeria-container'>
              <div className='hotel-galeria-main'>
                <img
                  src={imagenes[0]}
                  alt='Foto 1'
                  onClick={() => openLightbox(0)}
                />
              </div>
              <div className='hotel-galeria-more'>
                {imagenes.map((imagen, index) => {
                  if (index > 0 && index < 5) {
                    return (
                      <img
                        key={index}
                        src={imagen}
                        alt={`Foto ${index + 1}`}
                        className='hotel-img-galeria'
                        onClick={() => openLightbox(index)}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>

          {showLightbox && (
            <section
              className='hotel-imagen-lightbox'
              onClick={handleBackdropClick}
            >
              <div className='hotel-carousel'>
                <span className='hotel-close' onClick={closeLightbox}>
                  <ion-icon name='close-outline'></ion-icon>
                </span>
                {imagenes.map((image, index) => (
                  <div
                    tabIndex='2'
                    onKeyDown={handleKeyDown}
                    key={index}
                    className={`hotel-carousel-slide ${
                      currentSlide === index ? 'active' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Imagen ${index + 1}`}
                      className='hotel-agregar-imagen'
                    />
                    <div className='hotel-carousel-nav-arrows'>
                      <span
                        className='hotel-carousel-arrow-left'
                        onClick={() =>
                          changeSlide(
                            index == 0 ? imagenes.length - 1 : currentSlide - 1,
                          )
                        }
                      >
                        <ion-icon
                          size='large'
                          name='chevron-back-outline'
                        ></ion-icon>
                      </span>
                      <span
                        className='hotel-carousel-arrow-right'
                        onClick={() =>
                          changeSlide(
                            index == imagenes.length - 1 ? 0 : currentSlide + 1,
                          )
                        }
                      >
                        <ion-icon
                          size='large'
                          name='chevron-forward-outline'
                        ></ion-icon>
                      </span>
                    </div>
                  </div>
                ))}

                <div className='hotel-carousel-nav'>
                  {imagenes.map((_, index) => (
                    <span
                      key={index}
                      className={`hotel-carousel-dot ${
                        currentSlide === index ? 'active' : ''
                      }`}
                      onClick={() => changeSlide(index)}
                    ></span>
                  ))}
                </div>
              </div>
            </section>
          )}

          <div className='hotel-product-description'>
            <h2 className='titulo'>Descripcion del producto</h2>
            {hotel.description.split('.\n').map((parrafo, index) => (
              <p key={index}>{parrafo}.</p>
            ))}
          </div>
        </section>
      </div>

      {/* Detalles del producto */}
      <div className='hotel-product-details'>
        <HotelFeatures
          features={[
            'Aire acondicionado',
            'Cocina equipada',
            'Wi-Fi',
            'Piscina',
            'TV por cable',
          ]}
        />
      </div>

      {/* Calendario de fechas disponibles */}
      <AvailableProductDates />

      {/* Mapa */}
      <div ref={mapRef} className='map-section'>
        <div className='map-section-title'>
          <div className='container'>
            <h2 className='titulo'>¿Donde vas a estar?</h2>
          </div>
        </div>
        <div className='container'>
          <h5>
            {city}, {country}
          </h5>
          {/* Mapa */}
          <HotelMap
            name={hotel.name}
            location={[-57.98310726304649, -34.80738384249134]}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelDetails;

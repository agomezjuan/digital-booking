import { useState } from 'react';
import './HotelDetails.scss';

import foto1 from '../assets/images/foto-1.jpg';
import foto2 from '../assets/images/foto-2.jpg';
import foto3 from '../assets/images/foto-3.jpg';
import foto4 from '../assets/images/foto-4.jpg';
import foto5 from '../assets/images/foto-5.jpg';
import foto6 from '../assets/images/foto-6.jpg';
import foto7 from '../assets/images/foto-7.jpg';
import foto8 from '../assets/images/foto-8.jpg';
import foto9 from '../assets/images/foto-9.jpg';
import foto10 from '../assets/images/foto-10.jpg';
import Header from '../components/Header/Header';
import TopSection from '../components/TopSection/TopSection';
import Stars from '../components/HotelCard/Stars/Stars';
import HotelFeatures from '../components/HotelFeatures/HotelFeatures';
// import Rating from '../components/HotelCard/Rating/Rating';

const HotelDetails = () => {
  const imagenes = [foto1, foto2, foto3, foto4, foto5, foto6];
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [foto7, foto8, foto9, foto10];

  const openLightbox = () => {
    setShowLightbox(true);
    setCurrentSlide(0);
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

  return (
    <>
      <Header />
      <TopSection />
      <div className='hotel'>
        <div className='hotel-location'>
          <div className='container'>
            <div>
              <p>Ciudad, direccion</p>
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

              {/* aahdjad */}
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <section className='hotel-gallery' id='hotel-portafolio'>
          <div className='hotel-containers'>
            <h2 className='hotel-subtitulo'>KEEMALA</h2>
            <div className='hotel-galeria-container'>
              <div className='hotel-galeria-main'>
                <img src={imagenes[0]} alt='Foto 1' />
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
                        onClick={openLightbox}
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
              <i
                className='fas fa-times hotel-close'
                onClick={closeLightbox}
              ></i>
              <div className='hotel-carousel'>
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`hotel-carousel-slide ${
                      currentSlide === index ? 'active' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className='hotel-agregar-imagen'
                    />
                  </div>
                ))}

                <div className='hotel-carousel-nav'>
                  {carouselImages.map((_, index) => (
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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              magni officia, velit ullam aliquam eius modi quibusdam accusantium
              unde placeat pariatur perferendis doloremque consectetur suscipit
              magnam sit dignissimos, quaerat soluta.
            </p>
          </div>

          <div className='hotel-product-details'>
            <h2 className='titulo'>Detalles del producto</h2>

            <HotelFeatures features={[]} />
          </div>

          {/* Mapa */}
          <div className='hotel-map-container' id='map_lima'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d126450.15154039937!2d98.2114219133559!3d7.940183342931008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1685737432830!5m2!1ses!2sco'
              style={{ border: 0 }}
              allowfullscreen=''
              loading='lazy'
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
};

export default HotelDetails;

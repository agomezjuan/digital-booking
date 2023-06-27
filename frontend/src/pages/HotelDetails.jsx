import { useEffect, useRef, useState } from 'react';
import './HotelDetails.scss';
import Header from '../components/Header/Header';
import TopSection from '../components/TopSection/TopSection';
import Stars from '../components/HotelCard/Stars/Stars';
import HotelFeatures from '../components/HotelFeatures/HotelFeatures';
import AvailableProductDates from '../components/AvailableProductDates/AvailableProductDates';
import Footer from '../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { HotelMap, Spinner } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getHotel } from '../store/actions/hotelActions';
import ProductPolicy from '../components/ProductPolicy/ProductPolicy';

const HotelDetails = () => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();

  const hotel = useSelector((state) => state.hotel.currentHotel);
  const loading = useSelector((state) => state.hotel.status === 'loading');

  console.log(hotel);

  useEffect(() => {
    dispatch(getHotel(id));
    window.scrollTo(0, 0);

    let images = document.querySelectorAll('.skeleton');
    images.forEach((image) => {
      image.addEventListener('load', () => {
        image.classList.remove('skeleton');
      });
    });
  }, [id, dispatch]);

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

  const mapRef = useRef(null);

  const scrollToMap = () => {
    window.scrollTo({
      top: mapRef.current.offsetTop - 100,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Header />
      <TopSection hotelName={hotel?.name} />
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '400px',
            width: '100%',
            flexGrow: 1,
          }}
        >
          <Spinner />
          <p>Cargando...</p>
        </div>
      ) : (
        <>
          <div className='hotel'>
            <div className='hotel-location'>
              <div className='container'>
                <div className='address' onClick={scrollToMap}>
                  <p>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <ion-icon name='location'></ion-icon>
                      {hotel?.address.street}, {hotel?.address.city},{' '}
                      {hotel?.address.country}
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
                      src={hotel?.images[0]}
                      alt='Foto 1'
                      onClick={() => openLightbox(0)}
                      className='skeleton'
                    />
                  </div>
                  <div className='hotel-galeria-more'>
                    {hotel?.images.map((imagen, index) => {
                      if (index > 0 && index < 5) {
                        return (
                          <img
                            key={index}
                            src={imagen}
                            alt={`Foto ${index + 1}`}
                            className='hotel-img-galeria skeleton'
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
                    {hotel?.images.map((image, index) => (
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
                                index == 0
                                  ? hotel?.images.length - 1
                                  : currentSlide - 1,
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
                                index == hotel?.images.length - 1
                                  ? 0
                                  : currentSlide + 1,
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
                      {hotel?.images.map((_, index) => (
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
                <h3 className='titulo'>Descripcion del producto</h3>
                {hotel?.description.split('.\n').map((parrafo, index) => (
                  <p key={index}>{parrafo}.</p>
                ))}
              </div>
            </section>
          </div>

          {/* Detalles del producto */}
          <div className='hotel-product-details'>
            <HotelFeatures features={hotel?.features} />
          </div>

          {/* Calendario de fechas disponibles */}
          <AvailableProductDates id={hotel?.id} />

          {/* Mapa */}
          <div ref={mapRef} className='map-section'>
            <div className='map-section-title'>
              <div className='container'>
                <h2 className='titulo'>¿Donde vas a estar?</h2>
              </div>
            </div>
            <div className='container'>
              <h5>
                {hotel?.address.city}, {hotel?.address.country}
              </h5>
              {/* Mapa */}
              <HotelMap />
            </div>
          </div>
          <div className='ContainerProductFeatures'>
            <div className='ContainerTitleFeatures'>
              <div className='container'>
                <h2>¿Qué tienes que saber?</h2>
              </div>
            </div>
            <div className='container'>
              <ProductPolicy />
            </div>
          </div>

          {/* Comentarios */}
        </>
      )}
      <Footer />
    </>
  );
};

export default HotelDetails;

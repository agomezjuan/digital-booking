import { Link } from 'react-router-dom';
import paquete1 from '../../assets/images/packege-1.jpg';
import paquete2 from '../../assets/images/packege-2.jpg';
import paquete3 from '../../assets/images/packege-3.jpg';

const PackageSection = () => {
  return (
    <section className='package' id='package'>
      <div className='container'>
        <p className='section-subtitle'>PAQUETES POPULARES</p>
        <h2 className='h2 section-title'>CONSULTA NUESTROS PAQUETES</h2>
        <p className='section-text'>
          Disfruta de nuestros paquetes con todo incluido, que te brindan
          comodidad y una experiencia completa. Deléitate con un delicioso
          desayuno cada mañana mientras exploras y te relajas en nuestros
          increíbles hospedajes. ¡Déjate consentir y disfruta al máximo sin
          preocupaciones adicionales!
        </p>
        <ul className='package-list'>
          <li>
            <div className='package-card'>
              <figure className='card-banner'>
                <img
                  src={paquete1}
                  alt='Experience The Great Holiday On Beach'
                  loading='lazy'
                />
              </figure>
              <div className='card-content'>
                <Link to='/hotel'>
                  {' '}
                  <h3 className='h3 card-title'>PAQUETE KEEMALA</h3>{' '}
                </Link>
                <p className='card-text'>
                  Keemala, en Phuket, Tailandia, ofrece un paquete todo incluido
                  de lujo con alojamiento en villas temáticas, comidas gourmet,
                  tratamientos de spa, actividades y servicios variados. Una
                  experiencia relajante y memorable en un entorno paradisíaco.
                </p>
                <ul className='card-meta-list'>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='time'></ion-icon>
                      <p className='text'>4D/3N</p>
                    </div>
                  </li>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='people'></ion-icon>
                      <p className='text'>pax: 2</p>
                    </div>
                  </li>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='location'></ion-icon>
                      <p className='text'>Tailandia</p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <div className='card-price'>
                <div className='wrapper'>
                  <p className='reviews'>(25 reseñas)</p>
                  <div className='card-rating'>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                  </div>
                </div>
                <p className='price'>
                  COP 3.537.390
                  <span>/ por persona</span>
                </p>
                <button className='btn btn-secondary'>RESERVAR AHORA</button>
              </div> */}
            </div>
          </li>
          <li>
            <div className='package-card'>
              <figure className='card-banner'>
                <img
                  src={paquete2}
                  alt='Summer Holiday To The Oxolotan River'
                  loading='lazy'
                />
              </figure>
              <div className='card-content'>
                <h3 className='h3 card-title'>Nihiwatu Kanatar Sumba</h3>
                <p className='card-text'>
                  Disfruta del paquete todo incluido Kanatar Sumba en Nihiwatu,
                  Sumba, Indonesia. Vive la emoción del surf y paseos a caballo,
                  junto con alojamiento de lujo, comidas gourmet y tratamientos
                  de spa. Una experiencia única en un entorno paradisíaco.
                </p>
                <ul className='card-meta-list'>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='time'></ion-icon>
                      <p className='text'>4D/3N</p>
                    </div>
                  </li>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='people'></ion-icon>
                      <p className='text'>pax: 2</p>
                    </div>
                  </li>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='location'></ion-icon>
                      <p className='text'>Sumba, Indonesia</p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <div className='card-price'>
                <div className='wrapper'>
                  <p className='reviews'>(20 reseñas)</p>
                  <div className='card-rating'>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                  </div>
                </div>
                <p className='price'>
                  COP 14.215.090
                  <span>/ por persona</span>
                </p>
                <button className='btn btn-secondary'>RESERVAR AHORA</button>
              </div> */}
            </div>
          </li>
          <li>
            <div className='package-card'>
              <figure className='card-banner'>
                <img
                  src={paquete3}
                  alt="Santorini Island's Weekend Vacation"
                  loading='lazy'
                />
              </figure>
              <div className='card-content'>
                <h3 className='h3 card-title'>
                  Santorini Island&apos;s Weekend Vacation
                </h3>
                <p className='card-text'>
                  Areias do Seixo Villas es un magnífico refugio ubicado en
                  Santa Cruz, Portugal, que combina la elegancia rústica con un
                  ambiente acogedor y una belleza natural espectacular. Su
                  paquete con desayuno incluido es perfecto para aquellos que
                  desean comenzar el día de la mejor manera posible.
                </p>
                <ul className='card-meta-list'>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='time'></ion-icon>
                      <p className='text'>5D/4N</p>
                    </div>
                  </li>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='people'></ion-icon>
                      <p className='text'>pax: 6</p>
                    </div>
                  </li>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='location'></ion-icon>
                      <p className='text'>Santa Cruz (Portugal)</p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <div className='card-price'>
                <div className='wrapper'>
                  <p className='reviews'>(40 reseñas)</p>
                  <div className='card-rating'>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                  </div>
                </div>
                <p className='price'>
                  COP 1.649.344
                  <span>/ por persona</span>
                </p>
                <button className='btn btn-secondary'>RESERVA AHORA</button>
              </div> */}
            </div>
          </li>
          <li>
            <div className='package-card'>
              <figure className='card-banner'>
                <img
                  src={paquete1}
                  alt='Experience The Great Holiday On Beach'
                  loading='lazy'
                />
              </figure>
              <div className='card-content'>
                <Link to='/hotel'>
                  {' '}
                  <h3 className='h3 card-title'>PAQUETE MALAKE</h3>{' '}
                </Link>
                <p className='card-text'>
                  Keemala, en Phuket, Tailandia, ofrece un paquete todo incluido
                  de lujo con alojamiento en villas temáticas, comidas gourmet,
                  tratamientos de spa, actividades y servicios variados. Una
                  experiencia relajante y memorable en un entorno paradisíaco.
                </p>
                <ul className='card-meta-list'>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='time'></ion-icon>
                      <p className='text'>4D/3N</p>
                    </div>
                  </li>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='people'></ion-icon>
                      <p className='text'>pax: 2</p>
                    </div>
                  </li>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='location'></ion-icon>
                      <p className='text'>Tailandia</p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <div className='card-price'>
                <div className='wrapper'>
                  <p className='reviews'>(25 reseñas)</p>
                  <div className='card-rating'>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                  </div>
                </div>
                <p className='price'>
                  COP 3.537.390
                  <span>/ por persona</span>
                </p>
                <button className='btn btn-secondary'>RESERVAR AHORA</button>
              </div> */}
            </div>
          </li>
          <li>
            <div className='package-card'>
              <figure className='card-banner'>
                <img
                  src={paquete2}
                  alt='Summer Holiday To The Oxolotan River'
                  loading='lazy'
                />
              </figure>
              <div className='card-content'>
                <h3 className='h3 card-title'>Nihiwatu Kanatar Sumba</h3>
                <p className='card-text'>
                  Disfruta del paquete todo incluido Kanatar Sumba en Nihiwatu,
                  Sumba, Indonesia. Vive la emoción del surf y paseos a caballo,
                  junto con alojamiento de lujo, comidas gourmet y tratamientos
                  de spa. Una experiencia única en un entorno paradisíaco.
                </p>
                <ul className='card-meta-list'>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='time'></ion-icon>
                      <p className='text'>4D/3N</p>
                    </div>
                  </li>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='people'></ion-icon>
                      <p className='text'>pax: 2</p>
                    </div>
                  </li>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='location'></ion-icon>
                      <p className='text'>Sumba, Indonesia</p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <div className='card-price'>
                <div className='wrapper'>
                  <p className='reviews'>(20 reseñas)</p>
                  <div className='card-rating'>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                  </div>
                </div>
                <p className='price'>
                  COP 14.215.090
                  <span>/ por persona</span>
                </p>
                <button className='btn btn-secondary'>RESERVAR AHORA</button>
              </div> */}
            </div>
          </li>
          <li>
            <div className='package-card'>
              <figure className='card-banner'>
                <img
                  src={paquete3}
                  alt="Santorini Island's Weekend Vacation"
                  loading='lazy'
                />
              </figure>
              <div className='card-content'>
                <h3 className='h3 card-title'>
                  Santorini Island&apos;s Weekend Vacation
                </h3>
                <p className='card-text'>
                  Areias do Seixo Villas es un magnífico refugio ubicado en
                  Santa Cruz, Portugal, que combina la elegancia rústica con un
                  ambiente acogedor y una belleza natural espectacular. Su
                  paquete con desayuno incluido es perfecto para aquellos que
                  desean comenzar el día de la mejor manera posible.
                </p>
                <ul className='card-meta-list'>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='time'></ion-icon>
                      <p className='text'>5D/4N</p>
                    </div>
                  </li>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='people'></ion-icon>
                      <p className='text'>pax: 6</p>
                    </div>
                  </li>
                  <li className='card-meta-item'>
                    <div className='meta-box'>
                      <ion-icon name='location'></ion-icon>
                      <p className='text'>Santa Cruz (Portugal)</p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <div className='card-price'>
                <div className='wrapper'>
                  <p className='reviews'>(40 reseñas)</p>
                  <div className='card-rating'>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                  </div>
                </div>
                <p className='price'>
                  COP 1.649.344
                  <span>/ por persona</span>
                </p>
                <button className='btn btn-secondary'>RESERVA AHORA</button>
              </div> */}
            </div>
          </li>
        </ul>
        <button className='btn btn-primary'>VER TODOS LOS PAQUETES</button>
      </div>
    </section>
  );
};

export default PackageSection;

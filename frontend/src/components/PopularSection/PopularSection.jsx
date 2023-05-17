
import popular1 from  '../../assets/images/popular-1.jpg';
import popular2 from  '../../assets/images/popular-2.jpg';
import popular3 from  '../../assets/images/popular-3.jpg';

const PopularSection = () => {
    return (
      <section className="popular" id="destination">
        <div className="container">
          <p className="section-subtitle">Descubre Hospedajes</p>
          <h2 className="h2 section-title">Hospedajes Populares</h2>
          <p className="section-text">
            Descubre destinos icónicos en nuestros hospedajes estéticos e increíbles. Sumérgete en la belleza de lugares únicos y experimenta una estadía inolvidable. Desde cabañas enclavadas en bosques mágicos hasta casas flotantes en lagos pintorescos, encuentra tu escapada perfecta en los destinos más populares. ¡Déjate cautivar por la magia de estos lugares excepcionales!
          </p>
          <ul className="popular-list">
            <li>
              <div className="popular-card">
                <figure className="card-img">
                  <img src= {popular1} alt="Casa Invisible, California (Estados Unidos)" loading="lazy" />
                </figure>
                <div className="card-content">
                  <div className="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>
                  <p className="card-subtitle">
                    <a href="#">California (Estados Unidos)</a>
                  </p>
                  <h3 className="h3 card-title">
                    <a href="#">Casa Invisible</a>
                  </h3>
                  <p className="card-text">
                    Esta imponente mansión se funde con el paisaje del Parque Nacional Joshua Tree.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="popular-card">
                <figure className="card-img">
                  <img src={popular2} alt="EL NIDO DE QUETZALCÓATL, Mexico" loading="lazy" />
                </figure>
                <div className="card-content">
                  <div className="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>
                  <p className="card-subtitle">
                    <a href="#">Ciudad de México</a>
                  </p>
                  <h3 className="h3 card-title">
                    <a href="#">Nido de Quetzalcóatl</a>
                  </h3>
                  <p className="card-text">
                    Un destino de ensueño en México que te transportará a un mundo mágico.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="popular-card">
                <figure className="card-img">
                  <img src={popular3} alt="Magical Bamboo House, Camaya Bali Butterfly" loading="lazy" />
                </figure>
                <div className="card-content">
                  <div className="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>
                  <p className="card-subtitle">
                    <a href="#">Camaya Bali Butterfly</a>
                  </p>
                  <h3 className="h3 card-title">
                    <a href="#">Magical Bamboo House</a>
                  </h3>
                  <p className="card-text">
                    ¡Deja que tu espíritu vuele en este santuario de bambú!
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <button className="btn btn-primary">Más Destinos</button>
        </div>
      </section>
    );
  };
  
  export default PopularSection;
const Gallery = () => {
    return (
      <section className="gallery" id="gallery">
        <div className="container">
          <p className="section-subtitle">GALERÍA DE FOTOS</p>
          <h2 className="h2 section-title">FOTOS DE VIAJEROS</h2>
          <p className="section-text">
            Descubre el encanto de cada destino a través de los ojos de nuestros huéspedes y déjate inspirar para tu próxima aventura. ¡Bienvenido a un mundo de viajes y recuerdos fotográficos que te transportarán a destinos maravillosos!
          </p>
          <ul className="gallery-list">
            <li className="gallery-item">
              <figure className="gallery-image">
                <img src="./src/assets/images/gallery-1.jpg" alt="Gallery image" />
              </figure>
            </li>
            <li className="gallery-item">
              <figure className="gallery-image">
                <img src="./src/assets/images/gallery-2.jpg" alt="Gallery image" />
              </figure>
            </li>
            <li className="gallery-item">
              <figure className="gallery-image">
                <img src="./src/assets/images/gallery-3.jpg" alt="Gallery image" />
              </figure>
            </li>
            <li className="gallery-item">
              <figure className="gallery-image">
                <img src="./src/assets/images/gallery-4.jpg" alt="Gallery image" />
              </figure>
            </li>
            <li className="gallery-item">
              <figure className="gallery-image">
                <img src="./src/assets/images/gallery-5.jpg" alt="Gallery image" />
              </figure>
            </li>
          </ul>
        </div>
      </section>
    );
  };
  
  export default Gallery;
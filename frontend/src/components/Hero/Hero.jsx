import video from '../../assets/images/hero-banner.mp4';
import './Hero.scss';

const Hero = () => {
  return (
    <section className='hero' id='home'>
      <div className='container'>
        <video autoPlay loop muted>
          <source src={video} type='video/mp4' />
        </video>

        <h2 className='h1 hero-title'>Descubre hospedajes únicos</h2>

        <p className='hero-text'>
          ¡Descubre un mundo de posibilidades donde el confort se fusiona con la
          belleza en cada detalle. Preparate para vivir una experiencia
          inolvidable en lugares que desafían lo convencional y estimulan tus
          sentidos!
        </p>

        <div className='btn-group'>
          <button className='btn btn-primary'>Aprende Más</button>

          <button className='btn btn-secondary'>Reserva Ahora</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

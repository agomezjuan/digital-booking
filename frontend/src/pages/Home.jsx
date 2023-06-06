import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import TourSearch from '../components/TourSearch/TourSearch';
import PackageSection from '../components/PackageSection/PackageSection';
import PopularSection from '../components/PopularSection/PopularSection';
import Contact from '../components/Contact/Contact';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <TourSearch />
      <PopularSection />
      <PackageSection />
      <Contact />
      <Footer />
    </>
  );
}

export default App;

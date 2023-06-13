/**
 * Esta función devuelve un array con 10 elementos aleatorios del array original
 * Se utiliza para mostrar hoteles aleatorios en la página de inicio
 * @returns {Array} Array con 10 elementos aleatorios del array original
 */
export function getRandomHotels(hotels) {
  const randomTenHotels = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * hotels.length);

    randomTenHotels.push(hotels[randomIndex]);
  }
  return randomTenHotels;
}

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

/**
 * Meses en español
 * @type {Array}
 * @constant
 */
export const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

/**
 * Dias de la semana en español
 * @type {Array}
 * @constant
 */
export const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

/**
 * Esta función devuelve un array con los días entre dos fechas
 * @param {Array} dates Fechas de inicio y fin
 *
 */
export function convertDates(dates) {
  const newDates =
    dates.length == 2
      ? dates.map((date) => date.format())
      : [dates[0].format()];
  return newDates;
}

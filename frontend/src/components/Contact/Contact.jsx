import Swal from 'sweetalert2';

const Contact = () => {
  const handleContact = () => {
    console.log('Contact');
    Swal.fire({
      title: '¿Deseas contactarnos?',
      text: `Puedes escribirnos a nuestro correo electrónico:
      <a href="mailto:" class="text-white">
        <span class="text-white">
          jkjskjs</span>
          </a>`,
      icon: 'question',
      confirmButtonText: '¡CONTÁCTENOS!',
      confirmButtonColor: '#f9a826',
      showCancelButton: true,
      cancelButtonText: '¡CANCELAR!',
      cancelButtonColor: '#f9a826',
      background: '#1a1a1a',
      backdrop: `
        rgba(0,0,0,0.5)
        `,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      stopKeydownPropagation: false,
      focusConfirm: false,
      focusCancel: false,
      showCloseButton: true,
      closeButtonAriaLabel: 'Cerrar',
    });
  };
  return (
    <section className='cta' id='contact'>
      <div className='container'>
        <div className='cta-content'>
          <p className='section-subtitle'>¡Activa la travesía!</p>
          <h2 className='h2 section-title'>
            Recuerda las experiencias, hospedajes únicos e inolvidables
          </h2>
          <p className='section-text'>
            &quot;Un refugio a tu medida. Llama ahora y reserva tu hospedaje
            perfecto en un paraíso hecho realidad&quot;
          </p>
        </div>
        <button onClick={handleContact} className='btn btn-secondary'>
          ¡CONTÁCTENOS!
        </button>
      </div>
    </section>
  );
};

export default Contact;

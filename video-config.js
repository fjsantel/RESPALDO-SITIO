/* ====================================
   CONFIGURACIÓN DE VIDEOS DEL SLIDER
   ====================================
   
   INSTRUCCIONES:
   - Cada video tiene un índice (0, 1, 2, etc.)
   - Para agregar un video: añade un nuevo objeto al array
   - Para modificar descripción: edita title y description
   - Para cambiar video: cambia el ID de YouTube en la URL
   - Los números de índice deben ser consecutivos (0, 1, 2, 3, ...)
   
   FORMATO DE URL DE YOUTUBE:
   https://www.youtube-nocookie.com/embed/[ID_DEL_VIDEO]?start=5&mute=1&autoplay=1&loop=1&playlist=[ID_DEL_VIDEO]&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&enablejsapi=1
*/

const VIDEO_CONFIG = [
    {
        // VIDEO 0 - PRIMER VIDEO
        index: 0,
        videoId: 'L-ejHvF0UJU',
        url: 'https://www.youtube.com/embed/L-ejHvF0UJU?enablejsapi=1&controls=1&rel=0&modestbranding=1',
        title: 'NAYARA ALTO ATACAMA<br><span class="subtitle">Leading Hotels of The World</span>',
        description: 'Ubicado en el corazón del impresionante desierto de Atacama, el Nayara Alto Atacama Hotel ofrece una experiencia única de lujo y conexión con la naturaleza. Rodeado de paisajes sobrecogedores y un entorno de pura serenidad, este hotel es el destino ideal para los amantes de la aventura y la relajación. #hotel #atacama #chile #sanpedrodeatacama'
    },
    {
        // VIDEO 1 - SEGUNDO VIDEO  
        index: 1,
        videoId: 'qsw5XT3mZXM',
        url: 'https://www.youtube.com/embed/qsw5XT3mZXM?enablejsapi=1&controls=1&rel=0&modestbranding=1',
        title: 'LA CIUDAD NO DA MÁS',
        description: 'Este documental aborda algunos elementos de la problemática habitacional y las diversas realidades que viven miles de chilenos en el proceso de encontrar una solución en materia de vivienda.'
    },
    {
        // VIDEO 2 - TERCER VIDEO
        index: 2,
        videoId: 'kMdRuuU7tjk', 
        url: 'https://www.youtube.com/embed/kMdRuuU7tjk?enablejsapi=1&controls=1&rel=0&modestbranding=1',
        title: 'CANTA TU SUEÑO',
        description: 'Un emotivo viaje que une música, sueños y comunidad. "Canta Tu Sueño" es una propuesta de 3xi que inspira a las personas a imaginar un futuro mejor, a través del poder de la colaboración, la esperanza y la creatividad.'
    },
    {
        // VIDEO 3 - CUARTO VIDEO
        index: 3,
        videoId: '39l9JNGMdnI',
        url: 'https://www.youtube.com/embed/39l9JNGMdnI?enablejsapi=1&controls=1&rel=0&modestbranding=1',
        title: 'ENCUENTRO DE LA ALIANZA',
        description: 'Fondo de mujeres feminista, que trabaja por los derechos humanos de mujeres, niñas y diversidades sexuales y de género. Movilizando recursos en apoyo a organizaciones territoriales y redes activistas, que desarrollan su que hacer en territorio chileno.'
    },
    {
        // VIDEO 4 - QUINTO VIDEO
        index: 4,
        videoId: 'Uu5IFm6I554',
        url: 'https://www.youtube.com/embed/Uu5IFm6I554?enablejsapi=1&controls=1&rel=0&modestbranding=1',
        title: 'ENCUENTRO 3XI SALUD<br><span class="subtitle">Porque a Todos nos Duele</span>',
        description: 'Cerca de 300 personas se reunieron para conversar de salud, conocer experiencias, biografías, saberes, dolores y sueños en una diversidad amplia. Organizaciones de la sociedad civil, trabajadores, servicios privados y otros actores participaron en mesas de conversación para pensar un futuro.'
    }
    
    // PARA AGREGAR MÁS VIDEOS, COPIA ESTE FORMATO:
    /*
    ,{
        index: 3,
        videoId: 'NUEVO_ID_AQUI',
        url: 'https://www.youtube-nocookie.com/embed/NUEVO_ID_AQUI?start=5&mute=1&autoplay=1&loop=1&playlist=NUEVO_ID_AQUI&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&enablejsapi=1',
        title: 'TITULO DEL NUEVO VIDEO',
        description: 'Descripción del nuevo video aquí.'
    }
    */
];

// TOTAL DE VIDEOS (se calcula automáticamente)
const TOTAL_VIDEOS = VIDEO_CONFIG.length;

// EXPORTAR CONFIGURACIÓN PARA USO EN MAIN.HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VIDEO_CONFIG, TOTAL_VIDEOS };
}
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
        // VIDEO 0 - PRIMER VIDEO (Alto Atacama - inicia en segundo 5)
        index: 0,
        videoId: 'L-ejHvF0UJU',
        url: 'https://www.youtube.com/embed/L-ejHvF0UJU?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=L-ejHvF0UJU&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1&start=5',
        title: 'NAYARA ALTO ATACAMA<br><span class="subtitle">Video Corporativo de Lujo | Leading Hotels</span>',
        description: 'Video corporativo de lujo desarrollado para Nayara Alto Atacama, parte de Leading Hotels of The World. Esta pieza de branded content combina storytelling de marca premium con técnicas cinematográficas avanzadas, capturando la experiencia única del desierto de Atacama. La dirección creativa audiovisual enfatiza la conexión entre el lujo y la naturaleza árida chilena, utilizando postproducción cinematográfica especializada en color grading para realzar los paisajes del norte de Chile.'
    },
    {
        // VIDEO 1 - SEGUNDO VIDEO (La Ciudad No Da Más - inicia en segundo 11)
        index: 1,
        videoId: 'qsw5XT3mZXM',
        url: 'https://www.youtube.com/embed/qsw5XT3mZXM?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=qsw5XT3mZXM&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1&start=11',
        title: 'LA CIUDAD NO DA MÁS<br><span class="subtitle">Documental de Impacto Social</span>',
        description: 'Documental de impacto social que aborda la crisis habitacional chilena, explorando las realidades de miles de familias en búsqueda de soluciones habitacionales. Esta producción audiovisual emplea storytelling de marca social profundo, combinando entrevistas testimoniales con dirección creativa audiovisual sensible. Ejemplo destacado de branded content social, desarrollado con técnicas documentales avanzadas y postproducción cinematográfica ética, desde Santiago hacia toda Chile.'
    },
    {
        // VIDEO 2 - TERCER VIDEO
        index: 2,
        videoId: 'kMdRuuU7tjk', 
        url: 'https://www.youtube.com/embed/kMdRuuU7tjk?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=kMdRuuU7tjk&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1',
        title: 'CANTA TU SUEÑO<br><span class="subtitle">Video Corporativo Inspiracional | 3xi</span>',
        description: 'Video corporativo inspiracional para la iniciativa "Canta Tu Sueño" de 3xi, que combina música, sueños y colaboración comunitaria. Esta pieza de branded content emplea storytelling de marca emotivo, integrando dirección creativa audiovisual con técnicas de postproducción cinematográfica especializada. Ejemplo destacado de video marketing social que inspira transformación comunitaria, producido íntegramente en Chile con técnicas avanzadas de marketing visual.'
    },
    {
        // VIDEO 3 - CUARTO VIDEO
        index: 3,
        videoId: '39l9JNGMdnI',
        url: 'https://www.youtube.com/embed/39l9JNGMdnI?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=39l9JNGMdnI&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1',
        title: 'ENCUENTRO DE LA ALIANZA',
        description: 'Fondo de mujeres feminista, que trabaja por los derechos humanos de mujeres, niñas y diversidades sexuales y de género. Movilizando recursos en apoyo a organizaciones territoriales y redes activistas, que desarrollan su que hacer en territorio chileno.'
    },
    {
        // VIDEO 4 - QUINTO VIDEO
        index: 4,
        videoId: 'Uu5IFm6I554',
        url: 'https://www.youtube.com/embed/Uu5IFm6I554?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Uu5IFm6I554&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1',
        title: 'ENCUENTRO 3XI SALUD<br><span class="subtitle">Porque a Todos nos Duele</span>',
        description: 'Cerca de 300 personas se reunieron para conversar de salud, conocer experiencias, biografías, saberes, dolores y sueños en una diversidad amplia. Organizaciones de la sociedad civil, trabajadores, servicios privados y otros actores participaron en mesas de conversación para pensar un futuro.'
    },
    {
        // VIDEO 5 - SEXTO VIDEO
        index: 5,
        videoId: 'QHr9hXzFhq4',
        url: 'https://www.youtube.com/embed/QHr9hXzFhq4?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=QHr9hXzFhq4&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1',
        title: 'CANALES<br><span class="subtitle">Consejo Empresarial de la Educación</span>',
        description: 'ONG Canales es una organización con más de 12 años de experiencia cuyo foco está en fortalecer la Educación Técnico Profesional a través de la vinculación y articulación de proyectos con organizaciones públicas y privadas. - Propósito Contribuir para que los egresados de la educación técnico profesional sean valorados y reconocidos como un motor del desarrollo de la sociedad. - Misión Establecer canales entre la educación técnico profesional y el sector empresarial, creando vínculos sólidos y fomentando un compromiso colaborativo para aportar al desarrollo de los territorios y la movilidad social desde la macrozona sur austral.'
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
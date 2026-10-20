import DOMPurify from 'dompurify';

// ? El contenido de las preguntas solo usa formato básico (strong, i, br, span con clase).
// ? Lista blanca corta: cualquier otra cosa (scripts, handlers, iframes, estilos) se elimina.
const config = {
    ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'u', 'br', 'span', 'sub', 'sup', 'p'],
    ALLOWED_ATTR: ['class'],
};

export const sanitizeHtml = (html = '') => DOMPurify.sanitize(String(html), config);

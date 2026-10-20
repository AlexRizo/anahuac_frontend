const shuffleList = (list) => [...list].sort(() => Math.random() - 0.5);

// ? Agrupa las preguntas de lectura por artículo (en el orden de los artículos) y mezcla dentro de cada grupo.
// ? Antes los ids de los 3 artículos estaban escritos a mano; ahora salen de los artículos que entrega el servidor.
export const groupQuestionsByArticle = (questions = [], articles = [], shuffle = shuffleList) =>
    [...articles]
        .sort((a, b) => a.number - b.number)
        .map((article) => shuffle(questions.filter((question) => question.relation === article.id)));

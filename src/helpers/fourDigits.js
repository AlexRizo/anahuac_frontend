// ? Suma de los números formados por los "4" (ej. ["4","4","+","4"] => 44 + 4 = 48).
// ? Solo acepta las fichas que ofrece la interfaz ("4" y "+"); devuelve null si la respuesta no es válida.
// ? Reemplaza a mathjs.evaluate, que ejecutaba texto controlado por el aspirante en el navegador del admin.
export const sumFourDigits = (tokens = []) => {
    if (!Array.isArray(tokens) || tokens.length === 0 || tokens.length > 13) return null;

    const cleaned = tokens[tokens.length - 1] === '+' ? tokens.slice(0, -1) : tokens;

    if (cleaned.length === 0 || !cleaned.every((token) => token === '4' || token === '+')) return null;

    return cleaned
        .join('')
        .split('+')
        .filter(Boolean)
        .reduce((sum, number) => sum + Number(number), 0);
};

/**
 * Pages Function middleware — appliqué à toutes les routes.
 * Ajoute X-Robots-Tag sur chaque réponse pour empêcher l'indexation
 * par les moteurs de recherche (Google, Bing, etc.), y compris pour
 * les ressources non-HTML (PNG, JS, JSON, PDF…).
 */
export const onRequest = async (context) => {
  const response = await context.next();
  const newHeaders = new Headers(response.headers);
  newHeaders.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
  newHeaders.set('Referrer-Policy', 'no-referrer');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
};

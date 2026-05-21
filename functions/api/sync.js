/**
 * Cloudflare Pages Function — /api/sync
 *
 * GET  : retourne l'état JSON stocké dans KV (ou null si vide)
 * PUT  : écrase l'état KV avec le JSON envoyé en body
 *
 * Auth : header `x-sync-password` doit correspondre au secret SYNC_PASSWORD
 * Binding KV requis : DATA_KV
 */

const KEY = 'state';

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function unauthorized() {
  return new Response('Unauthorized', { status: 401, headers: { 'cache-control': 'no-store' } });
}

export const onRequest = async (context) => {
  const { request, env } = context;

  // Auth — must provide correct password header
  const provided = request.headers.get('x-sync-password') || '';
  const expected = env.SYNC_PASSWORD || '';
  if (!expected || provided !== expected) {
    return unauthorized();
  }

  if (!env.DATA_KV) {
    return jsonResponse({ error: 'KV binding DATA_KV manquant' }, 500);
  }

  if (request.method === 'GET') {
    const raw = await env.DATA_KV.get(KEY);
    if (!raw) return jsonResponse(null);
    try {
      return jsonResponse(JSON.parse(raw));
    } catch (e) {
      return jsonResponse({ error: 'KV data corrompue', raw }, 500);
    }
  }

  if (request.method === 'PUT' || request.method === 'POST') {
    const body = await request.text();
    if (body.length > 2_000_000) {
      return jsonResponse({ error: 'Payload trop gros (max 2 MB)' }, 413);
    }
    try {
      JSON.parse(body); // validate
    } catch (e) {
      return jsonResponse({ error: 'JSON invalide' }, 400);
    }
    await env.DATA_KV.put(KEY, body);
    return jsonResponse({ ok: true, size: body.length, at: Date.now() });
  }

  if (request.method === 'DELETE') {
    await env.DATA_KV.delete(KEY);
    return jsonResponse({ ok: true });
  }

  return new Response('Method not allowed', { status: 405 });
};

import { PUBLIC_STRAPI_URL } from '$env/static/public';
import { browser } from "$app/environment";

const authFetch = browser ? fetch : await import('$lib/server/auth').then(mod => mod.default);

/**
 * @description A HTTP Wrapper around the Strapi API for commodity
 *  - Uses the authFetch method server-side, classic fetch client-side
 *  - Throws the Strapi error if there is one
 *  - Returns the full response object with { data: <data>, meta: <meta> }
 * @example strapi("/api/articles", { filters: { title: "..." }}, { method: "POST", body: "hello" });
 */
const strapi = async function <T>(
  path: string,
	query: URLSearchParams | string = '',
	options: RequestInit = {}
) {
  const url = new URL(path, PUBLIC_STRAPI_URL);
	const searchParams = new URLSearchParams(query);
	if (!searchParams.has('populate')) searchParams.set('populate', '*');
	url.search = searchParams.toString();

	return authFetch(url, options).then(async (res) => {
		const json = await res.json() as StrapiResponse<T>;
		if (!res.ok || json.error) throw json.error;
    return json;
	});
};

export default strapi;

interface StrapiError {
	status: string;
	name: string;
	message: string;
	details: Record<string, unknown>;
}
export type StrapiResponse<T> =
| { data: T; error: null; meta: Record<string, unknown> }
| { data: null; error: StrapiError; meta: Record<string, unknown> };

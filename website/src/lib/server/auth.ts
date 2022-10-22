/**
 * This module can only be imported server-side
 * It is thus safe to use a share secret with the Strapi Back-end to make authenticated HTTP requests
 */

import { STRAPI_WEBSITE_TOKEN } from '$env/static/private';

const authFetch: typeof fetch = async function (info, options = {}) {
	if (!options.headers) options.headers = {};
	options.headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${STRAPI_WEBSITE_TOKEN}`,
		...options.headers
	};
	return fetch(info, options);
};

export default authFetch;
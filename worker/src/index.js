/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const { pathname } = request.url
		if (pathname === '/api/v1/login') {
			const { login } = await import('./login/login.js');
			return login(request, env, ctx);
		}
		return new Response("Hello World!");
	},
};

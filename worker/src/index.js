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
		const parseUrl = new URL(request.url)
		switch (parseUrl.pathname) {
			case '/api/v1/users':
				console.log('switch case api pathname = '+parseUrl.pathname);
				const { users } = await import('./login/users.js');
				return await users(request, env, ctx);

			default:
				console.log('switch default; pathname = '+parseUrl.pathname);
				const page = await fetch("http://127.0.0.1:5500/page"+parseUrl.pathname);
				return new Response(page.body);
		}
	},
};

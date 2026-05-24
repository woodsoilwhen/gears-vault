/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import loginPage from './../../page/login.html';
export default {
	
	async fetch(request, env, ctx) {
		const parseUrl = new URL(request.url)
		switch (parseUrl.pathname) {
			case '/api/v1/login':
				const { login } = await import('./login/login.js');
				return await login(request, env, ctx);
			default:
				
				return new Response(loginPage, {
				headers: { 'Content-Type': 'text/html; charset=utf-8' },
			});
		}
	},
};

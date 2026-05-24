export async function login(request, env, ctx) {
    switch (request.method) {
        // case 'OPTIONS':
        //     return new Response(null, {
        //         status: 204,
        //         headers: {
        //             'Access-Control-Allow-Origin': '*',
        //             'Access-Control-Allow-Methods': 'POST, OPTIONS',
        //             'Access-Control-Allow-Headers': 'Content-Type',
        //         },
        //     });
        case 'POST':
            const body = await request.json();
            console.log(body);  
            return new Response(JSON.stringify(
                {
                    message: "登录成功！",
                }
            ),{status:200});
        default:
            return new Response("登录失败！",{status:405});
    }	
}
export async function logout(request, env, ctx) {
	console.log('logout')
    const body = await request.json();
    console.log(body);
	return new Response("退出成功！");
}

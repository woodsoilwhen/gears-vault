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

            switch (body.action) {
                case '登录':
                    return new Response(JSON.stringify(
                        {
                            message: "登录成功！",
                        }
                    ), { status: 200 });
                case '创建用户':
                    // 查询数据库检查用户名是否存在
                    const { username, password } = body;
                    
                    if (!username || !password) {
                        return new Response(JSON.stringify({
                            message: "用户名和密码不能为空！"
                        }), { status: 400 });
                    }
                    
                    // 检查用户名是否已存在
                    const existingUser = await env.login_auth_db.prepare(
                        "SELECT username FROM users WHERE username = ?"
                    ).bind(username).first();
                    
                    if (existingUser) {
                        return new Response(JSON.stringify({
                            message: "创建失败，用户名已存在！"
                        }), { status: 409 });
                    }
                    
                    // 用户名不存在，写入数据库
                    await env.login_auth_db.prepare(
                        "INSERT INTO users (username, password) VALUES (?, ?)"
                    ).bind(username, password).run();
                    
                    return new Response(JSON.stringify({
                        message: "创建用户成功！"
                    }), { status: 201 });

            }
        default:
            return new Response("登录失败！", { status: 405 });
    }
}
export async function 创建用户(request, env, ctx) {

}

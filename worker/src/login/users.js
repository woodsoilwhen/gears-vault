export async function users(request, env, ctx) {
    switch (request.method) {
        case 'POST':
            const body = await request.json();
            switch (body.action) {
                case '登录':
                   var { username, password } = body;
                   var User_Info = await env.login_auth_db.prepare(
                        "SELECT username, password FROM login_auth WHERE username = ?"
                    ).bind(username).first();
                    if (!User_Info) {
                        console.log(User_Info);
                        return new Response(JSON.stringify({
                            message: "登录失败，用户名不存在！"
                        }), { status: 404 });
                    }
                    if (User_Info.password !== password) {
                        return new Response(JSON.stringify({
                            message: "登录失败，密码错误！"
                        }), { status: 401 });
                    }
                    return new Response(JSON.stringify({
                        message: "登录成功！"
                    }), { status: 200 });
                case '创建用户':
                    console.log(body);
                    // 查询数据库检查用户名是否存在
                    var { username, password } = body;

                    if (!username || !password) {
                        return new Response(JSON.stringify({
                            message: "用户名和密码不能为空！"
                        }), { status: 400 });
                    }

                    // 检查用户名是否已存在
                    var existingUser = await env.login_auth_db.prepare(
                        "SELECT username FROM login_auth WHERE username = ?"
                    ).bind(username).first();

                    console.log(existingUser);

                    if (existingUser) {
                        return new Response(JSON.stringify({
                            message: "创建失败，用户名已存在！"
                        }), { status: 409 });
                    }

                    // 用户名不存在，写入数据库
                    await env.login_auth_db.prepare(
                        "INSERT INTO login_auth (username, password) VALUES (?, ?)"
                    ).bind(username, password).run();

                    return new Response(JSON.stringify({
                        message: "创建用户成功！"
                    }), { status: 201 });

            }
        default:
            console.log(body);
            return new Response("登录失败！", { status: 405 });
    }
}
export async function 创建用户(request, env, ctx) {

}

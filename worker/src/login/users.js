import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-256-bit-secret-key-here-must-be-at-least-32-characters';

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
                        return new Response(JSON.stringify({
                            message: "登录失败，用户名不存在！"
                        }), { status: 404 });
                    }
                    const passwordMatch = await bcrypt.compare(password, User_Info.password);
                    if (!passwordMatch) {
                        return new Response(JSON.stringify({
                            message: "登录失败，密码错误！"
                        }), { status: 401 });
                    }

                    const accessToken = jwt.sign(
                        { username: User_Info.username },
                        JWT_SECRET,
                        { expiresIn: '2h' }
                    );

                    const refreshToken = jwt.sign(
                        { username: User_Info.username },
                        JWT_SECRET,
                        { expiresIn: '7d' }
                    );

                    const expiresAt = new Date();
                    expiresAt.setDate(expiresAt.getDate() + 7);

                    // await env.login_auth_db.prepare(
                    //     "INSERT OR REPLACE INTO token (username, refresh_token, expires_at) VALUES (?, ?, ?)"
                    // ).bind(username, refreshToken, expiresAt.toISOString()).run();

                    return new Response(JSON.stringify({
                        message: "登录成功！",
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        expires_in: 7200
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

                    if (existingUser) {
                        return new Response(JSON.stringify({
                            message: "创建失败，用户名已存在！"
                        }), { status: 409 });
                    }
                    const hashedPassword = await bcrypt.hash(password, 10);
                    await env.login_auth_db.prepare(
                        "INSERT INTO login_auth (username, password) VALUES (?, ?)"
                    ).bind(username, hashedPassword).run();

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
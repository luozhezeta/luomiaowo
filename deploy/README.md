# 部署说明

站点已上线：<https://luozhe.link>（服务器 `49.233.212.202`，内网 `172.16.3.185`，Ubuntu 22.04 + nginx 1.18）。

## 当前状态

| 项目 | 值 |
| --- | --- |
| 静态文件 | `/var/www/luozhe.link`（属主 `www-data`） |
| nginx 站点 | `/etc/nginx/sites-available/luozhe.link` → `sites-enabled` |
| 默认站点 | 已移除 `sites-enabled/default`，本站在 80 端口做 `default_server` |
| DNS | Cloudflare（NS：`dale.ns.cloudflare.com` / `selah.ns.cloudflare.com`），`@` 与 `www` 都 A → `49.233.212.202`，均为仅 DNS（灰云） |
| 证书 | Let's Encrypt，`luozhe.link` + `www.luozhe.link`，到 2027-01-27，HTTP→HTTPS 已开 |
| 日志 | `/var/log/nginx/luozhe.link.{access,error}.log` |

两个域名都直接解析到源站（灰云）。以后如果想开 Cloudflare CDN（橙云），源站证书已经是有效的，SSL 模式选 **Full (strict)** 即可；注意橙云下 certbot 的 HTTP-01 校验仍可用（Cloudflare 会转发 `/.well-known/acme-challenge/`），但更稳的做法是切到 DNS-01。

## 性能约定

- **构建产物文件名带内容哈希**（`main-<hash>.css/js`），所以 `/assets/` 可以 `immutable` 缓存 30 天；换版本时文件名变，浏览器自然拿新的。
- **`index.html` 必须 no-cache**：否则发新版后用户还在跑旧页面（旧 HTML 指向旧资源）。线上配置已在 `location /` 里加了 `Cache-Control: no-cache`。
- 背景光斑是**静态**的 `filter: blur(60px)`，不做无限位移动画；`backdrop-filter` 只保留在桌面端顶栏，卡片和移动端都去掉了——这两项是之前页面发卡的主因。

## 踩过的坑：向日葵把 Let's Encrypt 的路由抢了

服务器上装了向日葵（虚拟网卡 `oray_vnc`），它会加一条 `172.0.0.0/8` 的路由。Let's Encrypt 的 API 在 Cloudflare 的 `172.64.0.0/13` 里，正好被这条路由吞掉，certbot 报：

```
Requesting acme-v02.api.letsencrypt.org/directory: Network is unreachable
```

修复：[oray-route-fix.service](oray-route-fix.service) 会加一条更具体的路由，让 Cloudflare 段走 VPC 网关：

```ini
ExecStart=/usr/sbin/ip route replace 172.64.0.0/13 via 10.2.0.1 dev eth0
```

已 `systemctl enable --now`，重启后自动生效。验证：

```bash
ip route get 172.65.32.248      # 应该 via 10.2.0.1 dev eth0
sudo certbot renew --dry-run    # 应该 all simulated renewals succeeded
```

## 更新站点

```powershell
# 本地：构建（Vite）
pnpm build

# 上传（需要 SSH 密钥或密码）
scp -r dist/* ubuntu@49.233.212.202:/tmp/luozhe-deploy/

# 服务器
ssh ubuntu@49.233.212.202
# 只覆盖，不删除：旧 hash 资源要留着，否则缓存了旧 index.html 的访客会白屏
sudo cp -a /tmp/luozhe-deploy/. /var/www/luozhe.link/
sudo chown -R www-data:www-data /var/www/luozhe.link
sudo nginx -t && sudo systemctl reload nginx
```

**不要用 `rm -rf /var/www/luozhe.link/*`。** 资源文件名带内容 hash，旧 HTML 会引用旧的 hash；把旧文件删掉，那些缓存了旧 HTML 的浏览器就会 404、整页白屏。磁盘很便宜（一版 250KB），攒多了再手动清理 30 天前的 `assets/main-*`。

也可以直接跑 [deploy.ps1](deploy.ps1)（走的也是上面这套）。

## 回滚

```bash
sudo rm /etc/nginx/sites-enabled/luozhe.link
sudo rm /etc/nginx/sites-available/luozhe.link
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default   # 如需要
sudo systemctl reload nginx
```

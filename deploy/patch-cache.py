"""让 index.html 不被启发式缓存（幂等）。

- 移除早先插错位置的 `location = /index.html`（它落在了 80 端口跳转块里）
- 在 443 的 `location /` 上直接加 no-cache，并补回被覆盖的安全头
"""
import pathlib
import sys

CONF = pathlib.Path("/etc/nginx/sites-available/luozhe.link")

STRAY = """    location = /index.html {
        add_header Cache-Control "no-cache" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }
"""

OLD_LOC = """    location / {
        try_files $uri $uri/ /index.html;
    }"""

NEW_LOC = """    location / {
        add_header Cache-Control "no-cache" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        try_files $uri $uri/ /index.html;
    }"""

text = CONF.read_text(encoding="utf-8")
text = text.replace(STRAY, "")

if NEW_LOC in text:
    print("already patched")
else:
    if OLD_LOC not in text:
        print("ERROR: location / block not found")
        sys.exit(1)
    text = text.replace(OLD_LOC, NEW_LOC, 1)
    print("patched location /")

CONF.write_text(text, encoding="utf-8")

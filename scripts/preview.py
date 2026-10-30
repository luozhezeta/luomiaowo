"""本地预览用的静态服务器：带 SPA 回退（/profile 这类路径也能返回 index.html）。

禁止缓存，避免改了代码浏览器还拿着旧的 main.js / main.css。

用法：
    python scripts/preview.py [port]
"""

import http.server
import os
import sys
import urllib.parse

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "dist")
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        path = urllib.parse.urlparse(self.path).path
        target = self.translate_path(path)
        if not os.path.exists(target) and "." not in os.path.basename(path):
            self.path = "/index.html"
        return super().do_GET()

    def end_headers(self):
        # 本地调试：永远拿最新产物
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler) as httpd:
        print(f"preview: http://127.0.0.1:{PORT}  (root={ROOT})", flush=True)
        httpd.serve_forever()

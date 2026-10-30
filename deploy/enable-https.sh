#!/usr/bin/env bash
# 在服务器上执行：DNS 生效、80 端口放行之后，一条命令上 HTTPS。
# 用法：bash enable-https.sh [邮箱]
#   例：bash enable-https.sh hi@luozhe.link
set -euo pipefail

DOMAIN="luozhe.link"
WWW="www.luozhe.link"
EMAIL="${1:-}"

echo "==> 检查 DNS 是否已指向本机"
PUBLIC_IP="$(curl -s -m 5 http://metadata.tencentyun.com/latest/meta-data/public-ipv4 || true)"
RESOLVED="$(getent ahostsv4 "$DOMAIN" | awk '{print $1}' | head -1 || true)"
echo "    公网 IP: ${PUBLIC_IP:-未知}"
echo "    解析到:  ${RESOLVED:-无}"
if [ -n "$PUBLIC_IP" ] && [ "$PUBLIC_IP" != "$RESOLVED" ]; then
  echo "!! DNS 还没指向这台机器，certbot 会失败。先在 DNSPod 加 A 记录再跑。"
  exit 1
fi

echo "==> 安装 certbot"
sudo apt-get update -qq
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -qq certbot python3-certbot-nginx

echo "==> 申请证书并让 nginx 接管 443"
if [ -n "$EMAIL" ]; then
  sudo certbot --nginx -d "$DOMAIN" -d "$WWW" --redirect --agree-tos -m "$EMAIL" --non-interactive
else
  sudo certbot --nginx -d "$DOMAIN" -d "$WWW" --redirect --agree-tos --register-unsafely-without-email --non-interactive
fi

echo "==> 校验"
sudo nginx -t
sudo systemctl reload nginx
curl -sI "https://$DOMAIN/" | head -1
echo "==> 完成。续期：sudo certbot renew --dry-run"

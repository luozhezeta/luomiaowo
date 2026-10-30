# 上传并替换站点文件（本地执行）
# 用法: pwsh deploy/deploy.ps1 -TargetHost 49.233.212.202
param(
    [string]$TargetHost = "49.233.212.202",
    [string]$User = "ubuntu",
    [string]$RemotePath = "/var/www/luozhe.link"
)

$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host "==> 构建" -ForegroundColor Cyan
pnpm build

Write-Host "==> 上传" -ForegroundColor Cyan
ssh "${User}@${TargetHost}" "rm -rf /tmp/luozhe-deploy && mkdir -p /tmp/luozhe-deploy"
scp -r dist/* "${User}@${TargetHost}:/tmp/luozhe-deploy/"

Write-Host "==> 发布" -ForegroundColor Cyan
# 注意：不要 rm -rf 整个目录。带 hash 的旧资源要留着，
# 否则浏览器里缓存了旧 index.html 的访客会拿到 404，页面直接白屏。
ssh "${User}@${TargetHost}" "sudo mkdir -p $RemotePath && sudo cp -a /tmp/luozhe-deploy/. $RemotePath/ && sudo chown -R www-data:www-data $RemotePath && sudo nginx -t && sudo systemctl reload nginx"

Write-Host "==> 完成: http://$TargetHost/" -ForegroundColor Green

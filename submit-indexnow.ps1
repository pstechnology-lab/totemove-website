# IndexNow submission script — run after each deploy to notify Bing/DuckDuckGo
# Usage: .\submit-indexnow.ps1

$key    = "afa8f3fa80fc49f2b4d91f76ef7f68ae"
$domain = "totemove.ca"

$urls = @(
  "https://totemove.ca/",
  "https://totemove.ca/brampton",
  "https://totemove.ca/mississauga",
  "https://totemove.ca/caledon",
  "https://totemove.ca/georgetown",
  "https://totemove.ca/halton-hills",
  "https://totemove.ca/acton",
  "https://totemove.ca/hillsburgh",
  "https://totemove.ca/erin",
  "https://totemove.ca/orangeville",
  "https://totemove.ca/bolton",
  "https://totemove.ca/about",
  "https://totemove.ca/blog",
  "https://totemove.ca/blog/moving-totes-vs-cardboard-boxes",
  "https://totemove.ca/blog/plastic-bins-vs-cardboard-boxes-moving"
)

$body = @{
  host        = $domain
  key         = $key
  keyLocation = "https://$domain/$key.txt"
  urlList     = $urls
} | ConvertTo-Json

$response = Invoke-RestMethod `
  -Uri "https://api.indexnow.org/indexnow" `
  -Method Post `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

Write-Host "Submitted $($urls.Count) URLs to IndexNow"
Write-Host "Response: $response"

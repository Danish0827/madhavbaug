# One-time geocoder: builds data/clinic-coords.json from the clinics API.
# Uses free OpenStreetMap Nominatim (no key). Pincode first, then city/state.
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Net.Http
$h = New-Object System.Net.Http.HttpClient
$h.DefaultRequestHeaders.Add("User-Agent", "madhavbaug-locator/1.0 (clinic map; contact ithealthus@gmail.com)")
$h.DefaultRequestHeaders.Add("Accept", "application/json")

function GetJson($u) { $r = $h.GetAsync($u).Result; return ($r.Content.ReadAsStringAsync().Result | ConvertFrom-Json) }

# ---- 1. Fetch all clinics ----
$all = @()
for ($page = 1; $page -le 20; $page++) {
  $j = GetJson "https://madhavbaug.hclient.in/wp-json/madhavbaug/v1/clinics?page=$page&per_page=100"
  $all += $j.data
  if (-not $j.pagination.has_more) { break }
}
Write-Output ("Fetched " + $all.Count + " clinics")

# ---- 2. Geocode (cached per query, 1 req/sec) ----
$coords = @{}
$qcache = @{}
function Strip($html) { if ($null -eq $html) { return "" }; return (($html -replace '<[^>]+>', ' ') -replace '\s+', ' ').Trim() }

function Geocode($q) {
  if ($qcache.ContainsKey($q)) { return $qcache[$q] }
  $v = $null
  for ($try = 0; $try -lt 2 -and $null -eq $v; $try++) {
    Start-Sleep -Milliseconds (1200 + $try * 1500)
    try {
      $res = @(GetJson ("https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=" + [uri]::EscapeDataString($q)))
      if ($res.Count -ge 1 -and $res[0].lat) {
        $v = @{ lat = [double]$res[0].lat; lng = [double]$res[0].lon }
      }
    } catch {}
  }
  $qcache[$q] = $v
  return $v
}

$i = 0
foreach ($c in $all) {
  $i++
  $addr = Strip $c.acf.address
  $title = $c.title
  # parse "City, State" from title after " in "
  $loc = ""
  if ($title -match '(?i)\bin\b(.+)$') { $loc = $matches[1].Trim() }
  $parts = @($loc -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ })
  $state = if ($parts.Count -ge 2) { $parts[-1] } else { $loc }
  $city  = if ($parts.Count -ge 2) { ($parts[0..($parts.Count - 2)] -join ', ') } else { $loc }
  $pin = [regex]::Match($addr, '\b\d{6}\b').Value

  $pos = $null
  if ($pin) { $pos = Geocode("$pin, India") }
  if (-not $pos -and $city) { $pos = Geocode("$city, $state, India") }
  if (-not $pos -and $state) { $pos = Geocode("$state, India") }

  if ($pos) { $coords["$($c.id)"] = $pos }
  if ($i % 25 -eq 0) { Write-Output ("  $i/$($all.Count) done, $($coords.Count) located") }
}

# ---- 3. Save ----
$out = "C:\Users\DESKTOP\madhavbaug-web\data\clinic-coords.json"
$json = $coords | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText($out, $json, (New-Object System.Text.UTF8Encoding($false)))
Write-Output ("Saved " + $coords.Count + " / " + $all.Count + " coordinates to " + $out)

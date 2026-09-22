Add-Type -AssemblyName System.Drawing

$paths = @(
    "e:\xcab\XCabPartner\src\assets\icons"
)

foreach ($p in $paths) {
    if (!(Test-Path $p)) {
        New-Item -ItemType Directory -Path $p -Force | Out-Null
    }
}

function Save-Image-Both($bmp, $filename) {
    foreach ($p in $paths) {
        $out = Join-Path $p $filename
        $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
    }
}

function Save-Svg-Both($content, $filename) {
    foreach ($p in $paths) {
        $out = Join-Path $p $filename
        Set-Content -Path $out -Value $content -Encoding UTF8
    }
}

$W = 128
$H = 128

function Add-RoundedRect([System.Drawing.Drawing2D.GraphicsPath]$path, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
    $d = $r * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
}

$yellowColor = [System.Drawing.Color]::FromArgb(255, 255, 210, 26) # #FFD21A
$charcoal = [System.Drawing.Color]::FromArgb(255, 18, 20, 24)      # #121418

# -------------------------------------------------------------
# 1. DESK (Active: Dark squircle container + Yellow Arrowhead)
# -------------------------------------------------------------
$bmpDesk = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmpDesk)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

$bgPath = New-Object System.Drawing.Drawing2D.GraphicsPath
Add-RoundedRect $bgPath 6 6 116 116 32
$bgBrush = New-Object System.Drawing.SolidBrush($charcoal)
$g.FillPath($bgBrush, $bgPath)

$arrowBrush = New-Object System.Drawing.SolidBrush($yellowColor)
$arrowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$points = @(
    (New-Object System.Drawing.PointF(96, 32)),
    (New-Object System.Drawing.PointF(32, 64)),
    (New-Object System.Drawing.PointF(58, 68)),
    (New-Object System.Drawing.PointF(64, 94))
)
$arrowPath.AddPolygon($points)
$g.FillPath($arrowBrush, $arrowPath)
$g.Dispose()

Save-Image-Both $bmpDesk "desk.png"
Save-Image-Both $bmpDesk "desk_active.png"

# Inactive Desk (charcoal arrow on transparent)
$bmpDeskInact = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmpDeskInact)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)
$darkBrush = New-Object System.Drawing.SolidBrush($charcoal)
$g.FillPath($darkBrush, $arrowPath)
$g.Dispose()
Save-Image-Both $bmpDeskInact "desk_inactive.png"

# SVG Desk Active
$svgDeskActive = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <rect x="6" y="6" width="116" height="116" rx="32" fill="#121418"/>
  <polygon points="96,32 32,64 58,68 64,94" fill="#FFD21A"/>
</svg>
"@
Save-Svg-Both $svgDeskActive "desk.svg"
Save-Svg-Both $svgDeskActive "desk_active.svg"

# SVG Desk Inactive
$svgDeskInactive = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <polygon points="96,32 32,64 58,68 64,94" fill="#121418"/>
</svg>
"@
Save-Svg-Both $svgDeskInactive "desk_inactive.svg"

# -------------------------------------------------------------
# 2. RIDES (Front car outline)
# -------------------------------------------------------------
$bmpCar = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmpCar)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

$penCar = New-Object System.Drawing.Pen($charcoal, 7)
$penCar.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$penCar.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$penCar.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

# Bottom tires
$tireBrush = New-Object System.Drawing.SolidBrush($charcoal)
$tirePathL = New-Object System.Drawing.Drawing2D.GraphicsPath
Add-RoundedRect $tirePathL 24 82 11 22 4
$g.FillPath($tireBrush, $tirePathL)

$tirePathR = New-Object System.Drawing.Drawing2D.GraphicsPath
Add-RoundedRect $tirePathR 93 82 11 22 4
$g.FillPath($tireBrush, $tirePathR)

# Roof
$g.DrawLine($penCar, 44, 34, 84, 34)

# Pillars & cowl
$g.DrawLine($penCar, 44, 34, 28, 62)
$g.DrawLine($penCar, 84, 34, 100, 62)
$g.DrawLine($penCar, 28, 62, 100, 62)

# Mirrors
$g.DrawLine($penCar, 28, 55, 18, 55)
$g.DrawLine($penCar, 100, 55, 110, 55)

# Body outline
$bodyPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$bodyPath.AddLine(22, 62, 20, 88)
$bodyPath.AddArc(20, 80, 16, 16, 90, 90)
$bodyPath.AddLine(28, 96, 100, 96)
$bodyPath.AddArc(92, 80, 16, 16, 0, 90)
$bodyPath.AddLine(108, 88, 106, 62)
$g.DrawPath($penCar, $bodyPath)

# Headlights
$hlPen = New-Object System.Drawing.Pen($charcoal, 5.5)
$hlPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$hlPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$g.DrawLine($hlPen, 32, 74, 46, 74)
$g.DrawLine($hlPen, 82, 74, 96, 74)

# Grille
$grillePen = New-Object System.Drawing.Pen($charcoal, 5)
$grillePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$grillePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$g.DrawLine($grillePen, 54, 84, 74, 84)

$g.Dispose()
Save-Image-Both $bmpCar "rides.png"
Save-Image-Both $bmpCar "rides_active.png"

$svgRides = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%" fill="none" stroke="#121418" stroke-linecap="round" stroke-linejoin="round">
  <rect x="24" y="82" width="11" height="22" rx="4" fill="#121418" stroke="none"/>
  <rect x="93" y="82" width="11" height="22" rx="4" fill="#121418" stroke="none"/>
  <line x1="44" y1="34" x2="84" y2="34" stroke-width="7"/>
  <line x1="44" y1="34" x2="28" y2="62" stroke-width="7"/>
  <line x1="84" y1="34" x2="100" y2="62" stroke-width="7"/>
  <line x1="28" y1="62" x2="100" y2="62" stroke-width="7"/>
  <line x1="28" y1="55" x2="18" y2="55" stroke-width="7"/>
  <line x1="100" y1="55" x2="110" y2="55" stroke-width="7"/>
  <path d="M 22 62 L 20 88 A 8 8 0 0 0 28 96 L 100 96 A 8 8 0 0 0 108 88 L 106 62" stroke-width="7"/>
  <line x1="32" y1="74" x2="46" y2="74" stroke-width="5.5"/>
  <line x1="82" y1="74" x2="96" y2="74" stroke-width="5.5"/>
  <line x1="54" y1="84" x2="74" y2="84" stroke-width="5"/>
</svg>
"@
Save-Svg-Both $svgRides "rides.svg"

# -------------------------------------------------------------
# 3. EARNINGS (Rupee sign in circular ring)
# -------------------------------------------------------------
$bmpEarn = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmpEarn)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

# Outer circle ring
$circlePen = New-Object System.Drawing.Pen($charcoal, 7)
$g.DrawEllipse($circlePen, 14, 14, 100, 100)

# Rupee symbol ₹ using Segoe UI Bold for perfect typography
$font = New-Object System.Drawing.Font('Segoe UI', 48, [System.Drawing.FontStyle]::Bold)
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center
$rect = New-Object System.Drawing.RectangleF(0, 4, 128, 128)
$darkBrush = New-Object System.Drawing.SolidBrush($charcoal)
$g.DrawString([char]0x20B9, $font, $darkBrush, $rect, $sf)

$g.Dispose()
Save-Image-Both $bmpEarn "earnings.png"
Save-Image-Both $bmpEarn "earnings_active.png"

$svgEarnings = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <circle cx="64" cy="64" r="50" fill="none" stroke="#121418" stroke-width="7"/>
  <text x="64" y="80" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="bold" font-size="52" fill="#121418">&#x20B9;</text>
</svg>
"@
Save-Svg-Both $svgEarnings "earnings.svg"

# -------------------------------------------------------------
# 4. ALERTS (Bell with rounded shoulders & yellow notification dot)
# -------------------------------------------------------------
$bmpAlert = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmpAlert)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

$bellPen = New-Object System.Drawing.Pen($charcoal, 7)
$bellPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$bellPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$bellPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

# Top loop
$g.DrawArc($bellPen, 56, 16, 16, 16, 180, 180)

# Bell body
$bellPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$bellPath.AddBezier(64, 25, 52, 25, 46, 36, 46, 52)
$bellPath.AddBezier(46, 52, 46, 68, 38, 78, 26, 84)
$bellPath.AddLine(26, 84, 102, 84)
$bellPath.AddBezier(102, 84, 90, 78, 82, 68, 82, 52)
$bellPath.AddBezier(82, 52, 82, 36, 76, 25, 64, 25)
$g.DrawPath($bellPen, $bellPath)

# Clapper
$clapperBrush = New-Object System.Drawing.SolidBrush($charcoal)
$g.FillPie($clapperBrush, 55, 78, 18, 18, 0, 180)

# Yellow notification badge
$yellowBrush = New-Object System.Drawing.SolidBrush($yellowColor)
$g.FillEllipse($yellowBrush, 88, 16, 22, 22)

$g.Dispose()
Save-Image-Both $bmpAlert "alerts.png"
Save-Image-Both $bmpAlert "alerts_active.png"

$svgAlerts = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <path d="M 56 24 A 8 8 0 0 1 72 24" fill="none" stroke="#121418" stroke-width="7" stroke-linecap="round"/>
  <path d="M 64 25 C 52 25 46 36 46 52 C 46 68 38 78 26 84 L 102 84 C 90 78 82 68 82 52 C 82 36 76 25 64 25 Z" fill="none" stroke="#121418" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M 55 84 A 9 9 0 0 0 73 84 Z" fill="#121418"/>
  <circle cx="99" cy="27" r="11" fill="#FFD21A"/>
</svg>
"@
Save-Svg-Both $svgAlerts "alerts.svg"

# -------------------------------------------------------------
# 5. PROFILE (User silhouette outline)
# -------------------------------------------------------------
$bmpProf = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmpProf)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

$profPen = New-Object System.Drawing.Pen($charcoal, 7)
$profPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$profPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$profPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

# Head circle
$g.DrawEllipse($profPen, 46, 20, 36, 36)

# Shoulders
$bustPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$bustPath.AddBezier(24, 98, 28, 70, 48, 68, 64, 68)
$bustPath.AddBezier(64, 68, 80, 68, 100, 70, 104, 98)
$g.DrawPath($profPen, $bustPath)

$g.Dispose()
Save-Image-Both $bmpProf "profile.png"
Save-Image-Both $bmpProf "profile_active.png"

$svgProfile = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <circle cx="64" cy="38" r="18" fill="none" stroke="#121418" stroke-width="7"/>
  <path d="M 24 98 C 28 70 48 68 64 68 C 80 68 100 70 104 98" fill="none" stroke="#121418" stroke-width="7" stroke-linecap="round"/>
</svg>
"@
Save-Svg-Both $svgProfile "profile.svg"

# Remove temporary test files
Remove-Item -Path "e:\xcab\XCabPartner\src\assets\icons\*test*.png" -ErrorAction SilentlyContinue

Write-Output "Complete asset suite generated in src/assets/icons and assets/icons!"

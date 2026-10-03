Add-Type -AssemblyName System.Drawing

$srcPath = "e:\xcab\XCabPartner\src\assets\icons\app-logo.png"
if (!(Test-Path $srcPath)) {
    Write-Error "Source file not found: $srcPath"
    exit 1
}

# Load image safely into memory so we don't lock the file
$fileStream = [System.IO.File]::OpenRead($srcPath)
$srcBmpOriginal = [System.Drawing.Bitmap]::FromStream($fileStream)
$srcBmp = New-Object System.Drawing.Bitmap($srcBmpOriginal)
$srcBmpOriginal.Dispose()
$fileStream.Dispose()

# 1. Bounding box calculation for precision
$minX = $srcBmp.Width; $maxX = 0; $minY = $srcBmp.Height; $maxY = 0
for ($y = 0; $y -lt $srcBmp.Height; $y += 2) {
    for ($x = 0; $x -lt $srcBmp.Width; $x += 2) {
        $c = $srcBmp.GetPixel($x, $y)
        if ($c.R -lt 248 -or $c.G -lt 248 -or $c.B -lt 248) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

# Add small margin to crop
$cropX = [Math]::Max(0, $minX - 4)
$cropY = [Math]::Max(0, $minY - 4)
$cropW = [Math]::Min($srcBmp.Width - $cropX, ($maxX - $minX) + 8)
$cropH = [Math]::Min($srcBmp.Height - $cropY, ($maxY - $minY) + 8)

Write-Host "Cropping rect: X=$cropX, Y=$cropY, W=$cropW, H=$cropH"

# Crop exact logo content
$cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$croppedBmp = $srcBmp.Clone($cropRect, $srcBmp.PixelFormat)

# Function to render icon onto canvas with high quality
function Create-Master-Icon([int]$canvasSize, [double]$safeZoneRatio, [bool]$withWhiteBg) {
    $result = New-Object System.Drawing.Bitmap($canvasSize, $canvasSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($result)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    if ($withWhiteBg) {
        $g.Clear([System.Drawing.Color]::White)
    } else {
        $g.Clear([System.Drawing.Color]::Transparent)
    }

    # Calculate target dimensions fitting within safe zone
    $maxTargetDim = $canvasSize * $safeZoneRatio
    $scale = [Math]::Min($maxTargetDim / $cropW, $maxTargetDim / $cropH)
    $destW = [int]($cropW * $scale)
    $destH = [int]($cropH * $scale)
    $destX = [int](($canvasSize - $destW) / 2)
    $destY = [int](($canvasSize - $destH) / 2)

    $g.DrawImage($croppedBmp, $destX, $destY, $destW, $destH)
    $g.Dispose()
    return $result
}

# 1. Generate 1024x1024 Master on White (Safe zone ~66%)
$master1024 = Create-Master-Icon 1024 0.66 $true
$master1024.Save("e:\xcab\XCabPartner\src\assets\icons\partner_treeps_logo_1024.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Generate 1024x1024 Foreground Layer (Transparent)
$foreground1024 = Create-Master-Icon 1024 0.66 $false
$foreground1024.Save("e:\xcab\XCabPartner\src\assets\icons\partner_treeps_foreground_1024.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 3. Update the primary partner_treeps_logo.png to the clean padded 1024 master
$master1024.Save("e:\xcab\XCabPartner\src\assets\icons\partner_treeps_logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Masters generated at src/assets/icons/"

# Generate Android App Icons across all mipmap folders
# Adaptive foreground sizes (108dp base)
$fgSizes = @{
    "mipmap-mdpi"    = 108
    "mipmap-hdpi"    = 162
    "mipmap-xhdpi"   = 216
    "mipmap-xxhdpi"  = 324
    "mipmap-xxxhdpi" = 432
}

# Legacy icon sizes (48dp base)
$legacySizes = @{
    "mipmap-mdpi"    = 48
    "mipmap-hdpi"    = 72
    "mipmap-xhdpi"   = 96
    "mipmap-xxhdpi"  = 144
    "mipmap-xxxhdpi" = 192
}

foreach ($folder in $fgSizes.Keys) {
    $dir = "e:\xcab\XCabPartner\android\app\src\main\res\$folder"
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    # Foreground adaptive (ic_launcher_foreground.png)
    $fgSize = $fgSizes[$folder]
    $fgBmp = Create-Master-Icon $fgSize 0.66 $false
    $fgBmp.Save("$dir\ic_launcher_foreground.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $fgBmp.Dispose()

    # Legacy square ic_launcher.png (White background, safe ratio ~0.72)
    $legSize = $legacySizes[$folder]
    $legBmp = Create-Master-Icon $legSize 0.72 $true
    $legBmp.Save("$dir\ic_launcher.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $legBmp.Dispose()

    # Legacy circular ic_launcher_round.png
    $roundBmp = New-Object System.Drawing.Bitmap($legSize, $legSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $rg = [System.Drawing.Graphics]::FromImage($roundBmp)
    $rg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $rg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $rg.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $rg.Clear([System.Drawing.Color]::Transparent)
    
    # Draw white circle
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $rg.FillEllipse($brush, 0, 0, $legSize - 1, $legSize - 1)
    $brush.Dispose()
    
    # Draw centered logo inside circle (safe ratio 0.62)
    $maxTarget = $legSize * 0.62
    $scale = [Math]::Min($maxTarget / $cropW, $maxTarget / $cropH)
    $dW = [int]($cropW * $scale)
    $dH = [int]($cropH * $scale)
    $dX = [int](($legSize - $dW) / 2)
    $dY = [int](($legSize - $dH) / 2)
    $rg.DrawImage($croppedBmp, $dX, $dY, $dW, $dH)
    $rg.Dispose()

    $roundBmp.Save("$dir\ic_launcher_round.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $roundBmp.Dispose()
}

$srcBmp.Dispose()
$croppedBmp.Dispose()
$master1024.Dispose()
$foreground1024.Dispose()

Write-Host "All Android icons generated successfully!"

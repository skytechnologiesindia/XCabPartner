Add-Type -AssemblyName System.Drawing

$p = "e:\xcab\XCabPartner\src\assets\icons"

# 1. Top-down modern yellow cab icon (map_car.png) 128x128
$bmpCar = New-Object System.Drawing.Bitmap(128, 128)
$g = [System.Drawing.Graphics]::FromImage($bmpCar)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

# Wheels (4 dark charcoal rounded rectangles)
$wheelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 18, 20, 24))
$g.FillRectangle($wheelBrush, 24, 26, 12, 26) # Front left
$g.FillRectangle($wheelBrush, 92, 26, 12, 26) # Front right
$g.FillRectangle($wheelBrush, 24, 76, 12, 26) # Rear left
$g.FillRectangle($wheelBrush, 92, 76, 12, 26) # Rear right

# Car body (Yellow #FFD21A rounded rect)
$bodyBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 210, 26))
$bodyPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 20, 22, 26), 4)

$bodyPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$r = 18
$x = 30; $y = 12; $w = 68; $h = 104
$d = $r * 2
$bodyPath.AddArc($x, $y, $d, $d, 180, 90)
$bodyPath.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
$bodyPath.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
$bodyPath.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
$bodyPath.CloseFigure()

$g.FillPath($bodyBrush, $bodyPath)
$g.DrawPath($bodyPen, $bodyPath)

# Windshield (Front dark curve)
$glassBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 26, 32, 38))
$wsPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$wsPath.AddArc(40, 32, 48, 24, 180, 180)
$wsPath.AddLine(88, 44, 82, 52)
$wsPath.AddLine(82, 52, 46, 52)
$wsPath.AddLine(46, 52, 40, 44)
$wsPath.CloseFigure()
$g.FillPath($glassBrush, $wsPath)

# Roof section
$roofPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 220, 175, 0), 2)
$g.DrawRectangle($roofPen, 44, 54, 40, 24)

# Rear Windshield
$rwPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$rwPath.AddArc(42, 80, 44, 18, 0, 180)
$rwPath.CloseFigure()
$g.FillPath($glassBrush, $rwPath)

# Side windows
$g.FillRectangle($glassBrush, 38, 56, 4, 22)
$g.FillRectangle($glassBrush, 86, 56, 4, 22)

# Headlights (Front bright lights)
$hlBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 240))
$g.FillEllipse($hlBrush, 38, 14, 12, 8)
$g.FillEllipse($hlBrush, 78, 14, 12, 8)

# Taillights (Rear red lights)
$tlBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 239, 68, 68))
$g.FillRectangle($tlBrush, 38, 110, 12, 4)
$g.FillRectangle($tlBrush, 78, 110, 12, 4)

$g.Dispose()
$bmpCar.Save((Join-Path $p "map_car.png"), [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Yellow Map Pickup Pin (map_pickup_pin.png) 128x128
$bmpPin = New-Object System.Drawing.Bitmap(128, 128)
$gPin = [System.Drawing.Graphics]::FromImage($bmpPin)
$gPin.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gPin.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gPin.Clear([System.Drawing.Color]::Transparent)

# Inverted teardrop pin
$pinPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$pinPath.AddArc(30, 8, 68, 68, 205, 250)
$pinPath.AddLine(90, 56, 64, 118)
$pinPath.AddLine(64, 118, 38, 56)
$pinPath.CloseFigure()

$pinBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 210, 26))
$pinPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 20, 22, 26), 4)
$gPin.FillPath($pinBrush, $pinPath)
$gPin.DrawPath($pinPen, $pinPath)

# Inner black circle dot
$dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 18, 20, 24))
$gPin.FillEllipse($dotBrush, 50, 30, 28, 28)

$gPin.Dispose()
$bmpPin.Save((Join-Path $p "map_pickup_pin.png"), [System.Drawing.Imaging.ImageFormat]::Png)

Write-Output "Generated map_car.png and map_pickup_pin.png successfully"

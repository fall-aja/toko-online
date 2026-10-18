<?php
$img = imagecreatefrompng('public/images/logo_raw.png');

$cropX = 90;
$cropY = 2;
$cropW = 245;
$cropH = 172;

$cropped = imagecrop($img, ['x' => $cropX, 'y' => $cropY, 'width' => $cropW, 'height' => $cropH]);
$paperColor = imagecolorallocate($cropped, 246, 245, 242);

// 1. Wipe out table wood on top-right:
for ($y = 0; $y < 50; $y++) {
    for ($x = 165; $x < $cropW; $x++) {
        // wood boundary equation: y < (x - 165) * 0.7
        if ($y < ($x - 160) * 0.8) {
            imagesetpixel($cropped, $x, $y, $paperColor);
        }
    }
}

// 2. Wipe out subtitle completely below RUPAKALA:
// x > 140: subtitle is y >= 134
for ($y = 134; $y < $cropH; $y++) {
    for ($x = 140; $x < $cropW; $x++) {
        imagesetpixel($cropped, $x, $y, $paperColor);
    }
}

// x between 85 and 140: subtitle is y >= 152
for ($y = 152; $y < $cropH; $y++) {
    for ($x = 85; $x < 140; $x++) {
        imagesetpixel($cropped, $x, $y, $paperColor);
    }
}

// x < 85: subtitle is y >= 170
for ($y = 170; $y < $cropH; $y++) {
    for ($x = 0; $x < 85; $x++) {
        imagesetpixel($cropped, $x, $y, $paperColor);
    }
}

imagepng($cropped, 'public/images/logo_rupakala.png');
echo "Finished! Completely clean logo!\n";

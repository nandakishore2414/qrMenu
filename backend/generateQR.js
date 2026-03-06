const QRCode = require('qrcode');

const url = 'https://gangrill-menu.vercel.app';

QRCode.toFile('./gangrill-qr.png', url, {
    color: {
        dark: '#000000',  // Black dots
        light: '#FFFFFF' // Transparent background
    }
}, function (err) {
    if (err) throw err;
    console.log('QR code saved as gangrill-qr.png');
});

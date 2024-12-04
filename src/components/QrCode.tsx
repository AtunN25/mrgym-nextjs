// components/QrCode.tsx
import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QrCodeProps {
  props: string;
}

const QrCode: React.FC<QrCodeProps> = ({ props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadQrCode = () => {
    const qrCanvas = canvasRef.current;
    if (!qrCanvas) return;

  
    const size = 200; // Tamaño del QR
    const padding = 20; // Tamaño del borde blanco
    const totalSize = size + padding * 2;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = totalSize;
    tempCanvas.height = totalSize;

    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

  
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, totalSize, totalSize);

   
    tempCtx.drawImage(qrCanvas, padding, padding, size, size);


    const link = document.createElement('a');
    link.href = tempCanvas.toDataURL('image/png');
    link.download = 'qr-code-with-border.png';
    link.click();
  };

  return (
    <div className="text-center">
      <QRCodeCanvas value={props} size={200} ref={canvasRef} />
      <button
        onClick={downloadQrCode}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Descargar QR
      </button>
    </div>
  );
};

export default QrCode;
// components/QrCode.tsx
import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QrCodeProps {
  props: string;
}

const QrCode: React.FC<QrCodeProps> = ({ props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadQrCode = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qr-code.png';
      link.click();
    }
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

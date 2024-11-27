'use client'
import React from 'react';
import { useQRCode } from 'next-qrcode';

function QRCode({ props } : {props: string;}) {
    const { Canvas } = useQRCode();


  return (
    <div className=''>
    
      <Canvas
      text={props}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 250,
        color: {
            dark: '#000000', // Negro para el QR.
            light: '#FFFFFF', // Blanco para el fondo.
          },
      }}
    />
    </div>
  )
}

export default QRCode

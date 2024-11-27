'use client'
import React from 'react';
import { useQRCode } from 'next-qrcode';

function Test() {
    const { Canvas } = useQRCode();

  return (
    <div className='flex justify-center items-center h-screen'>
      <Canvas
      text={'12323232321'}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
            dark: '#000000', // Negro para el QR.
            light: '#FFFFFF', // Blanco para el fondo.
          },
      }}
    />
    </div>
  )
}

export default Test

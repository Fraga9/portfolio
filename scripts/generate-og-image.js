import satori from 'satori'
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

async function generateOGImage() {
  console.log('📥 Loading fonts...')

  const poppinsBold = readFileSync(
    join(process.cwd(), 'public', 'fonts', 'Poppins-Bold.ttf')
  )

  console.log('🎨 Generating OG image...')

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #000000 0%, #050030 50%, #0a0060 100%)',
          position: 'relative',
          fontFamily: 'Poppins',
        },
        children: [
          // Glow effect - top right (background, rendered first)
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '500px',
                height: '500px',
                borderRadius: '100%',
                background: 'rgba(96, 165, 250, 0.12)',
                filter: 'blur(80px)',
              },
            },
          },
          // Glow effect - bottom left (background, rendered second)
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '-50px',
                left: '20%',
                width: '600px',
                height: '300px',
                borderRadius: '100%',
                background: 'rgba(59, 130, 246, 0.15)',
                filter: 'blur(100px)',
              },
            },
          },
          // Badge ITC x TEC
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '12px 24px',
                borderRadius: '9999px',
                marginBottom: '40px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      fontWeight: '700',
                      color: 'white',
                      fontSize: '22px',
                    },
                    children: 'ITC',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      color: 'rgb(156, 163, 175)',
                      fontSize: '22px',
                    },
                    children: '×',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontWeight: '700',
                      color: 'white',
                      fontSize: '22px',
                    },
                    children: 'TEC',
                  },
                },
              ],
            },
          },
          // Main content
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '28px',
              },
              children: [
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontSize: '86px',
                      fontWeight: '700',
                      color: 'white',
                      lineHeight: '1.05',
                      margin: '0',
                      display: 'flex',
                      flexDirection: 'column',
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: { color: 'white' },
                          children: 'Hola, soy',
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: { 
                            color: 'rgb(96, 165, 250)',
                            textShadow: '0 0 60px rgba(96, 165, 250, 0.5)',
                          },
                          children: 'Héctor Garza',
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'p',
                  props: {
                    style: {
                      fontSize: '28px',
                      fontWeight: '400',
                      color: 'rgb(209, 213, 219)',
                      maxWidth: '800px',
                      lineHeight: '1.5',
                      margin: '0',
                    },
                    children: 'Ingeniero en Tecnologías Computacionales • Fullstack Developer',
                  },
                },
                // Tech badges row
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginTop: '16px',
                    },
                    children: [
                      { type: 'div', props: { style: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '8px', color: 'white', fontSize: '18px', fontWeight: '700' }, children: 'React' } },
                      { type: 'div', props: { style: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '8px', color: 'white', fontSize: '18px', fontWeight: '700' }, children: 'Node.js' } },
                      { type: 'div', props: { style: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '8px', color: 'white', fontSize: '18px', fontWeight: '700' }, children: 'TypeScript' } },
                      { type: 'div', props: { style: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '8px', color: 'white', fontSize: '18px', fontWeight: '700' }, children: 'AWS' } },
                    ],
                  },
                },
              ],
            },
          },
          // Domain/URL at bottom
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '40px',
                right: '80px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#d0ff00',
                      boxShadow: '0 0 10px #d0ff00',
                    },
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '20px',
                      fontWeight: '700',
                    },
                    children: 'osifraga.dev',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Poppins',
          data: poppinsBold,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Poppins',
          data: poppinsBold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  )

  console.log('🖼️  Converting to PNG...')

  const pngBuffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer()

  writeFileSync(
    join(process.cwd(), 'public', 'og-image.png'),
    pngBuffer
  )

  console.log('✅ OG image generated successfully at public/og-image.png')
}

generateOGImage().catch(console.error)

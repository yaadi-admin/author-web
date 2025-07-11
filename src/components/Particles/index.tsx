'use client';
import { useEffect, useMemo, useState } from 'react';
import Particles from "@tsparticles/react";
import { loadSlim } from '@tsparticles/slim';
import { MoveDirection, OutMode } from "@tsparticles/engine"; // Import missing enums
import type { ISourceOptions } from "@tsparticles/engine"; // Import ISourceOptions type

function ParticlesContainer({ children }: any) {
  const [init, setInit] = useState(false);

  // useEffect(() => {
  //   // Initialize the particles engine with the slim preset
  //   const initParticlesEngine = async () => {
  //     await loadSlim();
  //     setInit(true);
  //   };

  //   initParticlesEngine().catch(console.error);
  // }, []);

  const particlesLoaded = async (container: any): Promise<void> => {
    console.log("Particles loaded:", container);
  };

  const options: Partial<ISourceOptions> = useMemo(
    () => ({
      background: {
        color: {
          value: "#f8fdff", // Light blue background
        },
        image: "linear-gradient(to top, #f8fdff, #ffff)",
      },
      fpsLimit: 30,
      interactivity: {
        events: {
          onClick: { enable: false, mode: "push" },
          onHover: { enable: true, mode: "grab" },
          resize: true,
        },
        modes: {
          push: { quantity: 3 },
          grab: { distance: 80 },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // White particles
        },
        links: {
          enable: true,
          distance: 100,
          color: "#33ccff", // Neon blue links
          opacity: 0.5,
          width: 1,
        },
        move: {
          enable: true,
          direction: MoveDirection.right, // Left-to-right movement
          speed: 0.05,
          outModes: {
            default: OutMode.out, // Particles move out of bounds
          },
        },
        number: {
          value: 50,
          density: {
            enable: true,
            area: 800,
          },
        },
        opacity: {
          value: 0.1, // Low opacity particles
          animation: {
            enable: false,
          },
        },
        shape: {
          type: "circle", // Circular particles
        },
        size: {
          value: { min: 1, max: 10 },
          animation: {
            enable: false,
          },
        },
      },
      detectRetina: true,
    }),
    []
  ) as any;

  return (
    <div className='relative min-h-screen w-full bg-cover bg-no-repeat bg-center'>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className='relative'>
        {children}
      </div>
    </div>
  );
}

export default ParticlesContainer;
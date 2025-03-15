import React, { useEffect, useRef } from 'react';
import './visualizer.css';

const ElectronVisualizer = ({ electronConfiguration }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 600;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Parse electron configuration and group by shell
    const shellElectrons = parseConfigurationByShell(electronConfiguration);

    // Draw shells
    drawShells(ctx, centerX, centerY, shellElectrons);

    // Animation loop
    let angle = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawShells(ctx, centerX, centerY, shellElectrons, angle);
      angle += 0.02;
      requestAnimationFrame(animate);
    };
    animate();
  }, [electronConfiguration]);

  const parseConfigurationByShell = (config) => {
    // Initialize shells array with proper quantum mechanical limits
    const shellLimits = [0, 2, 8, 18, 32]; // Max electrons per shell (0-indexed)
    const shellElectrons = [];
    
    // Parse the electron configuration
    const orbitals = config.split(' ');
    const electronsByShell = {}; // To track electrons in each shell
    
    // First pass: count electrons by shell
    orbitals.forEach(orbital => {
      const match = orbital.match(/(\d)([spdf])(\d*)/);
      if (match) {
        const [_, shellNum, orbitalType, electronCount] = match;
        const shell = parseInt(shellNum);
        const electrons = electronCount ? parseInt(electronCount) : 1;
        
        if (!electronsByShell[shell]) {
          electronsByShell[shell] = { total: 0, orbitals: [] };
        }
        
        electronsByShell[shell].total += electrons;
        electronsByShell[shell].orbitals.push({
          orbital: orbitalType,
          electrons: electrons
        });
      }
    });
    
    // Second pass: create shell objects with correct electron counts
    Object.keys(electronsByShell).sort((a, b) => parseInt(a) - parseInt(b)).forEach(shellNum => {
      const shell = parseInt(shellNum);
      const shellData = electronsByShell[shell];
      
      // Ensure we don't exceed the maximum electrons per shell
      const actualElectrons = Math.min(shellData.total, shellLimits[shell]);
      
      shellElectrons.push({
        shell: shell,
        electrons: actualElectrons,
        orbitals: shellData.orbitals
      });
    });
    
    return shellElectrons;
  };

  const drawShells = (ctx, centerX, centerY, shells, angle = 0) => {
    shells.forEach(shellData => {
      const radius = (shellData.shell * 50);
      const electronRadius = 4;
      const electronCount = shellData.electrons;
      
      // Draw shell circle
      ctx.beginPath();
      ctx.strokeStyle = `rgba(79, 209, 197, 0.2)`;
      ctx.lineWidth = 1;
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Calculate orbital velocity (inversely proportional to square of shell number)
      const orbitalVelocity = 1 / Math.pow(shellData.shell, 2);

      // Draw electrons for this shell
      for (let i = 0; i < electronCount; i++) {
        const electronAngle = (i * (Math.PI * 2) / electronCount) + (angle * orbitalVelocity * 5);
        const x = centerX + Math.cos(electronAngle) * radius;
        const y = centerY + Math.sin(electronAngle) * radius;

        // Determine electron color based on which orbital it belongs to
        let orbitalType = 's'; // Default
        let electronIndex = i;
        
        // Find which orbital this electron belongs to
        for (const orbital of shellData.orbitals) {
          if (electronIndex < orbital.electrons) {
            orbitalType = orbital.orbital;
            break;
          }
          electronIndex -= orbital.electrons;
        }
        
        const baseHue = getOrbitalColor(orbitalType);

        // Draw electron
        ctx.beginPath();
        ctx.fillStyle = baseHue;
        ctx.arc(x, y, electronRadius, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, electronRadius * 2);
        gradient.addColorStop(0, `${baseHue}66`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(x, y, electronRadius * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw nucleus
    ctx.beginPath();
    ctx.fillStyle = '#4fd1c5';
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Add nucleus glow
    ctx.beginPath();
    const nucleusGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 16);
    nucleusGradient.addColorStop(0, 'rgba(79, 209, 197, 0.4)');
    nucleusGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = nucleusGradient;
    ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
    ctx.fill();
  };

  const getOrbitalColor = (orbital) => {
    switch (orbital) {
      case 's': return '#fe0303';
      case 'p': return '#0ffe03';
      case 'd': return '#0905f9';
      case 'f': return '#f9f104';
      default: return '#ffffff';
    }
  };

  return (
    <div className="electron-visualizer">
      <div className="orbital-legend">
        <div className="legend-item">
          <span className="color-dot s"></span>
          <span>s</span>
        </div>
        <div className="legend-item">
          <span className="color-dot p"></span>
          <span>p</span>
        </div>
        <div className="legend-item">
          <span className="color-dot d"></span>
          <span>d</span>
        </div>
        <div className="legend-item">
          <span className="color-dot f"></span>
          <span>f</span>
        </div>
      </div>
      <div className="electron-content">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default ElectronVisualizer;

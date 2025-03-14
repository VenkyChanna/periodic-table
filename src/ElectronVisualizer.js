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

    // Parse electron configuration
    const shells = parseConfiguration(electronConfiguration);

    // Draw shells
    drawShells(ctx, centerX, centerY, shells);

    // Animation loop
    let angle = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawShells(ctx, centerX, centerY, shells, angle);
      // Adjust angle increment based on orbital velocity (1/r^2 relationship)
      angle += 0.02 * (1 / Math.pow(shells[shells.length - 1].shell, 2));
      requestAnimationFrame(animate);
    };
    animate();
  }, [electronConfiguration]);

  const parseConfiguration = (config) => {
    const shells = [];
    const parts = config.split(' ');
    
    parts.forEach(part => {
      const match = part.match(/(\d)([spdf])(\d*)/);
      if (match) {
        const [_, shell, orbital, electrons] = match;
        shells.push({
          shell: parseInt(shell),
          orbital,
          electrons: electrons ? parseInt(electrons) : 1
        });
      }
    });

    return shells;
  };

  const drawShells = (ctx, centerX, centerY, shells, angle = 0) => {
    shells.forEach((shell, index) => {
      const radius = (shell.shell * 50);
      const electronRadius = 4;
      const electronCount = shell.electrons;
      const baseHue = getOrbitalColor(shell.orbital);

      // Calculate orbital velocity (inversely proportional to square of shell number)
      const orbitalVelocity = 1 / Math.pow(shell.shell, 2);

      // Draw shell circle
      ctx.beginPath();
      ctx.strokeStyle = `rgba(79, 209, 197, 0.2)`;
      ctx.lineWidth = 1;
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw electrons with varying speeds
      for (let i = 0; i < electronCount; i++) {
        const electronAngle = (i * (Math.PI * 2) / electronCount) + (angle * orbitalVelocity * 5);
        const x = centerX + Math.cos(electronAngle) * radius;
        const y = centerY + Math.sin(electronAngle) * radius;

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
      case 's': return '#FF6B6B';
      case 'p': return '#4ECDC4';
      case 'd': return '#45B7D1';
      case 'f': return '#96CEB4';
      default: return '#ffffff';
    }
  };

  return (
    <div className="electron-visualizer">
      <div className="electron-content">
        <canvas ref={canvasRef} />
      </div>
      <div className="orbital-legend">
        <div className="legend-item">
          <span className="color-dot s"></span>
          <span>s orbital</span>
        </div>
        <div className="legend-item">
          <span className="color-dot p"></span>
          <span>p orbital</span>
        </div>
        <div className="legend-item">
          <span className="color-dot d"></span>
          <span>d orbital</span>
        </div>
        <div className="legend-item">
          <span className="color-dot f"></span>
          <span>f orbital</span>
        </div>
      </div>
    </div>
  );
};

export default ElectronVisualizer;

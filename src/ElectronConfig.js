import React from "react";
import "./styles.css";

const ElectronConfig = ({ element }) => {
  if (!element) return null;

  // Example Electron Configurations (Extend this for more elements)
  const electronConfigurations = {
    1: [1],         // Hydrogen
    2: [2],         // Helium
    3: [2, 1],      // Lithium
    4: [2, 2],      // Beryllium
    6: [2, 4],      // Carbon
    8: [2, 6],      // Oxygen
    10: [2, 8],     // Neon
    12: [2, 8, 2],  // Magnesium
    18: [2, 8, 8],  // Argon
    26: [2, 8, 14, 2] // Iron
  };

  const config = electronConfigurations[element.number] || [];
  
  return (
    <div className="electron-visualizer">
      <h3>Electron Configuration of {element.symbol}</h3>
      <svg width="200" height="200">
        <circle cx="100" cy="100" r="10" fill="yellow" /> {/* Nucleus */}

        {config.map((electrons, index) => {
          const radius = 30 + index * 30; // Orbit radius
          const angleStep = (2 * Math.PI) / electrons;

          return (
            <g key={index}>
              {Array.from({ length: electrons }).map((_, i) => {
                const angle = i * angleStep;
                const x = 100 + radius * Math.cos(angle);
                const y = 100 + radius * Math.sin(angle);

                return <circle key={i} cx={x} cy={y} r="5" fill="blue" />;
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ElectronConfig;

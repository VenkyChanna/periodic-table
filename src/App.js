import React, { useState } from 'react';
import { periodicTableData } from './data/periodicTableData';
import ElementCard from './ElementCard';
import Modal from './Modal';
import './styles.css';
import cosmosBackground from './cosmos.jpg';

const App = () => {
  const [selectedElement, setSelectedElement] = useState(null);

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handleCloseModal = () => {
    setSelectedElement(null);
  };

  // Separate elements into main table and special series
  const mainElements = periodicTableData.filter(element => 
    !(element.atomicNumber >= 58 && element.atomicNumber <= 71) &&
    !(element.atomicNumber >= 90 && element.atomicNumber <= 103)
  );

  const lanthanides = periodicTableData.filter(element => 
    element.atomicNumber >= 58 && element.atomicNumber <= 71
  ).sort((a, b) => a.atomicNumber - b.atomicNumber);
  
  const actinides = periodicTableData.filter(element => 
    element.atomicNumber >= 90 && element.atomicNumber <= 103
  ).sort((a, b) => a.atomicNumber - b.atomicNumber);

  // Calculate grid position for each element based on periodic table layout
  const getGridPosition = (element) => {
    const { atomicNumber } = element;
    
    // Row 1 (Period 1)
    if (atomicNumber === 1) return { row: 1, col: 1 }; // H
    if (atomicNumber === 2) return { row: 1, col: 18 }; // He
    
    // Row 2 (Period 2)
    if (atomicNumber === 3) return { row: 2, col: 1 }; // Li
    if (atomicNumber === 4) return { row: 2, col: 2 }; // Be
    if (atomicNumber === 5) return { row: 2, col: 13 }; // B
    if (atomicNumber === 6) return { row: 2, col: 14 }; // C
    if (atomicNumber === 7) return { row: 2, col: 15 }; // N
    if (atomicNumber === 8) return { row: 2, col: 16 }; // O
    if (atomicNumber === 9) return { row: 2, col: 17 }; // F
    if (atomicNumber === 10) return { row: 2, col: 18 }; // Ne
    
    // Row 3 (Period 3)
    if (atomicNumber === 11) return { row: 3, col: 1 }; // Na
    if (atomicNumber === 12) return { row: 3, col: 2 }; // Mg
    if (atomicNumber === 13) return { row: 3, col: 13 }; // Al
    if (atomicNumber === 14) return { row: 3, col: 14 }; // Si
    if (atomicNumber === 15) return { row: 3, col: 15 }; // P
    if (atomicNumber === 16) return { row: 3, col: 16 }; // S
    if (atomicNumber === 17) return { row: 3, col: 17 }; // Cl
    if (atomicNumber === 18) return { row: 3, col: 18 }; // Ar
    
    // Row 4 (Period 4)
    if (atomicNumber === 19) return { row: 4, col: 1 }; // K
    if (atomicNumber === 20) return { row: 4, col: 2 }; // Ca
    if (atomicNumber === 21) return { row: 4, col: 3 }; // Sc
    if (atomicNumber === 22) return { row: 4, col: 4 }; // Ti
    if (atomicNumber === 23) return { row: 4, col: 5 }; // V
    if (atomicNumber === 24) return { row: 4, col: 6 }; // Cr
    if (atomicNumber === 25) return { row: 4, col: 7 }; // Mn
    if (atomicNumber === 26) return { row: 4, col: 8 }; // Fe
    if (atomicNumber === 27) return { row: 4, col: 9 }; // Co
    if (atomicNumber === 28) return { row: 4, col: 10 }; // Ni
    if (atomicNumber === 29) return { row: 4, col: 11 }; // Cu
    if (atomicNumber === 30) return { row: 4, col: 12 }; // Zn
    if (atomicNumber === 31) return { row: 4, col: 13 }; // Ga
    if (atomicNumber === 32) return { row: 4, col: 14 }; // Ge
    if (atomicNumber === 33) return { row: 4, col: 15 }; // As
    if (atomicNumber === 34) return { row: 4, col: 16 }; // Se
    if (atomicNumber === 35) return { row: 4, col: 17 }; // Br
    if (atomicNumber === 36) return { row: 4, col: 18 }; // Kr
    
    // Row 5 (Period 5)
    if (atomicNumber === 37) return { row: 5, col: 1 }; // Rb
    if (atomicNumber === 38) return { row: 5, col: 2 }; // Sr
    if (atomicNumber === 39) return { row: 5, col: 3 }; // Y
    if (atomicNumber === 40) return { row: 5, col: 4 }; // Zr
    if (atomicNumber === 41) return { row: 5, col: 5 }; // Nb
    if (atomicNumber === 42) return { row: 5, col: 6 }; // Mo
    if (atomicNumber === 43) return { row: 5, col: 7 }; // Tc
    if (atomicNumber === 44) return { row: 5, col: 8 }; // Ru
    if (atomicNumber === 45) return { row: 5, col: 9 }; // Rh
    if (atomicNumber === 46) return { row: 5, col: 10 }; // Pd
    if (atomicNumber === 47) return { row: 5, col: 11 }; // Ag
    if (atomicNumber === 48) return { row: 5, col: 12 }; // Cd
    if (atomicNumber === 49) return { row: 5, col: 13 }; // In
    if (atomicNumber === 50) return { row: 5, col: 14 }; // Sn
    if (atomicNumber === 51) return { row: 5, col: 15 }; // Sb
    if (atomicNumber === 52) return { row: 5, col: 16 }; // Te
    if (atomicNumber === 53) return { row: 5, col: 17 }; // I
    if (atomicNumber === 54) return { row: 5, col: 18 }; // Xe
    
    // Row 6 (Period 6)
    if (atomicNumber === 55) return { row: 6, col: 1 }; // Cs
    if (atomicNumber === 56) return { row: 6, col: 2 }; // Ba
    if (atomicNumber === 57) return { row: 6, col: 3 }; // La
    if (atomicNumber === 72) return { row: 6, col: 4 }; // Hf
    if (atomicNumber === 73) return { row: 6, col: 5 }; // Ta
    if (atomicNumber === 74) return { row: 6, col: 6 }; // W
    if (atomicNumber === 75) return { row: 6, col: 7 }; // Re
    if (atomicNumber === 76) return { row: 6, col: 8 }; // Os
    if (atomicNumber === 77) return { row: 6, col: 9 }; // Ir
    if (atomicNumber === 78) return { row: 6, col: 10 }; // Pt
    if (atomicNumber === 79) return { row: 6, col: 11 }; // Au
    if (atomicNumber === 80) return { row: 6, col: 12 }; // Hg
    if (atomicNumber === 81) return { row: 6, col: 13 }; // Tl
    if (atomicNumber === 82) return { row: 6, col: 14 }; // Pb
    if (atomicNumber === 83) return { row: 6, col: 15 }; // Bi
    if (atomicNumber === 84) return { row: 6, col: 16 }; // Po
    if (atomicNumber === 85) return { row: 6, col: 17 }; // At
    if (atomicNumber === 86) return { row: 6, col: 18 }; // Rn
    
    // Row 7 (Period 7)
    if (atomicNumber === 87) return { row: 7, col: 1 }; // Fr
    if (atomicNumber === 88) return { row: 7, col: 2 }; // Ra
    if (atomicNumber === 89) return { row: 7, col: 3 }; // Ac
    if (atomicNumber === 104) return { row: 7, col: 4 }; // Rf
    if (atomicNumber === 105) return { row: 7, col: 5 }; // Db
    if (atomicNumber === 106) return { row: 7, col: 6 }; // Sg
    if (atomicNumber === 107) return { row: 7, col: 7 }; // Bh
    if (atomicNumber === 108) return { row: 7, col: 8 }; // Hs
    if (atomicNumber === 109) return { row: 7, col: 9 }; // Mt
    if (atomicNumber === 110) return { row: 7, col: 10 }; // Ds
    if (atomicNumber === 111) return { row: 7, col: 11 }; // Rg
    if (atomicNumber === 112) return { row: 7, col: 12 }; // Cn
    if (atomicNumber === 113) return { row: 7, col: 13 }; // Nh
    if (atomicNumber === 114) return { row: 7, col: 14 }; // Fl
    if (atomicNumber === 115) return { row: 7, col: 15 }; // Mc
    if (atomicNumber === 116) return { row: 7, col: 16 }; // Lv
    if (atomicNumber === 117) return { row: 7, col: 17 }; // Ts
    if (atomicNumber === 118) return { row: 7, col: 18 }; // Og
    
    // Default fallback
    return { row: 1, col: 1 };
  };

  const categories = [
    { name: "Alkali Metal", color: "#ff6b6b" },
    { name: "Alkaline Earth Metal", color: "#ffd93d" },
    { name: "Transition Metal", color: "#4fd1c5" },
    { name: "Post-transition Metal", color: "#63b3ed" },
    { name: "Metalloid", color: "#9f7aea" },
    { name: "Nonmetal", color: "#48bb78" },
    { name: "Halogen", color: "#38b2ac" },
    { name: "Noble Gas", color: "#667eea" },
    { name: "Lanthanide", color: "#ed64a6" },
    { name: "Actinide", color: "#f687b3" }
  ];

  return (
    <div className="app" style={{ 
      backgroundImage: `linear-gradient(145deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85)), url(${cosmosBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <h1 className="title">Interactive Periodic Table</h1>
      
      <div className="periodic-table-container">
        <div className="periodic-table">
          {mainElements.map(element => {
            const position = getGridPosition(element);
            return (
              <div
                key={element.atomicNumber}
                className="element-wrapper"
                style={{
                  gridRow: position.row,
                  gridColumn: position.col
                }}
              >
                <ElementCard
                  element={element}
                  onClick={() => handleElementClick(element)}
                />
              </div>
            );
          })}
        </div>

        {/* Lanthanides row */}
        <div className="lanthanides-row">
          <div className="series-label">Lanthanides<br/>(Ce-Lu)</div>
          {lanthanides.map((element, index) => (
            <ElementCard
              key={element.atomicNumber}
              element={element}
              onClick={() => handleElementClick(element)}
            />
          ))}
        </div>

        {/* Actinides row */}
        <div className="actinides-row">
          <div className="series-label">Actinides<br/>(Th-Lr)</div>
          {actinides.map((element, index) => (
            <ElementCard
              key={element.atomicNumber}
              element={element}
              onClick={() => handleElementClick(element)}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="periodic-table-legend">
          {categories.map(category => (
            <div key={category.name} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: category.color }}
              />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedElement && (
        <Modal
          element={selectedElement}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;

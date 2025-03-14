import React, { useState } from 'react';
import { periodicTableData } from './periodicTableData';
import ElementCard from './ElementCard';
import Modal from './Modal';
import './styles.css';

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
    !(element.atomicNumber >= 57 && element.atomicNumber <= 71) &&
    !(element.atomicNumber >= 89 && element.atomicNumber <= 103)
  );

  const lanthanides = periodicTableData.filter(element => 
    element.atomicNumber >= 57 && element.atomicNumber <= 71
  );
  
  const actinides = periodicTableData.filter(element => 
    element.atomicNumber >= 89 && element.atomicNumber <= 103
  );

  // Calculate grid position for each element
  const getGridPosition = (element) => {
    // Special cases for H and He
    if (element.atomicNumber === 1) return { row: 1, col: 1 };
    if (element.atomicNumber === 2) return { row: 1, col: 18 };

    // Handle Li and Be
    if (element.atomicNumber === 3) return { row: 2, col: 1 };
    if (element.atomicNumber === 4) return { row: 2, col: 2 };

    // Handle B through Ne
    if (element.atomicNumber >= 5 && element.atomicNumber <= 10) {
      return { row: 2, col: element.atomicNumber + 8 };
    }

    // For other elements, use their period and group
    return {
      row: element.period,
      col: element.group
    };
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
    <div className="app">
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

          {/* Lanthanides placeholder */}
          <div className="element-wrapper lanthanide-placeholder" style={{ gridRow: 6, gridColumn: 3 }}>
            <div className="element-card" data-category="lanthanide">
              <span className="atomic-number">57-71</span>
              <span className="symbol">La-Lu</span>
              <span className="name">Lanthanides</span>
            </div>
          </div>

          {/* Actinides placeholder */}
          <div className="element-wrapper actinide-placeholder" style={{ gridRow: 7, gridColumn: 3 }}>
            <div className="element-card" data-category="actinide">
              <span className="atomic-number">89-103</span>
              <span className="symbol">Ac-Lr</span>
              <span className="name">Actinides</span>
            </div>
          </div>
        </div>

        {/* Lanthanides row */}
        <div className="lanthanides-row">
          <div className="series-label">Lanthanides</div>
          {lanthanides.map(element => (
            <ElementCard
              key={element.atomicNumber}
              element={element}
              onClick={() => handleElementClick(element)}
            />
          ))}
        </div>

        {/* Actinides row */}
        <div className="actinides-row">
          <div className="series-label">Actinides</div>
          {actinides.map(element => (
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

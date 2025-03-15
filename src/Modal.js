import React, { useState, useEffect } from 'react';
import ElectronVisualizer from './ElectronVisualizer';

const Modal = ({ element, onClose }) => {
  const [showVisualizer, setShowVisualizer] = useState(false);

  useEffect(() => {
    // Lock scroll when modal opens
    document.body.classList.add('modal-open');
    
    // Cleanup: Remove scroll lock when modal closes
    return () => {
      if (!showVisualizer) {  // Only remove if visualizer is not open
        document.body.classList.remove('modal-open');
      }
    };
  }, [showVisualizer]);

  // Handle visualizer toggle
  const handleVisualizerToggle = (show) => {
    setShowVisualizer(show);
  };

  // Handle main modal close
  const handleClose = () => {
    document.body.classList.remove('modal-open');
    onClose();
  };

  if (!element) return null;

  const getStateIcon = (state) => {
    if (!state) return '•';
    switch (state.toLowerCase()) {
      case 'gas': return '💨';
      case 'solid': return '⬢';
      case 'liquid': return '💧';
      default: return '•';
    }
  };

  const getYearDisplay = (year) => {
    if (!year) return '🔍 Unknown';
    return year === "Ancient" ? "⌛ Ancient" : `🔬 ${year}`;
  };

  const formatAtomicMass = (mass) => {
    if (!mass) return 'Unknown';
    return typeof mass === 'number' ? mass.toFixed(4) : mass;
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal cosmic-theme" onClick={e => e.stopPropagation()}>
          <div className="element-header">
            <span className="atomic-number">#{element.atomicNumber}</span>
            <h2>{element.name}</h2>
            <div className="symbol-container">
              <span className="symbol">{element.symbol}</span>
              <span className="mass">⚖️ {formatAtomicMass(element.atomicMass)} u</span>
            </div>
          </div>

          <div className="element-details">
            <div className="info-grid">
              <div className="info-card">
                <h4>⚛️ Physical Properties</h4>
                <p><span>State:</span> {getStateIcon(element.standardState)} {element.standardState || 'Unknown'}</p>
                <p><span>Density:</span> 🎯 {element.density ? `${element.density} g/cm³` : 'Unknown'}</p>
              </div>
              
              <div className="info-card">
                <h4>⚡ Electronic Properties</h4>
                {element.electronicConfiguration && (
                  <p>
                    <span>Configuration:</span>
                    <div className="electronic-config">
                      <span>Full: {element.fullElectronicConfiguration}</span><br />
                      <span>Compact: {element.electronicConfiguration}</span>
                    </div>
                  </p>
                )}
                {element.oxidationStates && element.oxidationStates.length > 0 && (
                  <p>
                    <span>Oxidation States:</span>
                    <div className="oxidation-states">
                      {element.oxidationStates.map((state, i) => (
                        <span key={i} className={`oxidation-state ${state >= 0 ? 'positive' : 'negative'}`}>
                          {state > 0 ? `+${state}` : state}
                        </span>
                      ))}
                    </div>
                  </p>
                )}
              </div>

              <div className="info-card">
                <h4>📚 Classification</h4>
                <p><span>Group:</span> 🔷 {element.groupBlock || 'Unknown'}</p>
                <p><span>Discovered:</span> {getYearDisplay(element.yearDiscovered)}</p>
              </div>
            </div>

            {element.electronicConfiguration && (
              <button 
                className="visualizer-button"
                onClick={() => handleVisualizerToggle(true)}
              >
                View Electron Configuration
              </button>
            )}
          </div>

          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>

      {/* Electron Visualizer Modal */}
      {showVisualizer && (
        <div className="visualizer-overlay">
          <div className="visualizer-container">
            <div className="visualizer-header">
              <h3>{element.name} Electron Configuration</h3>
              <button className="close-button" onClick={() => handleVisualizerToggle(false)}>
                ×
              </button>
            </div>
            <div className="visualizer-content">
              <ElectronVisualizer electronConfiguration={element.fullElectronicConfiguration} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

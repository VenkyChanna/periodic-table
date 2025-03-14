import React from 'react';

const ElementCard = ({ element, onClick }) => {
  const getCategoryClass = (element) => {
    const category = element.groupBlock?.toLowerCase().replace(/\s+/g, '-');
    return category || 'unknown';
  };

  return (
    <div
      className="element-card"
      data-category={getCategoryClass(element)}
      onClick={onClick}
    >
      <span className="atomic-number">{element.atomicNumber}</span>
      <span className="symbol">{element.symbol}</span>
      <span className="name">{element.name}</span>
    </div>
  );
};

export default ElementCard;

import React from "react";
import "./scroll-indicator.scss";

interface ScrollIndicatorProps {
  text?: string; 
}

const ScrollDownIndicator: React.FC<ScrollIndicatorProps> = ({ 
  text = "role para saber mais" 
}) => (
  <div className="scroll-indicator">
    <span className="scroll-text">{text}</span>
    <span className="arrow">↓</span>
  </div>
);

export default ScrollDownIndicator;
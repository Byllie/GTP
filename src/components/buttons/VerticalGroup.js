import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './VeticalGroup.css'; // Le CSS custom

const modes = [
  {
    label: "Protocoles",
    description: "Trouvez le protocole réseau",
    icon: "❓",
    path: "/protocoles",
  },
  {
    label: "Articles",
    description: "Retrouvez l'auteur de l'article",
    icon: "💬",
    path: "/articles",
  },
];

export default function GroupOrientation() {
  const navigate = useNavigate();

  return (
    <div className="vertical-group-container">
      {modes.map((mode, index) => (
        <div
          key={index}
          className="custom-button"
          onClick={() => navigate(mode.path)}
        >
          <div className="custom-button-icon">{mode.icon}</div>
          <div className="custom-button-text">
            <span className="custom-button-title">{mode.label}</span>
            <span className="custom-button-description">{mode.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

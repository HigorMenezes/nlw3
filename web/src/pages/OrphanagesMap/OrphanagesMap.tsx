import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import MapMarker from "../../assets/map-marker.svg";

import "./styles.css";

function OrphanagesMap(): React.ReactElement {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={MapMarker} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Florianópolis</strong>
          <span>Santa Cataria</span>
        </footer>
      </aside>
      <div>MAP</div>
      <Link to="/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;

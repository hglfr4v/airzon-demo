import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const highlightedCountries = {
  france: "#ffcc00",
  germany: "#4682e9",
  italy: "#00b894",
};
const WorldMap = ({ onCountrySelect }) => {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <>
      <Tooltip id="map-tooltip" />
      <div className="map-card">
        <div>
          <ComposableMap
            data-tip=""
            projectionConfig={{ scale: 140 }}
            width={800}
            height={400}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.NAME;
                  const countryKey = countryName?.toLowerCase();
                  const fillColor = highlightedCountries[countryKey] || "#f0f4fa";

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      data-tooltip-id="map-tooltip"
                      data-tooltip-content={countryName}
                      onClick={() => onCountrySelect(countryName)}
                      style={{
                        default: {
                          fill: fillColor,
                          stroke: "#dcdcdc",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "#4682e9",
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#003366",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </>
  );
};

export default WorldMap;
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const position = [40.7041, -74.1279];

const CustomMap = () => {
  const markers = [
    {
      geocode: [40.7128, -74.006], // New York City
      toolTip:
        "Head Office <br />123 Main Street, New York City, <br />New York, USA",
    },
    {
      geocode: [40.6639, -74.2107], // Elizabeth
      toolTip:
        "Elizabeth Branch <br />456 Elm Street, Elizabeth,<br />New Jersey, USA",
    },
    {
      geocode: [40.7357, -74.1724], // Newark
      toolTip:
        "Newark Branch <br />789 Oak Avenue, Newark, <br />New Jersey, USA",
    },
  ];
  return (
    <MapContainer center={position} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {markers.map((marker) => (
          <Marker key={marker.geocode} position={marker.geocode}>
            <Tooltip direction="top" sticky>
              <div dangerouslySetInnerHTML={{ __html: marker.toolTip }} />
            </Tooltip>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default CustomMap;

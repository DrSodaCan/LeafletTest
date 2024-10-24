import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import './App.css';

// Leaflet marker icon fix (since the default marker icon might not load properly)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const App = () => {
    const [waypoints, setWaypoints] = useState([
        {
            id: 1,
            name: "Waypoint 1",
            coords: [32.8328, -117.2],
            description: "Learn more about this location on Wikipedia: " +
                "<a href='https://www.google.com/maps/?q=San%20Diego%2C%20California%2C%20United%20States' target='_blank'>San Diego</a>"
        },
        {
            id: 2,
            name: "Waypoint 2",
            coords: [51.515, -0.1],
            description: "Visit the official website: " +
                "<a href='https://www.visitlondon.com' target='_blank'>Visit London</a>"
        },
        {
            id: 3,
            name: "Waypoint 3",
            coords: [51.52, -0.12],
            description: "Check the history of this place: " +
                "<a href='https://www.google.com/maps/?q=San%20Diego%2C%20California%2C%20United%20States' target='_blank'>History of La Jolla</a>"
        },
    ]);

    const addWaypoint = () => {
        const newId = waypoints.length + 1;
        const newWaypoint = {
            id: newId,
            name: `Waypoint ${newId}`,
            coords: [
                32.8328 + Math.random() * 0.1, // generate a random position for demo purposes
                -117.01 - Math.random() * 0.1,
            ],
            description: "New waypoint with info at " +
                `<a href='https://example.com' target='_blank'>Example Link</a>`,
        };
        setWaypoints([...waypoints, newWaypoint]);
    };

    const removeWaypoint = (id) => {
        setWaypoints(waypoints.filter((wp) => wp.id !== id));
    };

    return (
        <div className="App">
            <header>
                <h1>React Leaflet Map with Waypoints</h1>
            </header>

            <div className="content">
                <p>
                    Welcome to the example of a React site with a Leaflet map. Below, you can see some paragraphs of content
                    and a dynamic map with waypoints that can be easily added and removed.
                </p>
                <p>
                    This page demonstrates a simple integration of React-Leaflet, showing a map with some waypoints. You can
                    dynamically add and remove waypoints by interacting with the buttons.
                </p>
            </div>

            <div className="map-container">
                <MapContainer center={[32.8328, -117.2]} zoom={13} style={{ height: "400px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {waypoints.map((wp) => (
                        <Marker key={wp.id} position={wp.coords}>
                            <Popup>
                                <div>
                                    <strong>{wp.name}</strong>
                                    <br />
                                    <span dangerouslySetInnerHTML={{ __html: wp.description }}></span>
                                    <br />
                                    <button onClick={() => removeWaypoint(wp.id)}>Remove</button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div className="controls">
                <button onClick={addWaypoint}>Add Waypoint</button>
            </div>
        </div>
    );
};

export default App;

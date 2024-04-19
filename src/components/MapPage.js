import { useEffect, useState } from 'react';
import MapComponent from './MapComponent'; // Import the 'MapComponent' component

const fetchPoints = async () => {
    const response = await fetch('http://localhost:8000/api/interest-points');
    if (!response.ok) {
        throw new Error('Failed to fetch points');
    }
    const data = await response.json();
    return data;
};

const MapPage = () => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        fetchPoints().then(setPoints);
    }, []);

    return <MapComponent points={points} />;
};

export default MapPage;

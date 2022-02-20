/* import axios from 'axios';
import React, { useState, useEffect } from 'react';



function GetLaunch() {
    const [totalReactPackages, setTotalReactPackages] = useState(null);

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:3000/api/v1/launchDate/')
            .then(response => totalReactPackages = setTotalReactPackages(response.data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <div className="card text-center m-3">
            <h5 className="card-header">GET Request with React Hooks</h5>
            <div className="card-body">
                Total react packages: {totalReactPackages[0].name}
            </div>
        </div>
    );
}

export default GetLaunch;

 */
import React, { useState } from 'react'
import Info from './Components/Info/Info'
import Map from './Components/Map'
import Summary from './Components/Summary';

export default function App() {

    const [selectedCountry, setSelectedCountry] = useState('Iran')

    function handleSelectCountry(name) {
        setSelectedCountry(name)
    }

    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col col-md-9">
                        <Map handleSelectCountry={handleSelectCountry} />
                    </div>
                    <div className="col-12 col-md-3">
                        <Info />
                    </div>
                </div>
                <div className="row mt-3">
                    <Summary />
                </div>
            </div>
        </>
    )
}

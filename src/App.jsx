import React, { useState, useEffect } from 'react'
import wiki from 'wikijs';
import Loading from './Components/Loading';
import Info from './Components/Info/Info'
import Map from './Components/Map'
import Summary from './Components/Summary';

export default function App() {

    const [selectedCountry, setSelectedCountry] = useState('Iran')
    const [summary, setSummary] = useState(null)
    const [info, setInfo] = useState(null)
    const [flag, setFlag] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const page = await wiki().page(selectedCountry)

            const [summary, info, images] = await Promise.all([
                page.summary(),
                page.info(),
                page.images()
            ])

            const flag = info.imageFlag.replace(/\s/g, '_')
            images.some(image => {
                if (image.includes(flag)) {
                    setFlag(image)
                    return true
                }
                return false
            })

            setSummary(summary)
            setInfo(info)
            setLoading(false)
        }

        fetchData()
    }, [selectedCountry])

    function handleSelectCountry(name) {
        setSelectedCountry(name)
        setLoading(true)
    }

    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col col-md-9">
                        <Map handleSelectCountry={handleSelectCountry} />
                    </div>
                    <div className="col-12 col-md-3">
                        {loading ? <Loading /> : <Info info={info} flag={flag} />}
                    </div>
                </div>
                <div className="row mt-3">
                    {loading ? <Loading /> : <Summary summary={summary} />}
                </div>
            </div>
        </>
    )
}

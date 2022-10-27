import React from 'react'
import './BikeList.css'

const BikeList = ({ bikeData, loading }) => {



    if (loading) {
        <h1>Loading....</h1>
    }

    return (
        <div className='list'>
            <article className="bikelist">
                {bikeData.map(bcase => (
                    <div key={bcase.id} className="bikecase">
                        <h2>{bcase.title}</h2>
                        <p>{bcase.body}</p>
                        <p><b>Date of Theft:</b> {bcase.dateoftheft}</p>
                        <p><b>Date of Report:</b> {bcase.dateofReport}</p>
                        <p><span className='location'><b>Location:</b>{bcase.location}</span>
                            <span className='bikeCaseId'>{bcase.id}</span>
                        </p>
                    </div>
                ))}
            </article>
        </div>
    )
}

export default BikeList
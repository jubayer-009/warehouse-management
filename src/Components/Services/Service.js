import React from 'react';

const Service = ({service}) => {
  const {name,picture,about}=service;
  return (
    <div>
      
        <figure>
          <img src={picture} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}!</h2>
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">More</button>
         
        </div>
      </div>
    </div>
  );
};

export default Service;
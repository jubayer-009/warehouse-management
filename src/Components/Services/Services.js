import React, { useEffect, useState } from 'react';
import Service from './Service';

const Services = () => {
  const [services,setServices]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  },[]);
  console.log(services);
  return (
    <div className=" my-9 mx-9">
      <h1 className="text-5xl font-bold text-center ">Our Services</h1>
      <div className="divider"></div>
      <div className="card lg:card-side bg-base-100 shadow-xl grid grid-cols-4 gap-4  ">
        {services.map((service) => (
          <Service service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
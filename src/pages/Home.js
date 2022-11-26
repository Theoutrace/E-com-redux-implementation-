import './Home.css'

import React from "react";
import SingleItem from "../components/SingleItem";

const dummyData = [
  {
    id: "a1",
    name: "Shirt",
    price: 2500,
  },
  {
    id: "a2",
    name: "Trousers",
    price: 1500,
  },
  {
    id: "a3",
    name: "Belt",
    price: 1000,
  },
  {
    id: "a4",
    name: "Jacket",
    price: 5590,
  },
  {
    id: "a5",
    name: "Pen",
    price: 100,
  },
  {
    id: "a6",
    name: "Copy",
    price: 55,
  },
];

const Home = () => {
  return (
    <div className="home-component-cntnr">
    {dummyData.map(data=>{
        return <SingleItem key={data.id} item={data}/>
    })}
    </div>
  );
};

export default Home;

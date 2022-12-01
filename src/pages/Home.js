import "./Home.css";
import head from './images/headphone.jpg'
import mob from './images/mobile.jpg'
import shir from './images/shirt.jpg'
import sho from './images/shoes.jpg'
import trou from './images/trousers.jpg'
import watc from './images/watch.jpg'



import React from "react";
import SingleItem from "../components/SingleItem";

const dummyData = [
  {
    id: "a1",
    name: "headphones",
    price: 2000,
    src: head,
  },
  {
    id: "a2",
    name: "Trousers",
    price: 1500,
    src: trou,
  },
  {
    id: "a3",
    name: "Mobile",
    price: 50995,
    src: mob
  },
  {
    id: "a4",
    name: "Shirt",
    price: 2595,
    src: shir
  },
  {
    id: "a5",
    name: "Shoes",
    price: 3500,
    src: sho
  },
  {
    id: "a6",
    name: "Watch",
    price: 35000,
    src: watc
  },
];

const Home = () => {
  return (
    <>
      <div className="home-component-cntnr">
        {dummyData.map((data) => {
          return <SingleItem key={data.id} item={data} />;
        })}
      </div>
    </>
  );
};

export default Home;

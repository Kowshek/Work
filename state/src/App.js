import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

// function FavColor(){
//   const [color, setColor] = useState("red");

//   return (

//     <>
//     <h1>My fav color is {color}</h1>
//     <button 
//       type="button"
//       onClick={ () => setColor("blue")}>
//     Blue </button>
//     <button
//       type="button"
//       onClick={ () => setColor("Green")}>
//     Green</button>
//     <button
//       type="button"
//       onClick={ () => setColor("red") }>
//     Red</button>
//     </>

//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<FavColor />);

// export default FavColor;


// --------------------------------------------------

function Car() {
  const [car, setCar] = useState({
   brand: "Ford",
   model: "Mustang",
   year: "1967",
   color: "Black" 
  });

  const updateColor = () => {
    setCar(previousState => {
      return {...previousState, color:"Yellow", year:"1967"}
    })
  }

  const RevertColor = () => {
    setCar(previousState =>{
      return {...previousState, color:"Black" , year: "1966"}
    })
  }

  return (

    <> 
    <h1>My {car.brand}</h1>
    <p>- is a {car.color} {car.model} from {car.year}. </p>

    <button
      type="button"
      onClick={updateColor}>
    Yellow</button>

    <button
      type="button"
      onClick={RevertColor}>
    Revert</button>
    </>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);

export default Car; 
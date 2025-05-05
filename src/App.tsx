import { useEffect, useState } from "react";
import './App.css';
import logoImg from './assets/logo.png';
import { BsSearch } from 'react-icons/bs'

export default function App(){
  const [morty, setMorty] = useState([]);
  const [load, setLoad] = useState(true);
  const [input, setInput] = useState('');

  const List = async()=>{
    try{
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setMorty(data.results);
      setLoad(false);
    }catch(error){
      console.error('Something went wrong', error);
      setLoad(false);
    }
  }

  useEffect(()=>{
    List()
  },[])

  const filteredMorty = morty.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );

  if(load){
    return <h1>Carregando...</h1>
  }

  return(
    <>
    <header>
      <img src={logoImg} alt="logo" width={300}/>
      <br />
      <input 
        type="text" 
        placeholder="Type your character"
        value={input} 
        onChange={(e)=>setInput(e.target.value)}
        /><BsSearch/>
        </header>

      <div className="itens">
        {filteredMorty.map((item)=> {
          let live
          let gender

          if(item.status === 'Alive'){
            live = <h3>Status: <span className="alive">{item.status}</span></h3>
          } else if(item.status === 'Dead'){
            live = <h3>Status: <span className="dead">{item.status}</span></h3>
          } else {
            live = <h3>Status: <span className="unknown">{item.status}</span></h3>
          }

          if(item.gender === 'Male'){
            gender = <h5>Gender: <span className="male">{item.gender}</span></h5>
          } else if(item.gender === 'Female'){
            gender = <h5>Gender: <span className="female">{item.gender}</span></h5>
          } else {
            gender = <h5>Gender: <span className="other">{item.gender}</span></h5>
          }

          return(
            <div key={item.id} className="divRender">
              <img src={item.image} alt={item.name} className="photo"/>
              <div className="separate">
                <div className="name-status">
                  <h3>{item.name}</h3>
                  {live}
                </div>
                <div className="content">
                  {gender}
                  {item.species === 'Human' 
                    ? <h5>Species: <span className="human">{item.species}</span></h5>
                    : <h5>Species: <span className="et">{item.species}</span></h5>}
                  <h5>Origin: <span className="origin">{item.origin.name}</span></h5>
                  <h5>Location: <span className="location">{item.location.name}</span></h5>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

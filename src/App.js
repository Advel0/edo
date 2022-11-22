import logo from './logo.svg';
import './App.css';
import {Link, useEffect} from 'react';
import {useState} from 'react';
import { ethers } from "ethers";


function App() {
  
  const [identityComponents, setIdentityComponents] = useState([])
  const [identityInterface, setIdentityInterface] = useState([ <MyButton key='connect-button' id='connect-button' button_text='Connect' func={connect} />])
  const [connected, setConnected] = useState(false)
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  
  useEffect(()=>{
    if (connected) {
      let components = identityComponents.map(component=>{
        return <IdentityComponent component_type={component.type} component_content={component.content} key={component.type}/>
      })
    setIdentityInterface(components)
    }
  }, [connected])

  async function connect(){
    // {'type' :'accounts', 'content' : []}
    // let list = [
    //   {
    //     'type' : 'address',
    //     'content' : '0x68b3c4c90AD57B48479F1358DeB3949A61F58a94'
    //   }
    // ]

    const accounts = await provider.send('eth_requestAccounts', []);
    identityComponents.push({'type': 'accounts', 'content': accounts});


    // let components = list.map(component=>{
    //   return <IdentityComponent component_type={component.type} component_content={component.content} key={component.type}/>
    // })
    
    if (!connected){
      setConnected(true)
    }

    setIdentityInterface([])

  }

  return (
    <div className=' container flex flex-row pt-6 pb-6' id='page-content'>
      <div className='basis-3/4'>
        <Menu/>
      </div>
      <Identity elements={identityInterface}/>
    </div>
  );
}

function Identity({elements}){
  return(
    <div className='container basis-1/4 mr-6 flex flex-row justify-around' id='identity-holder'>
      <div className='flex flex-col w-4/5' >
        {
          elements.map(element =>{
            return element
          })
        }
      </div>
    </div>
  )
}

function Menu(){
  return(
    <div className='menu container flex flex-row mx-auto pt-3 pb-3'>
      <div className='menu-button ml-3'>
        <a href='/home'>HOME</a>
      </div>
      <div className='menu-button'>
        <a href='/voting-creation'>CREATE A VOTING</a>
      </div>
      
    </div>
  )
}

function MyButton(props){
  return(
    <button id={props.id} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={props.func}>
      {props.button_text}
    </button>
  )
}

function IdentityComponent(props){
  return(
    <span className='container identity-component'>
      {props.component_type} | {props.component_content}
    </span>
  )
}

export default App;

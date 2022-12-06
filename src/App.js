import logo from './logo.svg';
import './App.css';
import {Link, useEffect} from 'react';
import {useState} from 'react';
import { ethers } from "ethers";


function App() {
  
  const [identityComponents, setIdentityComponents] = useState([])
  const [identityInterface, setIdentityInterface] = useState([ <MyButton key='connect-button' id='connect-button' button_text='Connect' func={connect} />])
  const [connected, setConnected] = useState(false)
  const erc1056Address = '0xD93aF3268fF20ef855F0891B78e93F959EF846f8'
  const erc1056ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "name",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "value",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "validTo",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "previousChange",
				"type": "uint256"
			}
		],
		"name": "DIDAttributeChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "delegateType",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "validTo",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "previousChange",
				"type": "uint256"
			}
		],
		"name": "DIDDelegateChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "previousChange",
				"type": "uint256"
			}
		],
		"name": "DIDOwnerChanged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "delegateType",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "validity",
				"type": "uint256"
			}
		],
		"name": "addDelegate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "sigV",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "sigR",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "sigS",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "delegateType",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "validity",
				"type": "uint256"
			}
		],
		"name": "addDelegateSigned",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "sigV",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "sigR",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "sigS",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "changeOwnerSigned",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "changed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "delegates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "identity",
				"type": "address"
			}
		],
		"name": "identityOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "nonce",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "owners",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "name",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "value",
				"type": "bytes"
			}
		],
		"name": "revokeAttribute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "sigV",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "sigR",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "sigS",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "name",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "value",
				"type": "bytes"
			}
		],
		"name": "revokeAttributeSigned",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "delegateType",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			}
		],
		"name": "revokeDelegate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "sigV",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "sigR",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "sigS",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "delegateType",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			}
		],
		"name": "revokeDelegateSigned",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "name",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "value",
				"type": "bytes"
			},
			{
				"internalType": "uint256",
				"name": "validity",
				"type": "uint256"
			}
		],
		"name": "setAttribute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "sigV",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "sigR",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "sigS",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "name",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "value",
				"type": "bytes"
			},
			{
				"internalType": "uint256",
				"name": "validity",
				"type": "uint256"
			}
		],
		"name": "setAttributeSigned",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "identity",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "delegateType",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			}
		],
		"name": "validDelegate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const erc1056 = new ethers.Contract(erc1056Address, erc1056ABI, provider)



  useEffect(()=>{
    if (connected) {
      let components = identityComponents.map( (component, index)=>{
        return <IdentityComponent component_type={component.type} component_content={component.content} key={index}/>
      })
    setIdentityInterface(components)
    }
  }, [connected])

  async function connect(){


    const accounts = await provider.send('eth_requestAccounts', []);
    identityComponents.push({'type': 'account', 'content': accounts});


	const filter = erc1056.filters.DIDOwnerChanged(null,accounts[0])

	const identities = []


	const lastBlock = await provider.getBlockNumber()

	for(let i = 36317792; i < lastBlock; i+=10000){
		console.log(i)
		console.log(i+10000)

		const changedOwnerships = await erc1056.queryFilter(filter,	i, i+10000)
		changedOwnerships.forEach( ownership => identities.push(ownership.args.identity.toLowerCase()))
		
	}

	identities.forEach(identity =>
		identityComponents.push({'type': 'identity', 'content': identity})
		)


	if ((! identities.includes(accounts[0])) && ((await erc1056.identityOwner(accounts[0])).toLowerCase()==accounts[0])){
		identityComponents.push({'type': 'identity', 'content': accounts[0]})
		}

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

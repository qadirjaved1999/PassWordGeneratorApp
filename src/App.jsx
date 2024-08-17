import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  // UseState Hook
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // useRef Hook
  const passwordReference = useRef(null);
  // useCallback Hook Concept(Use For Memoization and Optimization of the Code)
  const passWordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // Advanced
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_=+[]{}`~";

    // Old Method
    // if(numberAllowed){
    //   str += "0123456789";
    //   str = str + "0123456789"
    // }
    // if(charAllowed){
    //   str += "!@#$%^&*-_=+[]{}`~";
    //   str = str + "!@#$%^&*-_=+[]{}`~";
    // }

    for (let i = 1; i <= length; i++) {
      console.log("==================>",i)
      let charIndex = Math.floor(Math.random() * str.length + 1);
      console.log("=====>>>>>>> char", charIndex);

      pass += str.charAt(charIndex);
      console.log("===========>>>>> pass",pass)
      
    }
    
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])
  // This Function For Copy the Input Text
  const copyPasswordFun = useCallback(() => {
    passwordReference.current?.select();
    passwordReference.current?.setSelectionRange(0, 101);
   window.navigator.clipboard.writeText(password)
  }, [password])

  
   useEffect(()=>{
    passWordGenerator();
   },[length, numberAllowed, charAllowed, passWordGenerator])

  return (
    <>
    <div className="container w-full h-screen flex justify-center items-center">
    <div className='w-full max-w-5xl max-auto shadow-md rounded-lg px-10 py-10 text-orange-500 bg-gray-700'>
     <h3 className='text-4xl text-center text-white pb-10'>Password Generator App</h3>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordReference}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordFun}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
            <label>Lenght: {length}</label>
          </div> 
          <div className="flex items-center gap-x-1">
            <input type="checkbox" id="numberInput" defaultChecked={numberAllowed} onChange={(e) => {setNumberAllowed((prev) => !prev)}}/>
            <label htmlFor="numberInput">Numbers</label>
          </div>
           <div className="flex items-center gap-x-1">
            <input type="checkbox" id="characterInput" defaultChecked={charAllowed} onChange={(e) => {setCharAllowed((prev) => !prev)}}/>
            <label htmlFor="characterInput">Characters</label>
           </div>
        </div>
      </div>
    </div>
     
    </>
  )
}

export default App

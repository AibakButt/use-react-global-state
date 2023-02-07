import React, { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext({});

let cache = {}
let previousCachedValue = {}

export const GlobalStateProvider = ({ children }: any) => {
  const [globalState, setGlobalState] = useState({});

  const updateGlobalState = (state: any) => {
    setTimeout(() => {
      setGlobalState(state)
    }, 0) 
  };

  return (
    <GlobalStateContext.Provider
      value={{ globalState, updateGlobalState }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};


export function useGlobalState (key: string, initialValue: any) {

  const {globalState, updateGlobalState} = useContext<any>(GlobalStateContext)

  //Validations
  if(key === undefined) throw new Error("Key param is required")
  if(initialValue === undefined) throw new Error(`Initial Value is required for key '${key}'`)
  if(cache[key]){
    if((typeof cache[key] === 'number' || typeof cache[key] === 'string') && cache[key] !== initialValue){
      throw new Error(`Initial value should be same for key: ${key}`)
    }
    if(typeof cache[key] === "object" && JSON.stringify(initialValue) !== JSON.stringify(cache[key])){
      throw new Error(`Initial value should be same for key '${key}' \nPrevious value: ${JSON.stringify(cache[key])} \nCurrent value: ${JSON.stringify(initialValue)}`)
    }
  } 

  function setter (value: any) {
    let tempGlobalState = globalState[key] ? JSON.parse(JSON.stringify(globalState)) : JSON.parse(JSON.stringify(cache))

    if(typeof value === 'function'){
      let updatedValue = value(previousCachedValue[key])
      tempGlobalState[key] = updatedValue

      //Setting update queue
      previousCachedValue[key] = updatedValue
      
    }else{
      tempGlobalState[key] = value
    }
    
    updateGlobalState(tempGlobalState)
  } 

  if(key in globalState){
    return [globalState[key], setter]
  }
  
  let tempGlobalState = JSON.parse(JSON.stringify(cache))

  tempGlobalState[key] = initialValue
  !cache[key] && updateGlobalState(tempGlobalState)

  cache[key] = cache[key] ? cache[key] : initialValue
  previousCachedValue[key] = cache[key]

  return [cache[key], setter]
}


import './App.css';
import React, {useEffect, useState} from "react"
import axios from "axios";


function App() {
  const [number1, setNumber1]= useState("");
  const [number2, setNumber2]= useState("");
  const [currentOperation, setCurrentOperation]= useState("");
  const [result, setResult]= useState("");
  const [Logs, setLogs] = useState([]);

  function dell(){
    if (currentOperation === "") {
      setNumber1(number1.toString().slice(0, -1));
    } else {
      setNumber2(number2.toString().slice(0, -1));
    }
  }

  function allClear(){
    setNumber1("");
    setNumber2("");
    setCurrentOperation("");
    setResult("");
  }
  
  function clickNumber(val){
    if (currentOperation === ""){
      setNumber1(number1 + val)
    }else{
      setNumber2(number2 + val)
    }
  }

  function clickOperation(val){
    if (result !== ""){
      setNumber1(result)
      setResult("")
      setNumber2("")
    }
    setCurrentOperation(val)
  }

  const getResult =  async () => {
    insertLog();// inserta la operacion actual

    switch(currentOperation){
      case "+":
        setResult(Number(number1) + Number(number2))
        break;
      case "-":
        setResult(Number(number1) - Number(number2))
        break;
      case "*":
        setResult(Number(number1) * Number(number2))
        break;
      case "/":
        setResult(Number(number1) / Number(number2))
        break;
      default:
    }
    setCurrentOperation("");
    
  }
  //------------------------------------------------------------------------------------------------------------------

  const GetLogs = async () => {
    await axios.get('http://localhost:8000/logs')
      .then((response) => {
          console.log(response.data);
          if (response.data !== null){
            setLogs(response.data);
          }
      }); 
  }

  const insertLog = async () =>{
    if (number1 !== "" && number2 !== "" && currentOperation !== ""){
      var hoy = new Date();
      let fecha = hoy.getDate() + '/' + ( hoy.getMonth() + 1 ) + '/' + hoy.getFullYear() +' '+ hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    
      const resp = {
        V1:Number(number1),
        V2:Number(number2),
        Operacion: currentOperation,
        Result: 0,  
        Fecha: fecha
      } 
      await axios.post("http://localhost:8000/calcu", resp).then((response)=>{
        console.log(response.data);
      });
      GetLogs();      
    }
  }
  	
  useEffect(()=>{
    GetLogs();
  },[])

  return (
    <div className="App">
      <div className='header'>Caculator</div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
        <div className='conte'>
          <div className='item'>
            <div className="calculator-grid">
              <div className = "output">
                <div className= "previous-operand">{currentOperation ? number1 + currentOperation: ""}</div>
                <div className= "current-operand">{result ? result: (!currentOperation ? number1 : number2)}</div>
              </div>
              <button onClick={()=> {allClear()}} className="span-two">AC</button>
              <button onClick={()=> {dell()}}>DEL</button>
              <button onClick={()=> {clickOperation("/")}}>/</button>
              <button onClick={()=> {clickNumber(7)}}>7</button>
              <button onClick={()=> {clickNumber(8)}}>8</button>
              <button onClick={()=> {clickNumber(9)}}>9</button>
              <button onClick={()=> {clickOperation("*")}}>*</button>
              <button onClick={()=> {clickNumber(4)}}>4</button>
              <button onClick={()=> {clickNumber(5)}}>5</button>
              <button onClick={()=> {clickNumber(6)}}>6</button>
              <button onClick={()=> {clickOperation("+")}}>+</button>
              <button onClick={()=> {clickNumber(1)}}>1</button>
              <button onClick={()=> {clickNumber(2)}}>2</button>
              <button onClick={()=> {clickNumber(3)}}>3</button>
              <button onClick={()=> {clickOperation("-")}}>-</button>
              <button onClick={()=> {clickNumber(".")}}>.</button>
              <button onClick={()=> {clickNumber(0)}}>0</button>
              <button onClick={getResult} className="span-two">=</button>
            </div>
          </div>
          
          <div className='item'> 
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Numero 1</th>
                  <th scope="col">Numero 2</th>
                  <th scope="col">Operacion</th>
                  <th scope="col">Resultado</th>
                  <th scope="col">Fecha y Hora</th>
                </tr>
              </thead>
              <tbody>
                {Logs.map(item => <tr key={item.codigo} > 
                    <th scope="row">{item.V1}</th>
                    <td>{item.V2}</td>
                    <td>{item.Operacion}</td>
                    <td>{item.Result}</td>
                    <td>{item.Fecha}</td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
    </div>
    
  );
}

export default App;
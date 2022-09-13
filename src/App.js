import { useEffect, useState } from 'react'

const width = 8
const candyColors = [
  'green',
  'orange', 
  'blue',
  'purple', 
  'red',
   'yellow'
]

function App() {
  const [currentColourArrangement, setCurrentColourArrangement] = useState([])

  const checkforColumnOfFour = () =>
  {
    for(let i = 0; i < 39;  i++ )
    {
       const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
       const decidedColour = currentColourArrangement[i]

       if (columnOfFour.every(square => currentColourArrangement[square] === decidedColour))
       {
        columnOfFour.forEach(square => currentColourArrangement[square] = '')
       }
    }
  }

  const checkforColumnOFThree = () =>
  {
    for(let i = 0; i < 47;  i++ )
    {
       const columnOfThree = [i, i + width, i + width * 2]
       const decidedColour = currentColourArrangement[i]

       if (columnOfThree.every(square => currentColourArrangement[square] === decidedColour))
       {
        columnOfThree.forEach(square => currentColourArrangement[square] = '')
       }
    }
  }

  const checkforRowOfThree = () =>
  {
    for(let i = 0; i < 39;  i++ )
    {
       const rowOfThree = [i, i + width, i + width * 2, i + width * 3]
       const decidedColour = currentColourArrangement[i]
       const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 39, 46, 47, 54, 55, 63, 64]

       if(notValid.includes(i)) continue

       if (rowOfThree.every(square => currentColourArrangement[square] === decidedColour))
       {
        rowOfThree.forEach(square => currentColourArrangement[square] = '')
       }
    }
  }

  const checkforRowOfFour = () =>
  {
    for(let i = 0; i < 64;  i++ )
    {
       const rowOfFour = [i, i + 1, i + 2, i +3]
       const decidedColour = currentColourArrangement[i]
       const notValid = [5,6, 7, 14, 13, 15, 21, 22, 23, 29, 30, 31, 37, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

       if (rowOfFour.every(square => currentColourArrangement[square] === decidedColour))
       {
        rowOfFour.forEach(square => currentColourArrangement[square] = '')
       }
    }
  }



  const createBoard =() =>
  {
    const colourArrangement = []
    for(let i= 0; i < width * width; i++ )
   {
    const newColor = candyColors[Math.floor(Math.random()* candyColors.length)]
    colourArrangement.push(newColor)
   }
   setCurrentColourArrangement(colourArrangement)
  }

useEffect(() =>{createBoard()},[])


useEffect(() => 
{
  const timer =  setInterval(() => {
    checkforColumnOfFour()
    checkforRowOfFour()
    checkforRowOfThree()
    checkforColumnOFThree()
    setCurrentColourArrangement([...currentColourArrangement])
  }, 100 )
  return () => clearInterval(timer)
}, [currentColourArrangement, checkforColumnOfFour, checkforRowOfFour, checkforRowOfThree, checkforColumnOFThree])

  return (
    <div className='app'>
      <div className='gameboard'>
        {currentColourArrangement.map((candyColor, index) => (
          <img
          key={index}
          style={{backgroundColor: candyColor}}
          alt={candyColor}
          />
        ))}
      </div>
    </div>
  )
}





// some important notes: I have consciously used a function declration for App() as I want it on the global scope, and const createBoard as an expression to limit where the function is available, keep my global scope light and maintain clean syntax.
export default App

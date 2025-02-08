import React from 'react'
import JSONReader from './components/JSONReader'
import VirtualTable from './components/VirtualTable'

// const sample = {
//   components: [
//     {
//       type: 'div',
//       props: {
//         children: 'Hello, World!',
//       },
//     },
//     {
//       type: 'button',
//       props: {
//         children: 'Click Me',
//         onClick: 'handleClick',
//       },
//     },
//   ],
// }

const App = () => {
  return (
    <div>
      <h1>JSON Reader Test</h1>
      <JSONReader
        jsonFile="https://poetrydb.org/title/Ozymandias/lines.json"/>
        <VirtualTable />
    </div>
  )
}

export default App

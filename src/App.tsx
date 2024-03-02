import InnerEmails from './components/InnerEmails'
import useTextWidth from './hooks/useTextWidth'

function App() {

  const data =  useTextWidth({
    text:"iii",
    font: "51.2px Inter"
  })

  return (
      <InnerEmails/>
  )
}

export default App

import {MantineProvider} from "@mantine/core";
import MainLayout from "./layouts/MainLayout.tsx";


function App() {

  return (
    <>
      <MantineProvider>
         <MainLayout/>
      </MantineProvider>
    </>
  )
}

export default App

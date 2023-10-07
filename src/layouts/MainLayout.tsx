import {Box, Container} from "@mantine/core";
import {Navbar} from "./Navbar.tsx";
import {Outlet} from "react-router-dom";


function MainLayout() {
   return (
      <Container fluid>
         <Navbar/>
         <Box>
            <Outlet/>
         </Box>
      </Container>
   );
}

export default MainLayout;
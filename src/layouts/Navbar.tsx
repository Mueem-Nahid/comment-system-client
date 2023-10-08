import {
   Box,
   Burger,
   Button,
   Center,
   createStyles,
   Divider,
   Drawer,
   Group,
   Header,
   Image,
   Menu,
   rem,
   ScrollArea,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/hook.ts";
import {logOutUser} from "../redux/features/user/userSlice.ts";
import {IconChevronDown} from "@tabler/icons-react";
import Logo from "../assets/images/logo.png";

const useStyles = createStyles((theme) => ({
   link: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontWeight: 700,
      fontSize: theme.fontSizes.sm,

      [theme.fn.smallerThan('sm')]: {
         height: rem(42),
         display: 'flex',
         alignItems: 'center',
         width: '100%',
      },

      ...theme.fn.hover({
         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      }),
   },

   subLink: {
      width: '100%',
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      borderRadius: theme.radius.md,
      textDecoration: 'none',
      ...theme.fn.hover({
         backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      }),

      '&:active': theme.activeStyles,
   },

   dropdownFooter: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      margin: `calc(${theme.spacing.md} * -1)`,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
      paddingBottom: theme.spacing.xl,
      borderTop: `${rem(1)} solid ${
         theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
   },

   hiddenMobile: {
      [theme.fn.smallerThan('sm')]: {
         display: 'none',
      },
   },

   hiddenDesktop: {
      [theme.fn.largerThan('sm')]: {
         display: 'none',
      },
   },
}));

export function Navbar() {
   const dispatch = useAppDispatch()
   const {userInfo} = useAppSelector(state => state.user);
   const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);
   const {classes, theme} = useStyles();

   const handleLogout = () => {
      dispatch(logOutUser())
   }

   return (
      <Box mb='70px'>
         <Header height={70} px="md" fixed>
            <Group position="apart" sx={{height: '100%'}}>
               <Image src={Logo} height={60} width={225} px={2}/>

               <Group sx={{height: '100%'}} spacing={0} className={classes.hiddenMobile}>
                  <Link to='/' className={classes.link}>
                     Thoughts
                  </Link>
               </Group>

               <Group className={classes.hiddenMobile}>
                  {
                     userInfo?.name ?
                        <>
                           <Menu trigger="hover" transitionProps={{exitDuration: 0}} withinPortal>
                              <Menu.Target>
                                 <a className={classes.link}>
                                    <Center inline>
                                       <Box component="span" mr={5}>
                                          {userInfo.name}
                                       </Box>
                                       <IconChevronDown size={16} color={theme.fn.primaryColor()}/>
                                    </Center>
                                 </a>
                              </Menu.Target>

                              <Menu.Dropdown>
                                 <Menu.Item fw='normal'>
                                    <Link to='' onClick={handleLogout} className={classes.subLink}>
                                       Log out
                                    </Link>
                                 </Menu.Item>
                              </Menu.Dropdown>
                           </Menu>
                        </>
                        // <Button variant="default" onClick={handleLogout}>Log out</Button>
                        :
                        <>
                           <Link to='/login'>
                              <Button variant="default">Log in</Button>
                           </Link>
                           <Link to='/signup'>
                              <Button>Sign up</Button>
                           </Link>
                        </>
                  }
               </Group>

               <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop}/>
            </Group>
         </Header>

         <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            size="95%"
            padding="md"
            title="My Thoughts"
            className={classes.hiddenDesktop}
            zIndex={1000000}
         >
            <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
               <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}/>
               <Link to='/' className={classes.link}>
                  Thoughts
               </Link>
               <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}/>
               <Group position="center" grow pb="xl" px="md">
                  {
                     userInfo?.name ?
                        <Button variant="default" onClick={handleLogout}>Log out</Button>
                        :
                        <>
                           <Link to='/login'>
                              <Button variant="default">Log in</Button>
                           </Link>
                           <Link to='/signup'>
                              <Button>Sign up</Button>
                           </Link>
                        </>
                  }
               </Group>
            </ScrollArea>
         </Drawer>
      </Box>
   );
}
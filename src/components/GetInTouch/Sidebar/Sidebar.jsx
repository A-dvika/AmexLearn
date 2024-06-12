import React from 'react';
import { Box, Flex, Link, Tooltip, Button } from "@chakra-ui/react";
import { MdFeed } from "react-icons/md";

import { Link as RouterLink } from "react-router-dom";

import useLogout from "../../../hooks/useLogout";
import SidebarItems from './SidebarItems';

const Sidebar = () => {
    const { handleLogout, isLoggingOut } = useLogout();

    return (
        <Box
            height="100vh"
            borderRight="1px solid"
            borderColor="whiteAlpha.300"
            py={8}
            position="sticky"
            top={0}
            left={0}
            px={{ base: 2, md: 4 }}
            bg="White.500" // Background color changed to blue
        >
            <Flex direction="column" gap={10} w="full" height="full">
                <Link to="/" as={RouterLink} pl={2} cursor="pointer">
                    <MdFeed />
                </Link>
                <Flex direction="column" gap={5} cursor="pointer">
                    <SidebarItems />
                </Flex>
                {/* LOGOUT */}
                  
               
            </Flex>
        </Box>
    );
};

export default Sidebar;













// import React, { useState } from 'react';
// import {
//   Avatar,
//   Box,
//   Button,
//   Flex,
//   Link,
//   Tooltip,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Input,
//   IconButton,
//   Textarea,
//   HStack,
//   VStack,
//   useDisclosure,
//   Text,
// } from "@chakra-ui/react";
// import { CiLink } from "react-icons/ci";
// import { Link as RouterLink } from "react-router-dom";
// import { AiOutlineStock } from "react-icons/ai";
// import { AiFillHome } from 'react-icons/ai';
// import { FaSearch, FaUser, FaImage, FaFileAlt, FaThumbsUp } from "react-icons/fa"; // Import the necessary icons
// import { BiLogOut } from "react-icons/bi";
// import { MdFeed } from "react-icons/md";
// import { BellIcon, AddIcon } from '@chakra-ui/icons';



// import useLogout from "../../../hooks/useLogout";
// import SidebarItems from './SidebarItems';

// const Sidebar = () => {
// 	const { handleLogout, isLoggingOut } = useLogout();
// 	return (
// 		<Box
// 			height={"100vh"}
// 			borderRight={"1px solid"}
// 			borderColor={"whiteAlpha.300"}
// 			py={8}
// 			position={"sticky"}
// 			top={0}
// 			left={0}
// 			px={{ base: 2, md: 4 }}
// 		>
// 			<Flex direction={"column"} gap={10} w='full' height={"full"}>
// 				<Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor='pointer'>
// 					<MdFeed />
          
// 				</Link>
// 				<Link
// 					to={"/"}
// 					as={RouterLink}
// 					p={2}
// 					display={{ base: "block", md: "none" }}
// 					borderRadius={6}
// 					_hover={{
// 						bg: "blue.200",
// 					}}
// 					w={10}
// 					cursor='pointer'
// 				>
// 					<MdFeed />
// 				</Link>
// 				<Flex direction={"column"} gap={5} cursor={"pointer"}>
// 					<SidebarItems />
// 				</Flex>

// 				{/* LOGOUT */}
// 				<Tooltip
// 					hasArrow
// 					label={"Logout"}
// 					placement='right'
// 					ml={1}
// 					openDelay={500}
// 					display={{ base: "block", md: "none" }}
// 				>
// 					<Flex
// 						onClick={handleLogout}
// 						alignItems={"center"}
// 						gap={4}
// 						_hover={{ bg: "Blue.400" }}
// 						borderRadius={6}
// 						p={2}
// 						w={{ base: 10, md: "full" }}
// 						mt={"auto"}
// 						justifyContent={{ base: "center", md: "flex-start" }}
// 					>
// 						<BiLogOut size={25} />
// 						<Button
// 							display={{ base: "none", md: "block" }}
// 							variant={"ghost"}
// 							_hover={{ bg: "transparent" }}
// 							isLoading={isLoggingOut}
// 						>
// 							Logout
// 						</Button>
// 					</Flex>
// 				</Tooltip>
// 			</Flex>
// 		</Box>
// 	);
// };

// export default Sidebar;




































// // const Sidebar = () => {
// //   const { isOpen, onOpen, onClose } = useDisclosure();
// //  S8
// // //   const sidebarItems = [
// // //     {
// // //       icon: <MdFeed size={25} />,
// // //       text: "Feed",
// // //       link: "/get-in-touch",
// // //     },
// // //     {
// // //       icon: <FaSearch size={20} />,
// // //       text: "Search Consultants",
// // //       link: "/get-in-touch/search",
// // //     },
// // //     {
// // //       icon: <BellIcon boxSize={6} />,
// // //       text: "Notifications",
// // //       link: "/get-in-touch/notifications",
// // //     },
// // //     {
// // //       icon: <AddIcon boxSize={6} />,
// // //       text: "Share Your Thoughts",
// // //       link: "#",
// // //       onClick: onOpen // Open modal on click
// // //     },
// // //     {
// // //       icon: <AiOutlineStock size={30} />, // Use AiOutlineStock icon for the Stock section
// // //       text: "Stock Geeks Corner",
// // //       link: "/stocks",
// // //     },
// // //     {
// // //       icon: <FaUser size={20} />, // Use FaUser icon for the Profile section
// // //       text: "Profile",
// // //       link: "/:username",
// // //     },
// // //   ];

// //   return (
// //     <Box
// //       height={"100vh"}
// //       borderRight={"1px solid"}
// //       borderColor={"white"}
// //       py={10}
// //       position={"sticky"}
// //       top={18}
// //       left={0}
// //       px={{ base: 2, md: 4 }}
// //       bg={'#1a65b5'}
// //       pt={20} // Add padding top to move the items down
// //     >
// //       <Flex direction={"column"} gap={10} w='full' height={"full"}>
// //         <Flex direction={"column"} gap={5} cursor={"pointer"}>
// //           {sidebarItems.map((item, index) => (
// //             <Tooltip
// //               key={index}
// //               label={item.text} // Display item text on hover
// //               placement='right'
// //               openDelay={500}
// //               display="flex"
// //               alignItems="center"
// //               gap={4}
// //               cursor="pointer"
// //             >
// //               <Link
// //                 to={item.link || null}
// //                 as={RouterLink}
// //                 _hover={{ bg: "WhiteAlpha.700" }}
// //                 borderRadius={6}
// //                 p={2}
// //                 w={{ base: 10, md: "full" }}
// //                 onClick={item.onClick || null}
// //               >
// //                 {item.icon}
// //               </Link>
// //             </Tooltip>
// //           ))}
// //         </Flex>
// //       </Flex>

// //       {/* Share Your Thoughts Modal */}
// //       <Modal isOpen={isOpen} onClose={onClose} size="xl">
// //         <ModalOverlay />
// //         <ModalContent>
// //           <ModalHeader>Share Your Thoughts</ModalHeader>
// //           <ModalCloseButton />
// //           <ModalBody>
// //             <Flex alignItems="center" mb={4}>
// //               <Avatar name="John Doe" src="/consultant1.png" mr={4} />
// //               <Text fontWeight="bold">John Doe</Text>
// //             </Flex>
// //             <Textarea placeholder="Write your thoughts..." mb={4} />
// //             <HStack spacing={4}>
// //               <IconButton icon={<FaImage />} aria-label="Add Image" />
// //               <IconButton icon={<FaFileAlt />} aria-label="Add Document" />
// //               <IconButton icon={<CiLink />} aria-label="Add Like" />
// //             </HStack>
// //           </ModalBody>
// //           <ModalFooter>
// //             <Button colorScheme="blue" mr={3} onClick={onClose}>
// //               Post
// //             </Button>
// //             <Button variant="ghost" onClick={onClose}>Cancel</Button>
// //           </ModalFooter>
// //         </ModalContent>
// //       </Modal>
// //     </Box>
// //   );
// // };

// // export default Sidebar;
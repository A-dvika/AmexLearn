import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { Box, Text, Heading, Avatar, Flex, Container, Grid, GridItem } from '@chakra-ui/react';
import ContributeSidebar from '../../components/Contribute/ContributeSidebar';

const Blogpage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (id) {
            getBlogDetail();
        }
        window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
    }, [id]);

    const getBlogDetail = async () => {
        const docRef = doc(firestore, 'blogs', id);
        const blogDetail = await getDoc(docRef);
        setBlog(blogDetail.data());
    };

    return (
        <Flex minH="100vh" width="100%">
            <ContributeSidebar />
            <Box flex="1" pl={0} pt="50px">
                <Box position="relative" mb="4" height="400px" overflow="hidden">
                    <Box
                        bgImage={`url('${blog?.imgUrl}')`}
                        bgSize="cover"
                        bgPosition="center"
                        height="100%"
                    >
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            width="100%"
                            height="100%"
                            bg="rgba(0,0,0,0.5)"
                        />
                    </Box>
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        height="100%"
                        color="white"
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        padding="4"
                        textAlign="center"
                    >
                        <Heading as="h1" size="2xl">{blog?.title}</Heading>
                    </Flex>
                </Box>
                <Container maxW="100%" py="6">
                    <Flex minH="calc(100vh - 400px)" direction="column" align="center" justify="center" width="100%">
                        <Grid templateColumns="repeat(12, 1fr)" gap={6} width="100%">
                            <GridItem colSpan={{ base: 12, md: 12 }} mx="auto">
                                <Box width="100%" maxW="1000px" mx="auto" textAlign="left">
                                    <Flex align="center" mb="6">
                                        <Avatar name={blog?.author} size="md" mr="4" />
                                        <Box>
                                            <Text fontWeight="bold" fontSize="lg">{blog?.author}</Text>
                                            <Text color="gray.600">
                                                {blog?.Timestamp?.toDate().toDateString()}
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Text fontSize="lg" lineHeight="tall" whiteSpace="pre-wrap" textAlign="left" width="100%" >
                                        {blog?.description}
                                    </Text>
                                </Box>
                            </GridItem>
                        </Grid>
                    </Flex>
                </Container>
            </Box>
        </Flex>
    );
};

export default Blogpage;

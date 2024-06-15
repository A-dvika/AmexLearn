import React, { useState, useEffect } from 'react';
import { Box, Divider, Flex, Text, Avatar, Image, InputGroup, Input, InputRightElement, Button, useDisclosure} from '@chakra-ui/react';
import { AiOutlineLike } from "react-icons/ai";
import { FaComment } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import useAuthStore from '../../../store/authStore';
import useUserProfileStore from '../../../store/userProfileStore';
import usePostComment from '../../../hooks/usePostComment';
import useLikePost from '../../../hooks/useLikePost';
import { timeAgo } from '../../../utils/timeAgo';
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../../store/postStore";
import useShowToast from "../../../hooks/useShowToast";

const ActivityPost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);


  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);

  const { isCommenting, handlePostComment } = usePostComment();
  const { handleLikePost, isLiked ,likes} = useLikePost(post);

  const [commentText, setCommentText] = useState('');
  const [likesCount, setLikesCount] = useState(post.likes.length);
  

  const handleDeletePost = async () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		if (isDeleting) return;

		try {
			const imageRef = ref(storage, `posts/${post.id}`);
			await deleteObject(imageRef);
			const userRef = doc(firestore, "users", authUser.uid);
			await deleteDoc(doc(firestore, "posts", post.id));

			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
			});

			deletePost(post.id);
			decrementPostsCount(post.id);
			showToast("Success", "Post deleted successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsDeleting(false);
		}
	};

  
  const handleSubmitComment = async () => {
    await handlePostComment(post.id, commentText);
    setCommentText('');
  };

  useEffect(() => {
    // Update likes count whenever post.likes changes
    setLikesCount(post.likes.length);
  }, [post.likes]);

  return (
    <Box w="full" borderRadius={4} overflow="hidden" border="1px solid" borderColor="whiteAlpha.300">
      <Flex w="full" gap={4} p={4}>
        {/* Image section */}
        <Flex
          borderRadius={4}
          overflow="hidden"
          border="1px solid"
          borderColor="whiteAlpha.300"
          flex={1.5}
          justifyContent="center"
          alignItems="center"
        >
          {post.imageURL && <Image src={post.imageURL} alt="profile post" />}
        </Flex>

        {/* Post content section */}
        <Flex flex={1} flexDir="column" px={4}>
          {/* Header with profile picture and username */}
          <Flex alignItems="center" gap={2}>
            <Avatar
              src={userProfile.profilePicURL}
              size="sm"
              name={userProfile.username}
            />
            <Text fontWeight="bold" fontSize={12}>
              {userProfile.username}
            </Text>
          </Flex>

          {/* Caption */}
          <Box mt={2} maxH="120px" overflow="auto">
            <Text>{post.caption}</Text>
          </Box>

          {/* Divider */}
          <Divider my={4} bg="gray.500" />

          {/* Post footer */}
          <Flex alignItems="center" gap={4}>
            {/* Likes */}
            <Flex alignItems="center" cursor="pointer" onClick={handleLikePost}>
              <AiOutlineLike size={20} color={isLiked ? 'blue' : 'gray'} />
              <Text fontWeight="bold" ml={2}>
                {likes} {/* Display updated likes count */}
              </Text>
            </Flex>

            {/* Comments */}
            <Flex alignItems="center" cursor="pointer">
              <FaComment size={20} />
              <Text fontWeight="bold" ml={2}>
                {post.comments.length}
              </Text>
            </Flex>

            {/* Post Date */}
            <Text ml={4} fontSize={12} color="gray.500">
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>

            {authUser?.uid === userProfile.uid && (
              <Button
                size={"sm"}
                bg={"transparent"}
                _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                borderRadius={4}
                p={1}
                onClick={handleDeletePost}
                isLoading={isDeleting}
              >
                <MdDelete size={20} cursor='pointer' />
              </Button>
            )}
          </Flex>

          {/* Add Comment */}
          <InputGroup mt={4}>
            <Input
              variant="flushed"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <InputRightElement width="auto">
              <Button
                colorScheme="blue"
                variant="outline"
                size="sm"
                isLoading={isCommenting}
                onClick={handleSubmitComment}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ActivityPost;

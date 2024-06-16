import React from 'react';
import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useFollowUser from '../../hooks/useFollowUser'; // Adjust the import as per your project structure
import { timeAgo } from '../../utils/timeAgo';
import useAuthStore from '../../store/authStore'; // Import your auth store or hook

const PostHeader = ({ post, creatorProfile }) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post?.createdBy);
  const currentUser = useAuthStore((state) => state.user); // Adjust as per your auth store

  if (!post || !post.createdBy) {
    return <Box>Post data is not available.</Box>;
  }

  // Check if the creatorProfile is the current user's profile
  const isCurrentUser = currentUser && creatorProfile && currentUser.uid === creatorProfile.uid;

  return (
    <Flex flexDirection="column" w="full">
      <Flex justifyContent="space-between" alignItems="center" w="full">
        <Flex alignItems="center" gap={2}>
          {creatorProfile ? (
            <Link to={`/${creatorProfile.username}`}>
              <Avatar src={creatorProfile.profilePicURL} alt='user profile pic' size="sm" />
            </Link>
          ) : (
            <Avatar size="sm" />
          )}

          <Flex flexDirection="column">
            <Flex fontSize={12} fontWeight="bold" gap={2}>
              {creatorProfile ? (
                <Link to={`/${creatorProfile.username}`}>{creatorProfile.username}</Link>
              ) : (
                <Box w="100px" h="10px" bg="gray.200" />
              )}
              <Box color="gray.500">• {timeAgo(post.createdAt)}</Box>
            </Flex>
          </Flex>
        </Flex>

        {/* Render Follow/Unfollow button only if it's not the current user's post */}
        {!isCurrentUser && (
          <Box cursor="pointer">
            <Button
              size="xs"
              bg="transparent"
              fontSize={12}
              color="blue.500"
              fontWeight="bold"
              _hover={{ color: 'blue.700' }}
              transition="0.2s ease-in-out"
              onClick={handleFollowUser}
              isLoading={isUpdating}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          </Box>
        )}
      </Flex>

      {/* Caption */}
      <Box mt={2}>
        <Text fontSize={14} color="gray.800">
          {post.caption}
        </Text>
      </Box>
    </Flex>
  );
};

export default PostHeader;

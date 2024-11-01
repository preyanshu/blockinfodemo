import { useState } from 'react';
import { Flex, Text, Divider, Badge, Card, Box } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { blockData } from "@/dummydata/latestblock";
import { FiCopy, FiCheck } from 'react-icons/fi';
import { Icon } from "@chakra-ui/react";

function StandardBlockInfoCard({ bg }: { bg: string }) {
  const [copiedItems, setCopiedItems] = useState<{ [key: string]: boolean }>({
    hash: false,
    address: false,
  });

  const blockTime = new Date(blockData.block.header.time);
  const localTime = blockTime.toLocaleString();

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems((prev) => ({ ...prev, [key]: true }));

      setTimeout(() => {
        setCopiedItems((prev) => ({ ...prev, [key]: false }));
      }, 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Card
      p={6}
      rounded="md"
      w={"100%"} // Responsive width
     
      bg={bg}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        #{blockData.block.header.height}
      </Text>

     

      {/* Scrollable Box for Time Details */}
      <Box overflowX="auto" whiteSpace="nowrap" mb={4} >
      <Box minWidth={"600px"}>
        <Flex justifyContent="space-between" mb={3}>
          <Text>Local Time</Text>
          <Text color="green.300">{localTime}</Text>
        </Flex>

        <Flex justifyContent="space-between" mb={3}>
          <Text>UTC Time</Text>
          <Flex alignItems="center">
            <Badge colorScheme="blue" mr={2}>
              <CalendarIcon />
            </Badge>
            <Text>UTC ({new Date(blockData.block.header.time).toUTCString()})</Text>
          </Flex>
        </Flex>

      </Box>
      </Box>

      <Divider borderColor="gray.600"  mb={6} />

      {/* Scrollable Box for Hash and Address */}
      <Box overflowX="auto" >
        <Box minWidth={"600px"}>
        
      <Flex justifyContent="space-between" mb={3}>
          <Text>Chain ID</Text>
          <Text>{blockData.block.header.chain_id}</Text>
        </Flex>
        <Flex justifyContent="space-between" mb={3} alignItems="center">
          <Text>Block Hash</Text>
          <Flex alignItems="center">
            <Text mr={2} isTruncated>
              {blockData.block_id.hash}
            </Text>
            <Icon
              as={copiedItems.hash ? FiCheck : FiCopy}
              cursor="pointer"
              onClick={() => handleCopy('hash', blockData.block_id.hash)}
            />
          </Flex>
        </Flex>

        <Flex justifyContent="space-between" mb={3}>
          <Text>Proposer Address</Text>
          <Flex alignItems="center">
            <Text mr={2} isTruncated>
              {blockData.block.header.proposer_address}
            </Text>
            <Icon
              as={copiedItems.address ? FiCheck : FiCopy}
              cursor="pointer"
              onClick={() => handleCopy('address', blockData.block.header.proposer_address)}
            />
          </Flex>
        </Flex>

        <Flex justifyContent="space-between" mb={3}>
          <Text>Block Height</Text>
          <Text>{blockData.block.header.height}</Text>
        </Flex>

        <Flex justifyContent="space-between" mb={3}>
          <Text>Round</Text>
          <Text>{blockData.block.last_commit.round}</Text>
        </Flex>

        <Flex justifyContent="space-between" mb={3}>
          <Text>TX Counts</Text>
          <Text>{blockData.block.data.txs.length}</Text>
        </Flex>
      </Box>
      </Box>
    </Card>
  );
}

export default StandardBlockInfoCard;

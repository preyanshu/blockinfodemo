'use client';
import DetailedBlockInfoCard from '@/components/blockinfo/detailedview';
import StandardBlockInfoCard from '@/components/blockinfo/standardview';
// import SimpleBlockInfoCard from '@/components/blockinfo/simpleview';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  Text,
  Flex,
  position,
  Card,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MdViewList, MdViewModule, MdViewComfy } from 'react-icons/md';
import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const Page = () => {
  const cardBg = useColorModeValue("card.light", "card.dark");
  const [view, setView] = React.useState('simple'); 

  // Function to render the appropriate icon and label based on the view
  const getViewLabelAndIcon = () => {
    switch (view) {
      case 'simple':
        return { label: 'Simple', icon: MdViewList };
      case 'extended':
        return { label: 'Extended', icon: MdViewModule };
      case 'comprehensive':
        return { label: 'Comprehensive', icon: MdViewComfy };
      default:
        return { label: '', icon: null };
    }
  };

  const { label, icon } = getViewLabelAndIcon();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt="10vh">
      {/* Dropdown for View Selection */}
      <Box  paddingBottom={"10vh"} w={{ base: "90vw", md: "60vw" }} position={"relative"} >

        <Box position={"absolute"} top={0} right={0}>
         {/* menu */}
         <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          <Flex alignItems="center" >
            <Icon as={icon||undefined} boxSize={5} mr={2} />
            <Text>{label}</Text>
          </Flex>
        </MenuButton>
        <MenuList  bg = {cardBg}>
          <MenuItem
            icon={<Icon as={MdViewList} />}
            onClick={() => setView('simple')}
            bg = {cardBg}
            
          >
            Simple
          </MenuItem>
          <MenuItem
            icon={<Icon as={MdViewModule} />}
            onClick={() => setView('extended')}
            bg = {cardBg}
          >
            Extended
          </MenuItem>
          <MenuItem
            icon={<Icon as={MdViewComfy} />}
            onClick={() => setView('comprehensive')}
            bg = {cardBg}
          >
            Comprehensive
          </MenuItem>
        </MenuList>
      </Menu>
      
        </Box>

     

       {/* Display the selected view component */}
       <Box mt={16}>
        {/* {view === 'simple' && <SimpleBlockInfoCard />} */}
        {view === 'simple' && <StandardBlockInfoCard bg={cardBg}/>}
        {view === 'extended' && <DetailedBlockInfoCard view="extended" bg={cardBg}/>}
        {view === 'comprehensive' && <DetailedBlockInfoCard view="comprehensive" bg={cardBg}/>}
      </Box>




      </Box>
   

     
    </Box>
  );
};

export default Page;

import {
  Box,
  Flex,
  SimpleGrid,
  Spacer,
  HStack,
  Stack,
  Text,
  Heading,
  Center,
  Grid,
  GridItem,
  Select,
  Button,
} from "@chakra-ui/react"
export const Footer = (props) => {
  return (
    <Box w="100%" bgColor="black">
      <Center pt="8px" pb="1px">
        <Text fontSize="lg" fontWeight="bold" color="white">
          Orthotic Leg Assessment
        </Text>
      </Center>
      <Center pt="1px" pb="8px">
        <Text fontSize="md" color="white">
          Made with ❤️ by SSN SSAGA
        </Text>
      </Center>
    </Box>
  )
}

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
    <Box w="100%">
      <Center bg="black" pt="8px" pb="1px">
        <Text fontSize="md" fontWeight="bold" color="white">
          SSN SSAGA
        </Text>
      </Center>

      <Center bg="black" pt="1px" pb="8px">
        <Text fontSize="md" fontWeight="bold" color="white">
          Orthotic Leg Assessment
        </Text>
      </Center>
    </Box>
  )
}

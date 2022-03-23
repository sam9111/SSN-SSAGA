import React from "react"
import {
  Tr,
  Td,
  Flex,
  Text,
  Progress,
  Icon,
  Button,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react"
import { FaEllipsisV } from "react-icons/fa"

function TableRow(props) {
  const { name, status, progression, type } = props

  return (
    <Tr>
      <Td pl="0px">
        <Flex alignItems="center" minWidth="100%" flexWrap="nowrap" py=".5rem">
          {type == "patients" && <Avatar h={"24px"} w={"24px"} me="20px" />}
          <Text fontSize="md" fontWeight="bold" me="80px">
            {name}
          </Text>
          <Text fontSize="md" fontWeight="bold" me="80px">
            {status} Severity
          </Text>
          <Flex direction="column" me="50px">
            <Text
              fontSize="md"
              color={status === "High" ? "red" : "green"}
              fontWeight="bold"
              py=".5rem"
            >{`${progression}%`}</Text>
            <Progress
              colorScheme={status === "High" ? "red" : "green"}
              size="xs"
              value={progression}
              borderRadius="15px"
            />
          </Flex>
          <Button p="0px" bg="transparent">
            <Icon as={FaEllipsisV} color="gray.400" cursor="pointer" />
          </Button>
        </Flex>
      </Td>
    </Tr>
  )
}

export default TableRow

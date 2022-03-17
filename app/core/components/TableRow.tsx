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
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          {type == "patients" && <Avatar h={"24px"} w={"24px"} me="18px" />}
          <Text fontSize="md" fontWeight="bold" minWidth="100%">
            {name}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="md" fontWeight="bold" pb=".5rem">
          {status} Severity
        </Text>
      </Td>
      <Td>
        <Flex direction="column">
          <Text
            fontSize="md"
            color={status === "High" ? "red" : "green"}
            fontWeight="bold"
            pb=".2rem"
          >{`${progression}%`}</Text>
          <Progress
            colorScheme={status === "High" ? "red" : "green"}
            size="xs"
            value={progression}
            borderRadius="15px"
          />
        </Flex>
      </Td>
      <Td>
        <Button p="0px" bg="transparent">
          <Icon as={FaEllipsisV} color="gray.400" cursor="pointer" />
        </Button>
      </Td>
    </Tr>
  )
}

export default TableRow

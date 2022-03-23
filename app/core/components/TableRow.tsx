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
  Spacer,
} from "@chakra-ui/react"
import { FaEllipsisV } from "react-icons/fa"

function TableRow(props) {
  const { name, status, progression, type } = props

  return (
    <Tr alignItems="center" py=".5rem">
      <Td> {type == "patients" && <Avatar h={"30px"} w={"30px"} />}</Td>
      <Td fontSize="md" fontWeight="bold">
        {name}
      </Td>

      <Td fontSize="md" fontWeight="bold">
        {status} Severity
      </Td>
      <Td>
        <Flex direction="column">
          <Text
            fontSize="md"
            color={status === "High" ? "red" : "green"}
            fontWeight="bold"
          >{`${progression}%`}</Text>

          <Progress
            colorScheme={status === "High" ? "red" : "green"}
            size="xs"
            value={progression}
            borderRadius="15px"
          />
        </Flex>
      </Td>
    </Tr>
  )
}

export default TableRow

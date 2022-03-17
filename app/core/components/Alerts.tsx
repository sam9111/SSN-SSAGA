// Chakra imports
import { Flex, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue, Box } from "@chakra-ui/react"
import React from "react"
import TableRow from "./TableRow"
const ListData = [
  {
    name: "1/3/22",
    status: "High",
    progression: 60,
  },
  {
    name: "2/3/22",
    status: "Low",
    progression: 10,
  },
  {
    name: "3/3/22",
    status: "High",
    progression: 100,
  },
  {
    name: "4/3/22",
    status: "High",
    progression: 100,
  },
  {
    name: "5/3/22",
    status: "Low",
    progression: 25,
  },
  {
    name: "6/3/22",
    status: "High",
    progression: 40,
  },
  {
    name: "7/3/22",
    status: "Low",
    progression: 10,
  },
]
const Alerts = ({ title, captions }) => {
  return (
    <Box
      rounded="lg"
      p="16px"
      my={{ sm: "24px", xl: "0px" }}
      overflowX={{ sm: "scroll", xl: "hidden" }}
    >
      <Box p="6px 0px 22px 0px">
        <Flex direction="column">
          <Text fontSize="lg" fontWeight="bold" pb=".5rem">
            {title}
          </Text>
        </Flex>
      </Box>
      <Box>
        <Table variant="simple">
          <Thead>
            <Tr my=".8rem" pl="0px">
              {captions.map((caption, idx) => {
                return (
                  <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                )
              })}
            </Tr>
          </Thead>
          <Tbody>
            {ListData.map((row) => {
              return (
                <TableRow
                  key={row.name}
                  name={row.name}
                  status={row.status}
                  progression={row.progression}
                />
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default Alerts

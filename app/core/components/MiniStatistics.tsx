import {
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Box,
} from "@chakra-ui/react"

import React from "react"

const MiniStatistics = ({ title, value, percentage }) => {
  return (
    <Box>
      <Flex
        flexDirection="row"
        align="center"
        justify="center"
        bgColor="gray.100"
        rounded="lg"
        p={2}
      >
        <Stat me="auto">
          <StatLabel fontSize="sm" color="gray.700" fontWeight="bold" pb=".1rem">
            {title}
          </StatLabel>
          <Flex>
            <StatNumber fontSize="lg">{value}</StatNumber>
            <StatHelpText
              alignSelf="flex-end"
              justifySelf="flex-end"
              m="0px"
              color={percentage > 0 ? "green.400" : "red.400"}
              fontWeight="bold"
              ps="3px"
              fontSize="md"
            >
              {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
            </StatHelpText>
          </Flex>
        </Stat>
      </Flex>
    </Box>
  )
}

export default MiniStatistics

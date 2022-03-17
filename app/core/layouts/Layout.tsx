import { Head, BlitzLayout } from "blitz"
import { Box, Container } from "@chakra-ui/react"
const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "SSN-SSAGA"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg="gray.100">{children}</Box>
    </>
  )
}

export default Layout

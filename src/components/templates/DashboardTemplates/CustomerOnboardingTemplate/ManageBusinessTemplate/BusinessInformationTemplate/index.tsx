"use client"
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
  Badge,
  useBreakpointValue,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import OutlineButton from "components/molecules/buttons/OutlineButton"
import CheckIcon from "components/atoms/icons/CheckIcon"
import EditIcon from "components/atoms/icons/EditIcon"
import StatusBadge from "components/molecules/badge/status-badge"
import { useState } from "react"
import BaseButton from "components/molecules/buttons/BaseButton"
import ConfirmationModal from "components/molecules/modals/ConfirmModal"
import WarningModal from "components/molecules/modals/WarningModal"
import FailedModal from "components/molecules/modals/FailedModal"

const BusinessInformationTemplate = () => {
  const router = useRouter()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [status, setStatus] = useState<'approved' | 'pending' | 'pendingV' | 'failed'>('failed')
  const { isOpen: isOpenOne, onOpen: onOpenOne, onClose: onCloseOne } = useDisclosure();
  const { isOpen: isOpenTwo, onOpen: onOpenTwo, onClose: onCloseTwo } = useDisclosure();

  return (
    <>
      <VStack spacing={4} align="stretch">
        <Flex flexDir={{ base: "column", lg: "row" }} justify={{ lg: "space-between" }} gap={{ base: 5, lg: 20 }}>
          <OutlineButton text={"Upgrade To Tier 2"} variant={"outline"} color={"#0F454F"} />
          <OutlineButton text={`View Customer's QR`} variant={"outline"} color={"#0F454F"} />
        </Flex>

        <Box borderY="1px" borderX={"1px"} pt={4} mt={4} borderColor={"#CBD5E1"}>
          <Flex justify="space-between" align="start" mb={4} px={{ base: 4, lg: 8 }}>
            <Flex align="center">
              <Avatar />
            </Flex>
            <Flex flexDir={{base: 'column', lg: 'row'}} justify={'center'} align={'end'} gap={4}>
              <StatusBadge status="approved" />
              {status === 'pending' && <BaseButton
                text="Complete Application"
                color={'#FCFCFC'}
                borderRadius={'8px'}
                h={'48px'}
                w={'239px'}
              />}
              {status === 'pendingV' && <BaseButton
                text="View Verification Status"
                color={'#FCFCFC'}
                borderRadius={'8px'}
                h={'48px'}
                w={'239px'}
                onClick={() => {onOpenOne()}}
              />}
              {status === 'failed' && <BaseButton
                text="View Reason"
                color={'#FCFCFC'}
                borderRadius={'8px'}
                h={'48px'}
                w={'239px'}
                onClick={() => {onOpenTwo()}}
              />}
            </Flex>
          </Flex>

          <Divider mb={4} />

          <Text variant={"base"} size="sm" mb={4} textAlign="center">
            Personal Information
          </Text>

          <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4} px={{ base: 4, lg: 8 }}>
            <Box>
              <Text variant={"label"}>Account Name</Text>
              <Text variant={"base"} mt={2}>
                Ejike Fabian
              </Text>
            </Box>
            <Box>
              <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                Account Number
              </Text>
              <Text variant={"base"} mt={2} textAlign={isMobile ? "left" : "right"}>
                8165748921
              </Text>
            </Box>

            <Box>
              <Text variant={"label"}>Verification Type</Text>
              <Text variant={"base"} mt={2}>
                BVN & NIN
              </Text>
            </Box>
            <Box>
              <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                Phone Number
              </Text>
              <Text variant={"base"} mt={2} textAlign={isMobile ? "left" : "right"}>
                8165473819
              </Text>
            </Box>

            <Box>
              <Text variant={"label"}>Tier Level</Text>
              <Text variant={"base"} mt={2}>
                Tier 2
              </Text>
            </Box>
            <Box>
              <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                State
              </Text>
              <Text variant={"base"} mt={2} textAlign={isMobile ? "left" : "right"}>
                Abia
              </Text>
            </Box>

            <Box>
              <Text variant={"label"}>LGA</Text>
              <Text variant={"base"} mt={2}>
                Isulkwato
              </Text>
            </Box>
            <Box>
              <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                Town
              </Text>
              <Text variant={"base"} mt={2} textAlign={isMobile ? "left" : "right"}>
                Acha
              </Text>
            </Box>

            <Box>
              <Text variant={"label"}>Landmark/Nearesy Bustop</Text>
              <Text variant={"base"} mt={2}>
                Whitehart Pharmacy
              </Text>
            </Box>
            <Box>
              <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                Street Address
              </Text>
              <Text variant={"base"} mt={2} textAlign={isMobile ? "left" : "right"}>
                DD 16, Zambia Avenue, Abia State
              </Text>
            </Box>
          </Grid>

          <Box borderTop="1px" py={4} px={{ base: 4, lg: 8 }} mt={10} borderColor={"#CBD5E1"}>
            <Text variant={"base"} size="sm" textAlign="center">
              Business Setup
            </Text>

            <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
              <GridItem>
                <Text variant={"label"}>Nationality</Text>
                <Text variant={"base"} mt={2}>
                  Nigeria
                </Text>
              </GridItem>
            </Grid>
          </Box>

          <Box borderTop="1px" py={4} px={{ base: 4, lg: 8 }} mt={10} borderColor={"#CBD5E1"}>
            <Flex justify="space-between" align="center" mb={4}>
              <Text variant={"base"}>Business Details</Text>
              <EditIcon />
            </Flex>

            <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
              <GridItem>
                <Text variant={"label"}>Store Name</Text>
                <Text variant={"base"} mt={2}>
                  Mama Nkechi Foods
                </Text>
              </GridItem>
              <GridItem>
                <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                  Industry Category
                </Text>
                <Text variant={"base"} mt={2} textAlign={isMobile ? "left" : "right"}>
                  Foods & Services
                </Text>
              </GridItem>

              <GridItem>
                <Text variant={"label"}>Number of Stores</Text>
                <Text variant={"base"} mt={2}>
                  2
                </Text>
              </GridItem>
              <GridItem>
                <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                  Number of Employees
                </Text>
                <Text variant={"base"} mt={2} textAlign={isMobile ? "left" : "right"}>
                  3
                </Text>
              </GridItem>
            </Grid>
          </Box>

          <Box borderTop="1px" py={4} px={{ base: 4, lg: 8 }} mt={10} borderColor={"#CBD5E1"}>
            <Text variant={"base"} size="sm" mb={4}>
              Business Address
            </Text>

            <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
              <GridItem colSpan={isMobile ? 1 : 2}>
                <Text variant={"label"}>Is the Customer Business Address located in a market?</Text>
                <Text variant={"base"} mt={2}>
                  Yes
                </Text>
              </GridItem>

              <GridItem>
                <Text variant={"label"}>LGA</Text>
                <Text variant={"base"} mt={2}>
                  Garki
                </Text>
              </GridItem>
              <GridItem>
                <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                  State
                </Text>
                <Text variant={"base"} mt={2} textAlign={isMobile ? "left" : "right"}>
                  Abuja
                </Text>
              </GridItem>

              <GridItem>
                <Text variant={"label"}>Store Line/Number</Text>
                <Text variant={"base"} mt={2}>
                  10A
                </Text>
              </GridItem>
              <GridItem>
                <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                  Market Name
                </Text>
                <Text variant={"base"} mt={2} textAlign={isMobile ? "left" : "right"}>
                  Wuse Market
                </Text>
              </GridItem>

              <GridItem colSpan={isMobile ? 1 : 2}>
                <Text variant={"label"}>Shop Description</Text>
                <Text variant={"base"} mt={2}>
                  No. 5 Beaver Crescent, Sunnyvale Estate, off Maitama bridge, Galadinmawa, Abuja
                </Text>
              </GridItem>

              <GridItem colSpan={isMobile ? 1 : 2}>
                <Text variant={"label"}>Live picture of your shop</Text>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mpatLow1q3KICqT451VCS3lURXqzgO.png"
                  alt="Shop Picture"
                  height="100px"
                  objectFit="cover"
                  borderRadius="md"
                  mt={1}
                />
              </GridItem>
            </Grid>
          </Box>

          <Box borderTop="1px" py={4} px={{ base: 4, lg: 8 }} mt={10} borderColor={"#CBD5E1"}>
            <Text variant={"base"} size="sm" mb={4}>
              PEP Status
            </Text>

            <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
              <GridItem colSpan={2}>
                <Text variant={"sm"}>Is the customer a Politically Exposed Person?</Text>
                <Text variant={"base"} mt={2}>
                  No
                </Text>
              </GridItem>
            </Grid>
          </Box>
          <Box borderTop="1px" py={4} px={{ base: 4, lg: 8 }} mt={10} borderColor={"#CBD5E1"}>
            <Flex justify="space-between" align="center" mb={4}>
              <Text variant={"base"} size="sm">
                Source of Income
              </Text>
              <EditIcon />
            </Flex>

            <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
              <GridItem>
                <Text variant={"sm"}>What is your expected gross annual revenue</Text>
                <Text variant={"base"} mt={2}>
                  N1 million - Less than N5 million
                </Text>
              </GridItem>
              <GridItem>
                <Text variant={"sm"} textAlign={isMobile ? "left" : "right"}>
                  Does the customer have other sources of funds?
                </Text>
                <Text variant={"base"} mt={2} textAlign={isMobile ? "left" : "right"}>
                  Yes
                </Text>
              </GridItem>

              <GridItem>
                <Text variant={"sm"}>Other source of revenue</Text>
                <Text variant={"base"} mt={2}>
                  Savings
                </Text>
              </GridItem>
              <GridItem>
                <Text variant={"sm"} textAlign={isMobile ? "left" : "right"}>
                  Expected annual revenue from other sources
                </Text>
                <Text variant={"base"} mt={2} textAlign={isMobile ? "left" : "right"}>
                  N1 million - Less than N5 million
                </Text>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </VStack>

      {isOpenOne && (
        <WarningModal
          isOpen={isOpenOne}
          onClose={onCloseOne}
          title="Please note:"
          subTitle="We are verifying this customer's account information, if this account has not been verified after 24 hours, Kindly contact us at help@onewalletweb.com or call our help line 08165748912"
        />
      )}

      {isOpenTwo && <FailedModal
          isOpen={isOpenTwo}
          onClose={onCloseTwo}
          title="Error Message:"
          title2="We could not verify this photo, please try again"
          title3="Please take note:"
          warning={true}
          height="auto"
          borderRadius="8px"
          padding="24px"
          borderTopRadius={'26.81px'}
          borderBottomRadius={'26.81px'}
      />}
    </>
  )
}

export default BusinessInformationTemplate

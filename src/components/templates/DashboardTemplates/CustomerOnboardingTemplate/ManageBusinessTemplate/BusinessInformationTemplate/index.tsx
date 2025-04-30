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
  Spinner,
} from "@chakra-ui/react"
import { useParams, useRouter } from "next/navigation"
import OutlineButton from "components/molecules/buttons/OutlineButton"
import CheckIcon from "components/atoms/icons/CheckIcon"
import EditIcon from "components/atoms/icons/EditIcon"
import StatusBadge from "components/molecules/badge/status-badge"
import { useEffect, useState } from "react"
import BaseButton from "components/molecules/buttons/BaseButton"
import ConfirmationModal from "components/molecules/modals/ConfirmModal"
import WarningModal from "components/molecules/modals/WarningModal"
import FailedModal from "components/molecules/modals/FailedModal"
import { useFetchCustomer } from "api-services/business-services"
import { setUpgrade } from "../../../../../../redux/slices/upgrade"
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store"

const BusinessInformationTemplate = () => {
  const router = useRouter()
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const { upgradeDetails } = useAppSelector((state) => state.upgrade);

  const isMobile = useBreakpointValue({ base: true, md: false })
  const [status, setStatus] = useState<'approved' | 'pending' | 'pendingV' | 'failed'>('failed')

  const { isOpen: isOpenOne, onOpen: onOpenOne, onClose: onCloseOne } = useDisclosure();
  const { isOpen: isOpenTwo, onOpen: onOpenTwo, onClose: onCloseTwo } = useDisclosure();

  const { mutateAsync: fetchCustomer, data: customer, isPending: isFetchingCustomer } = useFetchCustomer(id);

  useEffect(() => {
    fetchCustomer();
  }, []);

  useEffect(() => {
    if(customer?.data?.bvnVerified) {
      dispatch(
        setUpgrade({
          ...upgradeDetails,
          currentVerificationType: 'BVN',
          currentVerificationStatus: customer?.data?.bvnVerified,
        }),
      );
    }
    if(customer?.data?.ninVerified) {
      dispatch(
        setUpgrade({
          ...upgradeDetails,
          currentVerificationType: 'NIN',
          currentVerificationStatus: customer?.data?.ninVerified,
        }),
      );
    }
  }, [customer]);

  return (
    <>
    {isFetchingCustomer ?
      <Box w={'full'} h={'300px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Spinner size={'lg'}/>
      </Box>
      :
      <VStack spacing={4} align="stretch">
        <Flex flexDir={{ base: "column", lg: "row" }} justify={{ lg: "space-between" }} gap={{ base: 5, lg: 20 }}>
          {customer?.data?.tier === 'one' ? 
            <OutlineButton text={"Upgrade To Tier 2"} variant={"outline"} color={"#0F454F"} onClick={()=>{router.push(`/admin/dashboard/business/customer-onboarding/manage-business/${id}/account-upgrade`)}} />
          :
          customer?.data?.tier === 'two' ? 
            <OutlineButton text={"Upgrade To Tier 3"} variant={"outline"} color={"#0F454F"} onClick={()=>{router.push(`/admin/dashboard/business/customer-onboarding/manage-business/${id}/upgrade-tier3`)}} />
            : 
            <Box></Box>
          }
          <OutlineButton text={`View Customer's QR`} variant={"outline"} color={"#0F454F"} onClick={()=>{router.push(`/admin/dashboard/business/customer-onboarding/manage-business/${id}/view-qr`)}} />
        </Flex>

        <Box borderY="1px" borderX={"1px"} pt={4} mt={4} borderColor={"#CBD5E1"}>
          <Flex justify="space-between" align="start" mb={4} px={{ base: 4, lg: 8 }}>
            <Flex align="center">
              <Avatar />
            </Flex>
            <Flex flexDir={{base: 'column', lg: 'row'}} justify={'center'} align={'end'} gap={4}>
              
              <StatusBadge status={customer?.data?.status === 'active' ? 'approved' : null} />
              
              {customer?.data?.status === 'pending' && <BaseButton
                text="Complete Application"
                color={'#FCFCFC'}
                borderRadius={'8px'}
                h={'48px'}
                w={'239px'}
              />}
              {customer?.data?.status === 'pendingV' && <BaseButton
                text="View Verification Status"
                color={'#FCFCFC'}
                borderRadius={'8px'}
                h={'48px'}
                w={'239px'}
                onClick={() => {onOpenOne()}}
              />}
              {customer?.data?.status === 'failed' && <BaseButton
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

          <Text variant={"md2"} size="sm" mb={4} textAlign="center">
            Personal Information
          </Text>

          <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4} px={{ base: 4, lg: 8 }}>
            <Box>
              <Text variant={"label"}>Account Name</Text>
              <Text variant={"base"} mt={1}>
                {customer?.data?.fullName ?? "N/A"}
              </Text>
            </Box>
            <Box>
              <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                Account Number
              </Text>
              <Text variant={"base"} mt={1} textAlign={isMobile ? "left" : "right"}>
                {customer?.data?.accountNumber ?? "N/A"}
              </Text>
            </Box>

            <Box>
              <Text variant={"label"}>Verification Type</Text>
              <Text variant={"base"} mt={1}>
                {customer?.data?.ninVerified && customer?.data?.bvnVerified ? "BVN & NIN" : customer?.data?.ninVerified ? "NIN" : customer?.data?.bvnVerified ? "BVN" : "N/A"}
              </Text>
            </Box>
            <Box>
              <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                Phone Number
              </Text>
              <Text variant={"base"} mt={1} textAlign={isMobile ? "left" : "right"}>
                {customer?.data?.phone ?? "N/A"}
              </Text>
            </Box>

            <Box>
              <Text variant={"label"}>Tier Level</Text>
              <Text variant={"base"} mt={1}>
                {customer?.data?.tier === 'one' ? "Tier 1" : customer?.data?.tier === 'two' ? "Tier 2" : customer?.data?.tier === 'three' ? "Tier 3" : "N/A"}
              </Text>
            </Box>
            <Box>
              <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                State
              </Text>
              <Text variant={"base"} mt={1} textAlign={isMobile ? "left" : "right"}>
                {customer?.data?.state ?? "N/A"}
              </Text>
            </Box>

            <Box>
              <Text variant={"label"}>LGA</Text>
              <Text variant={"base"} mt={1}>
                {customer?.data?.lga ?? "N/A"}
              </Text>
            </Box>
            <Box>
              <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                Town
              </Text>
              <Text variant={"base"} mt={1} textAlign={isMobile ? "left" : "right"}>
                {customer?.data?.town ?? "N/A"}
              </Text>
            </Box>

            <Box>
              <Text variant={"label"}>Landmark/Nearest Bustop</Text>
              <Text variant={"base"} mt={1}>
                {customer?.data?.landmark ?? "N/A"}
              </Text>
            </Box>
            <Box>
              <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                Street Address
              </Text>
              <Text variant={"base"} mt={1} textAlign={isMobile ? "left" : "right"}>
                {customer?.data?.address ?? "N/A"}
              </Text>
            </Box>
          </Grid>

          <Box borderTop="1px" py={4} px={{ base: 4, lg: 8 }} mt={4} borderColor={"#CBD5E1"}>
            <Text variant={"md2"} size="sm" textAlign="center">
              Business Setup
            </Text>
            <Box  py={4}>
            <Text display={{ base: 'none', md: 'block'}} variant={"md2"}>Nationality</Text>
            </Box>
            <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
              <Box>
                <Text variant={"label"}>Nationality</Text>
                <Text variant={"base"} mt={2}>
                  {customer?.data?.tierOne?.country ?? "N/A"}
                </Text>
              </Box>
            </Grid>
          </Box>

          <Box borderTop="1px" py={4} px={{ base: 4, lg: 8 }}  borderColor={"#CBD5E1"}>
          <Flex justify="space-between" align="center">
            <Text variant={"md2"}>Business Details</Text>
             <EditIcon />
                </Flex>
            <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
                <GridItem>
                <Text variant={"label"}>
                  Store Name
                </Text>
                <Text variant={"base"} mt={1}>
                  {customer?.data?.merchant?.name ?? "N/A"}
                </Text>
                </GridItem>
                {/* <GridItem colSpan={isMobile ? 1 : 2}>
                <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>Number of Sotres</Text>
                <Text variant={"base"} mt={1}>
                  {customer?.data?.merchant?.noOfStores ?? "N/A"}
                </Text>
              </GridItem> */}
              <GridItem>
                  <Box>
                <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                  Industry Category
                </Text>
                <Text variant={"base"} mt={1} textAlign={isMobile ? "left" : "right"}>
                  {customer?.data?.merchant?.category ?? "N/A"}
                </Text>
                </Box>
              </GridItem>
              {/* <GridItem>
                <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>Number Of Employees</Text>
                <Text variant={"base"} mt={1} textAlign={isMobile ? "left" : "right"}>
                  {customer?.data?.merchant?.noOfEmployees ?? "N/A"}
                </Text>
              </GridItem> */}
            </Grid>
          </Box>

          <Box borderTop="1px" py={4} px={{ base: 4, lg: 8 }}  borderColor={"#CBD5E1"}>
            <Text variant={"md2"} size="sm" mb={3}>
              Business Address
            </Text>

            <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
              <GridItem colSpan={isMobile ? 1 : 2}>
                <Text variant={"label"}>Is the Customer Business Address located in a market?</Text>
                <Text variant={"base"} mt={1}>
                {customer?.data?.merchant?.locatedInMarket ?? "N/A"}
                </Text>
              </GridItem>

              <GridItem>
                <Text variant={"label"}>LGA</Text>
                <Text variant={"base"} mt={1}>
                {customer?.data?.merchant?.lga ?? "N/A"}
                </Text>
              </GridItem>
              <GridItem>
                <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                  State
                </Text>
                <Text variant={"base"} mt={1} textAlign={isMobile ? "left" : "right"}>
                {customer?.data?.merchant?.state ?? "N/A"}
                </Text>
              </GridItem>

              <GridItem>
                <Text variant={"label"}>Store Line/Number</Text>
                <Text variant={"base"} mt={1}>
                {customer?.data?.merchant?.storeNumber ?? "N/A"}
                </Text>
              </GridItem>
              <GridItem>
                <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>
                  Market Name
                </Text>
                <Text variant={"base"} mt={1} textAlign={isMobile ? "left" : "right"}>
                {customer?.data?.merchant?.marketName ?? "N/A"}
                </Text>
              </GridItem>

              <GridItem colSpan={isMobile ? 1 : 2}>
                <Text variant={"label"} textAlign={isMobile ? "left" : "right"}>Shop Description</Text>
                <Text variant={"base"} mt={1} textAlign={isMobile ? "left" : "right"}>
                {customer?.data?.merchant?.fullShopAddress ?? "N/A"}
                </Text>
              </GridItem>

              <GridItem colSpan={isMobile ? 1 : 2}>
                <Text variant={"label"}>Live picture of your shop</Text>
                <Image
                  src={customer?.data?.merchant?.photoUrl}
                  alt="Shop Picture"
                  height="100px"
                  objectFit="cover"
                  borderRadius="md"
                  mt={1}
                />
              </GridItem>
            </Grid>
          </Box>

          <Box borderTop="1px" pt={4} px={{ base: 4, lg: 8 }} borderColor={"#CBD5E1"}>
            <Text variant={"md2"} size="sm" mb={3}>
              PEP Status
            </Text>

            <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
              <GridItem colSpan={2}>
                <Text variant={"sm"}>Is the customer a Politically Exposed Person?</Text>
                <Text variant={"base"} mt={1}>
                {customer?.data?.merchant?.politicalExposed ?? "N/A"}
                </Text>
              </GridItem>
            </Grid>
          </Box>
          <Box borderTop="1px" py={4} px={{ base: 4, lg: 8 }} mt={10} borderColor={"#CBD5E1"}>
            <Flex justify="space-between" align="center" mb={3}>
              <Text variant={"md2"} size="sm">
                Source of Income
              </Text>
              <EditIcon />
            </Flex>

            <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
              <GridItem>
                <Text variant={"sm"}>What is your expected gross annual revenue</Text>
                <Text variant={"base"} mt={1}>
                {customer?.data?.merchant?.annualIncome ?? "N/A"}
                </Text>
              </GridItem>
              <GridItem>
                <Text variant={"sm"} textAlign={isMobile ? "left" : "right"}>
                  Does the customer have other sources of funds?
                </Text>
                <Text variant={"base"} mt={1} textAlign={isMobile ? "left" : "right"}>
                {customer?.data?.merchant?.otherSourceOfIncome ? "Yes" : "No"}
                </Text>
              </GridItem>

            {customer?.data?.merchant?.otherSourceOfIncome && (
              <>
                <GridItem>
                  <Text variant={"sm"}>Other source of revenue</Text>
                  <Text variant={"base"} mt={1}>
                    {customer?.data?.merchant?.otherSourceOfIncome}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text variant={"sm"} textAlign={isMobile ? "left" : "right"}>
                    Expected annual revenue from other sources
                  </Text>
                  <Text variant={"base"} mt={1} textAlign={isMobile ? "left" : "right"}>
                    {customer?.data?.merchant?.otherSourceAnnualIncome}
                  </Text>
                </GridItem>
              </>
            )}
            </Grid>
          </Box>
        </Box>
      </VStack>
}

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

import React from 'react';
import {Box, Flex, useDisclosure} from '@chakra-ui/react';
import TotalBox from 'components/molecules/box/TotalBox';
import SearchInput from 'components/molecules/inputs/SearchInput';
import DownloadButton from 'components/molecules/buttons/DownloadButton';
import FilterButton from 'components/molecules/buttons/FilterButton';
import { IBoxProps } from 'components/molecules/buttons/interfaces';
import SelectFilterBox from 'components/organisms/filter/SelectFilterBox';
import SuspendDownloadBox from 'components/organisms/radio/SuspendDownloadBox';
import DownloadBox from 'components/organisms/radio/DownloadBox';
import { IPendingUserRes, ISuspendedUserRes } from 'api-services/user-services/interfaces';
import { useFetchPendingUsers, useFetchSuspendedUsers } from 'api-services/user-services';
// @ts-ignore
import { mkConfig, generateCsv, download } from "export-to-csv";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TopInfoBox = ({title, total, currentPage, type, choose, isLoading, onFilterChange, searchValue, onSearchChange}: IBoxProps) => {

    const {isOpen: isOpenOne, onClose: onCloseOne, onToggle: onToggleOne} =  useDisclosure();
    const {isOpen: isOpenTwo, onClose: onCloseTwo, onToggle: onToggleTwo} =  useDisclosure();
    const { mutateAsync: fetchPendingUsers, isPending: isFetchingPendingUsers } = useFetchPendingUsers();
    const { mutateAsync: fetchSuspendedUsers, isPending: isFetchingSuspendedUsers } = useFetchSuspendedUsers();
    const handleDownload = async ( format: string, fromDate: string, toDate: string ) => {
        try {
            const params = { currentPage: currentPage, fromDate, toDate };
            const response = await fetchPendingUsers(params);

            if (!response.data) {
                throw new Error("No data available for download.");
            }
    
            if (format === 'option1') {
                // Download PDF, PNG, and CSV
                downloadFiles(response, ['pdf', 'png', 'csv']);
                return;
            }
    
            if (format === 'option2') {
                // Download only PDF and PNG
                downloadFiles(response, ['pdf', 'png']);
                return;
            }
    
            if (format === 'option3') {
                // Download only CSV
                downloadFiles(response, ['csv']);
                return;
            }
    
            throw new Error("Invalid format selected for download.");
        } catch (error) {
            throw new Error("Error fetching pending users:", error);
        }
    };

    const handleSuspendedDownload = async ( format: string, fromDate: string, toDate: string ) => {
        try {
            const params = { currentPage: currentPage, fromDate, toDate };
            const response = await fetchSuspendedUsers(params);

            if (!response.data) {
                throw new Error("No data available for download.");
            }
    
            if (format === 'option1') {
                // Download PDF, PNG, and CSV
                downloadSuspendedFiles(response, ['pdf', 'png', 'csv']);
                return;
            }
    
            if (format === 'option2') {
                // Download only PDF and PNG
                downloadSuspendedFiles(response, ['pdf', 'png']);
                return;
            }
    
            if (format === 'option3') {
                // Download only CSV
                downloadSuspendedFiles(response, ['csv']);
                return;
            }
    
            throw new Error("Invalid format selected for download.");
        } catch (error) {
            throw new Error("Error fetching suspended users:", error);
        }
    };

    const downloadCsv = (data: IPendingUserRes) => {
        const csvConfig = mkConfig({
            useKeysAsHeaders: true,
            title: "Pending Users",
            filename: "pending_users",
        });
    
        const transformedData = data.data.map((merchant) => ({
            Name: merchant?.fullName,
            ID: merchant?.id,
        }));
    
        const csv = generateCsv(csvConfig)(transformedData);
        download(csvConfig)(csv);
    };

    const downloadSuspendedCsv = (data: ISuspendedUserRes) => {
        const csvConfig = mkConfig({
            useKeysAsHeaders: true,
            title: "Suspended Users",
            filename: "suspended_users",
        });
    
        const transformedData = data.data.map((merchant) => ({
            Name: merchant?.fullName,
            ID: merchant?.id,
        }));
    
        const csv = generateCsv(csvConfig)(transformedData);
        download(csvConfig)(csv);
    };

    const downloadPdfOrPng = async (data: IPendingUserRes, format: string) => {
        const container = document.createElement("div");
        container.style.position = "relative";
        container.style.top = "-9999px"; 
        container.style.left = "-9999px";
        container.style.width = "800px"; 
        container.style.padding = "20px"; 
        container.style.paddingTop = "-40px";
        container.style.marginBottom = "20px";
        container.style.background = "white"; 
        container.style.fontFamily = "Arial, sans-serif"; 
    
        container.innerHTML = `
            <h1 style="font-size: 16px; font-weight: bold; margin-bottom: 10px; text-align: center;">Suspended Merchants Report</h1>
            ${data.data
                .map(
                    (item, index) =>
                        `<p style="font-size: 12px; margin: 5px 0;">${index + 1}. Name: ${item.fullName}, ID: ${item.id}</p>`
                )
                .join("")}
        `;
    
        document.body.appendChild(container);
    
        const doc = new jsPDF();
        let yPosition = 10;
    
        doc.text("Pending Users Report", 10, yPosition);
        yPosition += 10;
    
        data.data.forEach((item, index) => {
            doc.text(`${index + 1}. Name: ${item.fullName}, ID: ${item.id}`, 10, yPosition);
            yPosition += 10;
        });

        const containerHeight = container.scrollHeight;
        container.style.height = `${containerHeight}px`;
    
        if (format === "pdf") {
            doc.save("pending_users.pdf");
        } 
        
        if (format === "png") {
            const canvas = await html2canvas(container, {
                scale: 2, 
                scrollX: 0, 
                scrollY: 0,
                useCORS: true, // Handle cross-origin issues if any
            });
    
            const imgData = canvas.toDataURL("image/png"); // Generate PNG data URI
    
            const link = document.createElement("a");
            link.href = imgData;
            link.download = "pending_users.png";
            link.click();
    
            document.body.removeChild(container);
        }
    };

    const downloadSuspendedPdfOrPng = async (data: ISuspendedUserRes, format: string) => {
        const container = document.createElement("div");
        container.style.position = "relative";
        container.style.top = "-9999px"; 
        container.style.left = "-9999px";
        container.style.width = "800px"; 
        container.style.padding = "20px"; 
        container.style.paddingTop = "-40px";
        container.style.marginBottom = "20px";
        container.style.background = "white"; 
        container.style.fontFamily = "Arial, sans-serif"; 
    
        container.innerHTML = `
            <h1 style="font-size: 16px; font-weight: bold; margin-bottom: 10px; text-align: center;">Suspended Merchants Report</h1>
            ${data.data
                .map(
                    (item, index) =>
                        `<p style="font-size: 12px; margin: 5px 0;">${index + 1}. Name: ${item.fullName}, ID: ${item.id}</p>`
                )
                .join("")}
        `;
    
        document.body.appendChild(container);
    
        const doc = new jsPDF();
        let yPosition = 10;
    
        doc.text("Suspended Users Report", 10, yPosition);
        yPosition += 10;
    
        data.data.forEach((item, index) => {
            doc.text(`${index + 1}. Name: ${item.fullName}, ID: ${item.id}`, 10, yPosition);
            yPosition += 10;
        });

        const containerHeight = container.scrollHeight;
        container.style.height = `${containerHeight}px`;
    
        if (format === "pdf") {
            doc.save("suspended_users.pdf");
        } 
        
        if (format === "png") {
            const canvas = await html2canvas(container, {
                scale: 2, 
                scrollX: 0, 
                scrollY: 0,
                useCORS: true, // Handle cross-origin issues if any
            });
    
            const imgData = canvas.toDataURL("image/png"); // Generate PNG data URI
    
            const link = document.createElement("a");
            link.href = imgData;
            link.download = "suspended_users.png";
            link.click();
    
            document.body.removeChild(container);
        }
    };

    const downloadFiles = (data: IPendingUserRes, formats: string[]) => {
        formats.forEach(format => {
            if (format === 'csv') {
                downloadCsv(data);
            }
            
            if (format === 'pdf' || format === 'png') {
                downloadPdfOrPng(data, format);
            }
        });
    };

    const downloadSuspendedFiles = (data: ISuspendedUserRes, formats: string[]) => {
        formats.forEach(format => {
            if (format === 'csv') {
                downloadSuspendedCsv(data);
            }
            
            if (format === 'pdf' || format === 'png') {
                downloadSuspendedPdfOrPng(data, format);
            }
        });
    };

    return (
        <Flex justifyContent="center" alignItems="center">
            <Box
                width="100%"
                height="57px"
                border="none"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <TotalBox total={total} isLoading={isLoading}/>

                <Box h="100%" gap="24px" display="flex" justifyContent="space-evenly" alignItems="center">
                    
                    <Box position="relative">
                        <DownloadButton
                            text="Download"
                            fontSize="16px"
                            fontWeight={500}
                            lineHeight="24px"
                            textAlign="center"
                            color="#344256"
                            onClick={onToggleTwo}
                        />
                        {isOpenTwo && (
                            <Box position="absolute" top="0" left="0px" zIndex="10">
                                {choose === 'pending' ? (
                                    <DownloadBox onClose={onCloseTwo} onDownload={handleDownload} />
                                ) : (
                                    <DownloadBox onClose={onCloseTwo} onDownload={handleSuspendedDownload} />
                                )}
                            </Box>
                        )}
                    </Box>
                    <SearchInput value={searchValue} onChange={onSearchChange}/>
                    <Box position="relative">
                        <FilterButton onClick={onToggleOne} />
                        {isOpenOne && (
                            <Box position="absolute" top="0" right="5px" zIndex="10">
                                <SelectFilterBox type={type} onFilterChange={onFilterChange} onClose={onCloseOne} />
                            </Box>
                        )}
                    </Box>
                </Box>

            </Box>
        </Flex>
    );
};

export default TopInfoBox;


import {StackProps} from "@chakra-ui/react";

export interface IAnalyticsCardProps extends StackProps {
   title: string;
   value: string;
   isLoading?: boolean;

}
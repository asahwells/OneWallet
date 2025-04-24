import { Badge, type BadgeProps } from "@chakra-ui/react"
import CheckIcon from "components/atoms/icons/CheckIcon"
import FailedStatusIcon from "components/atoms/icons/FailedStatusIcon"
import PendingStatusIcon from "components/atoms/icons/PendingStatusIcon"
import { StatusBadgeProps } from "../buttons/interfaces"

const StatusBadge = ({ status, ...badgeProps }: StatusBadgeProps) => {
  // Define status configurations
  const statusConfig = {
    approved: {
      text: "Approved",
      icon: <CheckIcon />,
      color: "#22C55E",
      bg: "#F0FDF4",
      borderColor: "#22C55E",
    },
    pending: {
      text: "Pending",
      icon: <PendingStatusIcon />,
      color: "#C5B27D",
      bg: "#FAF8F3",
      borderColor: "#C5B27D",
    },
    pendingV: {
        text: "Pending - Not Verified",
        icon: <PendingStatusIcon />,
        color: "#C5B27D",
        bg: "#FAF8F3",
        borderColor: "#C5B27D",
      },
    failed: {
      text: "Failed",
      icon: <FailedStatusIcon />,
      color: "#EF4444",
      bg: "#FEF2F2",
      borderColor: "#EF4444",
    },
  }

  const config = statusConfig[status]

  return (
    <Badge
      bg={config?.bg}
      h={"48px"}
      w={"167px"}
      gap={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={3}
      py={1}
      color={config?.color}
      border={`1px solid ${config?.borderColor}`}
      borderRadius="8px"
      {...badgeProps}
    >
      {config?.icon}
      {config?.text}
    </Badge>
  )
}

export default StatusBadge

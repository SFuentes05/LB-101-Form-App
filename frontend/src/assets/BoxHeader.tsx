import { Box, Typography, Link } from "@mui/joy";
import React from "react";
import FlexBetween from "./FlexBetween";

type Props = {
  title: string;
  icon?: React.ReactNode;
  route: string;
};

const BoxHeader = ({ icon, title, route }: Props) => {
  return (
    <Box sx={{ padding: "0.4rem 1rem", color: "#ffffff", display: "flex", flexDirection: "column" }}>
      <FlexBetween sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ fontSize: "1.5rem", marginRight: "0.5rem" }}>
            {icon}
          </Box>
          <Typography fontSize="14px" fontWeight="600" fontFamily="Inter">
            {title}
          </Typography>
        </Box>
        <Link href={route} fontWeight="500" sx={{ fontSize: "12px", textDecoration: "none", color: "#000", fontFamily: "Inter" }}>
          Ver más
        </Link>
      </FlexBetween>
    </Box>
  );
};

export default BoxHeader;

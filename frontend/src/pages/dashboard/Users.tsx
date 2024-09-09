import BoxHeader from "../../assets/BoxHeader";
import DashboardBox from "../../assets/DashboardBox";
import PeopleIcon from '@mui/icons-material/People';
import { Box, Typography } from "@mui/joy";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import Data from "../../assets/Data";
import UserTable from "../../assets/UserTable";

const Users = () => {
  return (
    <>
      <DashboardBox gridArea="e">
        <BoxHeader
          icon={
            <Box sx={{ fontSize: '16px', color: "#000000", alignItems: "center", marginTop: "0.2rem" }}>
              <PeopleIcon fontSize="inherit" />
            </Box>
          }
          title="Editar equipo"
          route="./user/myprofile"
        />
        <UserTable />
      </DashboardBox>
    </>
  );
};

export default Users;

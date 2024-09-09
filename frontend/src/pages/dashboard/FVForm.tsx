import { Area, AreaChart, ResponsiveContainer } from "recharts";
import BoxHeader from "../../assets/BoxHeader";
import DashboardBox from "../../assets/DashboardBox";
import FlexBetween from "../../assets/FlexBetween";
import SolarPowerIcon from '@mui/icons-material/SolarPower';;
import { Box, Typography } from "@mui/joy";
import Data from "../../assets/Data";
import Data3 from "../../assets/Data3";

const FVForm = () => {
    const questionsAnswered = 15
    const questionsRemaining = 13
  return (
    <>
      <DashboardBox gridArea="c">
        <BoxHeader
          icon={
            <Box sx={{ fontSize: '16px', color: "#000000", alignItems:"center", marginTop:"0.2rem"}}>
                <SolarPowerIcon fontSize="inherit"/>
            </Box>
        }
          title="Formulario Fotovoltaico"
          route="./101-form/industrial-process"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '1rem'}}>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '50%' }}>
            <Typography fontSize="30px" fontWeight="500" fontFamily="Inter">{questionsAnswered} / {questionsAnswered + questionsRemaining} <Typography fontSize="12px" fontWeight="semibold" fontFamily="Inter">preguntas</Typography> </Typography>
          </Box>
          <Box sx={{ width: '50%', height: '50px', margin: '0rem 1rem', padding: '0.5rem 0rem'}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={200}
                height={60}
                data={Data3}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#00ff62"
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="95%"
                      stopColor="#00ff51"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="uv" stroke="#25fc57" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </DashboardBox>
    </>
  );
};

export default FVForm;
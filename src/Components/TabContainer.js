import React, { useState } from "react";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ActionPanel from './ActionPanel'
import GraphPanel from './GraphPanel'
import HeroFeedbackPanel from "./HeroFeedbackPanel";
import ControlPanel from "./ActionControlPanel";
import Grid from '@mui/material/Grid';
import CameraPane from "./CameraPane";

export default function TabContainer({driveMode, updateDriveMode}){


    //set tab initial view on page load to graph
    const [tabValue, setTabValue] = React.useState("graph");

    //function handler that switches
    const handleTabSwitch = (event, newValue) => {
        setTabValue(newValue);
    };

    //Component for Tab Panel that is associated with a tab
    //make tab panel visible based on what tab is selected
    function TabPanel(props) {
        const { children, value, index} = props;
      
        return (
          <div
            hidden={value !== index}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
    }

    return(
        // <div>
        //     <Tabs
        //         value={tabValue}
        //         onChange={handleTabSwitch}
        //     >
        //         <Tab value="graph" label="Graphs"/>
        //         <Tab value="action" label="Actions"/>
        //     </Tabs>
        //     <TabPanel value={tabValue} index="graph">
        //         <GraphPanel/>
        //     </TabPanel>
        //     <TabPanel value={tabValue} index="action">
        //         <ActionPanel/>
        //     </TabPanel>
        // </div>

        <Grid container spacing={2}>
          {(driveMode=="dd" || driveMode=="autonomy") && 
            <div>
              <Grid xs={8}>
                <ActionPanel driveMode={driveMode} />
              </Grid>
              <Grid xs={4}>
                <HeroFeedbackPanel />
              </Grid>
              <Grid xs={6}>
                <CameraPane />
              </Grid>
              <Grid xs={6}>
                <GraphPanel />
              </Grid>
            </div>
          }
        </Grid>
    );
}
import React, { useState } from "react";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import TextEdit from './TextEdit'
import GraphPanel from './GraphPanel'

export default function TabContainer(){

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
        <div>
            <Tabs
                value={tabValue}
                onChange={handleTabSwitch}
            >
                <Tab value="graph" label="Graphs"/>
                <Tab value="action" label="Actions"/>
            </Tabs>
            <TabPanel value={tabValue} index="graph">
                <GraphPanel/>
            </TabPanel>
            <TabPanel value={tabValue} index="action">
                <TextEdit/>
            </TabPanel>
        </div>
    );
}
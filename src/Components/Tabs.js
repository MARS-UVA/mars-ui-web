import React from 'react';
import TabPanel from '@mui/material/TabPanel';
import TabList from '@mui/material/Tab';

export default function Tabs(){
    return(
        <div>
            <TabList>
                <Tab label="Item One" value="1" />
                <Tab label="Item Two" value="2" />
            </TabList>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
        </div>
    );
}
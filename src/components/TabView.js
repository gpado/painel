import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function TabView({labels, painelContents, handleChange, tabSelected}) {

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabSelected} onChange={handleChange}>
			{labels.map((currentLabel, index) => <Tab label={currentLabel} id={index} />)}
        </Tabs>
      </Box>
	  {painelContents.map((currentPainel, index) => (
		<CustomTabPanel value={tabSelected} index={index}>
			{currentPainel}
		</CustomTabPanel>
	  ))}
    </Box>
  );
}
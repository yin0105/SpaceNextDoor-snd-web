import { Box } from '@material-ui/core';

interface ITabPanelProps {
  children?: React.ReactNode;
  index?: string | number;
  value: string | number;
}

const TabPanel: React.FC<ITabPanelProps> = ({
  children,
  value,
  index,
  ...other
}: ITabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`nav-tabpanel-${index}`}
    aria-labelledby={`nav-tab-${index}`}
    {...other}
  >
    <Box p={3}>
      {children}
    </Box>
  </div>
);

export default TabPanel;

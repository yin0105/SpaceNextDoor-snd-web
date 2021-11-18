import { Tab } from '@material-ui/core';

const a11yProps = (index: any) => ({
  id: `nav-tab-${index}`,
  'aria-controls': `nav-tabpanel-${index}`,
});

interface LinkTabProps {
  label?: string;
  href?: string;
  index: any;
}

const LinkTab: React.FC<any> = ({ index, ...props }: LinkTabProps) => (
  <Tab
    component="a"
    onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
    }}
    wrapped
    {...a11yProps(index)}
    {...props}
    id={props.label}
  />
);

export default LinkTab;

import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion  elevation={0} square {...props} />
))(({ theme }) => ({
  
  
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(0),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  
}));

export default function CustomizedAccordions({ freelancerDetails }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    
    <div className=' flex items-center ml-40'>
      <div className='w-[40vw] '>
      {Object.entries(freelancerDetails).map(([category, details], index) => (
        
        <Accordion
          key={category}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          
        >
          <div className='bg-red-100'>
          <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
            <div className='flex items-center justify-center w-full '>
            <h1 className='text-black  py-2 px-6 focus:outline-none rounded'>{category}</h1>
            </div>
          </AccordionSummary>
          </div>
          <div className='bg-gradient-to-r from-blue-100 to-blue-200'>
          <AccordionDetails>
            <div className=''>
            
            <div className='flex flex-wrap w-full gap-4 my-4 '>
              {details.subcategories.map((sub, idx) => (
                <h4 className=" text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded" key={idx}>{sub}</h4>
              ))}
            </div>
            {details.cameraDetails && (
              <div>
                <h1 className='text-gray-900 text-3xl title-font font-medium mb-1 broder-b-4 border-black'>Camera details</h1>
                <ul>
                  {Object.entries(details.cameraDetails).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                  ))}
                </ul>
              </div>
            )}
            </div>
          </AccordionDetails>
          </div>
        </Accordion>
        
      ))}
      </div>
    </div>
  );
}

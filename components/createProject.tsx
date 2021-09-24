import { useState, Fragment } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  Container,
  Paper,
} from '@mui/material'
import { makeStyles, useTheme, Theme, createStyles } from '@mui/material/styles';
import {  Mail as MailIcon,
  MoveToInbox as InboxIcon,
  Public as PublicIcon,
  AssignmentIndOutlined as AssignmentIndOutlinedIcon,
  HomeWorkOutlined as HomeWorkOutlinedIcon,
  NextWeekOutlined as NextWeekOutlinedIcon,
  WorkOutlineOutlined as WorkOutlineOutlinedIcon,
  ArchiveOutlined as ArchiveOutlinedIcon,
  QuestionAnswerOutlined as QuestionAnswerOutlinedIcon,
  ExpandLess, ExpandMore,
} from '@mui/icons-material/';



const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Typography>Hello</Typography>;
    case 1:
      return <Typography>Bye</Typography>;
    case 2:
      return <Typography>Bye2</Typography>;
    default:
      throw new Error('Unknown step');
  }
}


export const CreateProject = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Fragment>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </Fragment>
          )}
        </Fragment>
      </Paper>
    </Container>
  );
}
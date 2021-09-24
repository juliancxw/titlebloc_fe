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
  Grid,
  TextField,
  Divider,
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
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'

import AppLayout from '../../components/appLayout'
import ProjectType from '../../components/createProjectForms/projectType'



const steps = ['Project Type', 'Project Location', 'Project Details', 'Quotation'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <ProjectType/>;
    case 1:
      return <Typography>Bye</Typography>;
    case 2:
      return <Typography>Bye2</Typography>;
    default:
      throw new Error('Unknown step');
  }
}


const CreateProject = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const email = data.get('email')
    const password = data.get('password')
    try {
      const auth = await getAuth();
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user)
   
    }
    catch(error) {
      console.log(error)
    } 
  }



  return (
    <Box>
      <Box mx={theme.spacing(3)} mt={theme.spacing(3)} mb={theme.spacing(1)}>
        <Typography component="h2" variant="h6">
          Create Project
        </Typography>
      </Box>
      <Divider/>
      <Box m={theme.spacing(3)}>
        <Paper elevation={1} sx={{ my: { xs: 2, md: 2 }, p: { xs: 2, md: 3 }, borderRadius:"20px" }}>
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
      </Box>
    </Box>
  );
}

CreateProject.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  )
}



export default  withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER
})(CreateProject)

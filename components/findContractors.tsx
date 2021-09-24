import { Box, Grid, Paper, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import CreateIcon from '@mui/icons-material/Create';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

type Props =  {
  setMainContent: React.Dispatch<React.SetStateAction<string>>;
};



export const FindContractors = ({setMainContent}: Props) => {

  const handleCreateProject = () => {
    setMainContent("CreateProject")
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
         
        </Grid>
        <Grid item xs={4} sx={{textAlign: 'right'}}>
          <Button variant="contained" startIcon={<CreateIcon />} onClick={handleCreateProject}>
            New Project
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
import {
  TextField,
  Autocomplete,
} from '@mui/material'
import { createTheme} from '@mui/material/styles';

import { createFilterOptions } from '@mui/material/Autocomplete';

type Props = {
  projectType: string | null;
  setProjectType: React.Dispatch<React.SetStateAction<string | undefined>>;
};


const projectTypeOptions: readonly string[] = ["RENOVATION", "NEW ERECTION", "RECONSTRUCTION", "ADDITION AND ALTERATION"]


const theme = createTheme();

const filter = createFilterOptions<string>();

export default function ProjectType({projectType, setProjectType}: Props) {

  return (
    <Autocomplete
      value={projectType}
      onChange={(event, newValue) => {
        
          setProjectType(newValue?.toUpperCase());
        
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== '' && !isExisting) {
          filtered.push(inputValue);
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="project-type"
      options={projectTypeOptions}
      // getOptionLabel={projectTypeOptions}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      sx={{
        mr:2,
        width: ()=>{
        if(projectType) return projectType.length + 5 + "ch" 
        else return "200px"
        },
        minWidth:'100px',
        "& .MuiInputBase-root:before":{borderBottom:'3px solid rgba(0, 0, 0, 1)'},
        "& .MuiInputBase-root:after":{borderBottom:'3px solid #e9f65b'}, 
      }}
      freeSolo
      renderInput={(params) => (
        <TextField variant="standard" sx={{'& .MuiAutocomplete-input':{textAlign: 'right'}}} {...params} label="Project Type" />
      )}
    />
  );
}

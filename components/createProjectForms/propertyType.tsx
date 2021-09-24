import {
  TextField,
  Autocomplete,
} from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { createFilterOptions } from '@mui/material/Autocomplete';

type Props = {
  propertyType: string | null;
  setPropertyType: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const propertyTypeOptions: readonly string[] = ["HDB APARTMENT", "CONDO/APARTMENT", "LANDED HOUSE", "COMMERCIAL UNIT"]

const theme = createTheme();

const filter = createFilterOptions<string>();

export default function PropertyType({propertyType, setPropertyType}: Props) {

  return (
    <Autocomplete
      value={propertyType}
      onChange={(event, newValue) => {
        setPropertyType(newValue?.toUpperCase());
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
      id="property-type"
      options={propertyTypeOptions}
      // getOptionLabel={projectTypeOptions}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      sx={{
        mr:2,
        width: ()=>{
        if(propertyType) return propertyType.length + 8 + "ch" 
        else return "200px"
        },
        minWidth: "150px",
        "& .MuiInputBase-root:before":{borderBottom:'3px solid rgba(0, 0, 0, 1)'},
        "& .MuiInputBase-root:after":{borderBottom:'3px solid #e9f65b'}, 
      }}
      freeSolo
      renderInput={(params) => (
        <TextField variant="standard" sx={{'& .MuiAutocomplete-input':{textAlign: 'right'}}} {...params} label="Property Type" />
      )}
    />
  );
}

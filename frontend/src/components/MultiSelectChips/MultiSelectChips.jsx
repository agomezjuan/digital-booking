import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultiSelectChips({ options, control, name }) {
  const theme = useTheme();
  const {
    field: { onChange, value },
  } = useController({ name, control });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };

  return (
    <div>
      <FormControl
        sx={{ width: '100%', backgroundColor: '#fafafa', borderRadius: '1px' }}
      >
        <Select
          labelId='features'
          id='features'
          multiple
          value={value}
          onChange={handleChange}
          sx={{ borderRadius: '1px' }}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((feature) => {
            const { name, icon } = feature;
            return (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, value, theme)}
              >
                <span
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  <ion-icon name={icon}></ion-icon> {name}
                </span>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

MultiSelectChips.propTypes = {
  options: PropTypes.array.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

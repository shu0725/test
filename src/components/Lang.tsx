import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from '@mui/material';

const Lang = () => {
  const { i18n } = useTranslation();
  const handleI18nChange = (event: ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Grid container p={5}>
      <div>The current language is: {i18n.language}</div>
      <Grid item xs={12}>
        <RadioGroup row aria-label="payment-card" name="payment-card" onChange={handleI18nChange}>
          <Grid container spacing={1.75} sx={{ ml: 0 }}>
            <Grid item>
              <FormControlLabel
                control={<Radio value="zh_TW" sx={{ display: 'none' }} />}
                sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
                label={
                  <Stack spacing={1.25} alignItems="center">
                    <Typography variant="caption">zh_TW</Typography>
                  </Stack>
                }
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Radio value="en" sx={{ display: 'none' }} />}
                sx={{ display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
                label={
                  <Stack spacing={1.25} alignItems="center">
                    <Typography variant="caption">en</Typography>
                  </Stack>
                }
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </Grid>
    </Grid>
  );
};

export default Lang;

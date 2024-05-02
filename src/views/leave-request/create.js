import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Formik } from 'formik';
import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';

export default function CreateLeave({ ...others }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <>
      <MainCard title="Create Leave Request" {...others}>
        <Formik
          initialValues={{
            leave_type: '',
            start_date: '',
            end_date: '',
            reason: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            leave_type: Yup.string().required('Leave Type is required'),
            start_date: Yup.date().required('Start Date is required'),
            end_date: Yup.date().required('End Date is required'),
            reason: Yup.string().max(255).required('Reason is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(false);

                // filters
                const wait = setTimeout(async () => {
                  clearTimeout(wait);

                  try {
                    // DISPATCH
                    const response = await dispatch(store({ email: values.email, password: values.password }));
                    console.log(response);
                    if (
                      response.payload &&
                      response.payload.response &&
                      response.payload.response.data &&
                      response.payload.response.data.message
                    ) {
                      setErrors({ submit: response.payload.response.data.message });
                      return;
                    } else if (response.payload && response.payload.message) {
                      setErrors({ submit: response.payload.message });
                    } else if (response.payload && response.payload.data && response.payload.data.token && response.payload.data.user) {
                      const token = response.payload.data.token;
                      const userInfo = response.payload.data.user;

                      authCtx.login({ ...userInfo, ...{ token: token } });

                      // Navigate to '/dashboard' after login
                      setTimeout(() => {
                        navigate('/dashboard');
                      }, 2000);
                    } else {
                      setErrors({ submit: 'Something went wrong' });
                    }
                  } catch (error) {
                    console.log(error);
                  }
                });
              }
            } catch (err) {
              // Set status, errors, and submitting state
              setStatus({ success: false });
              setErrors({ submit: error.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleChange, handleSubmit, isSubmitting, touched }) => (
            <form noValidate onSubmit={handleSubmit} {...others}>
              <Grid container spacing={2}>
                <Grid md={6} xs={12} item>
                  <FormControl fullWidth error={Boolean(touched.leave_type && errors.leave_type)}>
                    <InputLabel id="demo-simple-select-label">Leave Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="leave_type"
                      label="Leave Type"
                      onChange={handleChange}
                    >
                      <MenuItem value={'casual_leave'}>Casual Leave</MenuItem>
                      <MenuItem value={'sick_leave'}>Sick Leave</MenuItem>
                      <MenuItem value={'emergency_leave'}>Emergency Leave</MenuItem>
                    </Select>
                  </FormControl>
                  {touched.leave_type && errors.leave_type && (
                    <FormHelperText error id="standard-weight-helper-text-leave-type">
                      {errors.leave_type}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid md={6} xs={12} item>
                  <FormControl fullWidth error={Boolean(touched.start_date && errors.start_date)}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        id="start_date"
                        label="Start Date"
                        name="start_date"
                        value={startDate}
                        onChange={(newValue) => {
                          setStartDate(newValue);
                          handleChange({ target: { name: 'start_date', value: newValue } });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    {touched.start_date && errors.start_date && (
                      <FormHelperText error id="standard-weight-helper-text-start-date">
                        {errors.start_date}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid md={6} xs={12} item>
                  <FormControl fullWidth error={Boolean(touched.end_date && errors.end_date)}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        id="end_date"
                        label="End Date"
                        name="end_date"
                        value={endDate}
                        onChange={(newValue) => {
                          setEndDate(newValue);
                          handleChange({ target: { name: 'end_date', value: newValue } });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    {touched.end_date && errors.end_date && (
                      <FormHelperText error id="standard-weight-helper-text-start-date">
                        {errors.end_date}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}

                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button
                      o
                      n
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                    >
                      Sign in
                    </Button>
                  </AnimateButton>
                </Box>
              </Grid>
            </form>
          )}
        </Formik>
      </MainCard>
    </>
  );
}

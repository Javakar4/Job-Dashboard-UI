import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem,
  Button, InputLabel, FormControl, Grid, Box, Typography
} from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const borderedInputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontFamily: 'Satoshi',
    height: '45px',
    '& input': {
      padding: '10px 12px',
    },
    '& fieldset': {
      borderColor: '#BCBCBC',
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: '#222222',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#222222',
    },
  },
  '& .MuiOutlinedInput-input': {
    fontFamily: 'Satoshi',
  },
};

const borderedSelectStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    fontSize: '14px',
    height: '48px',
    fontFamily: 'Satoshi',
    paddingRight: '32px',
    '& .MuiSelect-select': {
      padding: '10px 12px',
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiSelect-select em': {
      fontStyle: 'normal',
      color: '#A9A9A9',
    },
    '& fieldset': {
      borderColor: '#BCBCBC',
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: '#222222',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#222222',
    },
  },
};

const JobDialog = ({ open, handleClose }) => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    logo: null,
    description: ''
  });

  const handleChange = (field) => (event) => {
    setJobDetails({ ...jobDetails, [field]: event.target.value });
  };

  const handleFileChange = (e) => {
    setJobDetails({ ...jobDetails, logo: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      for (const key in jobDetails) {
        formData.append(key, jobDetails[key]);
      }

      const response = await fetch('http://localhost:4000/api/jobs', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Error: ' + errorData.error);
        return;
      }

      const result = await response.json();
      alert('Success: ' + result.message);
      handleClose();
    } catch (error) {
      alert('Network error');
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          width: '848px',
          height: '779px',
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
          fontFamily: 'Satoshi',
          boxShadow: '0px 0px 24px 0px #A9A9A940',
          padding: '10px',
        }
      }}
    >
      <DialogTitle fontFamily={'Satoshi'}>
        <Typography fontWeight="700" fontSize="24px" textAlign="center" fontFamily={'Satoshi'}>
          Create Job Openings
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          {/* Row 1 */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item size={6} >
              <InputLabel sx={{ fontWeight: '600', fontFamily: 'Satoshi' }}>Job Title</InputLabel>
              <TextField
                placeholder="e.g. Full Stack Developer"
                fullWidth
                variant="outlined"
                value={jobDetails.title}
                onChange={handleChange('title')}
                sx={{...borderedInputStyle, mt: 0.5, }}
              />
            </Grid>
            <Grid item size={6}>
              <InputLabel sx={{ fontWeight: '600', fontFamily: 'Satoshi' }}>Company Name</InputLabel>
              <TextField
                placeholder="e.g. Amazon"
                fullWidth
                variant="outlined"
                value={jobDetails.company}
                onChange={handleChange('company')}
                sx={{...borderedInputStyle, mt: 0.5, }}
              />
            </Grid>
          </Grid>

          {/* Row 2 */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item size={6}>
              <InputLabel sx={{ fontWeight: '600', fontFamily: 'Satoshi'}}>Location</InputLabel>
              <FormControl fullWidth variant="outlined" sx={{...borderedSelectStyle, mt: 0.5 }}>
                <Select
                  value={jobDetails.location}
                  onChange={handleChange('location')}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Select location' }}
                >
                  <MenuItem value=""><em>Select Location</em></MenuItem>
                  <MenuItem value="Chennai">Chennai</MenuItem>
                  <MenuItem value="Bangalore">Bangalore</MenuItem>
                  <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item size={6}>
              <InputLabel sx={{ fontWeight: '600', fontFamily: 'Satoshi' }}>Job Type</InputLabel>
              <FormControl fullWidth variant="outlined" sx={{...borderedSelectStyle, mt: 0.5 }}>
                <Select
                  value={jobDetails.type}
                  onChange={handleChange('type')}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Select job type' }}
                >
                  <MenuItem value=""><em>Select Job Type</em></MenuItem>
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Part Time">Part Time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Row 3 (Changed) */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item size={6}>
              <InputLabel sx={{ fontWeight: '600', fontFamily: 'Satoshi' }}>Salary (in LPA)</InputLabel>
              <TextField
                placeholder="e.g. 12"
                type="number"
                fullWidth
                variant="outlined"
                value={jobDetails.salary}
                onChange={handleChange('salary')}
                sx={{...borderedSelectStyle, mt: 0.5 }}
              />
            </Grid>
            <Grid item size={6}>
              <InputLabel sx={{ fontWeight: '600', fontFamily: 'Satoshi' }}>Logo</InputLabel>
              <TextField
                type="file"
                inputProps={{ accept: 'image/*' }}
                fullWidth
                variant="outlined"
                onChange={handleFileChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    fontFamily: 'Satoshi',
                    height: '48px',
                    padding: '6px',
                    marginTop: '4.5px',
                    color: '#BCBCBC',
                    '& fieldset': {
                      borderColor: '#BCBCBC',
                      borderWidth: '1px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#222222',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#222222',
                    },
                  },
                  '& input': {
                    fontFamily: 'Satoshi',
                  }
                }}
              />
            </Grid>
          </Grid>

          {/* Row 4 */}
          <InputLabel sx={{ fontWeight: '600', fontFamily: 'Satoshi' }}>Job Description</InputLabel>
          <TextField
            placeholder="Enter detailed job description here..."
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={jobDetails.description}
            onChange={handleChange('description')}
            sx={{
              ...borderedInputStyle,
              mb: 2,
              mt: 1,
              '& .MuiOutlinedInput-root': {
                ...borderedInputStyle['& .MuiOutlinedInput-root'],
                minHeight: '150px',
                alignItems: 'start',
                '& textarea': {
                  fontFamily: 'Satoshi',
                  fontSize: '16px',
                  padding: '4px',
                  lineHeight: '1.6',
                },
              },
            }}
          />

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              endIcon={<KeyboardDoubleArrowDownIcon />}
              sx={{
                mt: 2,
                borderColor: '#222222',
                color: 'black',
                width: '150px',
                fontWeight: 'bold',
                borderRadius: '10px',
                fontFamily: 'Satoshi',
                textTransform: 'capitalize',
                boxShadow: '0px 0px 4px 0px #00000040',
                '&:hover': {
                  backgroundColor: '#00AAFF',
                  color: 'white',
                  borderColor: '#00AAFF',
                },
              }}
            >
              Save Draft
            </Button>
            <Button
              variant="outlined"
              endIcon={<KeyboardDoubleArrowRightIcon />}
              sx={{
                mt: 2,
                borderColor: '2px solid #00AAFF',
                color: 'white',
                backgroundColor: '#00AAFF',
                width: '150px',
                fontWeight: 'bold',
                borderRadius: '10px',
                fontFamily: 'Satoshi',
                textTransform: 'capitalize',
                boxShadow: '0px 0px 4px 0px #00000040',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: '1px solid black',
                },
              }}
              onClick={handleSubmit}
            >
              Publish
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default JobDialog;

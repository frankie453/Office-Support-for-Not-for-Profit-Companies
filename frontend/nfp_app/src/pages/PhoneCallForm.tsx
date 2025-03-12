import React, {useState} from "react";
import { Button,TextField, FormControl, Select, InputLabel, MenuItem, Box, Typography, SelectChangeEvent } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";


function PhoneCallForm(){

    //initialize form data
    const [formData, setFormData] = useState({
        issue: "",
        callTransferredTo: "",
        callType: "",
        firstName: "",
        lastName: "",
        email: "",
        notes: "",
        date: null as Date | null
     });

     const [errors, setErrors] = useState<{ [key: string]: string }>({});


    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> |SelectChangeEvent<string>) => {
        const {name, value} = e.target;
        setFormData({ ...formData,[name]: value});

        // clear the error for this fied
        setErrors((prev) => ({ ...prev, [name]: "" }));
     }; 

     const handleDateChange = (date: any) => {
        if (!date) { //if date empty
            setFormData({ ...formData, date: null }); 
            return;
        }
        const formattedDate = date.format("YYYY-MM-DD"); //ensure the date is in the right format
        setFormData({ ...formData, date: formattedDate });
    };

     const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if(!formData.issue) newErrors.issue = "Issue is required";
        if(!formData.callTransferredTo) newErrors.callTransferredTo = "Call Transferred To is required";
        if(!formData.callType) newErrors.callType = "Call Type is required";
        if(!formData.email) newErrors.email = "Email is required";
        if(!formData.date) newErrors.date = "Date is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length == 0;  // return true if no errors
     };

     
    
    //Logic to reset the form 
    const handleReset = () => {
        setFormData({
            issue: "",
            callTransferredTo: "",
            callType: "",
            firstName: "",
            lastName: "",
            email: "",
            notes: "",
            date: null 
            });
        setErrors({});
    };

  // Logic to handle form submission, check if the form is valid before submitting
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(validateForm()) {
      try {
        //post request 
        const response = await axios.post("http://127.0.0.1:8000/api/form/calls/", formData, {
            headers: { "Content-Type": "application/json" },
        });
        alert("Form submitted successfully!");
        console.log("Response:", response.data);
        handleReset(); // reset form after submission
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit form. Please try again.");
    }

    }
  };
  
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{padding: '20px', maxWidth: '500px', margin: 'auto', backgroundColor: '#f9f5ff', borderRadius: '8px'}}>

            
            <Typography variant="h5" align="center"> Phone call form</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Call Issue/Reason *</InputLabel>
                    <Select
                      name="issue"
                      value={formData.issue} 
                      onChange={handleChange}
                      error={!!errors.issue}  
                    >
                        <MenuItem value="">Select Issue</MenuItem>
                        <MenuItem value="counselling">Counselling</MenuItem>
                        <MenuItem value="business">Business</MenuItem>
                        <MenuItem value="general">General</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Call Transferred to *</InputLabel>
                    <Select
                       name="callTransferredTo"
                       value={formData.callTransferredTo}
                       onChange={handleChange}
                       error={!!errors.callTransferredTo}
                    >
                        <MenuItem value="">Select Employee</MenuItem>
                        <MenuItem value="employee1">Employee 1</MenuItem>
                        <MenuItem value="employee2">Employee 2</MenuItem>
                        <MenuItem value="employee3">Employee 3</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                <InputLabel>Type of Call *</InputLabel>
                    <Select
                       name="callType"
                       value={formData.callType}
                       onChange={handleChange}
                       error={!!errors.callType}
                    >
                        <MenuItem value="">Select Call Type</MenuItem>
                        <MenuItem value="incoming">Incoming</MenuItem>
                        <MenuItem value="outgoing">Outgoing</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{display: 'flex', gap: 2, marginTop: '16px'}}> 
                    <TextField
                       fullWidth
                       label= "First Name *"
                       name="firstName"
                       value={formData.firstName}
                       onChange={handleChange}
                       error={!!errors.firstName}
                       helperText={errors.firstName}
                    />
                    <TextField
                       fullWidth
                       label= "Last Name *"
                       name="lastName"
                       value={formData.lastName}
                       onChange={handleChange}
                       error={!!errors.lastName}

                    />
                </Box>

                <TextField
                   fullWidth
                   label="Customer Email Address"
                   name="email"
                   value={formData.email}
                   margin="normal"    
                   onChange={handleChange}
                   error={!!errors.email}
        
                />

                <TextField
                   fullWidth
                   label="Notes"
                   name="notes"
                   value={formData.notes}
                   multiline
                   rows={5}  
                   margin="normal" 
                   onChange={handleChange}
        
                />

                <DatePicker
                    label="Call Date *"
                    value={formData.date ? dayjs(formData.date) : null}
                    onChange={handleDateChange}
                    format="MM/DD/YYYY" 
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            margin: "normal",
                            error: !!errors.date,
                            helperText:errors.date,
                        }

                    }}
                />
                <Box sx={{display: 'flex', gap: 2, marginTop: '16px'}}>
                    <Button type="submit" variant="contained" color="primary" fullWidth> 
                        Save Form 
                    </Button>
                    <Button type="button" variant="contained" color="secondary" onClick={handleReset} fullWidth>
                        Clear Form
                    </Button>
                </Box>
            </form>

            </Box>
        </LocalizationProvider>
    );
}
export default PhoneCallForm;
import React, {useState} from "react";
import { Button,TextField, FormControl, Select, InputLabel, MenuItem, Box, Typography, SelectChangeEvent } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function InPersonForm(){

    //initialize form data
    const [formData, setFormData] = useState({
        visitPurpose: "",
        taskTransferredTo: "",
        firstName: "",
        lastName: "",
        email: "",
        notes: "",
        whoTookPart: "",
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
        setFormData({ ...formData, date });
     };

     const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if(!formData.visitPurpose) newErrors.visitPurpose = "Visit Purpose is required";
        if(!formData.taskTransferredTo) newErrors.taskTransferredTo = "Task Transferred To is required";
        if(!formData.email) newErrors.email = "Email is required";
        if(!formData.date) newErrors.date = "Date is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length == 0;  // return true if no errors
     };
    
    //Logic to reset the form 
    const handleReset = () => {
        setFormData({
            visitPurpose: "",
            taskTransferredTo: "",
            firstName: "",
            lastName: "",
            email: "",
            notes: "",
            whoTookPart: "",
            date: null as Date | null
            });
        setErrors({});
    };

    // Logic to handle form submission, check if the form is valid before submitting
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()){
            console.log(formData);
            alert("Form submitted successfully!");
        }
    };

  
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{padding: '20px', maxWidth: '500px', margin: 'auto', backgroundColor: '#F9F0F0', borderRadius: '8px'}}>

            
            <Typography variant="h5" align="center"> Phone call form</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Visit purpose *</InputLabel>
                    <Select
                      name="visitPurpose"
                      value={formData.visitPurpose} 
                      onChange={handleChange}
                      error={!!errors.visitPurpose}  
                    >
                        <MenuItem value="">Select purpose</MenuItem>
                        <MenuItem value="counselling">Counselling</MenuItem>
                        <MenuItem value="business">Business</MenuItem>
                        <MenuItem value="general">General</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>Task Transferred to *</InputLabel>
                    <Select
                       name="taskTransferredTo"
                       value={formData.taskTransferredTo}
                       onChange={handleChange}
                       error={!!errors.taskTransferredTo}
                    >
                        <MenuItem value="">Select Employee</MenuItem>
                        <MenuItem value="employee1">Employee 1</MenuItem>
                        <MenuItem value="employee2">Employee 2</MenuItem>
                        <MenuItem value="employee3">Employee 3</MenuItem>
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

                <FormControl fullWidth margin="normal">
                    <InputLabel> Who took parts</InputLabel>
                    <Select
                       name="whoTookPart"
                       value={formData.whoTookPart}
                       onChange={handleChange}
                    >
                        <MenuItem value="">Select Employee</MenuItem>
                        <MenuItem value="employee1">Employee 1</MenuItem>
                        <MenuItem value="employee2">Employee 2</MenuItem>
                        <MenuItem value="employee3">Employee 3</MenuItem>
                    </Select>
                </FormControl>

                <DatePicker
                    label="Date of meeting *"
                    value={formData.date}
                    onChange={handleDateChange}
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
                    <Button type="button" variant="contained" color="error" onClick={handleReset} fullWidth>
                        Clear Form
                    </Button>
                </Box>
            </form>

            </Box>
        </LocalizationProvider>
    );
}
export default InPersonForm;
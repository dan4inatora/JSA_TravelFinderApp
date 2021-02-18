import React, {useState, useEffect} from 'react';
import {useStyles, valueLabelFormat, BudgetSlider} from '../onboarding/onboarding.exports';
import {Typography, Container} from '@material-ui/core';
import { DateRangePicker } from "materialui-daterange-picker";


const DestinationFilters = (props) => {
    const {budgetValue, setBudgetValue, setDateRange} = props;
    const [open, setOpen] = useState(true);
    
    const toggle = () => setOpen(true);

    const handleBudgetSliderChange = (event, newValue) => {
        setBudgetValue(newValue);
    }

    return (
        <Container component="main" maxWidth="md">
            <Typography variant="h6" gutterBottom>
                Select your budget and the dates for your travel
            </Typography>
            {/* <BudgetSlider name="budgetSlider" valueLabelDisplay="on" value={budgetValue}
                min={500}
                step={100}
                max={10000}
                defaultValue={[20, 40]}
                valueLabelFormat={valueLabelFormat}
                onChange={handleBudgetSliderChange}
                />
            <DateRangePicker
                open={true}
                toggle={toggle}
                onChange={(range) => setDateRange(range)}
                /> */}
        </Container>
    )
}

export default DestinationFilters;
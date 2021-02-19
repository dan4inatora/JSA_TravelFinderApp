import React, {useState, useEffect} from 'react';
import {valueLabelFormat, BudgetSlider} from '../onboarding/onboarding.exports';
import {Typography, Container, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio} from '@material-ui/core';
import { DateRangePicker } from "materialui-daterange-picker";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        marginBottom: '3rem',
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textRoot: {
        width: '50%'
    },
    submit: {
        margin: '20px auto',
    },
    filtersContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftDiv: {
        width: '40%'
    },
    formLabel: {
        fontFamily: "Garamond Helvetica sans-serif"
    },
    nearbyLabel: {
        fontFamily: "Garamond Helvetica sans-serif"
    }
}));

const DestinationFilters = (props) => {
    const classes = useStyles();
    const {budgetValue, setBudgetValue, setDateRange} = props;
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState('pointOfInterest');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    const toggle = () => setOpen(true);

    const handleBudgetSliderChange = (event, newValue) => {
        setBudgetValue(newValue);
    }

    return (
        <Container component="main" maxWidth="xl">
            <Typography variant="h4" gutterBottom className={classes.nearbyLabel}>
                See what's nearby?
            </Typography>
            <div className={classes.filtersContainer}>
                <div className={classes.leftDiv}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="travel-types" name="travelType" className={classes.radioGroup} value={value} onChange={handleChange}>
                            <FormControlLabel className={classes.formLabel} value="pointsOfInterest" control={<Radio />} label="Point of Interest" />
                            <FormControlLabel className={classes.formLabel} value="tours" control={<Radio />} label="Tours and Activities" />
                            <FormControlLabel className={classes.formLabel} value="hotels" control={<Radio />} label="Hotels and Accomodation" />
                        </RadioGroup>
                    </FormControl>
                    <BudgetSlider name="budgetSlider" valueLabelDisplay="on" value={budgetValue}
                        min={500}
                        step={100}
                        max={10000}
                        defaultValue={[20, 40]}
                        valueLabelFormat={valueLabelFormat}
                        onChange={handleBudgetSliderChange}
                        />
                </div>
                <DateRangePicker
                    open={true}
                    toggle={toggle}
                    onChange={(range) => setDateRange(range)}
                    />
            </div>
        </Container>
    )
}

export default DestinationFilters;
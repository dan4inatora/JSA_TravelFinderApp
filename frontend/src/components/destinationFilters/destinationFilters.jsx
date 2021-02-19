import React, {useState, useEffect} from 'react';
import {valueLabelFormat, BudgetSlider} from '../onboarding/onboarding.exports';
import {Typography, Container, FormControl, Fade, FormLabel, Popper, TextField, FormControlLabel, RadioGroup, Radio} from '@material-ui/core';
import { DateRangePicker } from "materialui-daterange-picker";
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

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
    rightDiv: {
        width: '40%'
    },
    formLabel: {
        fontFamily: "Garamond Helvetica sans-serif"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    nearbyLabel: {
        fontFamily: "Garamond Helvetica sans-serif"
    },
    popper: {
        zIndex: '100'
    }
}));

const DestinationFilters = (props) => {
    const classes = useStyles();
    const {budgetValue, setBudgetValue, dateRange, setDateRange, selectedRadioButton, setValue} = props;
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleFocusTextField = (event) => {
        setOpen(true);
        setAnchorEl(anchorEl ? null : event.currentTarget);
        console.log(dateRange);
    }
    
    const toggle = () => {
        if(open) {
            setAnchorEl(null);
        }
        setOpen(!open);
    }

    const handleBudgetSliderChange = (event, newValue) => {
        setBudgetValue(newValue);
    }

    const convertDate = (range) => {
        let startDate = moment(new Date(range.startDate)).format("DD/MM/YYYY");
        let endDate = moment(new Date(range.endDate)).format("DD/MM/YYYY");

        setDateRange({startDate, endDate});
        setTimeout(() => {
            toggle();
        }, 300);
    }

    return (
        <Container component="main" maxWidth="xl">
            <Typography variant="h4" gutterBottom className={classes.nearbyLabel}>
                See what's nearby?
            </Typography>
            <div className={classes.filtersContainer}>
                <TextField
                    id="datetime-local"
                    placeholder="Check in"
                    value={dateRange ? dateRange.startDate : ''}
                    className={classes.textField}
                    onFocus={handleFocusTextField}
                    InputLabelProps={{
                    shrink: true,
                    }}/>
                <TextField
                    id="datetime-local"
                    placeholder="Check out"
                    value={dateRange ? dateRange.endDate : ''}
                    className={classes.textField}
                    onFocus={handleFocusTextField}
                    InputLabelProps={{
                    shrink: true,
                    }}/>
                
                <Popper open={open} anchorEl={anchorEl} className={classes.popper} placement='bottom' transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <DateRangePicker
                                open={open}
                                toggle={toggle}
                                closeOnClickOutside={true}
                                onChange={(range) => {convertDate(range)}}/>
                        </Fade>
                    )}
                </Popper>
                <div className={classes.rightDiv}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="travel-types" name="travelType" 
                            className={classes.radioGroup} value={selectedRadioButton} onChange={handleChange}>
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
            </div>
        </Container>
    )
}

export default DestinationFilters;
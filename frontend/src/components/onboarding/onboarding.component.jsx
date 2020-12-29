import React, { useState } from 'react';
import {useStyles, valueLabelFormat, BudgetSlider} from './onboarding.exports';
import {Typography, Grid, TextField, FormControlLabel, Button, Checkbox, RadioGroup, Radio, Chip} from '@material-ui/core';
import './onboarding.styles.scss';

const OnboardingComponent = () => {
    const classes = useStyles();
    const today = new Date();
    const [selectedValues, setSelectedValues] = useState({
        maritalStatus: false,
        budgetValue: [1000,2000],
        birthDate: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
        hasPet: 'no',
        selectedActivities: [],
        adventureLevel: 0,
        travelInspirations: "",
        favouriteCuisine: [],
        favouriteSeason: "spring"
    })

    const cuisines = ["Italian", "Chinese", "Japanese", "Thai", "Mexican", "Vegetarian", "Indian", "Spanish", "Mediterranean", "Greek", "Arabic", "French"];

    const handleRadioChange = (event) => {
        event.preventDefault();
        let value = event.target.value;
        setSelectedValues({...selectedValues, maritalStatus: value})
    }

    const handleBudgetSliderChange = (event, newValue) => {
        setSelectedValues({...selectedValues, budgetValue: newValue});
    }

    const handleAdventureSliderChange = (event, newValue) => {
        setSelectedValues({...selectedValues, adventureLevel: newValue});
    } 
    const handleTextFieldChange = (event) => {
        event.preventDefault();
        let value = event.target.value;
        setSelectedValues({...selectedValues, birthDate: value});
    }
    
    const handleInspirationsTextFieldChange = (event) => {
        event.preventDefault();
        let value = event.target.value;
        setSelectedValues({...selectedValues, travelInspirations: value});
    }

    const handleCheckboxChange = (event) => {
        event.preventDefault();
        let value = event.target.value;
        if(value === 'yes' || value === 'no') {
            setSelectedValues({...selectedValues, hasPet: value});
        } else {
            let checked = event.target.checked;
            if(checked) {
                setSelectedValues({...selectedValues, favouriteCuisine:[...selectedValues.favouriteCuisine, value]});
            } else {
                setSelectedValues({...selectedValues, favouriteCuisine: selectedValues.favouriteCuisine.filter((cuisine) => cuisine !== value)});
            }
        }

    }

    const handleSubmit = (event) => {

    }

    return (
        <React.Fragment>
            <Typography variant="h3" gutterBottom>
                Let's get to know you better
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        What is your current marital status?
                    </Typography>
                    <RadioGroup className={classes.root} aria-label="channels" name="maritalStatus" value={selectedValues.maritalStatus} 
                    onChange={handleRadioChange}>
                        <FormControlLabel value="married" control={<Radio color="secondary"  />}
                            label="Married"/>
                        <FormControlLabel value="single" control={<Radio color="secondary" />}
                            label="Single"/>
                        <FormControlLabel value="divorced" control={<Radio color="secondary" />}
                            label="Divorced"/>
                        <FormControlLabel value="widowed" control={<Radio color="secondary" />}
                            label="Widowed"/>
                    </RadioGroup>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        What budget you would most likely spend on a trip?
                    </Typography>
                    <BudgetSlider name="budgetSlider" valueLabelDisplay="on" value={selectedValues.budgetValue}
                        min={500}
                        step={100}
                        max={10000}
                        defaultValue={[20, 40]}
                        valueLabelFormat={valueLabelFormat}
                        onChange={handleBudgetSliderChange}
                        />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        When is your birthday?
                    </Typography>
                    <TextField type="date" variant="outlined" name="birthDate" 
                        label="Birthday" value={selectedValues.birthDate} 
                        onChange={handleTextFieldChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Will you have a pet travelling with you?
                    </Typography>
                    <FormControlLabel value="yes" control={<Checkbox color="secondary" checked={selectedValues.hasPet === 'yes'} />}
                        onChange={handleCheckboxChange} label="Yes"/>
                    <FormControlLabel value="no" control={<Checkbox color="secondary" checked={selectedValues.hasPet === 'no'}/>}
                        onChange={handleCheckboxChange} label="No"/>             
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        What activities do you like doing?
                    </Typography>
                    <div className='tag-input-container' style={{width: '100%'}}>
                        {/* {imageMetadata.keywords ? imageMetadata.keywords.map((data) => {
                            return ( */}
                                <Chip variant='outlined'/>
                            {/* );
                        }) : null} */}

                        <TextField variant="outlined" name='keywordState' value={selectedValues.selectedActivities} 
                            onChange={handleTextFieldChange} placeholder="Add keywords..." />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                         Select your level of adventurousness?
                    </Typography>
                    <BudgetSlider name="adventureSlider" valueLabelDisplay="on" value={selectedValues.adventureLevel}
                        min={0}
                        step={0.5}
                        max={10}
                        defaultValue={0}
                        valueLabelFormat={valueLabelFormat}
                        onChange={handleAdventureSliderChange}
                        />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        What are the inspirations of your travel?
                    </Typography>
                    <TextField className={classes.textRoot} variant="outlined" name="travelInspirations" 
                        placeholder="e.g Documentaries, Books, Stories From Friends, Cultures, Local Festivals, Food, Nature, Wildlife" 
                        multiline value={selectedValues.travelInspirations} onChange={handleInspirationsTextFieldChange}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        What types of cuisine are your favourites?
                    </Typography>
                    {cuisines.map((cuisine) => {
                        return <FormControlLabel key={cuisine} value={cuisine.toLowerCase()} control={<Checkbox color="secondary" checked={selectedValues.favouriteCuisine.includes(cuisine.toLowerCase())}/>}
                            onChange={handleCheckboxChange} label={cuisine}/>
                    })}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        What is your favourite season?
                    </Typography>
                    <RadioGroup className={classes.root} aria-label="seasons" name="favouriteSeason" value={selectedValues.favouriteSeason} 
                    onChange={handleRadioChange}>
                        <FormControlLabel value="spring" control={<Radio color="secondary"  />}
                            label="Spring"/>
                        <FormControlLabel value="summer" control={<Radio color="secondary" />}
                            label="Summer"/>
                        <FormControlLabel value="autumn" control={<Radio color="secondary" />}
                            label="Autumn"/>
                        <FormControlLabel value="Winter" control={<Radio color="secondary" />}
                            label="Winter"/>
                    </RadioGroup>
                </Grid>
                <Button type="submit" variant="contained" color="primary"
                    className={classes.submit} onClick={handleSubmit}>Submit Answers</Button>
            </Grid>
        </React.Fragment>
    )
}

export default OnboardingComponent;
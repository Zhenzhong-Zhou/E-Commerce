import {Controller, useFormContext} from "react-hook-form";
import {Grid, InputLabel, MenuItem, Select} from "@material-ui/core";

const FormSelect = ({name, label, required, fetchShippingCountries}) => {
	const {control} = useFormContext();
	console.log(fetchShippingCountries);
	console.log(123);
	return (
		<Grid item xs={12} sm={6}>
			<InputLabel required={required}>{label}</InputLabel>
			 <Controller render={(field) => (
			 	<Select {...field} fullWidth>
					    <MenuItem >Select</MenuItem>
			 	</Select>
			 )} control={control} name={name}/>
		</Grid>
	)
};


export default FormSelect;
import {useEffect, useState} from "react";
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from "@material-ui/core";
import {useForm, FormProvider, useFormContext} from "react-hook-form";
import FormInput from "./FormInput";
import {commerce} from "../../lib/commerce";

const AddressForm = ({checkoutToken}) => {
	const [shippingCountries, setShippingCountries]= useState([]);
	const [shippingCountry, setShippingCountry]= useState("");
	const [shippingSubdivisions, setShippingSubdivisions]= useState([]);
	const [shippingSubdivision, setShippingSubdivision]= useState("");
	const [shippingOptions, setShippingOptions]= useState([]);
	const [shippingOption, setShippingOption]= useState("");
	const methods = useForm();

	const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
	const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
	const options = shippingOptions.map((shippingOptions) => ({id:shippingOptions.id, label: `${shippingOptions.description} - (${shippingOptions.price.formatted_with_symbol})`}));

	const fetchShippingCountries = async (checkoutTokenId) => {
		const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
		setShippingCountries(countries);
		setShippingCountry(Object.keys(countries)[0]);
	};

	const fetchSubdivisions = async (countryCode) => {
		const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
		setShippingSubdivisions(subdivisions);
		setShippingSubdivision(Object.keys(subdivisions)[0]);
	};

	const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
		const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
		setShippingOptions(options);
		setShippingOption(options[0].id);
	};

	useEffect(() => {
		fetchShippingCountries(checkoutToken.id);
	}, []);

	useEffect(() => {
		if (shippingCountry) fetchSubdivisions(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
	}, [setShippingSubdivision]);

	return  (
		<>
			<Typography variant={"h6"} gutterBottom>Shipping Address</Typography>
			<FormProvider {...methods}>
				<form onSubmit="">
					<Grid container spacing={3}>
						<FormInput name={"firstName"} label={"First Name"}/>
						<FormInput name={"lastName"} label={"Last Name"}/>
						<FormInput name={"address1"} label={"Address"}/>
						<FormInput name={"email"} label={"Email"}/>
						<FormInput name={"city"} label={"City"}/>
						<FormInput name={"zip"} label={"ZIP / Postal code"}/>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
								{countries.map(({id, label}) => (
									<MenuItem key={id} value={id}>{label}</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
								{subdivisions.map(({id, label}) => (
									<MenuItem key={id} value={id}>{label}</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
								{options.map(({id, label}) => (
									<MenuItem key={id} value={id}>{label}</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
				</form>
			</FormProvider>
		</>
	)
};

export default AddressForm;
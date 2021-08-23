import {Grid} from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";
import AJ from "../../assets/AJ.png";
import MBP from "../../assets/MBP16.jpeg";

const products = [
	{ id: 1, name: "Shoes", description: "AJ shoes.", price: "$245", image: AJ},
	{ id: 2, name: "MacBook Pro", description: "Apple MacBook Pro.", price: "$4000", image: MBP},
] ;


const Products = () => {
	const  classes = useStyles();
	return (
		<main className={classes.content}>
			<div className={classes.toolbar}/>
			<Grid container justifyContent={"center"} spacing={4}>
				{products.map((product) => (
					<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
						<Product product={product}/>
					</Grid>
				))}
			</Grid>
		</main>
	)
};

export default Products;
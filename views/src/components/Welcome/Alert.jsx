import "./Welcome.css";
function Alert(props) {
	const classes = `alert alert--${props.type}`;
	return <div className={classes}>{props.children}</div>;
}

export default Alert;

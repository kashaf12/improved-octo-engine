/** @format */
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardImg, CardText, Input, Spinner } from "reactstrap";

function Parent(props) {
	const [state, setState] = useState({
		isLoaded: false,
		items: [],
		error: null,
	});
	const [filter, setFilter] = useState([]);
	const [page, setPage] = useState("1");
	useEffect(() => {
		fetch("https://reqres.in/api/users?page=" + page)
			.then((res) => res.json())
			.then(
				(result) => {
					setState({
						isLoaded: true,
						items: result.data,
					});
					setFilter(result.data);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					setState({
						isLoaded: true,
						error,
					});
				}
			);
	}, [page]);
	if (!state.isLoaded) {
		return <Spinner size='md' className='text-center' />;
	}
	const filterByEmail = (val) => {
		const newValue = state.items.filter((e) => e.email.includes(val));
		setFilter(newValue);
	};
	return (
		<div className='w-100 h-100 text-center'>
			<div
				className='w-50 text-center'
				style={{
					display: "inline-table",
				}}>
				<Input
					className=' mb-2'
					id='Search by email'
					placeholder='Search by email'
					autoComplete='on'
					autoCorrect='on'
					type='text'
					onChange={(e) => filterByEmail(`${e.target.value}`)}
					autoCapitalize='off'
					spellCheck='false'
				/>
			</div>
			<div className='row justify-content-between'>
				{filter.map((item) => (
					<Card
						key={item.id}
						style={{
							width: "200px",
							height: "200px",
						}}>
						<CardImg top width='100%' src={item.avatar} alt='Card image cap' />
						<CardBody>
							<CardText
								style={{
									fontSize: "14px",
								}}
								className='mb-2 text-muted'>
								{item.email}
							</CardText>

							{/* <Button>Button</Button> */}
						</CardBody>
					</Card>
				))}
			</div>
		</div>
	);
}

Parent.propTypes = {};

export default Parent;

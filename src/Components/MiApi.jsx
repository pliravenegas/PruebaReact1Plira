import { useState, useEffect } from "react"

const MiApi = () => {
	const [allData, setAllData] = useState([])
	const [data, setData] = useState([])
	const [value, setValue] = useState([])
	const [order, setOrder] = useState(["asc"])

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		filterData()
	}, [value])

	useEffect(() => {
		const sorted = sortData(data)
		setData(sorted)
	}, [order])

	const getData = () => {
		const url = "https://api.sampleapis.com/coffee/hot"
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				const sorted = sortData(json)

				setAllData(sorted)
				setData(sorted)
			})
			.catch((e) => console.log(e))

	}

	const filterData = () => {
		const search = value

		const filtered = allData.filter((coffee) => {
			const title = coffee.title
			const description = coffee.description

			return title.includes(search) || description.includes(search)
		})
		const sorted = sortData(filtered)
		setData(sorted)

	}

	const sortData = (data) => {
		const sortedData = [...data]

		if (order === "asc") {
			sortedData.sort((a, b) => a.title.localeCompare(b.title))
		}
		else {
			sortedData.sort((a, b) => b.title.localeCompare(a.title))
		}
		return sortedData
	}

	return (

		<main>

			<h1>Preparaciones de Café</h1>

			<div className="containers">
				<input type="text" placeholder="Busca tu café"
					onChange={(e) => setValue(e.target.value)}></input>


				<select onChange={(e) => setOrder(e.target.value)}>
					<option value="asc">Orden Ascedente</option>
					<option value="desc">Orden Descedente</option>
				</select>

			</div>

			<table>
				<thead>
					<tr>
						<th>Nombre de la Preparación</th>
						<th>Descripción (Inglés)</th>
						<th>Ingredientes (Inglés)</th>
						<th>Foto de Referencia</th>
					</tr>

				</thead>

				<tbody>
					{
						data.map((coffee) => {
							return (
								<tr key={coffee.id} >
									<td>{coffee.title} </td>
									<td>{coffee.description} </td>
									<td><p>{coffee.ingredients[0]}</p>
										<p>{coffee.ingredients[1]}</p>
										<p>{coffee.ingredients[2]}</p>
										<p>{coffee.ingredients[3]}</p>
										<p>{coffee.ingredients[4]}</p></td>
									<td><img src={coffee.image} /></td>
								</tr>
							)
						})
					}
				</tbody>
			</table>

		<footer> <p>Paula Lira Venegas</p>  </footer>	

		</main>

		
		
		


	)
}

export default MiApi
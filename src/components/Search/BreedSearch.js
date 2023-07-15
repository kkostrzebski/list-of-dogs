import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const BreedSearch = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const searchParams = new URLSearchParams(location.search)
	const initialBreed = searchParams.get('breed')
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const [breedList, setBreedList] = useState([])
	const [error, setError] = useState('')
	const [inputBreed, setInputBreed] = useState('')
	const [breed, setBreed] = useState(initialBreed || '')

	useEffect(() => {
		axios
			.get('https://dog.ceo/api/breeds/list/all')
			.then(response => {
				const breeds = Object.keys(response.data.message)
				setBreedList(breeds)
			})
			.catch(error => {
				console.error('Błąd pobierania listy ras psów:', error)
				setError('Wystąpił błąd podczas pobierania listy ras psów.')
			})
	}, [])

	useEffect(() => {
		if (breed && breedList.includes(breed)) {
			axios
				.get(`https://dog.ceo/api/breed/${breed}/images/random`)
				.then(response => {
					setImage(response.data.message)
					setError('')
					setDescription(
						'Ten pies to wierny i przyjacielski czworonóg, który świetnie czuje się w roli rodzinnego towarzysza. Dobrze dogaduje się z dziećmi, uwielbia pieszczoty i wspólne zabawy. Jest łatwy w prowadzeniu, choć bywa uparty. Sprawdzi się zarówno w małym mieszkaniu jak i w domu z ogrodem. Wysokość w kłębie 30-35 cm, masa ciała 22-25 kg. Sierść krótka i delikatna, lśniąca, umaszczenie płowe, pręgowane lub łaciate. Charakter czujny, śmiały, oddany, odważny, łagodny, czasem uparty. W zależności od dnia pokazuje różne oblicza swojej natury.'
					)
				})
				.catch(error => {
					console.error('Błąd pobierania zdjęcia dla rasy psa:', error)
					setError('Wystąpił błąd podczas pobierania zdjęcia dla rasy psa.')
					setImage('')
					setDescription('')
				})
		} else if (breed) {
			setError('Tej rasy nie mamy w bazie danych :(')
			setImage('')
			setDescription('')
		}
	}, [breed, breedList])

	const handleFormSubmit = event => {
		event.preventDefault()
		const selectedBreed = inputBreed.trim()
		if (selectedBreed) {
			if (breedList.includes(selectedBreed)) {
				setBreed(selectedBreed)
				setInputBreed('')
				navigate(`?breed=${selectedBreed}`)
			} else {
				setBreed('')
				setError('Tej rasy nie mamy w bazie danych :(')
				setImage(
					'https://media.istockphoto.com/id/486150666/photo/404-error.jpg?s=612x612&w=0&k=20&c=0gyIrlpbS04D0S0d9ED_2tjE3-L5lMnVamyuohZ8TKQ='
				)
				setDescription('')
			}
		} else {
			setBreed('')
			setError('Wprowadź nazwę rasy psa.')
			setImage('')
			setDescription('')
		}
	}

	return (
		<div>
			<h1 className='breed-search-title'>Wyszukiwanie rasy psa</h1>
			<div className='card'>
				<form onSubmit={handleFormSubmit}>
					<label>
						<div className='search-input'>
							<input
								type='text'
								name='breed'
								value={inputBreed}
								onChange={event => setInputBreed(event.target.value)}
								placeholder='Wprowadź rase psa:'
							/>
							<button type='submit' className='search-button'>
								<i className='fas fa-search'></i>
							</button>
						</div>
					</label>
				</form>
				{error && <p>{error}</p>}
				{image && (
					<div className='card-image'>
						<img src={image} alt={breed} />
					</div>
				)}
				{description && (
					<div className='card-content'>
						<h2>{breed.charAt(0).toUpperCase() + breed.slice(1)}</h2>
						<p className='description'>{description}</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default BreedSearch

import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const BreedSearch = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const searchParams = new URLSearchParams(location.search)

	// Inicjalizacja stanów komponentu
	const initialBreed = searchParams.get('breed')
	const [image, setImage] = useState('')
	const [description, setDescription] = useState('')
	const [breedList, setBreedList] = useState([])
	const [error, setError] = useState('')
	const [inputBreed, setInputBreed] = useState('')
	const [breed, setBreed] = useState(initialBreed || '')


	useEffect(() => {
		// Efekt używany do pobrania listy ras psów po załadowaniu komponentu
		axios
			.get('https://dog.ceo/api/breeds/list/all') // Wywołanie API, które zwraca listę ras psów
			.then(response => {
				const breeds = Object.keys(response.data.message) // Pobranie nazw ras psów z odpowiedzi API
				setBreedList(breeds) // Aktualizacja stanu z listą ras psów
			})
			.catch(error => {
				console.error('Błąd pobierania listy ras psów:', error) // Obsługa błędu w przypadku nieudanego żądania API
				setError('Wystąpił błąd podczas pobierania listy ras psów.')
			})
		// Efekt używany do pobrania danych o konkretnej rasie psa
		if (breed && breedList.includes(breed)) {
			axios
				.get(`https://dog.ceo/api/breed/${breed}/images/random`) // Wywołanie API, które zwraca losowe zdjęcie danej rasy psa
				.then(response => {
					setImage(response.data.message) // Aktualizacja stanu z adresem URL zdjęcia
					setError('') // Wyczyszczenie ewentualnego błędu
					setDescription(
						'Ten pies to wierny i przyjacielski czworonóg, który świetnie czuje się w roli rodzinnego towarzysza. Dobrze dogaduje się z dziećmi, uwielbia pieszczoty i wspólne zabawy. Jest łatwy w prowadzeniu, choć bywa uparty. Sprawdzi się zarówno w małym mieszkaniu jak i w domu z ogrodem. Wysokość w kłębie 30-35 cm, masa ciała 22-25 kg. Sierść krótka i delikatna, lśniąca, umaszczenie płowe, pręgowane lub łaciate. Charakter czujny, śmiały, oddany, odważny, łagodny, czasem uparty. W zależności od dnia pokazuje różne oblicza swojej natury.'
					) // Ustawienie przykładowego opisu rasy psa
				})
				.catch(error => {
					console.error('Błąd pobierania zdjęcia dla rasy psa:', error) // Obsługa błędu w przypadku nieudanego żądania API
					setError('Wystąpił błąd podczas pobierania zdjęcia dla rasy psa.')
					setImage('') // Wyczyszczenie adresu URL zdjęcia
					setDescription('') // Wyczyszczenie opisu rasy psa
				})
		} else if (breed) {
			setError('Tej rasy nie mamy w bazie danych :(') // Obsługa przypadku, gdy wprowadzona rasa nie jest dostępna
			setImage('') // Wyczyszczenie adresu URL zdjęcia
			setDescription('') // Wyczyszczenie opisu rasy psa
		}
	}, [breed, breedList])

	const handleFormSubmit = event => {
		event.preventDefault()
		const selectedBreed = inputBreed.trim()
		if (selectedBreed) {
			if (breedList.includes(selectedBreed)) {
				setBreed(selectedBreed) // Aktualizacja stanu z wybraną rasą psa
				setInputBreed('') // Wyczyszczenie wartości pola wprowadzania rasy psa
				navigate(`?breed=${selectedBreed}`) // Nawigacja do nowego adresu URL z wybraną rasą psa
			} else {
				setBreed('') // Wyczyszczenie wybranej rasy psa
				setError('Tej rasy nie mamy w bazie danych :(') // Obsługa przypadku, gdy wprowadzona rasa nie jest dostępna
				setImage(
					'https://media.istockphoto.com/id/486150666/photo/404-error.jpg?s=612x612&w=0&k=20&c=0gyIrlpbS04D0S0d9ED_2tjE3-L5lMnVamyuohZ8TKQ='
				) // Ustawienie obrazka błędu
				setDescription('') // Wyczyszczenie opisu rasy psa
			}
		} else {
			setBreed('') // Wyczyszczenie wybranej rasy psa
			setError('Wprowadź nazwę rasy psa.') // Obsługa przypadku, gdy nie wprowadzono nazwy rasy psa
			setImage('') // Wyczyszczenie adresu URL zdjęcia
			setDescription('') // Wyczyszczenie opisu rasy psa
		}
	}

	return (
		<div>
			{/* Nagłówek */}
			<h1 className='breed-search-title'>Wyszukiwanie rasy psa</h1>

			{/* Karta z formularzem */}
			<div className='card'>
				<form onSubmit={handleFormSubmit}>
					<label>
						<div className='search-input'>
							<input
								type='text'
								name='breed'
								value={inputBreed}
								onChange={event => setInputBreed(event.target.value)}
								placeholder='Wprowadź rasę psa:'
							/>
							<button type='submit' className='search-button'>
								<i className='fas fa-search'></i>
							</button>
						</div>
					</label>
				</form>
				{/* Wyświetlanie ewentualnego błędu */}
				{error && <p>{error}</p>}
				{/* Wyświetlanie obrazka rasy psa */}
				{image && (
					<div className='card-image'>
						<img src={image} alt={breed} />
					</div>
				)}
				{/* Wyświetlanie opisu rasy psa */}
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

import './App.css';
import LeftPanel from './components/Layouts/LeftPanel/LeftPanel';
import Body from './components/Layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournaAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react';

function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			setItems(
				data.map((item) => ({
					...item,
					date: new Date(item.date),
				}))
			);
		}
	}, []);

	useEffect(() => {
		if (items.length) {
			localStorage.setItem('data', JSON.stringify(items));
		}
	}, [items]);

	const addItem = (item) => {
		setItems((oldItems) => [
			...oldItems,
			{
				id:
					oldItems.length > 0 ? Math.max(...oldItems.map((i) => i.id)) + 1 : 1,
				title: item.title,
				post: item.post,
				date: new Date(item.date),
			},
		]);
		console.log(items);
	};

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournaAddButton />
				<JournalList items={items} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;

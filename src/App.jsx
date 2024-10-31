import './App.css';
import LeftPanel from './components/Layouts/LeftPanel/LeftPanel';
import Body from './components/Layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournaAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalstorage } from './components/Hooks/use-localstorage.hook';
import { UserContextProvider } from './components/context/user.context';
import { useState } from 'react';

function App() {
	const [items, setItems] = useLocalstorage('data');
	const [selectItem, setSelectItem] = useState({});

	const mapItems = (items) => {
		if (!items) {
			return [];
		}
		return items.map((i) => ({
			...i,
			date: new Date(i.date),
		}));
	};

	const addItem = (item) => {
		if (!item.id) {
			setItems([
				...mapItems(items),
				{
					...item,
					id: items?.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
					date: new Date(item.date),
				},
			]);
		}
		setItems([
			...mapItems(items).map((i) => {
				if (i.id === item.id) {
					return {
						...item,
					};
				}
				return i;
			}),
		]);
	};

	const deleteItem = (id) => {
		setItems([...items.filter((i) => i.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className="app">
				<LeftPanel>
					<Header />
					<JournaAddButton />
					<JournalList items={mapItems(items)} setItem={setSelectItem} />
				</LeftPanel>
				<Body>
					<JournalForm
						onSubmit={addItem}
						onDelete={deleteItem}
						data={selectItem}
					/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;

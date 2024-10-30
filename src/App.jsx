import './App.css';
import LeftPanel from './components/Layouts/LeftPanel/LeftPanel';
import Body from './components/Layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournaAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalstorage } from './components/Hooks/use-localstorage.hook';
import { UserContextProvider } from './components/context/user.context';

function App() {
	const [items, setItems] = useLocalstorage('data');

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
		setItems([
			...mapItems(items),
			{
				...item,
				id: items?.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
				date: new Date(item.date),
			},
		]);
		console.log(items);
	};

	return (
		<UserContextProvider>
			<div className="app">
				<LeftPanel>
					<Header />
					<JournaAddButton />
					<JournalList items={mapItems(items)} />
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem} />
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;

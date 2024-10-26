import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList({ items }) {
	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};
	return (
		<>
			<div className="journal-list">
				{items.length === 0 && <p>Тут пока пусто...</p>}
				{items.length > 0 &&
					items.sort(sortItems).map((el) => (
						<CardButton key={el.id}>
							<JournalItem title={el.title} text={el.text} date={el.date} />
						</CardButton>
					))}
			</div>
		</>
	);
}

export default JournalList;

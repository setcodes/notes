import './JournalItem.css';

function JournalItem({ title, post, date }) {
	let formatedDate = Intl.DateTimeFormat('ru-RU').format(date);
	return (
		<>
			<h2 className="journal-item__header">{title}</h2>
			<div className="journal-item-body">
				<div className="journal-item__date">{post}</div>
				<div className="journal-item__text">{formatedDate}</div>
			</div>
		</>
	);
}

export default JournalItem;

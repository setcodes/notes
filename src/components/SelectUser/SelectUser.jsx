import { useContext } from 'react';
import { UserContext } from '../context/user.context';

function SelectUser() {
	const { userId, setUserId } = useContext(UserContext);

	const changeUser = (e) => {
		setUserId(Number(e.target.value));
	};

	return (
		<select name="user" id="user" value={userId} onChange={changeUser}>
			<option value="1">Админ</option>
			<option value="2">Пользователь</option>
		</select>
	);
}

export default SelectUser;

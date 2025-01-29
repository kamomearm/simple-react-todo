import { useState } from 'react';

function App() {
	const [idCounter, setIdCounter] = useState(0);
	const [todos, setTodo] = useState([]);

	/**
	 * フォーム送信したらtodo配列にtodoを追加
	 * @param {Event} e 送信イベント
	 */

	const handleSubmit = (e) => {
		e.preventDefault();
		const inputText = e.target["task"].value
		const nextid = idCounter + 1
		setIdCounter(nextid);
		setTodo([...todos, { id: nextid, task: inputText, checked: false, stopped: false }]);
	};

	/**
	 * TODOのチェックボックスがクリックされたら該当の checked フラグを toggle する
	 * @param {number} id
	 */
	const handleChangeCheckBox = (id) => {
		const changedTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, checked: !todo.checked };
			}
			return todo;
		});
		setTodo(changedTodos)
	};
	/**
	 * 指定されたidを配列から取り除いた配列にtodosを更新
	 * @param {number} id 
	 */
	const handleClickDeleteButton = (id) => {
		setTodo(todos.filter((todo) => todo.id !== id));
	};

	const handleClickStopButton = (id) => {
		const stoppedTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, stopped: !todo.stopped };
			}
			return todo;
		});
		setTodo(stoppedTodos)
	};

	return (
		<div className='App'>
			<form onSubmit={handleSubmit}>
				<input name='task' />
				<button>登録</button>
			</form>
			<div>
				{todos.map((todo) => (
					<div key={todo.id} 
						className={`${todo.checked ? "checked" : "uncheck"} ${todo.stopped ? "stopped" : "unstop"}`}>
						<input
							type='checkbox'
							onChange={() => handleChangeCheckBox(todo.id)}
						/>
						{todo.task}
						<button onClick={() => handleClickStopButton(todo.id)}>
							停止
						</button>
						<button onClick={() => handleClickDeleteButton(todo.id)}>
							削除
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
export default App;

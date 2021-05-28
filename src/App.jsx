import React, { useState, useRef, useEffect } from 'react'
import {v4} from 'uuid'
import './main.scss'

export function App(){

	const [todo, setTodo] = useState([])

	const textoTarea = useRef()

	useEffect(() => {
		const listaGuardada = JSON.parse(localStorage.getItem('todoApp.todo'))
		if(listaGuardada){
			setTodo(listaGuardada)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('todoApp.todo', JSON.stringify(todo))
	}, [todo])

	const agregarTarea = () => {
		const tarea = textoTarea.current.value;

		if(tarea === '') return

		setTodo(tareaPrevia => {
			return [...tareaPrevia, {id: v4(), tarea, completado: false}]
		})

		textoTarea.current.value = '';
	}

	const eliminarTarea = (id) => {
		setTimeout(function() {
			const nuevaListaDeTareas = todo.filter(todos => todos.id !== id)
			setTodo(nuevaListaDeTareas)
			console.log(nuevaListaDeTareas);
			localStorage.setItem('todoApp.todo', JSON.stringify(nuevaListaDeTareas))
		}, 500);
	}

	return(
		<div className="container card">
			<header>
				<h1>Total de tareas: {todo.filter((todos) => !todos.completado).length}</h1>
			</header>
			<footer>
				<input ref={textoTarea} type="text" placeholder="ingresa una tarea" />
				<button className="agregar" onClick={() => agregarTarea()} >Agregar＋</button>
				<ul>
					{todo.map(todos => (
						<li key={todos.id}>
							<label>
								<input type="checkbox" onChange={() => eliminarTarea(todos.id)}/>
								<span className="checkable">{todos.tarea}</span>
							</label>
						</li>
					))}
				</ul>
			</footer>
		</div>
	)
}
import React, { useRef, useState } from "react";
import { Dropdown } from "./Dropdown";

interface TodoListItemProps {
  todo: Todo;
  toggleComplete: ToggleComplete;
  onRemoveTodo: RemoveTodo;
  editTodo: EditTodo;
  addTag: AddTag;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo, toggleComplete, onRemoveTodo, editTodo, addTag }) => {
  const [isEditOn, setIsEditOn] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(todo.text);

  const onDelete = () => {
    onRemoveTodo(todo);
  }

  const onEdit = () => {
    setIsEditOn(true);
  }

  const onAddTag = () => {
    const id = 1;
    addTag(id);
  }

  const onTodoUpdate = (e: any) => {
    let text = e.target.value;
    setInputText(text);
    editTodo(text);
  }

  const dropdownOptions: Array<Option> = [
    {
      value: "Delete",
      onClick: onDelete,
      color: "red",
    },
    {
      value: "Edit",
      onClick: () => {
        onEdit();
      },
      color: "blue",
    },
    {
      value: "tag",
      onClick: () => {
        addTag(1, 1);
      },
      color: "blue",
    }
  ]
  return (
    <li className={todo.complete? "todo-row completed" : "todo-row"}>
      <label>
      <input
        type="checkbox"
        onChange={() => toggleComplete(todo)}
        checked={todo.complete}
        />
        {isEditOn ? <input className="edit-input" type="text" onKeyPress={((event) => {
          if(event.key === 'Enter'){
            setIsEditOn(false);
          }
        })} value={inputText} onChange={(e) => onTodoUpdate(e)}/> : todo.text}
      </label>
      <Dropdown
        options={dropdownOptions}
      />
    </li>
  )
}

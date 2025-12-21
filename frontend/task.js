class Task {
  constructor(name, id, completed = false, editing = false) {
    this.name = name
    this.id = id
    this.completed = completed
    this.editing = editing
  }
}

export default Task



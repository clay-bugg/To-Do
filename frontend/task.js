class Task {
  constructor(id, name = taskName, completed = false, editing = false) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.editing = editing;
  }

  toggle() {
    this.completed = !this.completed;
  }

  rename(newName) {
    this.name = newName;
  }

  toggleEditing() {
    this.editing = !this.editing;
  }
}

export default Task;

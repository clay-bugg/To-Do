class Task {
  constructor(id, name, completed = false) {
    this.id = id;
    this.name = name;
    this.completed = completed;
  }

  toggle() {
    this.completed = !this.completed;
  }

  rename(newName) {
    this.name = newName;
  }
}

export default Task;
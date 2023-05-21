
const task = (name, description, dueDay, priority = 'Medium', completed = false) => {
    let _name = name;
    let _description = description;
    let _dueDay = dueDay;
    let _priority = priority;
    let _completed = completed;

    return {
        get name() { return _name; },
        set name(newName) { _name = newName; },
        get description() { return _description; },
        set description(newDescription) { _description = newDescription; },
        get dueDay() { return _dueDay; },
        set dueDay(newDueDay) { _dueDay = newDueDay; },
        get priority() { return _priority; },
        set priority(newPriority) { _priority = newPriority; },
        get completed() { return _completed; },
        set completed(newCompleted) { _completed = newCompleted; },
    }
}; 


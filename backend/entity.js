let users = [];

const addUser = ({ id, name, room }) => {
    
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (!name || !room) {
        return { error: 'name and room required' }
    }

    if (users.length) {
        const data = users.find(e => e.name === name && e.room === room)

        if (data) {
            return { error: 'user already exist' }
        }
    }

    const response = { id, name, room }

    users.push(response)

    console.log(users)

    return {response};
}

const getUser = (id) => {
    return users.find(e => e.id == id);
}


const getRoomUsers = (room) => {
    return users.filter(e => e.room === room)
}

const removeUser = (id) => {
    const findIdx = users.findIndex(e => e.id == id);

    if (findIdx >= 0) {
        return users.splice(findIdx, 1)[0]
    }
}
module.exports = {
    addUser,
    getUser,
    removeUser,
    getRoomUsers
}
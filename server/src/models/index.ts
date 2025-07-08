import List from './List';
import User from './User';
import Task from './Task';
import ListMember from './ListMember';

// Associations
User.hasMany(List, { foreignKey: 'userId',  // user can have many lists
    onDelete: 'CASCADE',
 });
List.belongsTo(User, { foreignKey: 'userId' }); // each list belongs to a user

List.hasMany(Task, { foreignKey: 'listId', // a list can have many tasks
    onDelete: 'CASCADE',
 });
Task.belongsTo(List, { foreignKey: 'listId' }); // each task belongs to a list

User.hasMany(Task, { foreignKey: 'assignedToId' }); // a user can be assigned many tasks
Task.belongsTo(User, { as: "assignedTo", foreignKey: "assignedToId" }); // each task can be assigned to a user

User.hasMany(Task, { foreignKey: 'completedById' }); // a user can complete many tasks
Task.belongsTo(User, { foreignKey: 'completedById' }); // each task can be completed by a user

List.hasMany(ListMember, { foreignKey: 'listId' }); // a list can have many members
ListMember.belongsTo(List, { foreignKey: 'listId' }); // each member belongs to a list

User.hasMany(ListMember, { foreignKey: 'userId' }); // a user can be a member of many lists
ListMember.belongsTo(User, { foreignKey: 'userId' }); // each member belongs to a user

// Collaboration

List.belongsToMany(User, {
    through: 'ListMember', // through the ListMember model
    foreignKey: 'listId', // foreign key in ListMember
    otherKey: 'userId', // foreign key in User
});

User.belongsToMany(List, {
    through: 'ListMember', // through the ListMember model
    foreignKey: 'userId', // foreign key in ListMember
    otherKey: 'listId', // foreign key in List
});

export { List, User, Task, ListMember };
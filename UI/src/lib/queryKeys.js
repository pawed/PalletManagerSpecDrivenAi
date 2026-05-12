export const queryKeys = {
  tasks:     { all: ['tasks'],     byId: (id) => ['tasks', id] },
  people:    { all: ['people'] },
  costs:     { all: ['costs'] },
  revenue:   { all: ['revenue'] },
  warehouse: { all: ['warehouse'] },
  comments:  { byTask: (taskId) => ['comments', taskId] },
  overview:  { all: ['overview'] },
};

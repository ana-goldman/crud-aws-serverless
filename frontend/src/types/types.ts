export type Employee = {
  _id: string;
  name: string;
  surname: string;
  department: {
    _id: string;
    name: string;
  };
};

export type Department = {
  _id: string;
  name: string;
  employees: Omit<Employee, 'department'>[];
};

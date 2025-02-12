export type Category = {
    id: string;
    name: string;
    code: string;
    count?: number;
    subCategories?: Category[];
  };
  
  export const categories: Category[] = [
    {
      id: '1',
      name: 'Important',
      code: 'I',
      count: 0,
      subCategories: []
    },
    {
      id: '2',
      name: 'Personal',
      code: 'P',
      count: 0,
      subCategories: []
    },
    {
      id: '3',
      name: 'Business',
      code: 'B',
      count: 0,
      subCategories: []
    },
    {
      id: '4',
      name: 'Tech',
      code: 'T',
      count: 0,
      subCategories: []
    },
    {
      id: '5',
      name: 'Human Resources',
      code: 'H',
      count: 1,
      subCategories: []
    },
    {
      id: '6',
      name: 'Marketing',
      code: 'M',
      count: 1,
      subCategories: []
    }
  ];
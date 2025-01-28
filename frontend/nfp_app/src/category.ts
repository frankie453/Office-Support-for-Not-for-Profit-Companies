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
      name: 'Business',
      code: 'B',
      count: 1,
      subCategories: []
    },
    {
      id: '2',
      name: 'Tech',
      code: 'T',
      subCategories: []
    },
    {
      id: '3',
      name: 'Human Resources',
      code: 'H',
      subCategories: []
    },
    {
      id: '4',
      name: 'Marketing',
      code: 'M',
      subCategories: []
    }
  ];
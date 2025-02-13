export type Category = {
  id: number;
  name: string;
  count?: number;
  subCategories?: Category[];
};

// export const categories: Category[] = [
//   {
//     id: "1",
//     name: "Important",
//     count: 0,
//     subCategories: [],
//   },
//   {
//     id: "2",
//     name: "Personal",
//     count: 0,
//     subCategories: [],
//   },
//   {
//     id: "3",
//     name: "Business",
//     count: 0,
//     subCategories: [],
//   },
//   {
//     id: "4",
//     name: "Tech",
//     count: 0,
//     subCategories: [],
//   },
//   {
//     id: "5",
//     name: "Human Resources",
//     count: 1,
//     subCategories: [],
//   },
//   {
//     id: "6",
//     name: "Marketing",
//     count: 1,
//     subCategories: [],
//   },
// ];

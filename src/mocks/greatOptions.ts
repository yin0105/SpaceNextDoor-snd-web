type Variant = {
  title: string,
  description: string,
  price: number
};

type Option = {
  title: string,
  location: string,
  stars: number,
  variants: Variant[]
};

type Options = Option[];

const options: Options = [
  {
    title: 'Romer Compounds Building',
    location: 'Garden park avenue D2, Singapore',
    stars: 4.9,
    variants: [
      {
        title: '2.3 sq ft',
        description: 'Climate controlled, Roll up door, Interior, Floor-2',
        price: 114.75,
      },
      {
        title: '4.6 sq ft',
        description: 'Climate controlled, Roll up door, Interior, Floor-2',
        price: 249.75,
      },
      {
        title: '6.6 sq ft',
        description: 'Climate controlled, Roll up door,Interior, Floor-2',
        price: 324.75,
      },
    ],
  },
  {
    title: 'Romer 222Compounds Building',
    location: 'Garden park avenue D2, Singapore',
    stars: 4.9,
    variants: [
      {
        title: '2.3 sq ft',
        description: 'Climate controlled, Roll up door, Interior, Floor-2',
        price: 114.75,
      },
      {
        title: '4.6 sq ft',
        description: 'Climate controlled, Roll up door, Interior, Floor-2',
        price: 249.75,
      },
      {
        title: '6.6 sq ft',
        description: 'Climate controlled, Roll up door,Interior, Floor-2',
        price: 324.75,
      },
    ],
  },
];

export default options;

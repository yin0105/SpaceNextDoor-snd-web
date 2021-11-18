import gql from 'graphql-tag';

const ListTableFragment = {
  spaces: gql`
    fragment SpaceListFragment on Space {
      id
      name
      size
      size_unit
      height
      length
      width
      status
      total_units
      features {
        name_en
        name_th
        name_jp
        name_kr
      }
      space_type {
        name_en
        name_th
        name_jp
        name_kr
      }
    }
  `,
};

export default ListTableFragment;

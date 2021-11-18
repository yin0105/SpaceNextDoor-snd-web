This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npx browserslist@latest --update-db
```

And then
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.


## GraphQL Driven UI Development

We're using Apollo client for managing GraphQL queries. `apollo-react` exposes many useful components (e.g `Query`) to use along with your components. Following are some of the guidelines for creating scalable components with Apollo.

> ALWAYS START DEVELOPMENT WITH APOLLO CODEGEN WATCHING YOUR CHANGES. THIS IS MUST FOR AUTO GENERATED TYPES.

### 1. Separate presentational components from Containers

The presentational components should be used purely for rendering. No fetching of any data should be done inside a presentational component. This pure component if it renders data from API, should expose `fragments` ([see apollo fragments](https://www.apollographql.com/docs/react/advanced/fragments/)) object listing the fields it wants from parent component.

This enables us to write everything related to a UI component in one place. So later, if you wanted to introduce one more field. You'll just change the fragment in the same component which will in turn give you the data from API (as the fragment will be connected to parent component's graphql query)

```javascript
import {PostItemFieldsFragment} from './__generated__/PostItemFieldsFragment';
import gql from 'graphql-tag';

type Props = PostItemFieldsFragment & OtherPropsHere;

type PostItemType = FragmentedFunction<React.FunctionComponent<Props>, 'post'>;

const PostItem: PostItemType = ({ text }) {
  return (
    <div>
      {text}
    </div>
  )
}

PostItem.fragments = {
  post: gql`
    fragment PostItemFieldsFragment on Post {
      text
    }
  `
}

```

### 2. Parent (Container) components should get fragments from Child components

The Parent component which is rendering child components should get the fragments from them so that the children can request their own fields instead of parent telling children what to get.

This pattern makes sense as otherwise parent passes props to children and then this hierarchy becomes a mess. For instance, grand parent passes to parent and parent passes to child.

If we wanted new prop in child, we'll have to send all the way from grand parent to child. However, if we use fragments. We just need to update the fragment of child.

```typescript
import {PostQuery, PostQueryVariables} from './__generated__/PostQuery';
import {Query} from 'apollo-react';
import PostItem from './PostItem';
import gql from 'graphql-tag';

type Props = PostQuery & OtherPropsHere;

const POSTS_QUERY = gql`
  query PostDetailsQuery($id: ID) {
    post(_id: $id) {
      ...PostItemFieldsFragment
    }
  }
  ${PostItem.fragments.post}
`

const PostDetails: React.FC<Props> = ({ postId }) {
  const query = useQuery<PostQuery, PostQueryVariables>(POSTS_QUERY, {
    variables:  { postId }
  });

  return (
    <>
      {query.loading && <Loading />}

      {!query.loading && <PostItem {...query?.data?.post} />}
    </>
  );
}
```

### Naming Fragments & Queries

The queries must always be NAMED and should end with Query. The auto generated types will reflect whatever you name your query. e.g

```
query PostListQuery {
  posts {
    text
  }
}
// auto generated code will be relative to the same directory as of this query under __generated__/PostListQuery.ts having PostListQuery and PostListVariables (if any)
```

The fragments should always end with FieldsFragment. The auto generated types will reflect this as well. e.g

```
fragment PostItemFieldsFragment on Post {
  text
  location
  name
}

// auto generated code will be relative to the same directory as of this query under __generated__/PostItemFieldsFragment.ts having PostItemFieldsFragment
```


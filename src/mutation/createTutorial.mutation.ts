import {gql} from '@apollo/client';

export const CREATE_TUTORIAL_MUTATION = gql`
  mutation CreateTutorial($createTutorialInput: CreateTutorialInput!) {
    createTutorial(createTutorialInput: $createTutorialInput) {
      id
      title
      image
      videoUrl
      category
      description
    }
  }
`;

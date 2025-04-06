import { useParams} from 'react-router-dom';

export const withRouterParam = (Component) => {
  const Wrapper = (props) => {
    const match = {params: useParams()};
    return (
      <Component
        match={match}
        {...props}
      />
    );
  };
  return Wrapper;
};


import { useParams, useNavigate } from 'react-router-dom';
export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const match = {params: useParams()};
    return (
      <Component
        match={match}
        navigate={navigate}
        {...props}
      />
    );
  };
  return Wrapper;
};
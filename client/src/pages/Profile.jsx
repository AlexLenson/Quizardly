import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { profileId } = useParams();
  console.log("profileId:", profileId);

  const { loading, data } = useQuery(profileId ? QUERY_USER : QUERY_ME, {
    variables: { userId: profileId },
  });

  const user = data?.me || data?.getUser || {};
  console.log("user", user);
  if (
    Auth.loggedIn() && 
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().authenticatedPerson.username === user.username
  ) {
    return (<><Navigate to="/me" /><div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          {user.username}
        </h2>
        <p> Score: {user.score}</p>
        <div className="col-12 col-md-10 mb-5">
        </div>
        {/* Quizzes carosel */}
      </div>
    </div></>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
           {user.username}
        </h2>
        <p> Score: {user.score}</p>
        <div className="col-12 col-md-10 mb-5">
        </div>
       {/* Quizzes carosel */}
      </div>
    </div>
  );
};

export default Profile;

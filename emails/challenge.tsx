const PropDefaults = {
  code: 132456,
};

const ChallengeEmail = ({ data = PropDefaults }) => {
  return <p>{data.code}</p>;
};

export default ChallengeEmail;

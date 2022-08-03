import React from "react";

interface Props {
  children: string;
}

function HeaderOne(props: Props): React.ReactElement {
  const { children } = props;
  return <h1>{children}</h1>;
}

export default HeaderOne;

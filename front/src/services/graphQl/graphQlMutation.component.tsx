import type { OperationVariables } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { getGraphQlClientNoCache } from "..";

interface Props {
  query: string;
  onCompleted?: (data: unknown) => void;
  triggerLaunchMutation: boolean;
  variables: unknown;
}

export const GraphQlMutation: FC<Props> = ({
  query,
  onCompleted,
  triggerLaunchMutation,
  variables,
}) => {
  const [componentIsInitialized, setComponentIsInitialized] = useState(false);
  const queryVariables: OperationVariables = { variables };
  const [launchMutation, { data }] = useMutation(gql(query), {
    client: getGraphQlClientNoCache(),
    onCompleted: () => {
      if (onCompleted) onCompleted(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    setComponentIsInitialized(true);
  }, []);

  useEffect(() => {
    if (componentIsInitialized) void launchMutation(queryVariables);
  }, [triggerLaunchMutation]);

  return null;
};

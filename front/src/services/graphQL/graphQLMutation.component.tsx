import type { OperationVariables } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { getGraphQLClientNoCache } from "./graphQLClient.service";

interface Props {
  query: string;
  onCompleted?: (data: unknown) => void;
  triggerLaunchMutation: boolean;
  variables: unknown;
}

export const GraphQLMutation: FC<Props> = ({
  query,
  onCompleted,
  triggerLaunchMutation,
  variables,
}) => {
  const [componentIsInitialized, setComponentIsInitialized] = useState(false);
  const queryVariables: OperationVariables = { variables };
  const [launchMutation, { data }] = useMutation(gql(query), {
    client: getGraphQLClientNoCache(),
    onCompleted: () => {
      if (onCompleted) onCompleted(data);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    setComponentIsInitialized(true);
  }, []);

  useEffect(() => {
    if (componentIsInitialized) void launchMutation(queryVariables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerLaunchMutation]);

  return null;
};

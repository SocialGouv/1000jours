import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";

import {
  FetchPoliciesConstants,
  HomeDbQueries,
  StorageKeysConstants,
} from "../../constants";
import { GraphQLQuery } from "../../services";
import type { Article } from "../../types";
import { getStringValue, storeObjectValue } from "../../utils/storage.util";

interface StoreCurrentStepArticleIdsProps {
  update: boolean;
}

const StoreCurrentStepArticleIds: FC<StoreCurrentStepArticleIdsProps> = ({
  update,
}) => {
  const [currentStepId, setCurrentStepId] = useState<string | null | undefined>(
    undefined
  );

  const handleResults = useCallback(async (data: unknown) => {
    const articles = (data as { articles: Article[] }).articles;
    const articleIds = articles.map((article: Article) => article.id);

    await storeObjectValue(
      StorageKeysConstants.currentStepArticleIds,
      articleIds
    );
  }, []);

  const getCurrentStepId = async () => {
    const stepId = await getStringValue(StorageKeysConstants.currentStepId);
    if (stepId) setCurrentStepId(stepId);
  };

  useEffect(() => {
    if (update) {
      void getCurrentStepId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return (
    <>
      {currentStepId && (
        <GraphQLQuery
          query={HomeDbQueries.LIST_ID_ARTICLES_WITH_STEP(currentStepId)}
          fetchPolicy={FetchPoliciesConstants.NO_CACHE}
          getFetchedData={handleResults}
        />
      )}
    </>
  );
};

export default StoreCurrentStepArticleIds;

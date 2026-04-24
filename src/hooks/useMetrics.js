import { useQuery } from "@tanstack/react-query";
import anahiacApi from "@/api/api";

export const useMetrics = (examId = "", applicationId = undefined) => {
  const getAccertsQuery = useQuery({
    queryKey: ["accerts", examId, applicationId],
    queryFn: async () => {
      try {
        const { data } = await anahiacApi.get(
          `/metrics/${examId}${applicationId ? `?applicationId=${applicationId}` : ""}`,
        );

        return data;
      } catch {
        return [];
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 3000,
    enabled: !!examId,
  });

  return { getAccertsQuery };
};

import {
  QueryClient,
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions,
} from "@tanstack/react-query";

import { type WretchError } from "wretch";

const queryConfig: DefaultOptions = {
  queries: {
    throwOnError: false,
    refetchOnWindowFocus: false,
    retry: false,
    suspense: true,
  },
};
export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
  ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    WretchError,
    Parameters<MutationFnType>[0]
  >;

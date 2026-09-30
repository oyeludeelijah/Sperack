import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth.jsx";

/**
 * Fetches all-time income and expense totals from the database via RPC.
 * Uses SECURITY INVOKER so RLS on `transactions` auto-filters to the caller's rows.
 * Returns { income, expense, balance } — all numbers, never null.
 */
export function useAllTimeTotals() {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["allTimeTotals", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_all_time_totals");
      if (error) throw error;
      const row = data?.[0] ?? { income: 0, expense: 0 };
      const income = parseFloat(row.income ?? 0);
      const expense = parseFloat(row.expense ?? 0);
      return { income, expense, balance: income - expense };
    },
  });

  return {
    income: data?.income ?? 0,
    expense: data?.expense ?? 0,
    balance: data?.balance ?? 0,
    isLoading,
    error,
  };
}

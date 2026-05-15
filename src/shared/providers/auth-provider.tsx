import { createContext, useCallback, useContext, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { AuthApi } from "@/entities/auth/api"
import type { AuthUser } from "@/entities/auth/types"
import { TOKEN_KEY, REFRESH_KEY } from "@/shared/api"
import { useAuthStore } from "@/shared/store/auth.store"

type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: AuthUser }
  | { status: "unauthenticated" }

type AuthContextValue = {
  state: AuthState
  setUser: (user: AuthUser) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const storeSetUser = useAuthStore((s) => s.setUser)
  const storeClearUser = useAuthStore((s) => s.clearUser)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlToken = params.get("token")
    const urlRefresh = params.get("refresh")
    if (urlToken) {
      localStorage.setItem(TOKEN_KEY, urlToken)
      params.delete("token")
    }
    if (urlRefresh) {
      localStorage.setItem(REFRESH_KEY, urlRefresh)
      params.delete("refresh")
    }
    if (urlToken || urlRefresh) {
      const clean = window.location.pathname + (params.toString() ? `?${params}` : "")
      window.history.replaceState({}, "", clean)
    }
  }, [])

  const { data, isPending, isError } = useQuery({
    queryKey: ["me"],
    queryFn: () => AuthApi.me(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (data) storeSetUser(data.data.user)
  }, [data, storeSetUser])

  const state: AuthState = isPending
    ? { status: "loading" }
    : isError || !data
      ? { status: "unauthenticated" }
      : { status: "authenticated", user: data.data.user }

  const setUser = useCallback(
    (user: AuthUser) => {
      queryClient.setQueryData(["me"], { data: user })
      storeSetUser(user)
    },
    [queryClient, storeSetUser]
  )

  const logout = useCallback(async () => {
    await AuthApi.logout().catch(() => null)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    queryClient.removeQueries({ queryKey: ["me"] })
    storeClearUser()
    window.location.assign(
      (import.meta.env.VITE_MAIN_URL || "https://osonapp.uz") + "/login"
    )
  }, [queryClient, storeClearUser])

  return (
    <AuthContext.Provider value={{ state, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}

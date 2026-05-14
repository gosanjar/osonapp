import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { AuthApi, type AuthUser } from "@/shared/api/auth"
import { TOKEN_KEY } from "@/shared/api"

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
  const [state, setState] = useState<AuthState>({ status: "loading" })

  useEffect(() => {
    // URL'dan token kelgan bo'lsa localStorage'ga yozib, URL'dan o'chiramiz
    const params = new URLSearchParams(window.location.search)
    const urlToken = params.get("token")
    if (urlToken) {
      localStorage.setItem(TOKEN_KEY, urlToken)
      params.delete("token")
      const clean = window.location.pathname + (params.toString() ? `?${params}` : "")
      window.history.replaceState({}, "", clean)
    }

    AuthApi.me()
      .then((res) => setState({ status: "authenticated", user: res.data }))
      .catch(() => setState({ status: "unauthenticated" }))
  }, [])

  // agar 3 soniyada javob kelmasa — unauthenticated deb hisobla
  useEffect(() => {
    const timer = setTimeout(() => {
      setState((prev) =>
        prev.status === "loading" ? { status: "unauthenticated" } : prev
      )
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const setUser = useCallback((user: AuthUser) => {
    setState({ status: "authenticated", user })
  }, [])

  const logout = useCallback(async () => {
    await AuthApi.logout().catch(() => null)
    localStorage.removeItem(TOKEN_KEY)
    setState({ status: "unauthenticated" })
  }, [])

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

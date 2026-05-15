import { Link } from "react-router-dom"

type Props = {
  text: string
  linkText: string
  to: string
}

export function AuthRedirectLink({ text, linkText, to }: Props) {
  return (
    <p className="mt-6 text-center text-sm text-muted-foreground">
      {text}{" "}
      <Link to={to} className="text-primary transition-colors hover:text-primary/80">
        {linkText}
      </Link>
    </p>
  )
}
